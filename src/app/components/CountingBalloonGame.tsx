
// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { Howl } from "howler";
// import { Dialog } from "@headlessui/react";
// import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

// const levels = {
//   easy: 10,
//   medium: 15,
//   hard: 20,
// };

// const CountingBalloonGame = () => {
//   const [level, setLevel] = useState<number | null>(null);
//   const [balloonCount, setBalloonCount] = useState(0);
//   const [options, setOptions] = useState<number[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     const sound = new Howl({ src: ["/music.mp3"], loop: true, volume: 0.5 });
//     sound.play();
  
//     return () => {
//       sound.stop(); // Stops the sound when the component unmounts
//     };
//   }, []);

//   const startGame = (selectedLevel: keyof typeof levels) => {
//     const maxCount = levels[selectedLevel];
//     setLevel(maxCount);
//     generateRound(maxCount);
//   };

//   const generateRound = (maxCount: number) => {
//     const randomCount = Math.floor(Math.random() * maxCount) + 1;
//     setBalloonCount(randomCount);
//     generateOptions(randomCount, maxCount);
//   };

//   const generateOptions = (correctAnswer: number, maxCount: number) => {
//     let choices = new Set<number>();
//     choices.add(correctAnswer);
//     while (choices.size < 3) {
//       choices.add(Math.floor(Math.random() * maxCount) + 1);
//     }
//     setOptions([...choices].sort(() => Math.random() - 0.5));
//   };

//   const handleAnswer = (answer: number) => {
//     if (answer === balloonCount) {
//       setIsCorrect(true);
//       setScore((prev) => prev + 1);
//       setTimeout(() => generateRound(level || 10), 1500);
//     } else {
//       setIsCorrect(false);
//     }
//     setShowModal(true);
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-gradient-to-r from-blue-400 via-pink-400 to-purple-500 animate-gradient-move">
//       <h1 className="text-4xl font-bold text-white mb-4">🎈 Balloon Counting Game 🎈</h1>
//       {level === null ? (
//         <div className="flex flex-col gap-4">
//           <h2 className="text-2xl font-bold text-white">Select Difficulty</h2>
//           {Object.keys(levels).map((lvl) => (
//             <button
//               key={lvl}
//               onClick={() => startGame(lvl as keyof typeof levels)}
//               className="px-6 py-3 bg-white rounded-lg shadow-lg text-xl font-bold text-blue-600"
//             >
//               {lvl.toUpperCase()}
//             </button>
//           ))}
//         </div>
//       ) : (
//         <>
//           <p className="text-2xl text-white font-bold">Count the balloons!</p>
//           <p className="text-lg text-yellow-300">Score: {score}</p>
//           <div className="grid grid-cols-4 gap-2 p-4">
//             {[...Array(balloonCount)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.05 }}
//                 className="flex justify-center"
//               >
//                 <Image src="/balloon.png" alt="Balloon" width={60} height={80} />
//               </motion.div>
//             ))}
//           </div>
//           <div className="flex gap-4 mt-6">
//             {options.map((option) => (
//               <button
//                 key={option}
//                 onClick={() => handleAnswer(option)}
//                 className="px-6 py-3 bg-white rounded-lg shadow-lg text-xl font-bold text-blue-600"
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </>
//       )}
//       <Dialog open={showModal} onClose={() => setShowModal(false)}>
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg text-center shadow-lg">
//             {isCorrect ? (
//               <CheckCircleIcon className="text-green-500 w-16 h-16 mx-auto" />
//             ) : (
//               <XCircleIcon className="text-red-500 w-16 h-16 mx-auto" />
//             )}
//             <p className="text-xl font-bold mt-4">
//               {isCorrect ? "Correct! Well done!" : "Oops! Try again."}
//             </p>
//             <button
//               onClick={() => setShowModal(false)}
//               className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default CountingBalloonGame;

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Howl } from "howler";
import { Dialog } from "@headlessui/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const levels = {
  easy: 10,
  medium: 15,
  hard: 20,
};

const CountingBalloonGame = () => {
  const [level, setLevel] = useState<number | null>(null);
  const [balloonCount, setBalloonCount] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    const sound = new Howl({ src: ["/music.mp3"], loop: true, volume: 0.5 });
    sound.play();
    return () => {
      sound.stop();
    };
  }, []);

  const startGame = (selectedLevel: keyof typeof levels) => {
    setLevel(levels[selectedLevel]);
    setLives(3);
    setScore(0);
    generateNewRound(levels[selectedLevel]);
  };

  const generateNewRound = (maxCount: number) => {
    const randomCount = Math.floor(Math.random() * maxCount) + 1;
    setBalloonCount(randomCount);
    generateOptions(randomCount, maxCount);
  };

  const generateOptions = (correctAnswer: number, maxCount: number) => {
    let choices = new Set<number>();
    choices.add(correctAnswer);
    while (choices.size < 3) {
      choices.add(Math.floor(Math.random() * maxCount) + 1);
    }
    setOptions([...choices].sort(() => Math.random() - 0.5));
  };

  const handleAnswer = (answer: number) => {
    if (answer === balloonCount) {
      setIsCorrect(true);
      setScore(score + 1);
      generateNewRound(level!);
    } else {
      setIsCorrect(false);
      setLives(lives - 1);
    }
    setShowModal(true);
  };

  const resetGame = () => {
    setLevel(null);
    setBalloonCount(0);
    setOptions([]);
    setLives(3);
    setScore(0);
  };

  return (
    <div className={`flex flex-col items-center justify-center w-full h-screen bg-gradient-to-br from-blue-400 to-pink-300 relative overflow-hidden ${showModal ? "blur-md" : ""}`}>
      {/* Animated Background Clouds */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-clouds bg-cover bg-center"
        animate={{ x: [0, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {!level ? (
        <div className="flex flex-col gap-4 z-10">
          <h1 className="text-3xl font-bold text-white">Select Difficulty</h1>
          {Object.keys(levels).map((lvl) => (
            <button
              key={lvl}
              onClick={() => startGame(lvl as keyof typeof levels)}
              className="px-6 py-3 bg-white rounded-lg shadow-lg text-xl font-bold text-blue-600"
            >
              {lvl.toUpperCase()}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center z-10">
          <h2 className="text-2xl font-bold text-white mb-2">How many balloons?</h2>
          <p className="text-xl text-white">Lives: {lives} | Score: {score}</p>

          <div className="grid grid-cols-4 gap-2 p-4">
            {[...Array(balloonCount)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0 }}
                animate={{ y: [-10, 10] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="flex justify-center"
              >
                <Image src="/balloon.png" alt="Balloon" width={60} height={80} />
              </motion.div>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="px-6 py-3 bg-white rounded-lg shadow-lg text-xl font-bold text-blue-600"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <Dialog open={showModal} onClose={() => {
        setShowModal(false);
        if (lives <= 0) resetGame();
      }}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg">
            {lives > 0 ? (
              isCorrect ? (
                <CheckCircleIcon className="text-green-500 w-16 h-16 mx-auto" />
              ) : (
                <XCircleIcon className="text-red-500 w-16 h-16 mx-auto" />
              )
            ) : (
              <h2 className="text-2xl font-bold">Game Over</h2>
            )}
            <p className="text-xl font-bold mt-4">
              {lives > 0 ? (isCorrect ? "Correct! Well done!" : "Oops! Try again.") : `Final Score: ${score}`}
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                if (lives <= 0) resetGame();
              }}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
            >
              {lives > 0 ? "Close" : "Play Again"}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CountingBalloonGame;
