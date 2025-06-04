'use client';

import { useRef, useEffect, useState } from 'react';

interface VideoPlayerProps {
  className?: string;
  onPlayFullscreen?: () => void;
  style?: React.CSSProperties;
}

export const VideoPlayer = ({
  className = '',
  onPlayFullscreen,
  style,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoError, setIsVideoError] = useState(false);
  const [hasPlayedFullscreen, setHasPlayedFullscreen] = useState(false);

  // Get R2 URL from environment or fallback to local
  const videoBaseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL
    ? `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/video`
    : '/video';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force subtitles to show even when muted
    const enableSubtitles = () => {
      if (video.textTracks && video.textTracks.length > 0) {
        for (let i = 0; i < video.textTracks.length; i++) {
          const track = video.textTracks[i];
          if (track.kind === 'subtitles' || track.kind === 'captions') {
            track.mode = 'showing';
          }
        }
      }
    };

    const handleTimeUpdate = () => {
      // If play button has been pressed, let the video loop naturally
      if (hasPlayedFullscreen) {
        return;
      }

      // Otherwise, loop at 58 seconds if not in fullscreen
      // Check for iOS video fullscreen first (most specific)
      const videoElement = video as HTMLVideoElement & {
        webkitDisplayingFullscreen?: boolean;
        webkitPresentationMode?: string;
      };

      // iOS-specific fullscreen check
      const isIOSFullscreen =
        videoElement.webkitDisplayingFullscreen === true ||
        videoElement.webkitPresentationMode === 'fullscreen';

      // Standard fullscreen check for desktop
      const isDocumentFullscreen =
        document.fullscreenElement ||
        (document as Document & { webkitFullscreenElement?: Element })
          .webkitFullscreenElement ||
        (document as Document & { msFullscreenElement?: Element })
          .msFullscreenElement;

      const isFullscreen = isIOSFullscreen || isDocumentFullscreen;

      // Debug logging for mobile testing
      if (video.currentTime > 57 && video.currentTime < 59) {
        console.log('Video fullscreen check at 58s:', {
          currentTime: video.currentTime,
          hasPlayedFullscreen,
          isIOSFullscreen,
          isDocumentFullscreen,
          isFullscreen,
          webkitDisplayingFullscreen: videoElement.webkitDisplayingFullscreen,
          webkitPresentationMode: videoElement.webkitPresentationMode,
        });
      }

      if (!isFullscreen && video.currentTime >= 58) {
        console.log('Looping video back to start');
        video.currentTime = 0;
        video.play();
      }
    };

    // iOS-specific fullscreen event handlers
    const handleIOSFullscreenBegin = () => {
      console.log('iOS fullscreen began');
      // Mark that fullscreen play has been triggered on iOS
      setHasPlayedFullscreen(true);
      // Ensure video can play through completely in fullscreen
      video.loop = false;
    };

    const handleIOSFullscreenEnd = () => {
      console.log('iOS fullscreen ended');
      // Video exited fullscreen on iOS
      video.muted = true;
      video.loop = true;
      video.controls = false;

      // Re-enable subtitles
      if (video.textTracks && video.textTracks.length > 0) {
        for (let i = 0; i < video.textTracks.length; i++) {
          const track = video.textTracks[i];
          if (track.kind === 'subtitles' || track.kind === 'captions') {
            track.mode = 'showing';
          }
        }
      }
    };

    video.addEventListener('loadedmetadata', enableSubtitles);
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Add iOS-specific fullscreen event listeners
    video.addEventListener('webkitbeginfullscreen', handleIOSFullscreenBegin);
    video.addEventListener('webkitendfullscreen', handleIOSFullscreenEnd);

    // For iOS Chrome, also use polling as a backup
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
    const isIOSChrome = isIOS && /CriOS/.test(navigator.userAgent);

    let fullscreenPollInterval: NodeJS.Timeout | null = null;
    if (isIOSChrome) {
      let wasFullscreen = false;
      fullscreenPollInterval = setInterval(() => {
        const videoElement = video as HTMLVideoElement & {
          webkitDisplayingFullscreen?: boolean;
          webkitPresentationMode?: string;
        };

        const isFullscreen =
          videoElement.webkitDisplayingFullscreen === true ||
          videoElement.webkitPresentationMode === 'fullscreen';

        if (isFullscreen && !wasFullscreen) {
          console.log('iOS Chrome entered fullscreen (detected by polling)');
          setHasPlayedFullscreen(true);
          video.loop = false;
        } else if (!isFullscreen && wasFullscreen) {
          console.log('iOS Chrome exited fullscreen (detected by polling)');
          video.muted = true;
          video.loop = true;
          video.controls = false;
          // Re-enable subtitles
          if (video.textTracks && video.textTracks.length > 0) {
            for (let i = 0; i < video.textTracks.length; i++) {
              const track = video.textTracks[i];
              if (track.kind === 'subtitles' || track.kind === 'captions') {
                track.mode = 'showing';
              }
            }
          }
        }

        wasFullscreen = isFullscreen;
      }, 500); // Check every 500ms
    }

    // Try to enable subtitles immediately if already loaded
    enableSubtitles();

    return () => {
      video.removeEventListener('loadedmetadata', enableSubtitles);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener(
        'webkitbeginfullscreen',
        handleIOSFullscreenBegin
      );
      video.removeEventListener('webkitendfullscreen', handleIOSFullscreenEnd);

      if (fullscreenPollInterval) {
        clearInterval(fullscreenPollInterval);
      }
    };
  }, [hasPlayedFullscreen]);

  const handleVideoError = () => {
    setIsVideoError(true);
    console.error('Video failed to load. Using fallback.');
  };

  // Make play function available globally for direct calls
  useEffect(() => {
    const playFullscreen = () => {
      const video = videoRef.current;
      if (!video) return;

      video.loop = false;
      video.muted = false;
      video.currentTime = 0;

      // Hide subtitles in fullscreen with sound
      if (video.textTracks && video.textTracks.length > 0) {
        for (let i = 0; i < video.textTracks.length; i++) {
          video.textTracks[i].mode = 'hidden';
        }
      }

      video.style.objectFit = 'contain';
      video.style.width = '100%';
      video.style.height = '100%';
      video.controls = true;

      // Better iOS detection
      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
      const isIOSChrome = isIOS && /CriOS/.test(navigator.userAgent);
      const isIOSSafari =
        isIOS &&
        /Safari/.test(navigator.userAgent) &&
        !/CriOS/.test(navigator.userAgent);

      // Mark that fullscreen play has been triggered
      setHasPlayedFullscreen(true);

      if (isIOSSafari || isIOSChrome) {
        // iOS-specific handling
        const iosVideo = video as HTMLVideoElement & {
          webkitEnterFullscreen?: () => void;
        };
        if (iosVideo.webkitEnterFullscreen) {
          // Enter fullscreen and play
          iosVideo.webkitEnterFullscreen();
          // Play after a small delay for iOS
          setTimeout(() => {
            video.play().catch(e => console.error('Play failed:', e));
          }, 100);
        } else {
          // Fallback: just play with controls
          video.play().catch(e => console.error('Play failed:', e));
        }
      } else {
        // Desktop and other mobile browsers
        if (video.requestFullscreen) {
          video.requestFullscreen().then(() => {
            video.play();
          });
        } else if (
          (
            video as HTMLVideoElement & {
              webkitRequestFullscreen?: () => Promise<void>;
            }
          ).webkitRequestFullscreen
        ) {
          (
            video as HTMLVideoElement & {
              webkitRequestFullscreen: () => Promise<void>;
            }
          ).webkitRequestFullscreen();
          video.play();
        } else if (
          (video as HTMLVideoElement & { msRequestFullscreen?: () => void })
            .msRequestFullscreen
        ) {
          (
            video as HTMLVideoElement & { msRequestFullscreen: () => void }
          ).msRequestFullscreen();
          video.play();
        } else {
          video.play();
        }
      }

      if (onPlayFullscreen) {
        onPlayFullscreen();
      }

      // Handle fullscreen exit
      const handleFullscreenChange = () => {
        const isFullscreen = !!(
          document.fullscreenElement ||
          (document as Document & { webkitFullscreenElement?: Element })
            .webkitFullscreenElement ||
          (document as Document & { msFullscreenElement?: Element })
            .msFullscreenElement ||
          (video as HTMLVideoElement & { webkitDisplayingFullscreen?: boolean })
            .webkitDisplayingFullscreen
        );

        if (!isFullscreen) {
          video.muted = true;
          video.loop = true;
          video.controls = false;
          video.style.objectFit = 'cover';

          // Re-enable subtitles
          if (video.textTracks && video.textTracks.length > 0) {
            for (let i = 0; i < video.textTracks.length; i++) {
              const track = video.textTracks[i];
              if (track.kind === 'subtitles' || track.kind === 'captions') {
                track.mode = 'showing';
              }
            }
          }
        }
      };

      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.addEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange
      );

      // Cleanup after a delay
      setTimeout(() => {
        document.removeEventListener(
          'fullscreenchange',
          handleFullscreenChange
        );
        document.removeEventListener(
          'webkitfullscreenchange',
          handleFullscreenChange
        );
      }, 5000);
    };

    // Make function available globally
    const extWindow = window as Window & { playVideoFullscreen?: () => void };
    extWindow.playVideoFullscreen = playFullscreen;

    return () => {
      delete extWindow.playVideoFullscreen;
    };
  }, [onPlayFullscreen]);

  // Use full quality for both local development and R2 hosting
  const useFullQuality = true;

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      loop
      crossOrigin="anonymous"
      className={className}
      style={style}
      poster="/video/poster.jpg"
      preload="metadata"
      onError={handleVideoError}
    >
      {useFullQuality && !isVideoError ? (
        <>
          {/* WebM sources for R2 hosting */}
          <source
            src={`${videoBaseUrl}/promo-3840w.webm`}
            type="video/webm"
            media="(min-width: 1440px) and (min-resolution: 2dppx), (min-width: 2560px)"
          />
          <source
            src={`${videoBaseUrl}/promo-2560w.webm`}
            type="video/webm"
            media="(min-width: 1280px) and (min-resolution: 2dppx) and (max-width: 1439px), (min-width: 1920px) and (max-width: 2559px)"
          />
          <source
            src={`${videoBaseUrl}/promo-1920w.webm`}
            type="video/webm"
            media="(min-width: 1280px) and (max-resolution: 1.99dppx) and (max-width: 1919px)"
          />
          <source
            src={`${videoBaseUrl}/promo-1920w.webm`}
            type="video/webm"
            media="(min-width: 768px) and (min-resolution: 2dppx) and (max-width: 1279px)"
          />
          <source
            src={`${videoBaseUrl}/promo-1280w.webm`}
            type="video/webm"
            media="(min-width: 768px) and (max-resolution: 1.99dppx) and (max-width: 1279px)"
          />
          <source
            src={`${videoBaseUrl}/promo-1280w.webm`}
            type="video/webm"
            media="(max-width: 767px) and (min-resolution: 2dppx)"
          />
          <source
            src={`${videoBaseUrl}/promo-854w.webm`}
            type="video/webm"
            media="(max-width: 767px) and (max-resolution: 1.99dppx)"
          />

          {/* MP4 sources as fallback */}
          <source
            src={`${videoBaseUrl}/promo-3840w.mp4`}
            type="video/mp4"
            media="(min-width: 1440px) and (min-resolution: 2dppx), (min-width: 2560px)"
          />
          <source
            src={`${videoBaseUrl}/promo-2560w.mp4`}
            type="video/mp4"
            media="(min-width: 1280px) and (min-resolution: 2dppx) and (max-width: 1439px), (min-width: 1920px) and (max-width: 2559px)"
          />
          <source
            src={`${videoBaseUrl}/promo-1920w.mp4`}
            type="video/mp4"
            media="(min-width: 1280px) and (max-resolution: 1.99dppx) and (max-width: 1919px)"
          />
          <source
            src={`${videoBaseUrl}/promo-1920w.mp4`}
            type="video/mp4"
            media="(min-width: 768px) and (min-resolution: 2dppx) and (max-width: 1279px)"
          />
          <source
            src={`${videoBaseUrl}/promo-1280w.mp4`}
            type="video/mp4"
            media="(min-width: 768px) and (max-resolution: 1.99dppx) and (max-width: 1279px)"
          />
          <source
            src={`${videoBaseUrl}/promo-1280w.mp4`}
            type="video/mp4"
            media="(max-width: 767px) and (min-resolution: 2dppx)"
          />
          <source
            src={`${videoBaseUrl}/promo-854w.mp4`}
            type="video/mp4"
            media="(max-width: 767px) and (max-resolution: 1.99dppx)"
          />
        </>
      ) : (
        <>
          {/* Fallback to local 480p only for Cloudflare Workers */}
          <source src="/video/promo-854w.webm" type="video/webm" />
          <source src="/video/promo-854w.mp4" type="video/mp4" />
        </>
      )}

      <track
        label="English"
        kind="subtitles"
        srcLang="en"
        src={`${videoBaseUrl}/promo.vtt`}
        default
      />
    </video>
  );
};

export const getVideoRef = () => {
  return document.querySelector('.hero-video') as HTMLVideoElement | null;
};

// Direct play function for fallback
export const playVideoDirectly = () => {
  const video = getVideoRef();
  if (!video) {
    console.error('Video element not found');
    return;
  }

  console.log('Playing video directly...');
  video.muted = false;
  video.loop = false;
  video.currentTime = 0;

  // Try iOS fullscreen
  const iosVideo = video as HTMLVideoElement & {
    webkitEnterFullscreen?: () => void;
  };

  if (iosVideo.webkitEnterFullscreen) {
    iosVideo.webkitEnterFullscreen();
  }

  video.play().catch(e => console.error('Direct play failed:', e));
};

export default VideoPlayer;
