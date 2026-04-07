import { CheckIcon, XIcon, IconRobot } from './Icons';
import './SoloGame.css';

function SoloReviewRound({
  prompts,
  words,
  results,
  currentRound,
  totalRounds,
  currentLetter,
  totalScore,
  roundScore,
  onContinue,
}) {
  const isLastRound = currentRound >= totalRounds;
  const maxRoundScore = prompts.length * 2;

  const getScoreClass = (result) => {
    if (!result.valid || result.score === 0) return 'invalid';
    if (result.score === 2) return 'creative';
    return 'common';
  };

  const getScoreLabel = (result) => {
    if (!result.valid || result.score === 0) return '0 pts';
    if (result.score === 2) return '+2 pts';
    return '+1 pt';
  };

  return (
    <div className="solo-review">
      <div className="review-header">
        <div className="review-title">
          <h2>Round {currentRound} Results</h2>
          <p>Letter: <strong>{currentLetter}</strong></p>
        </div>
        <div className="round-badge">
          {currentRound} / {totalRounds}
        </div>
      </div>

      <div className="solo-scoring-legend">
        <div className="legend-item creative">
          <span className="legend-dot"></span>
          <span>Creative = +2 pts</span>
        </div>
        <div className="legend-item common">
          <span className="legend-dot"></span>
          <span>Valid/Common = +1 pt</span>
        </div>
        <div className="legend-item invalid-legend">
          <span className="legend-dot"></span>
          <span>Invalid = 0 pts</span>
        </div>
      </div>

      <div className="solo-results-list">
        {prompts.map((prompt, i) => {
          const word = words[i] || '';
          const result = results[i] || { valid: false, score: 0, reason: 'No result' };
          const scoreClass = getScoreClass(result);

          return (
            <div key={i} className={`solo-result-card ${scoreClass}`}>
              <div className="result-prompt-header">
                <span className="prompt-number">{i + 1}</span>
                <span className="prompt-text">{prompt}</span>
              </div>

              <div className="result-content">
                <div className="result-answer-section">
                  <span className="result-answer-label">Your answer</span>
                  <span className="result-answer-word">
                    {word || '(empty)'}
                  </span>
                </div>

                <div className="result-verdict-section">
                  <div className="verdict-badge-row">
                    <span className={`verdict-badge ${scoreClass}`}>
                      {result.valid ? <CheckIcon size={14} /> : <XIcon size={14} />}
                      {getScoreLabel(result)}
                    </span>
                    {result.score === 2 && <span className="creative-star">Uncommon!</span>}
                  </div>
                  <div className="verdict-reason">
                    <IconRobot size={14} />
                    <span>{result.reason}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="solo-round-summary">
        <div className="summary-scores">
          <div className="summary-item">
            <span className="summary-label">This Round</span>
            <span className="summary-value round-score">+{roundScore} / {maxRoundScore}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Score</span>
            <span className="summary-value total-score">{totalScore}</span>
          </div>
        </div>
      </div>

      <div className="review-footer">
        <div className="next-round-info">
          {isLastRound ? (
            <p>This was the final round!</p>
          ) : (
            <p>Next round: New letter, same prompts</p>
          )}
        </div>
        <button onClick={onContinue} className="continue-button">
          {isLastRound ? 'See Final Results' : `Start Round ${currentRound + 1}`}
        </button>
      </div>
    </div>
  );
}

export default SoloReviewRound;
