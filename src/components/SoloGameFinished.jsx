import { useState } from 'react';
import { IconTrophy, IconRefresh, IconLogout, IconChevronDown, IconChevronUp, IconRobot, CheckIcon, XIcon } from './Icons';
import './SoloGame.css';

function getRating(score, maxScore) {
  const pct = (score / maxScore) * 100;
  if (pct >= 85) return { label: 'Legendary', emoji: '🏆', desc: 'You truly stand out!' };
  if (pct >= 70) return { label: 'Outstanding', emoji: '🌟', desc: 'Incredibly creative answers!' };
  if (pct >= 55) return { label: 'Great', emoji: '🎯', desc: 'Well done, creative thinker!' };
  if (pct >= 40) return { label: 'Good', emoji: '👍', desc: 'Solid effort, keep going!' };
  if (pct >= 25) return { label: 'Decent', emoji: '💪', desc: 'Room to be more creative!' };
  return { label: 'Rookie', emoji: '🎮', desc: 'Practice makes perfect!' };
}

function SoloGameFinished({
  playerName,
  score,
  maxScore,
  roundHistory,
  prompts,
  usedLetters,
  onPlayAgain,
  onLeave,
}) {
  const [showHistory, setShowHistory] = useState(false);
  const rating = getRating(score, maxScore);

  return (
    <div className="game-finished solo-finished">
      <div className="trophy-section">
        <div className="trophy-icon solo-trophy">
          <IconTrophy size={32} />
        </div>
        <h1>{rating.label}!</h1>
        <p className="winner-subtitle">
          {rating.emoji} {rating.desc}
        </p>
      </div>

      <div className="solo-final-score-card">
        <div className="final-score-big">{score}</div>
        <div className="final-score-max">out of {maxScore}</div>
        <div className="final-score-bar-container">
          <div className="final-score-bar">
            <div
              className="final-score-fill"
              style={{ width: `${(score / maxScore) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="final-score-pct">
          {Math.round((score / maxScore) * 100)}% creativity score
        </div>
      </div>

      <div className="game-stats">
        <div className="stat-card">
          <span className="stat-value">{roundHistory.length}</span>
          <span className="stat-label">Rounds</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{usedLetters.join(', ')}</span>
          <span className="stat-label">Letters</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">
            {roundHistory.reduce((sum, r) => sum + r.results.filter(res => res.score === 2).length, 0)}
          </span>
          <span className="stat-label">Creative Answers</span>
        </div>
      </div>

      <div className="history-section" style={{ width: '100%', maxWidth: '500px' }}>
        <button
          className="history-toggle"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? (
            <>Round Details <IconChevronUp size={16} /></>
          ) : (
            <>Round Details <IconChevronDown size={16} /></>
          )}
        </button>

        {showHistory && (
          <div className="solo-round-details">
            {roundHistory.map((round, i) => (
              <div key={i} className="solo-history-round">
                <div className="history-header">
                  <span>Round {round.round}</span>
                  <span className="history-letter">
                    Letter: {round.letter} &middot; Score: +{round.roundScore}
                  </span>
                </div>
                <div className="solo-history-answers">
                  {prompts.map((prompt, j) => {
                    const word = round.words[j] || '';
                    const result = round.results[j] || { valid: false, score: 0, reason: '' };
                    const cls = !result.valid || result.score === 0 ? 'invalid' : result.score === 2 ? 'creative' : 'common';

                    return (
                      <div key={j} className={`solo-history-row ${cls}`}>
                        <div className="solo-history-prompt">{prompt}</div>
                        <div className="solo-history-answer">{word || '—'}</div>
                        <div className="solo-history-verdict">
                          {result.valid ? <CheckIcon size={12} /> : <XIcon size={12} />}
                          <span>+{result.score}</span>
                        </div>
                        <div className="solo-history-reason">
                          <IconRobot size={11} />
                          <span>{result.reason}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="action-buttons">
        <button onClick={onPlayAgain} className="play-again-btn">
          <IconRefresh size={18} />
          Play Again
        </button>
        <button onClick={onLeave} className="leave-btn">
          <IconLogout size={16} />
          Back to Lobby
        </button>
      </div>
    </div>
  );
}

export default SoloGameFinished;
