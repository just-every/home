'use client';

import { useRef, useEffect, useState } from 'react';

interface VideoPlayerProps {
  className?: string;
  onPlayFullscreen?: () => void;
}

export const VideoPlayer = ({
  className = '',
  onPlayFullscreen,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoError, setIsVideoError] = useState(false);

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
      // Only loop at 58 seconds if not in fullscreen
      const isFullscreen =
        document.fullscreenElement ||
        (document as Document & { webkitFullscreenElement?: Element })
          .webkitFullscreenElement ||
        (document as Document & { msFullscreenElement?: Element })
          .msFullscreenElement;

      if (!isFullscreen && video.currentTime >= 58) {
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
  }, []);

  const handleVideoError = () => {
    setIsVideoError(true);
    console.error('Video failed to load. Using fallback.');
  };

  // Listen for custom fullscreen request event
  useEffect(() => {
    const handleFullscreenRequest = () => {
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

      // Check if it's a mobile device
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);

      if (isMobile) {
        // On mobile, request fullscreen immediately and play
        if (video.requestFullscreen) {
          video.requestFullscreen().then(() => {
            video.play();
          });
        } else if (
          (video as HTMLVideoElement & { webkitRequestFullscreen?: () => void })
            .webkitRequestFullscreen
        ) {
          const webkitVideo = video as HTMLVideoElement & {
            webkitRequestFullscreen: () => void;
          };
          webkitVideo.webkitRequestFullscreen();
          video.play();
        } else if (
          (video as HTMLVideoElement & { webkitEnterFullscreen?: () => void })
            .webkitEnterFullscreen
        ) {
          // iOS Safari fullscreen
          const iosVideo = video as HTMLVideoElement & {
            webkitEnterFullscreen: () => void;
          };
          iosVideo.webkitEnterFullscreen();
          video.play();
        } else {
          video.play();
        }
      } else {
        // On desktop, request fullscreen then play
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (
          (video as HTMLVideoElement & { webkitRequestFullscreen?: () => void })
            .webkitRequestFullscreen
        ) {
          const webkitVideo = video as HTMLVideoElement & {
            webkitRequestFullscreen: () => void;
          };
          webkitVideo.webkitRequestFullscreen();
        } else if (
          (video as HTMLVideoElement & { msRequestFullscreen?: () => void })
            .msRequestFullscreen
        ) {
          const msVideo = video as HTMLVideoElement & {
            msRequestFullscreen: () => void;
          };
          msVideo.msRequestFullscreen();
        }
        video.play();
      }

      if (onPlayFullscreen) {
        onPlayFullscreen();
      }

      // Handle fullscreen exit
      const handleFullscreenChange = () => {
        if (!document.fullscreenElement) {
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

      document.addEventListener('fullscreenchange', handleFullscreenChange, {
        once: true,
      });
      document.addEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange,
        { once: true }
      );
    };

    window.addEventListener('requestFullscreen', handleFullscreenRequest);

    return () => {
      window.removeEventListener('requestFullscreen', handleFullscreenRequest);
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
      crossOrigin="anonymous"
      className={className}
      poster="/video/poster.jpg"
      preload="metadata"
      onError={handleVideoError}
    >
      {useFullQuality && !isVideoError ? (
        <>
          {/* WebM sources for R2 hosting */}
          <source
            src={`${videoBaseUrl}/promo-4k.webm`}
            type="video/webm"
            media="(min-width: 1440px) and (min-resolution: 2dppx), (min-width: 2560px)"
          />
          <source
            src={`${videoBaseUrl}/promo-2k.webm`}
            type="video/webm"
            media="(min-width: 1280px) and (min-resolution: 2dppx) and (max-width: 1439px), (min-width: 1920px) and (max-width: 2559px)"
          />
          <source
            src={`${videoBaseUrl}/promo-1080.webm`}
            type="video/webm"
            media="(min-width: 1280px) and (max-resolution: 1.99dppx) and (max-width: 1919px)"
          />
          <source
            src={`${videoBaseUrl}/promo-1080.webm`}
            type="video/webm"
            media="(min-width: 768px) and (min-resolution: 2dppx) and (max-width: 1279px)"
          />
          <source
            src={`${videoBaseUrl}/promo-720.webm`}
            type="video/webm"
            media="(min-width: 768px) and (max-resolution: 1.99dppx) and (max-width: 1279px)"
          />
          <source
            src={`${videoBaseUrl}/promo-720.webm`}
            type="video/webm"
            media="(max-width: 767px) and (min-resolution: 2dppx)"
          />
          <source
            src={`${videoBaseUrl}/promo-480.webm`}
            type="video/webm"
            media="(max-width: 767px) and (max-resolution: 1.99dppx)"
          />

          {/* MP4 sources as fallback */}
          <source
            src={`${videoBaseUrl}/promo-4k.mp4`}
            type="video/mp4"
            media="(min-width: 1440px) and (min-resolution: 2dppx), (min-width: 2560px)"
          />
          <source
            src={`${videoBaseUrl}/promo-2k.mp4`}
            type="video/mp4"
            media="(min-width: 1280px) and (min-resolution: 2dppx) and (max-width: 1439px), (min-width: 1920px) and (max-width: 2559px)"
          />
          <source
            src={`${videoBaseUrl}/promo-1080.mp4`}
            type="video/mp4"
            media="(min-width: 1280px) and (max-resolution: 1.99dppx) and (max-width: 1919px)"
          />
          <source
            src={`${videoBaseUrl}/promo-1080.mp4`}
            type="video/mp4"
            media="(min-width: 768px) and (min-resolution: 2dppx) and (max-width: 1279px)"
          />
          <source
            src={`${videoBaseUrl}/promo-720.mp4`}
            type="video/mp4"
            media="(min-width: 768px) and (max-resolution: 1.99dppx) and (max-width: 1279px)"
          />
          <source
            src={`${videoBaseUrl}/promo-720.mp4`}
            type="video/mp4"
            media="(max-width: 767px) and (min-resolution: 2dppx)"
          />
          <source
            src={`${videoBaseUrl}/promo-480.mp4`}
            type="video/mp4"
            media="(max-width: 767px) and (max-resolution: 1.99dppx)"
          />
        </>
      ) : (
        <>
          {/* Fallback to local 480p only for Cloudflare Workers */}
          <source src="/video/promo-480.webm" type="video/webm" />
          <source src="/video/promo-480.mp4" type="video/mp4" />
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

export default VideoPlayer;
