import { useState, useEffect, useRef, useCallback } from 'react';
import { CheckIcon, IconX, IconSend } from './Icons';
import './GameRound.css';

function GameRound({ socket, room, playerName, isHost }) {
  const [words, setWords] = useState(Array(5).fill(''));
  const [timeLeft, setTimeLeft] = useState(60);
  const [submitted, setSubmitted] = useState(false);
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [submittedPlayers, setSubmittedPlayers] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (room && room.gameState === 'playing') {
      setWords(Array(5).fill(''));
      setSubmitted(false);
      setAutoSubmitted(false);
      setSubmittedPlayers(room.submittedPlayers || []);
    }
  }, [room?.currentRound, room?.currentLetter]);

  useEffect(() => {
    if (room?.submittedPlayers) {
      setSubmittedPlayers(room.submittedPlayers);
    }
  }, [room?.submittedPlayers]);

  const handleAutoSubmit = useCallback(() => {
    if (submitted || !room || !room.currentLetter) return;
    const letter = room.currentLetter.toLowerCase();
    const normalized = words.map((w) => {
      const trimmed = w.trim().toLowerCase();
      if (!trimmed) return '';
      if (trimmed.startsWith(letter)) return trimmed;
      return '';
    });
    const seen = new Set();
    const finalWords = normalized.map((w) => {
      if (!w) return '';
      if (seen.has(w)) return '';
      seen.add(w);
      return w;
    });
    socket.emit('submit-words', { roomId: room.id, words: finalWords });
    setAutoSubmitted(true);
    setSubmitted(true);
    triggerHaptic();
  }, [submitted, room, words, socket]);

  useEffect(() => {
    if (!room || !room.roundStartTime || submitted) return;
    const updateTimer = () => {
      const elapsed = Math.floor((Date.now() - room.roundStartTime) / 1000);
      const remaining = Math.max(0, (room.gameConfig?.timeLimit || 60) - elapsed);
      setTimeLeft(remaining);
      if (remaining === 0) handleAutoSubmit();
    };
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [room, submitted, handleAutoSubmit]);

  useEffect(() => {
    const handleSubmission = ({ playerId }) => {
      setSubmittedPlayers(prev => {
        if (!prev.includes(playerId)) return [...prev, playerId];
        return prev;
      });
    };
    socket.on('submission-received', handleSubmission);
    return () => socket.off('submission-received', handleSubmission);
  }, [socket]);

  const triggerHaptic = () => {
    if (navigator.vibrate) navigator.vibrate(30);
  };

  const handleWordChange = (index, value) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      triggerHaptic();
      if (index < 4) {
        inputRefs.current[index + 1]?.focus();
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    if (submitted) return;
    if (!room || !room.currentLetter) return;
    const letter = room.currentLetter.toLowerCase();
    const errors = [];
    const normalized = words.map((w, i) => {
      const trimmed = w.trim().toLowerCase();
      if (!trimmed) return '';
      if (!trimmed.startsWith(letter)) { errors.push(i + 1); return '__invalid__'; }
      return trimmed;
    });
    if (errors.length > 0) {
      alert(`Prompt ${errors.join(', ')}: Words must start with "${room.currentLetter.toUpperCase()}" (or leave empty)`);
      return;
    }
    const validFilled = normalized.filter(w => w && w !== '__invalid__');
    const unique = new Set(validFilled);
    if (unique.size !== validFilled.length) { alert('You cannot repeat words!'); return; }
    const finalWords = normalized.map(w => (w === '__invalid__' ? '' : w));
    socket.emit('submit-words', { roomId: room.id, words: finalWords });
    setSubmitted(true);
    triggerHaptic();
  };

  const getInputStatus = (index) => {
    const word = words[index]?.trim().toLowerCase();
    if (!word) return 'empty';
    if (!room?.currentLetter) return 'empty';
    if (!word.startsWith(room.currentLetter.toLowerCase())) return 'invalid';
    const otherWords = words.filter((w, i) => i !== index && w.trim().toLowerCase());
    if (otherWords.includes(word)) return 'duplicate';
    return 'valid';
  };

  if (!room || !room.currentLetter || !room.prompts) {
    return (
      <div className="game-round">
        <div className="round-loading">
          <div className="loading-spinner"></div>
          <p>Starting round...</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    const totalPlayers = room.players.length;
    const submittedCount = submittedPlayers.length;
    const waitingFor = room.players.filter(p => !submittedPlayers.includes(p.id));
    return (
      <div className="game-round">
        <div className="submitted-screen">
          <div className="submitted-icon"><CheckIcon size={32} /></div>
          <h2>Answers Submitted!</h2>
          <p>{autoSubmitted ? "Time's up! Your answers were auto-submitted." : 'Waiting for other players...'}</p>
          <div className="submission-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(submittedCount / totalPlayers) * 100}%` }}></div>
            </div>
            <span className="progress-text">{submittedCount} / {totalPlayers} submitted</span>
          </div>
          {waitingFor.length > 0 && (
            <div className="waiting-for">
              <span>Waiting for: </span>
              {waitingFor.map(p => <span key={p.id} className="waiting-player">{p.name}</span>)}
            </div>
          )}
          <div className="submitted-words">
            <h4>Your Answers</h4>
            <div className="words-preview">
              {room.prompts.map((prompt, i) => (
                <div key={i} className="word-preview-item">
                  <span className="preview-prompt">{prompt}</span>
                  <span className={`preview-word ${words[i]?.trim() ? '' : 'empty'}`}>
                    {words[i]?.trim() || '(empty)'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filledCount = words.filter(w => w.trim()).length;

  return (
    <div className="game-round">
      {/* Sticky HUD */}
      <div className="sticky-hud">
        <div className="hud-letter-box">
          <span className="hud-letter">{room.currentLetter}</span>
        </div>
        <div className="hud-info">
          <span className="hud-round">Round {room.currentRound}/{room.gameConfig?.rounds || 3}</span>
          <span className="hud-hint">Words starting with "{room.currentLetter}"</span>
        </div>
        <div className="hud-filled">{filledCount}/5</div>
        <div className={`hud-timer ${timeLeft <= 10 ? 'warning' : ''} ${timeLeft <= 5 ? 'critical' : ''}`}>
          <svg className="timer-ring" viewBox="0 0 100 100">
            <circle className="timer-ring-bg" cx="50" cy="50" r="45" />
            <circle className="timer-ring-progress" cx="50" cy="50" r="45"
              strokeDasharray={`${(timeLeft / (room.gameConfig?.timeLimit || 60)) * 283} 283`}
            />
          </svg>
          <span className="timer-value">{timeLeft}</span>
        </div>
      </div>

      {/* CRT Monitor Frame */}
      <div className="crt-monitor">
        <div className="crt-bezel">
          <div className="crt-screen">
            {/* Screen header */}
            <div className="screen-header">
              <div className="screen-title">
                <span className="screen-label">PROMPTS</span>
                <span className="screen-letter">{room.currentLetter}</span>
              </div>
              <div className="used-letters">
                {room.usedLetters.map((l, i) => (
                  <span key={i} className={`used-letter ${l === room.currentLetter ? 'current' : 'past'}`}>{l}</span>
                ))}
              </div>
            </div>

            {/* All prompts in one card */}
            <div className="prompts-card">
              {room.prompts.map((prompt, index) => {
                const status = getInputStatus(index);
                return (
                  <div
                    key={index}
                    className={`prompt-row ${status} ${focusedIndex === index ? 'focused' : ''}`}
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className="prompt-label">
                      <span className="prompt-number">{index + 1}</span>
                      <span className="prompt-text">{prompt}</span>
                    </div>
                    <div className="input-wrapper">
                      <input
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        value={words[index] || ''}
                        onChange={(e) => handleWordChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onFocus={() => setFocusedIndex(index)}
                        onBlur={() => setFocusedIndex(-1)}
                        placeholder={`${room.currentLetter}...`}
                        disabled={submitted}
                        className={`word-input ${status}`}
                        autoFocus={index === 0}
                        autoComplete="off"
                        autoCapitalize="off"
                      />
                      {status === 'valid' && <span className="input-status-icon valid"><CheckIcon size={16} /></span>}
                      {status === 'invalid' && <span className="input-status-icon invalid"><IconX size={16} /></span>}
                      {status === 'duplicate' && <span className="input-status-icon duplicate">!</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Screen footer inside CRT */}
            <div className="screen-footer">
              <div className="submission-status">
                <span className="status-count">{submittedPlayers.length} / {room.players.length} submitted</span>
                <div className="player-status-dots">
                  {room.players.map(p => (
                    <div key={p.id} className={`status-dot ${submittedPlayers.includes(p.id) ? 'submitted' : ''}`} title={p.name} />
                  ))}
                </div>
              </div>
              <button onClick={handleSubmit} disabled={submitted} className="submit-button">
                <IconSend size={16} />
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="crt-stand"></div>
      </div>
    </div>
  );
}

export default GameRound;
