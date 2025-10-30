import React, { useState, useEffect, useRef } from 'react';
import gensyn_background from './assets/gensyn_background.jpg'

// --- Reusable Icon Components ---
const TrophyIcon = ({ className = "h-10 w-10 text-amber-300" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.25 2.25a.75.75 0 00-1.5 0v1.163a2.25 2.25 0 01-1.04 1.954 2.25 2.25 0 00-2.41 3.514l.13.259a4.5 4.5 0 008.032 0l.13-.259a2.25 2.25 0 00-2.41-3.514 2.25 2.25 0 01-1.04-1.954V2.25zM8.5 9.5a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5zM11.5 9.5a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z" clipRule="evenodd" />
        <path d="M5.5 9.25a.75.75 0 000 1.5h.022a2.25 2.25 0 012.228 2.067 4.501 4.501 0 008.5 0 2.25 2.25 0 012.228-2.067H14.5a.75.75 0 000-1.5h-.022a2.25 2.25 0 01-2.228-2.067 4.501 4.501 0 00-8.5 0A2.25 2.25 0 015.522 9.25H5.5z" />
    </svg>
);
const CrownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.25278C12 6.25278 10.6667 5 8.5 5C6.33333 5 5 6.25278 5 6.25278V10L3 12L5 14V18.5H19V14L21 12L19 10V6.25278C19 6.25278 17.6667 5 15.5 5C13.3333 5 12 6.25278 12 6.25278Z" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const RestartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 15M20 20l-1.5-1.5A9 9 0 003.5 9" /></svg>;
const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;


// --- Dummy Data ---
const leaderboardData = [
  { rank: 1, name: 'Luna', score: 12500, avatar: 'https://placehold.co/80x80/6366F1/FFFFFF?text=L' },
  { rank: 2, name: 'Orion', score: 11800, avatar: 'https://placehold.co/80x80/EC4899/FFFFFF?text=O' },
  { rank: 3, name: 'Stella', score: 11250, avatar: 'https://placehold.co/80x80/F59E0B/FFFFFF?text=S' },
  { rank: 4, name: 'Leo', score: 10500, avatar: 'https://placehold.co/40x40/10B981/FFFFFF?text=L' },
  { rank: 5, name: 'Nova', score: 9800, avatar: 'https://placehold.co/40x40/3B82F6/FFFFFF?text=N' },
  { rank: 6, name: 'Apollo', score: 9200, avatar: 'https://placehold.co/40x40/8B5CF6/FFFFFF?text=A' },
  { rank: 7, name: 'Celeste', score: 8750, avatar: 'https://placehold.co/40x40/EF4444/FFFFFF?text=C' },
  { rank: 8, name: 'Jasper', score: 8200, avatar: 'https://placehold.co/40x40/F97316/FFFFFF?text=J' },
  { rank: 9, name: 'Iris', score: 7800, avatar: 'https://placehold.co/40x40/D946EF/FFFFFF?text=I' },
  { rank: 10, name: 'Kai', score: 7500, avatar: 'https://placehold.co/40x40/14B8A6/FFFFFF?text=K' },
];

const quizData = {
    beginner: {
        title: "Beginner",
        questions: [
            { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
            { question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"], answer: "Blue Whale" },
            { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
            { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
            { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Cell Wall"], answer: "Mitochondria" }
        ],
    },
    intermediate: {
        title: "Intermediate",
        questions: [
            { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], answer: "William Shakespeare" },
            { question: "What is the chemical symbol for gold?", options: ["Ag", "Go", "Au", "Gd"], answer: "Au" },
            { question: "In which year did the Titanic sink?", options: ["1905", "1912", "1918", "1923"], answer: "1912" },
            { question: "What is the hardest natural substance on Earth?", options: ["Quartz", "Gold", "Iron", "Diamond"], answer: "Diamond" },
            { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "India", "Japan", "Thailand"], answer: "Japan" }
        ],
    },
    expert: {
        title: "Expert",
        questions: [
            { question: "What is the most abundant gas in the Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Nitrogen" },
            { question: "Who is credited with discovering penicillin?", options: ["Marie Curie", "Albert Einstein", "Isaac Newton", "Alexander Fleming"], answer: "Alexander Fleming" },
            { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: "2" },
            { question: "The Great Barrier Reef is located off the coast of which country?", options: ["Brazil", "Australia", "India", "South Africa"], answer: "Australia" },
            { question: "What is the main component of the sun?", options: ["Oxygen", "Helium", "Hydrogen", "Carbon"], answer: "Hydrogen" }
        ]
    }
};


// --- Components ---

const WelcomeScreen = ({ onNavigate, unlockedLevels }) => {
    const isIntermediateLocked = !unlockedLevels.includes('intermediate');
    const isExpertLocked = !unlockedLevels.includes('expert');

    return (
        <div className="w-full max-w-md mx-auto bg-gray-800/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 text-center animate-fade-in-up">
            <TrophyIcon className="h-16 w-16 sm:h-20 sm:w-20 text-amber-300 mx-auto" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white mt-4">Cosmic Quiz</h1>
            <p className="text-base sm:text-lg text-gray-300 mt-2 mb-6">Test your knowledge and climb the leaderboard!</p>
            
            <div className="border-t border-white/10 my-8"></div>
            
            <h2 className="text-2xl font-semibold text-white mb-4">Select Your Challenge</h2>
            <div className="flex flex-col gap-3">
                <button onClick={() => onNavigate('quiz', 'beginner')} className="w-full bg-green-600/80 text-white font-bold text-lg py-3 rounded-xl hover:bg-green-700/80 transition-all transform hover:scale-105">"I'm just a beginner"</button>
                
                <button 
                    onClick={() => onNavigate('quiz', 'intermediate')} 
                    disabled={isIntermediateLocked}
                    className="w-full flex justify-center items-center bg-blue-600/80 text-white font-bold text-lg py-3 rounded-xl transition-all transform enabled:hover:bg-blue-700/80 enabled:hover:scale-105 disabled:bg-gray-500/50 disabled:cursor-not-allowed"
                >
                    {isIntermediateLocked && <LockIcon />}
                    "I know some things"
                </button>
                
                <button 
                    onClick={() => onNavigate('quiz', 'expert')} 
                    disabled={isExpertLocked}
                    className="w-full flex justify-center items-center bg-red-600/80 text-white font-bold text-lg py-3 rounded-xl transition-all transform enabled:hover:bg-red-700/80 enabled:hover:scale-105 disabled:bg-gray-500/50 disabled:cursor-not-allowed"
                >
                    {isExpertLocked && <LockIcon />}
                    "I'm an expert"
                </button>
            </div>
            
            <div className="border-t border-white/10 my-8"></div>

            <button onClick={() => onNavigate('leaderboard')} className="w-full bg-white/10 text-white font-bold text-lg py-3 rounded-xl hover:bg-white/20 transition-all transform hover:scale-105">View Leaderboard</button>
        </div>
    );
};


const FloatingBubbles = () => {
    const top10 = leaderboardData.slice(0, 10);
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
            {top10.map((player) => {
                const style = { left: `${Math.random() * 90}%`, animationDuration: `${15 + Math.random() * 15}s`, animationDelay: `${Math.random() * 10}s`, transform: `scale(${0.6 + Math.random() * 0.5})` };
                return (
                    <div key={player.rank} className="absolute bottom-0 animate-float-up" style={style}>
                        <div className="flex flex-col items-center p-2 bg-white/10 rounded-full shadow-lg backdrop-blur-sm">
                            <img src={player.avatar.replace('40x40', '60x60').replace('80x80', '60x60')} alt={player.name} className="w-12 h-12 rounded-full" />
                            <p className="text-xs text-white mt-1 font-medium">{player.name}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const PodiumItem = ({ player, rank }) => {
    const rankStyles = {
        1: { container: 'sm:translate-y-0', image: 'w-20 h-20 sm:w-24 sm:h-24 border-amber-300 shadow-amber-300/50', name: 'text-base sm:text-lg' },
        2: { container: 'translate-y-2 sm:translate-y-4', image: 'w-16 h-16 sm:w-20 sm:h-20 border-slate-300 shadow-slate-300/50', name: 'text-sm sm:text-base' },
        3: { container: 'translate-y-2 sm:translate-y-4', image: 'w-16 h-16 sm:w-20 sm:h-20 border-amber-600 shadow-amber-600/50', name: 'text-sm sm:text-base' },
    };
    const style = rankStyles[rank];

    return (
        <div className={`flex flex-col items-center transform ${style.container}`}>
            {rank === 1 && <CrownIcon />}
            <img src={player.avatar.replace('80x80', '120x120')} alt={player.name} className={`${style.image} rounded-full border-4 shadow-lg`} />
            <p className={`mt-2 font-bold text-white ${style.name}`}>{player.name}</p>
            <p className="text-amber-300 font-semibold text-sm sm:text-base">{player.score.toLocaleString()}</p>
        </div>
    );
};

const PlayerRow = ({ player, index }) => (
    <div className="flex items-center p-3 bg-white/5 rounded-lg animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
        <div className="w-8 text-center text-gray-300 font-semibold">{player.rank}</div>
        <div className="flex items-center flex-grow mx-4">
            <img src={player.avatar} alt={player.name} className="w-10 h-10 rounded-full" />
            <p className="ml-4 font-medium text-white">{player.name}</p>
        </div>
        <div className="text-amber-300 font-bold">{player.score.toLocaleString()}</div>
    </div>
);

const Leaderboard = ({ onNavigate }) => {
    const [top3, others] = [leaderboardData.slice(0, 3), leaderboardData.slice(3)];
    const podiumOrder = [top3[1], top3[0], top3[2]]; // 2nd, 1st, 3rd

    return (
        <div className="w-full max-w-md mx-auto bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 text-center bg-white/5">
                <div className="flex justify-center items-center gap-4">
                    <TrophyIcon />
                    <h1 className="text-3xl font-bold text-white tracking-wider">Leaderboard</h1>
                </div>
            </div>
            <div className="flex justify-around items-end p-4 sm:p-6">
                {podiumOrder.map((player) => player && <PodiumItem key={player.rank} player={player} rank={player.rank} />)}
            </div>
            <div className="p-4 space-y-2">
                {others.map((player, index) => <PlayerRow key={player.rank} player={player} index={index} />)}
            </div>
            <div className="p-4 sm:p-6">
                <button onClick={() => onNavigate('welcome')} className="w-full bg-indigo-600 text-white font-bold text-lg py-3 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all transform hover:scale-105 shadow-[0_5px_30px_-15px_rgba(79,70,229,1)]">
                    Play a New Quiz
                </button>
            </div>
        </div>
    );
};

const QUESTION_TIME = 15;

const CircularTimer = ({ timeLeft, onTimeUp }) => {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (timeLeft / QUESTION_TIME) * circumference;
    useEffect(() => { if (timeLeft === 0) onTimeUp(); }, [timeLeft, onTimeUp]);

    return (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle className="text-white/10" strokeWidth="7" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                <circle className="text-indigo-500" strokeWidth="7" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 1s linear' }}/>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">{timeLeft}</span>
        </div>
    );
};

const QuizResult = ({ score, totalQuestions, onRestart, onGoToLeaderboard, onQuizComplete, level }) => {
    useEffect(() => {
        if (onQuizComplete) {
            onQuizComplete(level, score, totalQuestions);
        }
    }, []); // Runs only once when the component mounts

    const percentage = Math.round((score / totalQuestions) * 100);
    let performanceQuote = percentage >= 80 ? `Outstanding! You scored better than 80% of players!` : percentage >= 50 ? `Great job! You're in the top half of players.` : "Keep practicing and you'll climb the leaderboard!";
    const shareText = `I scored ${score}/${totalQuestions} on this awesome quiz! Can you beat my score? #QuizChallenge`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

    return (
        <div className="w-full max-w-md mx-auto bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 text-center animate-fade-in-up">
            <TrophyIcon className="h-16 w-16 sm:h-20 sm:w-20 text-amber-300 mx-auto" />
            <h2 className="text-3xl font-bold text-white mt-4 mb-2">Quiz Finished!</h2>
            <p className="text-xl text-gray-300 mb-6">Your final score is:</p>
            <div className="my-8">
                <span className="text-5xl sm:text-6xl font-bold text-amber-300">{score}</span>
                <span className="text-xl sm:text-2xl text-gray-400"> / {totalQuestions}</span>
            </div>
            <p className="text-lg text-indigo-300 mb-8 italic">"{performanceQuote}"</p>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={onRestart} className="flex-1 flex items-center justify-center bg-white/10 text-white font-bold text-lg py-3 rounded-xl hover:bg-white/20 transition-all transform hover:scale-105"><RestartIcon/> Try Again</button>
                    <button onClick={onGoToLeaderboard} className="flex-1 bg-indigo-600 text-white font-bold text-lg py-3 rounded-xl hover:bg-indigo-700 transition-all transform hover:scale-105">Leaderboard</button>
                </div>
                <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-black text-white font-bold text-lg py-3 rounded-xl hover:bg-gray-800 transition-all transform hover:scale-105"><ShareIcon /> Post to X</a>
            </div>
        </div>
    );
};


const Quiz = ({ questions, level, onGoToLeaderboard, onQuizComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
    const timerRef = useRef(null);

    const resetTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeLeft(QUESTION_TIME);
        timerRef.current = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    };

    useEffect(() => { resetTimer(); return () => clearInterval(timerRef.current); }, [currentQuestionIndex]);
    
    const handleTimeUp = () => handleOptionClick(null);
    
    const handleOptionClick = (option) => {
        if (selectedOption !== null) return;
        clearInterval(timerRef.current);
        
        const isCorrect = option === questions[currentQuestionIndex].answer;
        if (isCorrect) setScore(prevScore => prevScore + 1);
        setSelectedOption(option || 'timed-out');

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                setSelectedOption(null);
            } else {
                setShowResult(true);
            }
        }, 1500);
    };
    
    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
    };

    const getButtonClass = (option) => {
        if (!selectedOption) return 'bg-white/10 hover:bg-white/20';
        const isCorrectAnswer = option === questions[currentQuestionIndex].answer;
        if (isCorrectAnswer) return 'bg-green-500/50 ring-2 ring-green-400 animate-pulse-correct';
        if (option === selectedOption && !isCorrectAnswer) return 'bg-red-500/50 ring-2 ring-red-400 animate-shake';
        return 'bg-white/10 cursor-not-allowed opacity-50';
    };

    if (showResult) {
        return <QuizResult 
            score={score} 
            totalQuestions={questions.length} 
            onRestart={handleRestart} 
            onGoToLeaderboard={onGoToLeaderboard}
            onQuizComplete={onQuizComplete}
            level={level}
        />;
    }
    
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="w-full max-w-md mx-auto bg-gray-800 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
                <p className="text-lg text-gray-300">Question {currentQuestionIndex + 1}/{questions.length}</p>
                <p className="text-lg font-bold text-amber-300">Score: {score}</p>
            </div>

            <div key={currentQuestionIndex} className="animate-fade-in-up">
                <div className="flex justify-center my-6">
                    <CircularTimer timeLeft={timeLeft} onTimeUp={handleTimeUp} />
                </div>
                <div className="text-center min-h-[100px] mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">{currentQuestion.question}</h2>
                </div>
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                        <button key={index} onClick={() => handleOptionClick(option)} disabled={selectedOption !== null} className={`w-full text-left p-4 rounded-lg text-white font-medium text-lg transition-all duration-300 flex justify-between items-center ${getButtonClass(option)}`}>
                            <span>{option}</span>
                            {selectedOption && option === questions[currentQuestionIndex].answer && <CheckIcon />}
                            {selectedOption === option && option !== questions[currentQuestionIndex].answer && <XIcon />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function App() {
  const [currentView, setCurrentView] = useState('welcome');
  const [quizLevel, setQuizLevel] = useState(null);
  const [unlockedLevels, setUnlockedLevels] = useState(['beginner']);

  useEffect(() => {
    try {
        const savedLevels = localStorage.getItem('unlockedLevels');
        if (savedLevels) {
            setUnlockedLevels(JSON.parse(savedLevels));
        } else {
            localStorage.setItem('unlockedLevels', JSON.stringify(['beginner']));
        }
    } catch (error) {
        console.error("Failed to parse unlocked levels from localStorage", error);
        localStorage.setItem('unlockedLevels', JSON.stringify(['beginner']));
    }
  }, []);

  const handleNavigate = (view, level = null) => {
      if (level) {
          setQuizLevel(level);
      }
      setCurrentView(view);
  };

  const handleQuizComplete = (level, score, totalQuestions) => {
      if (score !== totalQuestions) return;

      let newUnlockedLevels = [...unlockedLevels];
      if (level === 'beginner' && !newUnlockedLevels.includes('intermediate')) {
          newUnlockedLevels.push('intermediate');
      } else if (level === 'intermediate' && !newUnlockedLevels.includes('expert')) {
          newUnlockedLevels.push('expert');
      }
      
      if (newUnlockedLevels.length > unlockedLevels.length) {
          setUnlockedLevels(newUnlockedLevels);
          localStorage.setItem('unlockedLevels', JSON.stringify(newUnlockedLevels));
      }
  };

  const renderView = () => {
      switch (currentView) {
          case 'leaderboard':
              return <Leaderboard onNavigate={handleNavigate} />;
          case 'quiz':
              return <Quiz 
                questions={quizData[quizLevel].questions} 
                level={quizLevel}
                onGoToLeaderboard={() => handleNavigate('leaderboard')}
                onQuizComplete={handleQuizComplete}
              />;
          case 'welcome':
          default:
              return <WelcomeScreen onNavigate={handleNavigate} unlockedLevels={unlockedLevels} />;
      }
  };

  return (
    <>
      {/* <style>{`
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 20%, 40%, 60%, 80% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.5s ease-in-out forwards; }
        @keyframes pulse-correct { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); } 70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); } }
        .animate-pulse-correct { animation: pulse-correct 0.8s ease-in-out; }
        @keyframes float-up { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(-100vh); opacity: 0; } }
        .animate-float-up { animation-name: float-up; animation-timing-function: linear; animation-iteration-count: infinite; transform: translateY(100vh); }
      `}</style> */}
      
      <div className="relative min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${gensyn_background})` }}>
        {/* <div className="absolute inset-0 bg-black/60"></div> */}
        {/* <FloatingBubbles /> */}
        <div key={currentView} className="w-full animate-fade-in-up z-10">
            {renderView()}
        </div>
      </div>
    </>
  );
}

