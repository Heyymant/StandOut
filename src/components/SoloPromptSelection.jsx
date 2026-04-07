import { useState, useEffect, useCallback } from 'react';
import { IconRobot, IconDocument, IconTarget, IconRefresh } from './Icons';

const PROMPT_CATEGORIES = {
  'The Office & TV': [
    'A character from The Office (US)',
    'A character from Friends',
    'A character from Brooklyn Nine-Nine',
    'A character from Game of Thrones',
    'A character from The Big Bang Theory',
    'A Netflix original series',
    'A Marvel Cinematic Universe character',
    'A Disney villain',
    'A Pixar movie character',
  ],
  'Office Life': [
    'Something found in an office',
    'An excuse for being late to work',
    'An office supply',
    'Something in a desk drawer',
    'A thing coworkers always steal',
    'A reason to leave work early',
    'A common office item',
    'A work-from-home essential',
  ],
  'Pop Culture': [
    'A meme that went viral',
    'A social media platform',
    'A streaming service',
    'A video game franchise',
    'A famous tech CEO',
    'A Grammy winning artist',
    'A hip-hop/rap artist',
    'A K-pop group or artist',
  ],
  'Food & Drinks': [
    'A snack food',
    'A type of pizza topping',
    'A fast food chain',
    'A classic cocktail',
    'A coffee shop drink',
    'A type of cheese',
    'An ice cream flavor',
    'A brunch item',
  ],
  'General Knowledge': [
    'A world capital city',
    'A famous landmark',
    'A classic novel',
    'A famous author',
    'A historical event',
    'A planet in our solar system',
    'An ocean or sea',
    'A famous river',
  ],
  'Smart & Nerdy': [
    'A Nobel Prize winning scientist',
    'A chemical element',
    'A programming language',
    'A theory in physics',
    'A space mission or spacecraft',
    'A famous inventor',
    'A type of logical fallacy',
  ],
  'Nature & Science': [
    'An animal species',
    'A type of tree',
    'A flower',
    'A bird',
    'A sea creature',
    'A constellation',
    'A famous scientist',
    'A gemstone',
  ],
  'Random & Fun': [
    "Something you'd bring to a deserted island",
    'A phobia people have',
    "A thing that's overrated",
    'A skill that impresses at parties',
    'A pet peeve everyone has',
    'Something suspiciously expensive',
  ],
};

const ALL_PROMPTS = Object.values(PROMPT_CATEGORIES).flat();

function SoloPromptSelection({ serverUrl, onStart }) {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState('mixed');
  const [showCategories, setShowCategories] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [useAI, setUseAI] = useState(true);

  const generateLocalPrompts = useCallback((mode = 'mixed') => {
    let pool;
    if (mode === 'easy') {
      pool = ['Food & Drinks', 'Pop Culture', 'Office Life'].flatMap(c => PROMPT_CATEGORIES[c] || []);
    } else if (mode === 'tricky') {
      pool = ['Smart & Nerdy', 'General Knowledge', 'Nature & Science'].flatMap(c => PROMPT_CATEGORIES[c] || []);
    } else {
      pool = ALL_PROMPTS;
    }
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setPrompts(shuffled.slice(0, 5));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch(`${serverUrl}/api/health`)
      .then(res => res.json())
      .then(data => setAiEnabled(data.aiEnabled))
      .catch(() => setAiEnabled(false));
  }, [serverUrl]);

  const generatePrompts = useCallback(async (mode = 'mixed') => {
    setLoading(true);
    setDifficulty(mode);

    if (useAI && aiEnabled) {
      try {
        const res = await fetch(`${serverUrl}/api/prompts?category=${mode}&count=5`);
        const data = await res.json();
        if (data.success && data.prompts?.length >= 5) {
          setPrompts(data.prompts.slice(0, 5));
          setLoading(false);
          return;
        }
      } catch { /* fall through to local */ }
    }
    generateLocalPrompts(mode);
  }, [serverUrl, useAI, aiEnabled, generateLocalPrompts]);

  useEffect(() => {
    generatePrompts('mixed');
  }, [generatePrompts]);

  const replacePrompt = async (index) => {
    if (useAI && aiEnabled) {
      try {
        const res = await fetch(`${serverUrl}/api/prompts?category=${difficulty}&count=1`);
        const data = await res.json();
        if (data.success && data.prompts?.length > 0) {
          setPrompts(prev => {
            const updated = [...prev];
            updated[index] = data.prompts[0];
            return updated;
          });
          return;
        }
      } catch { /* fall through */ }
    }
    const available = ALL_PROMPTS.filter(p => !prompts.includes(p));
    if (available.length > 0) {
      const newPrompt = available[Math.floor(Math.random() * available.length)];
      setPrompts(prev => {
        const updated = [...prev];
        updated[index] = newPrompt;
        return updated;
      });
    }
  };

  const generateFromCategory = (categoryName) => {
    setLoading(true);
    const catPrompts = PROMPT_CATEGORIES[categoryName] || [];
    const otherPrompts = Object.entries(PROMPT_CATEGORIES)
      .filter(([cat]) => cat !== categoryName)
      .flatMap(([, p]) => p);
    const fromCat = [...catPrompts].sort(() => Math.random() - 0.5).slice(0, 3);
    const fromOther = [...otherPrompts].sort(() => Math.random() - 0.5).slice(0, 2);
    setPrompts([...fromCat, ...fromOther].sort(() => Math.random() - 0.5));
    setShowCategories(false);
    setLoading(false);
  };

  const handleStart = () => {
    if (prompts.length !== 5) return;
    onStart(prompts);
  };

  if (loading) {
    return (
      <div className="prompt-selection">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>{useAI && aiEnabled ? 'AI is generating fresh prompts...' : 'Generating prompts...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="prompt-selection">
      <div className="selection-header">
        <h2>Choose Your Prompts</h2>
        <p>These 5 prompts will be used for all 3 rounds</p>

        <div className="ai-status">
          {aiEnabled ? (
            <label className="ai-toggle">
              <input
                type="checkbox"
                checked={useAI}
                onChange={(e) => {
                  setUseAI(e.target.checked);
                  if (!e.target.checked) generateLocalPrompts(difficulty);
                }}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label">
                {useAI ? (
                  <><IconRobot size={16} style={{ marginRight: '6px', display: 'inline-flex', verticalAlign: 'middle' }} />AI Prompts</>
                ) : (
                  <><IconDocument size={16} style={{ marginRight: '6px', display: 'inline-flex', verticalAlign: 'middle' }} />Local Prompts</>
                )}
              </span>
            </label>
          ) : (
            <span className="ai-disabled">
              <IconDocument size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Using curated prompts
            </span>
          )}
        </div>
      </div>

      <div className="mode-selector">
        {['easy', 'mixed', 'tricky'].map(mode => (
          <button
            key={mode}
            className={`mode-btn ${difficulty === mode ? 'active' : ''}`}
            onClick={() => generatePrompts(mode)}
          >
            {mode === 'easy' && <IconTarget size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />}
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      <div className="category-section">
        <button className="category-toggle" onClick={() => setShowCategories(!showCategories)}>
          {showCategories ? 'Hide Categories' : 'Pick by Category'}
        </button>
        {showCategories && (
          <div className="category-grid">
            {Object.keys(PROMPT_CATEGORIES).map(cat => (
              <button key={cat} className="category-chip" onClick={() => generateFromCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="prompts-list">
        {prompts.map((prompt, index) => (
          <div key={index} className="prompt-item">
            <span className="prompt-number">{index + 1}</span>
            <span className="prompt-text">{prompt}</span>
            <button className="replace-btn" onClick={() => replacePrompt(index)} title="Replace this prompt">
              ↻
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => generatePrompts(difficulty)} className="shuffle-btn">
        <IconRefresh size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
        Generate Fresh Prompts
      </button>

      <div className="game-info-panel">
        <div className="info-row">
          <span>Rounds</span>
          <span>3</span>
        </div>
        <div className="info-row">
          <span>Time per round</span>
          <span>60 seconds</span>
        </div>
        <div className="info-row">
          <span>Scoring</span>
          <span>Invalid = 0, Common = 1, Creative = 2</span>
        </div>
      </div>

      <button onClick={handleStart} className="start-btn">
        Start Solo Game
      </button>
    </div>
  );
}

export default SoloPromptSelection;
