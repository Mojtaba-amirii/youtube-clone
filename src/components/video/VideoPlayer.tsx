"use client";

import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  MouseEvent,
  useRef,
  useState,
} from "react";
import {
  MdPause,
  MdPlayArrow,
  MdFullscreen,
  MdFullscreenExit,
  MdVolumeOff,
  MdVolumeUp,
  MdVolumeDown,
} from "react-icons/md";

interface VideoPlayerProps {
  videoSrc: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ videoSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentDuration, setCurrentDuration] = useState("00:00");
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handlePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying((isPlaying) => !isPlaying);
    }
  }, [isPlaying, setIsPlaying]);

  const handleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted((mute) => !mute);
    }
  }, []);

  const handleChangeVolume = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (videoRef.current) {
        const newVolume = Number(e.target.value);
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
        if (newVolume === 0 || (newVolume !== 0 && videoRef.current.muted)) {
          handleMute();
        } else {
          setMuted((mute) => !mute);
        }
      }
    },
    [handleMute]
  );

  const handleFullScreen = useCallback(() => {
    if (document.fullscreenElement !== null) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else {
      if (videoRef.current) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        }
      }
    }
    setIsFullScreen((isFullScreen) => !isFullScreen);
  }, [setIsFullScreen]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (document.activeElement?.tagName.toLocaleLowerCase() === "input")
        return;

      const { key } = event;

      switch (key.toLocaleLowerCase()) {
        case " ":
          handlePlay();
          break;
        case "f":
          handleFullScreen();
          break;
        case "v":
          handleMute();
          break;
        default:
          return;
      }
    },
    [handlePlay, handleFullScreen, handleMute]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const timestampFormatter = useMemo(() => {
    return new Intl.NumberFormat(undefined, {
      minimumIntegerDigits: 2,
    });
  }, []);

  const formatTimestamp = useCallback(
    (timestamp: number) => {
      const hours = Math.floor(timestamp / 3600);
      const minutes = Math.floor((timestamp % 3600) / 60);
      const seconds = Math.floor(timestamp % 60);

      if (hours === 0) {
        return `${minutes}:${timestampFormatter.format(seconds)}`;
      } else {
        return `${hours}:${timestampFormatter.format(
          minutes
        )}:${timestampFormatter.format(seconds)}`;
      }
    },
    [timestampFormatter]
  );

  const totalDuration = useMemo(
    () => formatTimestamp(videoRef.current?.duration || 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const updateTimestamp = () => {
    setCurrentDuration(formatTimestamp(videoRef.current?.currentTime || 0));
    setPercentCompleted(
      Math.round(
        (1000 * (videoRef.current?.currentTime || 0)) /
          (videoRef.current?.duration || 1)
      ) / 1000
    );
  };

  const handleTimeUpdate = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!timelineRef.current) return;
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const clickPosition = e.clientX;
      const timeWidth = clickPosition - timelineRect.left;
      const timelineWidth = timelineRect.right - timelineRect.left;
      const newTime = timeWidth / timelineWidth;
      if (videoRef.current) {
        videoRef.current.currentTime = newTime * videoRef.current.duration;
      }
    },
    [timelineRef, videoRef]
  );

  return (
    <div className=" relative w-full max-w-[1000px] flex justify-center m-auto group bg-black">
      <div
        className={` absolute bottom-0 left-0 right-0 text-white bg-gradient-to-t from-black/40 z-10 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer `}
      >
        <div className="flex items-center cursor-pointer mx-2 h-2 group/timeline">
          <div
            onClick={handleTimeUpdate}
            ref={timelineRef}
            className={` w-full relative bg-gray-500 opacity-50 hover:opacity-100 h-1 group-hover/timeline:h-full`}
          >
            <span
              style={{ right: `${100 - percentCompleted * 100}%` }}
              className=" absolute top-0 left-0 bottom-0 bg-red-600"
            ></span>
            <div
              style={{ left: `${percentCompleted * 100}%` }}
              className=" scale-0 group-hover/timeline:scale-100 absolute h-[200%] aspect-square bg-red-600 rounded-full translate-x-[-50%] top-[-50%] opacity-100 "
            ></div>
          </div>
        </div>

        <div className=" flex justify-between items-center text-3xl">
          <div className=" flex items-center gap-2 p-3">
            <button
              type="button"
              title="play-pause"
              onClick={handlePlay}
              className=" opacity-70 transition-opacity hover:opacity-100"
            >
              {isPlaying ? <MdPause /> : <MdPlayArrow />}
            </button>
            <div className=" flex items-center gap-1 group/volume">
              <button
                type="button"
                title="volume"
                onClick={handleMute}
                className=" opacity-70 transition-opacity hover:opacity-100"
              >
                {videoRef.current?.muted ? (
                  <MdVolumeOff />
                ) : videoRef.current && videoRef.current?.volume > 0.5 ? (
                  <MdVolumeUp />
                ) : (
                  <MdVolumeDown />
                )}
              </button>
              <input
                type="range"
                title="volume control"
                min={0}
                max={1}
                step="any"
                value={volume}
                onChange={handleChangeVolume}
                className=" w-0 scale-0 group-hover/volume:w-20 group-hover/volume:scale-100 transition-all duration-200 origin-left accent-white"
              />
            </div>
            <div className=" text-sm">
              {currentDuration} / {totalDuration}
            </div>
          </div>
          <div className=" flex items-center gap-2 p-3">
            <button
              type="button"
              title="fullscreen-mode"
              onClick={handleFullScreen}
              className=" opacity-70 transition-opacity hover:opacity-100"
            >
              {isFullScreen ? <MdFullscreenExit /> : <MdFullscreen />}
            </button>
          </div>
        </div>
      </div>
      <video
        src={videoSrc}
        ref={videoRef}
        onClick={handlePlay}
        onTimeUpdate={updateTimestamp}
        className=" w-full aspect-video z-[5]"
      ></video>
    </div>
  );
};

export default VideoPlayer;
