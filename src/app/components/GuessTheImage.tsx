// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';

// const images = ['airport.png', 'library.png', 'toystore.png', 'pool.png', 'park.png'];

// export default function GuessTheImage() {
//   const [index, setIndex] = useState(0);
//   const [isClear, setIsClear] = useState(false);

//   const handlePreview = () => {
//     setIsClear(true);
//     setTimeout(() => {
//       setIsClear(false);
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 3000); // Show clear image for 3 seconds before switching
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4 relative overflow-hidden">
//       {/* Background Animation */}
//       <motion.div 
//         className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-pink-400 opacity-30 animate-pulse"
//       />

//       {/* Title */}
//       <h1 className="text-3xl font-bold mb-4 text-gray-800 z-10">Guess the Image</h1>

//       <motion.div 
//         className="relative w-80 h-80 md:w-96 md:h-96 z-10"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         <Image 
//           src={`/${images[index]}`} 
//           alt="Guess the image" 
//           layout="fill" 
//           objectFit="cover" 
//           className={`rounded-lg shadow-lg transition-all duration-1000 ${isClear ? 'blur-0' : 'blur-sm'}`} 
//         />
//       </motion.div>

//       <Button 
//         className="mt-6 px-6 py-3 text-lg font-bold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition-all z-10"
//         onClick={handlePreview}
//       >
//         Preview
//       </Button>
//     </div>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

const images = ['airport.png', 'library.png', 'toystore.png', 'pool.png', 'park.png'];
const choices = [['airport', 'library', 'toystore'], ['library', 'park', 'pool'], ['toystore', 'pool', 'airport'], ['pool', 'library', 'park'], ['park', 'toystore', 'airport']];

export default function GuessTheImage() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [isClear, setIsClear] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/music.mp3');
  }, []);

  const handleStartGame = () => {
    if (!gameStarted) {
      setGameStarted(true);
      if (audioRef.current) {
        audioRef.current.loop = true;
        audioRef.current.play().catch((err) => console.log('Audio play failed:', err));
      }
    }
  };

  const handleChoice = (choice: string) => {
    handleStartGame(); // Start music on first click
    let newLives = lives;
    let newScore = score;

    if (choice === images[index].split('.')[0]) {
      newScore += 10;
      setMessage('🎉 Correct!');
      setIsClear(true);
    } else {
      newLives -= 1;
      setMessage('❌ Wrong!');
    }

    setScore(newScore);
    setLives(newLives);
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      setIsClear(false);
      if (newLives <= 0) {
        setMessage(`Game Over! Your Score: ${newScore}`);
        setTimeout(() => {
          setScore(0);
          setLives(3);
          setIndex(0);
          setShowModal(false);
        }, 3000);
      } else {
        setIndex((prev) => (prev + 1) % images.length);
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4 relative overflow-hidden">
      {/* Background Animation */}
      <motion.div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-pink-400 opacity-30 animate-pulse" />
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-gray-800 z-10">Guess the Image</h1>
      
      {/* Score and Lives */}
      <div className="flex justify-between w-full max-w-md mb-4 text-lg font-semibold">
        <span>Score: {score}</span>
        <span>Lives: ❤️ {lives}</span>
      </div>
      
      {/* Image */}
      <motion.div 
        className="relative w-full max-w-lg h-96 md:h-[400px] lg:h-[500px] z-10"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        <Image 
          src={`/${images[index]}`} 
          alt="Guess the image" 
          layout="fill" 
          objectFit="cover" 
          className={`rounded-lg shadow-lg transition-all duration-1000 ${isClear ? 'blur-0' : 'blur-md'}`} 
        />
      </motion.div>
      
      {/* Answer Choices */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-md z-50 relative">
        {choices[index].map((choice) => (
          <Button 
            key={choice} 
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition-all"
            onClick={() => handleChoice(choice)}
          >
            {choice}
          </Button>
        ))}
      </div>

      {/* Modal Message */}
      <Dialog open={showModal}>
        <DialogContent>
          <DialogTitle>{message}</DialogTitle>
        </DialogContent>
      </Dialog>
    </div>
  );
}
