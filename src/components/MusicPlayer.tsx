'use client';

import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import AudioPermissionPopup from './AudioPermissionPopup';

export default function MusicPlayer() {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.005);
  const [isReady, setIsReady] = useState(false);
  const [showPermissionPopup, setShowPermissionPopup] = useState(true);

  useEffect(() => {
    let ws: WaveSurfer | null = null;

    if (waveformRef.current && !wavesurfer.current) {
      ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#ff1493',
        progressColor: '#00ffff',
        cursorColor: '#ffffff',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 1,
        height: 30,
        barGap: 3,
        hideScrollbar: true,
        interact: true,
      });

      wavesurfer.current = ws;

      ws.load('/audio/sample-mix.mp3');

      ws.on('ready', () => {
        if (ws) {
          ws.setVolume(volume);
          setIsReady(true);
        }
      });

      ws.on('finish', () => {
        setIsPlaying(false);
      });
    }

    return () => {
      if (ws) {
        ws.destroy();
      }
      wavesurfer.current = null;
    };
  }, []);

  const handleAllowAudio = () => {
    setShowPermissionPopup(false);
    if (wavesurfer.current && isReady) {
      wavesurfer.current.play();
      setIsPlaying(true);
    }
  };

  const handleDenyAudio = () => {
    setShowPermissionPopup(false);
  };

  const togglePlay = () => {
    if (wavesurfer.current && isReady) {
      wavesurfer.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (wavesurfer.current && isReady) {
      if (isMuted) {
        wavesurfer.current.setVolume(volume);
      } else {
        wavesurfer.current.setVolume(0);
      }
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (wavesurfer.current && isReady) {
      wavesurfer.current.setVolume(newVolume);
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-t border-white/10 p-2">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <button
            onClick={togglePlay}
            disabled={!isReady}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
          </button>

          <div className="flex-1">
            <div ref={waveformRef} />
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleMute}
              disabled={!isReady}
              className="text-white hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              disabled={!isReady}
              className="w-16 accent-primary disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPermissionPopup && (
          <AudioPermissionPopup
            onAllow={handleAllowAudio}
            onDeny={handleDenyAudio}
          />
        )}
      </AnimatePresence>
    </>
  );
} 