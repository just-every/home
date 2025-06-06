'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

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
  const [isUserInteracted, setIsUserInteracted] = useState(false);

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
      // If user has interacted (clicked play), let the video play naturally
      if (isUserInteracted) {
        return;
      }

      // Otherwise, loop at 58 seconds for ambient preview
      if (video.currentTime >= 58) {
        video.currentTime = 0;
        video.play();
      }
    };

    video.addEventListener('loadedmetadata', enableSubtitles);
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Try to enable subtitles immediately if already loaded
    enableSubtitles();

    return () => {
      video.removeEventListener('loadedmetadata', enableSubtitles);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isUserInteracted]);

  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    const video = e.currentTarget;
    const videoError = video.error;
    console.error('Video error:', {
      error: videoError
        ? `Code: ${videoError.code}, Message: ${videoError.message}`
        : 'Unknown error',
      src: video.currentSrc,
      readyState: video.readyState,
      networkState: video.networkState,
    });
    setIsVideoError(true);
  };

  // Function to play video with native controls
  const playWithNativeControls = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Mark that user has interacted
    setIsUserInteracted(true);

    // Remove loop so video plays through
    video.loop = false;

    // Unmute the video
    video.muted = false;

    // Start from beginning
    video.currentTime = 0;

    // Hide subtitles when playing with sound
    if (video.textTracks && video.textTracks.length > 0) {
      for (let i = 0; i < video.textTracks.length; i++) {
        video.textTracks[i].mode = 'hidden';
      }
    }

    // Show native controls
    video.controls = true;

    // For iOS, use native fullscreen
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);

    if (isIOS) {
      // iOS: Use webkitEnterFullscreen for native player
      const iosVideo = video as HTMLVideoElement & {
        webkitEnterFullscreen?: () => void;
      };

      if (iosVideo.webkitEnterFullscreen) {
        // Play and enter fullscreen
        video
          .play()
          .then(() => {
            iosVideo.webkitEnterFullscreen?.();
          })
          .catch(e => {
            console.error('Play failed:', e);
            // Fallback: just show controls
            video.controls = true;
          });
      } else {
        // Fallback for iOS without fullscreen API
        video.play().catch(e => console.error('Play failed:', e));
      }
    } else {
      // Desktop and Android: Request fullscreen on the video element
      video
        .play()
        .then(() => {
          if (video.requestFullscreen) {
            video.requestFullscreen().catch(e => {
              console.log('Fullscreen request failed:', e);
            });
          } else if (
            (
              video as HTMLVideoElement & {
                webkitRequestFullscreen?: () => void;
              }
            ).webkitRequestFullscreen
          ) {
            (
              video as HTMLVideoElement & {
                webkitRequestFullscreen?: () => void;
              }
            ).webkitRequestFullscreen?.();
          }
        })
        .catch(e => {
          console.error('Play failed:', e);
        });
    }

    if (onPlayFullscreen) {
      onPlayFullscreen();
    }

    // Handle when video ends or exits fullscreen
    const handleVideoEnd = () => {
      // Reset to ambient mode
      video.muted = true;
      video.loop = true;
      video.controls = false;
      video.currentTime = 0;
      setIsUserInteracted(false);

      // Re-enable subtitles
      if (video.textTracks && video.textTracks.length > 0) {
        for (let i = 0; i < video.textTracks.length; i++) {
          const track = video.textTracks[i];
          if (track.kind === 'subtitles' || track.kind === 'captions') {
            track.mode = 'showing';
          }
        }
      }

      video.play();
    };

    // Listen for video end
    video.addEventListener('ended', handleVideoEnd, { once: true });

    // iOS fullscreen exit handler
    const handleIOSFullscreenEnd = () => {
      handleVideoEnd();
      video.removeEventListener('ended', handleVideoEnd);
    };

    video.addEventListener('webkitendfullscreen', handleIOSFullscreenEnd, {
      once: true,
    });

    // Desktop fullscreen exit handler
    const handleFullscreenChange = () => {
      const isFullscreen = !!(
        document.fullscreenElement ||
        (document as Document & { webkitFullscreenElement?: Element })
          .webkitFullscreenElement
      );

      if (!isFullscreen) {
        handleVideoEnd();
        video.removeEventListener('ended', handleVideoEnd);
        document.removeEventListener(
          'fullscreenchange',
          handleFullscreenChange
        );
        document.removeEventListener(
          'webkitfullscreenchange',
          handleFullscreenChange
        );
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
  }, [onPlayFullscreen]);

  // Make play function available globally for page.tsx to call
  useEffect(() => {
    const extWindow = window as Window & { playVideoFullscreen?: () => void };
    extWindow.playVideoFullscreen = playWithNativeControls;

    return () => {
      delete extWindow.playVideoFullscreen;
    };
  }, [playWithNativeControls]);

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
          {/* Fallback to smallest file if responsive loading fails */}
          <source src={`${videoBaseUrl}/promo-854w.webm`} type="video/webm" />
          <source src={`${videoBaseUrl}/promo-854w.mp4`} type="video/mp4" />
        </>
      )}

      <track
        kind="subtitles"
        src="/video/promo.vtt"
        srcLang="en"
        label="English"
        default
      />
    </video>
  );
};
