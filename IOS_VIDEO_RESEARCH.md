# iOS Video Playback Research & Solutions

## Current Issues

1. **iOS Chrome**: Videos stop at 58 seconds even in fullscreen
2. **iOS Safari**: Play button doesn't work at all

## iOS Video Playback Restrictions & Solutions

### 1. iOS Chrome vs Safari API Differences

#### Safari-specific APIs:

- `webkitEnterFullscreen()` - iOS Safari's video-specific fullscreen method
- `webkitExitFullscreen()` - Exit fullscreen on iOS Safari
- `webkitbeginfullscreen` event - Fired when video enters fullscreen
- `webkitendfullscreen` event - Fired when video exits fullscreen
- `webkitDisplayingFullscreen` property - Boolean indicating fullscreen state
- `webkitPresentationMode` property - Can be "inline", "fullscreen", or "picture-in-picture"

#### iOS Chrome Limitations:

- iOS Chrome uses WKWebView (Safari's engine) due to iOS restrictions
- However, Chrome may not support all webkit-prefixed events consistently
- `webkitbeginfullscreen` and `webkitendfullscreen` events may not fire in iOS Chrome
- Chrome on iOS might use standard Fullscreen API instead of webkit-specific APIs

### 2. User Gesture Requirements

iOS has strict requirements for video playback:

- **Autoplay with sound requires user gesture** - Videos must be muted to autoplay
- **Fullscreen requires direct user interaction** - Cannot be triggered programmatically without user gesture
- **Custom play buttons must trigger video methods synchronously** - Async operations break the user gesture chain

### 3. Best Practices for iOS Video Implementation

#### A. Detecting iOS and Browser Type:

```javascript
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isIOSChrome = isIOS && /CriOS/.test(navigator.userAgent);
const isIOSSafari =
  isIOS &&
  /Safari/.test(navigator.userAgent) &&
  !/CriOS/.test(navigator.userAgent);
```

#### B. Fullscreen Detection for iOS:

```javascript
const checkIOSFullscreen = video => {
  // For Safari
  if (video.webkitDisplayingFullscreen !== undefined) {
    return video.webkitDisplayingFullscreen;
  }

  // For Chrome on iOS - check presentation mode
  if (video.webkitPresentationMode !== undefined) {
    return video.webkitPresentationMode === 'fullscreen';
  }

  // Fallback to document fullscreen check
  return !!(document.fullscreenElement || document.webkitFullscreenElement);
};
```

#### C. Proper Fullscreen Request:

```javascript
const enterIOSFullscreen = async video => {
  try {
    if (video.webkitEnterFullscreen) {
      // iOS Safari
      video.webkitEnterFullscreen();
    } else if (video.requestFullscreen) {
      // Standard API (iOS Chrome might support this)
      await video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      // Older webkit prefix
      video.webkitRequestFullscreen();
    }
  } catch (error) {
    console.error('Fullscreen request failed:', error);
  }
};
```

#### D. Custom Play Button Implementation:

```javascript
// IMPORTANT: Must be synchronous and directly in the click handler
playButton.addEventListener('click', e => {
  e.preventDefault();

  // Don't use setTimeout, promises, or other async operations here
  video.muted = false;

  // Enter fullscreen first, then play
  if (video.webkitEnterFullscreen) {
    video.webkitEnterFullscreen();
  }

  // Play must be called synchronously
  video.play().catch(error => {
    console.error('Play failed:', error);
  });
});
```

### 4. iOS Chrome Fullscreen Event Handling

Since iOS Chrome may not support `webkitbeginfullscreen` events:

```javascript
// Use a combination of event listeners
const setupIOSChromeFullscreenHandlers = video => {
  let isInFullscreen = false;

  // Poll for fullscreen state changes
  const checkFullscreenState = () => {
    const currentFullscreen = checkIOSFullscreen(video);

    if (currentFullscreen !== isInFullscreen) {
      isInFullscreen = currentFullscreen;

      if (isInFullscreen) {
        console.log('Entered fullscreen (iOS Chrome)');
        // Handle fullscreen enter
      } else {
        console.log('Exited fullscreen (iOS Chrome)');
        // Handle fullscreen exit
      }
    }
  };

  // Check periodically during playback
  video.addEventListener('timeupdate', checkFullscreenState);

  // Also listen for standard fullscreen events
  document.addEventListener('fullscreenchange', checkFullscreenState);
  document.addEventListener('webkitfullscreenchange', checkFullscreenState);
};
```

### 5. Why Custom Play Button Might Not Work on iOS Safari

1. **User Gesture Chain Breaking**: If your click handler uses async operations before calling play()
2. **Event Dispatching**: Custom events don't carry user gesture privileges
3. **Security Restrictions**: iOS prevents programmatic video control without direct user interaction

### 6. Recommended Implementation Changes

1. **Remove Custom Event Dispatching**: Instead of dispatching 'requestFullscreen', call video methods directly
2. **Browser-Specific Handling**: Detect iOS Chrome vs Safari and use appropriate APIs
3. **Synchronous Operations**: Keep all video control operations synchronous in event handlers
4. **Fullscreen State Polling**: For iOS Chrome, poll fullscreen state during timeupdate
5. **Direct Method Calls**: Call video.play() and fullscreen methods directly in click handlers

### 7. Testing Approach

1. Test on real iOS devices (simulators may behave differently)
2. Test both iOS Safari and iOS Chrome
3. Check console for any security errors
4. Verify fullscreen state detection is working correctly
5. Test with iOS 15+ (newer versions have different behaviors)

## Next Steps

1. Update the VideoPlayer component to detect iOS Chrome separately
2. Implement fullscreen state polling for iOS Chrome
3. Remove custom event dispatching in favor of direct method calls
4. Add browser-specific fullscreen request methods
5. Test thoroughly on both iOS browsers
