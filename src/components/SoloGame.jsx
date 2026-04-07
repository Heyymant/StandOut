import { useState, useCallback, useMemo } from 'react';
import SoloPromptSelection from './SoloPromptSelection';
import SoloGameRound from './SoloGameRound';
import SoloReviewRound from './SoloReviewRound';
import SoloGameFinished from './SoloGameFinished';
import { IconX, IconRobot } from './Icons';
import './SoloGame.css';

const AVAILABLE_LETTERS = 'ABCDEFGHIJKLMNOPRSTUVWY'.split('');

const GAME_CONFIG = {
  rounds: 3,
  timeLimit: 60,
  promptsCount: 5,
  maxScore: 30,
};

function getServerUrl() {
  if (import.meta.env.VITE_BACKEND_URL) return import.meta.env.VITE_BACKEND_URL;
  if (import.meta.env.PROD) return window.location.origin;
  const currentPort = window.location.port;
  const hostname = window.location.hostname;
  if (currentPort === '3001') return window.location.origin;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return currentPort === '3000' ? window.location.origin : 'http://localhost:3001';
  }
  return `http://${hostname}:3001`;
}

const SERVER_URL = getServerUrl();

function SoloGame({ playerName, onLeave }) {
  const [gamePhase, setGamePhase] = useState('prompts');
  const [prompts, setPrompts] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(null);
  const [usedLetters, setUsedLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [roundHistory, setRoundHistory] = useState([]);
  const [currentResults, setCurrentResults] = useState(null);
  const [currentWords, setCurrentWords] = useState([]);
  const [roundStartTime, setRoundStartTime] = useState(null);

  const rollLetter = useCallback(() => {
    const available = AVAILABLE_LETTERS.filter(l => !usedLetters.includes(l));
    const pool = available.length > 0 ? available : AVAILABLE_LETTERS;
    const letter = pool[Math.floor(Math.random() * pool.length)];
    setCurrentLetter(letter);
    setUsedLetters(prev => [...prev, letter]);
    setRoundStartTime(Date.now());
    return letter;
  }, [usedLetters]);

  const handlePromptsSelected = useCallback((selectedPrompts) => {
    setPrompts(selectedPrompts);
    setCurrentRound(1);
    rollLetter();
    setGamePhase('playing');
  }, [rollLetter]);

  const handleSubmitWords = useCallback(async (words) => {
    setCurrentWords(words);
    setGamePhase('validating');

    try {
      const response = await fetch(`${SERVER_URL}/api/validate-answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompts, letter: currentLetter, words }),
      });

      const data = await response.json();

      if (data.success && data.results) {
        const roundScore = data.results.reduce((sum, r) => sum + (r.score || 0), 0);
        setScore(prev => prev + roundScore);
        setCurrentResults(data.results);
        setRoundHistory(prev => [...prev, {
          round: currentRound,
          letter: currentLetter,
          words,
          results: data.results,
          roundScore,
        }]);
        setGamePhase('review');
      } else {
        const fallbackResults = words.map((w) => {
          const trimmed = w.trim();
          if (!trimmed) return { valid: false, score: 0, reason: 'No answer provided' };
          if (!trimmed.toLowerCase().startsWith(currentLetter.toLowerCase())) {
            return { valid: false, score: 0, reason: `Must start with "${currentLetter}"` };
          }
          return { valid: true, score: 1, reason: 'Validated locally (server error)' };
        });
        const roundScore = fallbackResults.reduce((sum, r) => sum + r.score, 0);
        setScore(prev => prev + roundScore);
        setCurrentResults(fallbackResults);
        setRoundHistory(prev => [...prev, {
          round: currentRound,
          letter: currentLetter,
          words,
          results: fallbackResults,
          roundScore,
        }]);
        setGamePhase('review');
      }
    } catch {
      const fallbackResults = words.map((w) => {
        const trimmed = w.trim();
        if (!trimmed) return { valid: false, score: 0, reason: 'No answer provided' };
        if (!trimmed.toLowerCase().startsWith(currentLetter.toLowerCase())) {
          return { valid: false, score: 0, reason: `Must start with "${currentLetter}"` };
        }
        return { valid: true, score: 1, reason: 'Validated locally (network error)' };
      });
      const roundScore = fallbackResults.reduce((sum, r) => sum + r.score, 0);
      setScore(prev => prev + roundScore);
      setCurrentResults(fallbackResults);
      setRoundHistory(prev => [...prev, {
        round: currentRound,
        letter: currentLetter,
        words,
        results: fallbackResults,
        roundScore,
      }]);
      setGamePhase('review');
    }
  }, [prompts, currentLetter, currentRound]);

  const handleNextRound = useCallback(() => {
    if (currentRound >= GAME_CONFIG.rounds) {
      setGamePhase('finished');
    } else {
      setCurrentRound(prev => prev + 1);
      setCurrentResults(null);
      setCurrentWords([]);
      rollLetter();
      setGamePhase('playing');
    }
  }, [currentRound, rollLetter]);

  const handlePlayAgain = useCallback(() => {
    setGamePhase('prompts');
    setPrompts([]);
    setCurrentRound(0);
    setCurrentLetter(null);
    setUsedLetters([]);
    setScore(0);
    setRoundHistory([]);
    setCurrentResults(null);
    setCurrentWords([]);
    setRoundStartTime(null);
  }, []);

  const isActiveGameplay = gamePhase === 'playing' || gamePhase === 'validating';

  const handleLeaveClick = () => {
    if (isActiveGameplay) {
      const confirmLeave = window.confirm(
        'Game in progress!\n\nLeaving now will lose your progress.\n\nAre you sure?'
      );
      if (!confirmLeave) return;
    }
    onLeave();
  };

  const GameHeader = useMemo(() => {
    const showProgress = gamePhase === 'playing' || gamePhase === 'validating' || gamePhase === 'review';
    return (
      <div className="game-header">
        <div className="header-left">
          <span className="room-badge solo-badge">
            <IconRobot size={14} />
            SOLO
          </span>
          <span className="player-count">{playerName}</span>
        </div>
        <div className="header-center">
          {showProgress && (
            <div className="round-progress">
              {[1, 2, 3].map(r => (
                <div
                  key={r}
                  className={`progress-dot ${r < currentRound ? 'completed' : ''} ${r === currentRound ? 'active' : ''}`}
                >
                  {r}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="header-right">
          {showProgress && (
            <span className="solo-score-badge">
              {score} pts
            </span>
          )}
          <button
            className={`leave-btn ${isActiveGameplay ? 'disabled' : ''}`}
            onClick={handleLeaveClick}
            title="Leave Solo Game"
          >
            <IconX size={18} />
          </button>
        </div>
      </div>
    );
  }, [gamePhase, currentRound, score, playerName, isActiveGameplay]);

  return (
    <div className="game-board solo-game">
      {GameHeader}

      {gamePhase === 'prompts' && (
        <SoloPromptSelection
          serverUrl={SERVER_URL}
          onStart={handlePromptsSelected}
        />
      )}

      {(gamePhase === 'playing' || gamePhase === 'validating') && (
        <SoloGameRound
          prompts={prompts}
          currentLetter={currentLetter}
          currentRound={currentRound}
          totalRounds={GAME_CONFIG.rounds}
          timeLimit={GAME_CONFIG.timeLimit}
          roundStartTime={roundStartTime}
          usedLetters={usedLetters}
          isValidating={gamePhase === 'validating'}
          onSubmit={handleSubmitWords}
        />
      )}

      {gamePhase === 'review' && currentResults && (
        <SoloReviewRound
          prompts={prompts}
          words={currentWords}
          results={currentResults}
          currentRound={currentRound}
          totalRounds={GAME_CONFIG.rounds}
          currentLetter={currentLetter}
          totalScore={score}
          roundScore={roundHistory[roundHistory.length - 1]?.roundScore || 0}
          onContinue={handleNextRound}
        />
      )}

      {gamePhase === 'finished' && (
        <SoloGameFinished
          playerName={playerName}
          score={score}
          maxScore={GAME_CONFIG.maxScore}
          roundHistory={roundHistory}
          prompts={prompts}
          usedLetters={usedLetters}
          onPlayAgain={handlePlayAgain}
          onLeave={onLeave}
        />
      )}
    </div>
  );
}

export default SoloGame;
