import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import uaenaLogo from './assets/uaena logo.png';
import confetti from 'canvas-confetti';
import { LogoSnowfall } from './LogoSnowfall';

export const App = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [showVideo, setShowVideo] = useState(false);
  const [currentKST, setCurrentKST] = useState(DateTime.now().setZone('Asia/Seoul').toFormat('yyyy-MM-dd HH:mm:ss'));

  const targetTimeKST = DateTime.fromISO('2025-05-27T18:00:00', {
    zone: 'Asia/Seoul',
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = DateTime.now().setZone('Asia/Seoul');
      const diff = targetTimeKST.diff(now, ['days', 'hours', 'minutes', 'seconds']);

      if (diff.toMillis() <= 0) {
        setShowVideo(true);
        setTimeLeft("🎉 It's time! 🎉");
        clearInterval(intervalId);
      } else {
        const { hours, minutes, seconds } = diff.toObject();
        setTimeLeft(` ${hours ?? 0}h ${minutes ?? 0}m ${Math.floor(seconds ?? 0)}s`);
      }
    };

    updateCountdown(); // run immediately
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [targetTimeKST]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKST(DateTime.now().setZone('Asia/Seoul').toFormat('yyyy-MM-dd HH:mm:ss'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Helper to fire confetti with logo
  const fireLogoConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 360,
      origin: { y: 0.6 },
      shapes: ['image'],
      image: {
        src: uaenaLogo,
        width: 40,
        height: 40,
      },
      scalar: 1.2,
      startVelocity: 40,
      gravity: 0.8,
      ticks: 200,
      zIndex: 9999,
    } as never);
  };

  // Fire confetti infinitely when showVideo becomes true
  useEffect(() => {
    let confettiInterval: number | null = null;
    if (showVideo) {
      fireLogoConfetti();
      confettiInterval = setInterval(fireLogoConfetti, 1200); // fire every 1.2s
    }
    return () => {
      if (confettiInterval) clearInterval(confettiInterval);
    };
  }, [showVideo]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#d7c6fc] text-black text-center p-6'>
      <h1 className='text-3xl font-bold mb-4'>Countdown for IU Flower Bookmark 3: 6PM KST - 27 May 2025</h1>
      <div className='text-lg mb-2'>
        Current KST time: <span className='font-mono'>{currentKST}</span>
      </div>
      <div className='text-2xl mb-6'>{timeLeft} left before hapiness</div>

      {showVideo && (
        <div className='mt-8 animate-fade-in'>
          <h2 className='text-xl mb-4'>🎬 Stream IU's New Album:</h2>
          <div className='flex flex-col space-y-2'>
            <a
              href='https://www.youtube.com/@dlwlrma/videos'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 hover:underline'
            >
              YouTube
            </a>
            <a
              href='https://open.spotify.com/artist/3HqSLMAZ3g3d5poNaI7GOU'
              target='_blank'
              rel='noopener noreferrer'
              className='text-green-500 hover:underline'
            >
              Spotify
            </a>
            <a
              href='https://music.youtube.com/channel/UCTUR0sVEkD8T5MlSHqgaI_Q'
              target='_blank'
              rel='noopener noreferrer'
              className='text-red-500 hover:underline'
            >
              YouTube Music
            </a>
            <a
              href='https://music.apple.com/ee/artist/iu/409076743'
              target='_blank'
              rel='noopener noreferrer'
              className='text-purple-500 hover:underline'
            >
              Apple Music
            </a>
          </div>
        </div>
      )}

      {showVideo && <LogoSnowfall />}
    </div>
  );
};
