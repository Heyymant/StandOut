import { useState, useEffect, useRef, useCallback } from 'react';
import { CheckIcon, IconX, IconSend, IconRobot } from './Icons';
import './GameRound.css';

function SoloGameRound({
  prompts,
  currentLetter,
  currentRound,
  totalRounds,
  timeLimit,
  roundStartTime,
  usedLetters,
  isValidating,
  onSubmit,
}) {
  const [words, setWords] = useState(Array(5).fill(''));
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [submitted, setSubmitted] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRefs = useRef([]);

  useEffect(() => {
    setWords(Array(5).fill(''));
    setSubmitted(false);
  }, [currentRound, currentLetter]);

  const triggerHaptic = () => {
    if (navigator.vibrate) navigator.vibrate(30);
  };

  const handleAutoSubmit = useCallback(() => {
    if (submitted) return;
    const letter = currentLetter.toLowerCase();
    const normalized = words.map(w => {
      const trimmed = w.trim().toLowerCase();
      if (!trimmed || !trimmed.startsWith(letter)) return '';
      return trimmed;
    });
    const seen = new Set();
    const finalWords = normalized.map(w => {
      if (!w) return '';
      if (seen.has(w)) return '';
      seen.add(w);
      return w;
    });
    setSubmitted(true);
    onSubmit(finalWords);
    triggerHaptic();
  }, [submitted, currentLetter, words, onSubmit]);

  useEffect(() => {
    if (!roundStartTime || submitted) return;
    const updateTimer = () => {
      const elapsed = Math.floor((Date.now() - roundStartTime) / 1000);
      const remaining = Math.max(0, timeLimit - elapsed);
      setTimeLeft(remaining);
      if (remaining === 0) handleAutoSubmit();
    };
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [roundStartTime, submitted, timeLimit, handleAutoSubmit]);

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
    const letter = currentLetter.toLowerCase();
    const errors = [];
    const normalized = words.map((w, i) => {
      const trimmed = w.trim().toLowerCase();
      if (!trimmed) return '';
      if (!trimmed.startsWith(letter)) { errors.push(i + 1); return '__invalid__'; }
      return trimmed;
    });
    if (errors.length > 0) {
      alert(`Prompt ${errors.join(', ')}: Words must start with "${currentLetter.toUpperCase()}" (or leave empty)`);
      return;
    }
    const validFilled = normalized.filter(w => w && w !== '__invalid__');
    if (new Set(validFilled).size !== validFilled.length) { alert('You cannot repeat words!'); return; }
    const finalWords = normalized.map(w => (w === '__invalid__' ? '' : w));
    setSubmitted(true);
    onSubmit(finalWords);
    triggerHaptic();
  };

  const getInputStatus = (index) => {
    const word = words[index]?.trim().toLowerCase();
    if (!word) return 'empty';
    if (!word.startsWith(currentLetter.toLowerCase())) return 'invalid';
    const otherWords = words.filter((w, i) => i !== index && w.trim().toLowerCase());
    if (otherWords.map(w => w.trim().toLowerCase()).includes(word)) return 'duplicate';
    return 'valid';
  };

  if (isValidating) {
    return (
      <div className="game-round">
        <div className="submitted-screen solo-validating">
          <div className="validating-icon"><IconRobot size={36} /></div>
          <h2>AI is Judging Your Answers...</h2>
          <p>Checking validity and rating creativity</p>
          <div className="validating-dots">
            <span className="dot-bounce"></span>
            <span className="dot-bounce"></span>
            <span className="dot-bounce"></span>
          </div>
          <div className="submitted-words">
            <h4>Your Answers</h4>
            <div className="words-preview">
              {prompts.map((prompt, i) => (
                <div key={i} className="word-preview-item">
                  <span className="preview-prompt">{prompt}</span>
                  <span className={`preview-word ${words[i]?.trim() ? '' : 'empty'}`}>{words[i]?.trim() || '(empty)'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="game-round">
        <div className="submitted-screen">
          <div className="submitted-icon"><CheckIcon size={32} /></div>
          <h2>Answers Submitted!</h2>
          <p>Sending to AI for validation...</p>
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
          <span className="hud-letter">{currentLetter}</span>
        </div>
        <div className="hud-info">
          <span className="hud-round">Round {currentRound}/{totalRounds}</span>
          <span className="hud-hint">Words starting with "{currentLetter}"</span>
        </div>
        <div className="hud-filled">{filledCount}/5</div>
        <div className={`hud-timer ${timeLeft <= 10 ? 'warning' : ''} ${timeLeft <= 5 ? 'critical' : ''}`}>
          <svg className="timer-ring" viewBox="0 0 100 100">
            <circle className="timer-ring-bg" cx="50" cy="50" r="45" />
            <circle className="timer-ring-progress" cx="50" cy="50" r="45"
              strokeDasharray={`${(timeLeft / timeLimit) * 283} 283`}
            />
          </svg>
          <span className="timer-value">{timeLeft}</span>
        </div>
      </div>

      {/* CRT Monitor Frame */}
      <div className="crt-monitor">
        <div className="crt-bezel">
          <div className="crt-screen">
            <div className="screen-header">
              <div className="screen-title">
                <span className="screen-label">PROMPTS</span>
                <span className="screen-letter">{currentLetter}</span>
              </div>
              <div className="used-letters">
                {usedLetters.map((l, i) => (
                  <span key={i} className={`used-letter ${l === currentLetter ? 'current' : 'past'}`}>{l}</span>
                ))}
              </div>
            </div>

            <div className="prompts-card">
              {prompts.map((prompt, index) => {
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
                        placeholder={`${currentLetter}...`}
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

            <div className="screen-footer">
              <div className="submission-status">
                <span className="status-count solo-mode-label">
                  <IconRobot size={14} /> AI will judge your answers
                </span>
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

export default SoloGameRound;
