import { useState, useEffect, useCallback } from 'react';
import { IconRobot, IconDocument, IconTarget, UsersIcon, ClockIcon, IconRefresh } from './Icons';
import './PromptSelection.css';

// Fun prompts for college graduates - pop culture, relatable, witty
const PROMPT_CATEGORIES = {
  'The Office & TV': [
    'A character from The Office (US)',
    'A character from Friends',
    'A character from Brooklyn Nine-Nine',
    'A character from Game of Thrones',
    'A character from The Big Bang Theory',
    'A character from How I Met Your Mother',
    'A character from Stranger Things',
    'A Netflix original series',
    'A Marvel Cinematic Universe character',
    'A Disney villain',
    'A Pixar movie character',
    'A reality TV show',
    'A late night talk show host',
  ],
  'Office Life': [
    'Something found in an office',
    'A character from The Office (US)',
    'An excuse for being late to work',
    'An office supply',
    'A way to get from here to there',
    'Something in a desk drawer',
    'A thing coworkers always steal',
    'Something that breaks in the office',
    'A reason to leave work early',
    'A thing found in the break room',
    'An office prank',
    'A common office item',
    'A work-from-home essential',
  ],
  'Adult Life': [
    'An excuse for being late',
    'A common household item',
    'A way to get from here to there',
    'A Monday morning routine',
    'An excuse to skip work',
    'An online shopping category',
    'A first date disaster topic',
    'A reason to need coffee',
    'A complex topic',
    'A skill listed on resumes',
    'A common search query topic',
    'A thing that costs more than it should',
    'An adulting task',
    'A reason to cancel plans',
  ],
  'Pop Culture': [
    'A meme that went viral',
    'A social media platform',
    'A streaming service',
    'A video game franchise',
    'A famous tech CEO',
    'A dating app',
    'A YouTube channel genre',
    'A famous internet personality',
    'A Grammy winning artist',
    'A 90s one-hit wonder',
    'A hip-hop/rap artist',
    'A K-pop group or artist',
  ],
  'Food & Drinks': [
    'A snack food',
    'A type of food',
    'A type of pizza topping',
    'A fast food chain',
    'A classic cocktail',
    'A coffee shop drink',
    'A type of cheese',
    'An ice cream flavor',
    'A type of cuisine',
    'A brunch item',
    'A food trend that went viral',
    'A type of food',
    'A controversial food combo',
  ],
  'Dating & Relationships': [
    'A red flag on a first date',
    'Something couples fight about',
    'A dating app conversation starter',
    'A romantic gesture from movies',
    'A breakup song',
    'A cringe pickup line',
    'Something people lie about on dating profiles',
    'A reason relationships fail',
    'A celebrity couple',
    'Something people overshare about their relationship',
  ],
  'Smart & Nerdy': [
    'A female scientist or inventor',
    'A Nobel Prize winning scientist',
    'A famous physicist',
    'A chemical element',
    'A programming language',
    'A famous mathematician',
    'A theory in physics',
    'A type of logical fallacy',
    'A space mission or spacecraft',
    'A famous inventor',
  ],
  'General Knowledge': [
    'A world capital city',
    'A famous landmark',
    'A country flag color',
    'A famous painting',
    'A classic novel',
    'A famous author',
    'A historical event',
    'A famous quote',
    'A world record holder',
    'A famous invention',
    'A planet in our solar system',
    'An ocean or sea',
    'A mountain range',
    'A famous river',
    'A UNESCO World Heritage Site',
  ],
  'Entertainment & Media': [
    'A famous movie director',
    'A classic film',
    'An Academy Award winner',
    'A famous TV show theme song',
    'A streaming platform original',
    'A famous actor',
    'A movie franchise',
    'A famous comedian',
    'A talk show host',
    'A reality TV star',
    'A famous YouTuber',
    'A podcast genre',
    'A famous journalist',
    'A news network',
    'A famous interview',
  ],
  'Sports & Games': [
    'An Olympic sport',
    'A famous athlete',
    'A sports team',
    'A championship trophy',
    'A famous stadium',
    'A board game',
    'A card game',
    'A video game character',
    'A sports commentator',
    'A famous sports moment',
    'A sports record',
    'A famous coach',
    'A sports brand',
    'A famous rivalry',
    'A sports movie',
  ],
  'Nature & Science': [
    'An animal species',
    'A type of tree',
    'A flower',
    'A bird',
    'A sea creature',
    'A natural phenomenon',
    'A weather term',
    'A type of cloud',
    'A constellation',
    'A famous scientist',
    'A scientific discovery',
    'A type of rock',
    'A gemstone',
    'A natural disaster',
    'A national park',
  ],
  'History & Culture': [
    'A famous historical battle',
    'A US President',
    'A British monarch',
    'An ancient civilization',
    'A famous speech in history',
    'A historical figure',
    'An invention from history',
    'A famous explorer',
    'A revolution in history',
    'A historical document',
    'An empire that fell',
    'A World War II figure',
    'An Indian freedom fighter',
    'A historical mystery',
    'A cultural movement',
  ],
  'Travel & Transport': [
    'A way to get from here to there',
    'A bucket list destination',
    'An airline you\'ve heard of',
    'Something you pack but never use',
    'A famous landmark',
    'A beach destination',
    'Something annoying about airports',
    'A famous road trip route',
    'A type of vacation',
    'Something you forget to pack',
  ],
  'Bollywood & Desi': [
    'A Bollywood superstar',
    'A Shah Rukh Khan movie',
    'An iconic Bollywood song',
    'A Bollywood movie villain',
    'An Indian web series',
    'A famous dialogue from a Hindi movie',
    'An Indian comedian or comedy show',
    'A typical Bollywood movie trope',
    'A famous Indian cricketer',
    'An IPL team',
  ],
  'Random & Fun': [
    'Something you\'d bring to a deserted island',
    'A phobia people have',
    'Something with a weird name',
    'A thing that\'s overrated',
    'Something that smells terrible',
    'A skill that impresses at parties',
    'Something you\'d wish for from a genie',
    'A thing grandparents always say',
    'Something kids today will never understand',
    'A useless fact you know',
    'A pet peeve everyone has',
    'Something suspiciously expensive',
  ],
};

// Flatten all prompts for mixed mode
const ALL_PROMPTS = Object.values(PROMPT_CATEGORIES).flat();

function PromptSelection({ socket, roomId, room, isHost }) {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState('mixed');
  const [showCategories, setShowCategories] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [useAI, setUseAI] = useState(true);

  // Generate local prompts (fallback) - Define BEFORE useEffect that uses it
  const generateLocalPrompts = useCallback((mode = 'mixed') => {
    let selectedPrompts = [];
    
    if (mode === 'easy') {
      const easyCats = ['Food & Drinks', 'Pop Culture', 'Office Life', 'Entertainment & Media'];
      const easyPrompts = easyCats.flatMap(cat => PROMPT_CATEGORIES[cat] || []);
      const shuffled = [...easyPrompts].sort(() => Math.random() - 0.5);
      selectedPrompts = shuffled.slice(0, 5);
    } else if (mode === 'tricky') {
      const trickyCats = ['Smart & Nerdy', 'General Knowledge', 'History & Culture', 'Nature & Science'];
      const trickyPrompts = trickyCats.flatMap(cat => PROMPT_CATEGORIES[cat] || []);
      const shuffled = [...trickyPrompts].sort(() => Math.random() - 0.5);
      selectedPrompts = shuffled.slice(0, 5);
    } else if (mode === 'desi') {
      const desiCats = ['Bollywood & Desi', 'Food & Drinks', 'Pop Culture'];
      const desiPrompts = desiCats.flatMap(cat => PROMPT_CATEGORIES[cat] || []);
      const shuffled = [...desiPrompts].sort(() => Math.random() - 0.5);
      selectedPrompts = shuffled.slice(0, 5);
    } else {
      // Mixed mode - random from all categories
      const shuffled = [...ALL_PROMPTS].sort(() => Math.random() - 0.5);
      selectedPrompts = shuffled.slice(0, 5);
    }
    
    setPrompts(selectedPrompts);
    setLoading(false);
  }, []);

  // Check if AI is enabled on server
  useEffect(() => {
    // Get backend URL from environment or use same origin
    const backendUrl = import.meta.env.VITE_BACKEND_URL || window.location.origin;
    const healthUrl = `${backendUrl}/api/health`;
    
    fetch(healthUrl)
      .then(res => res.json())
      .then(data => {
        setAiEnabled(data.aiEnabled);
        console.log('AI Status:', data.aiEnabled ? `Enabled (${data.provider})` : 'Disabled (using local prompts)');
      })
      .catch(() => {
        setAiEnabled(false);
      });
  }, []);

  // Listen for AI-generated prompts from server
  useEffect(() => {
    if (!socket) return;

    const handleAIPrompts = (data) => {
      if (data.success && data.prompts && data.prompts.length > 0) {
        console.log('🤖 Received fresh AI prompts:', data.prompts);
        
        // Handle single prompt replacement
        if (data.replaceIndex !== undefined && data.replaceIndex !== null) {
          setPrompts(prev => {
            const newPrompts = [...prev];
            newPrompts[data.replaceIndex] = data.prompts[0];
            return newPrompts;
          });
        } else {
          // Full set of prompts
          setPrompts(data.prompts);
        }
        setLoading(false);
      } else {
        console.log('⚠️ AI prompt generation failed, using local prompts');
        generateLocalPrompts(difficulty);
      }
    };

    socket.on('ai-prompts-generated', handleAIPrompts);

    return () => {
      socket.off('ai-prompts-generated', handleAIPrompts);
    };
  }, [socket, difficulty, generateLocalPrompts]);

  // Generate prompts (AI or local) - Always fresh, real-time
  const generatePrompts = useCallback((mode = 'mixed') => {
    setLoading(true);
    setDifficulty(mode);
    
    if (useAI && aiEnabled && socket) {
      // Request fresh AI prompts from server - always generate new ones
      // Timestamp ensures no caching, each request is unique
      const requestTimestamp = Date.now();
      console.log(`🔄 Requesting fresh AI prompts for category: ${mode}, timestamp: ${requestTimestamp}`);
      
      socket.emit('fetch-ai-prompts', { 
        roomId, 
        category: mode, 
        count: 5,
        timestamp: requestTimestamp // Forces fresh generation every time
      });
    } else {
      // Use local prompts (shuffled fresh each time)
      generateLocalPrompts(mode);
    }
  }, [socket, roomId, useAI, aiEnabled, generateLocalPrompts]);

  const generateFromCategory = (categoryName) => {
    setLoading(true);
    
    const categoryPrompts = PROMPT_CATEGORIES[categoryName] || [];
    const otherPrompts = Object.entries(PROMPT_CATEGORIES)
      .filter(([cat]) => cat !== categoryName)
      .flatMap(([, prompts]) => prompts);
    
    // Pick 3 from selected category, 2 from others
    const shuffledCategory = [...categoryPrompts].sort(() => Math.random() - 0.5);
    const shuffledOthers = [...otherPrompts].sort(() => Math.random() - 0.5);
    
    const fromCategory = shuffledCategory.slice(0, 3);
    const fromOthers = shuffledOthers.slice(0, 2);
    
    const combined = [...fromCategory, ...fromOthers].sort(() => Math.random() - 0.5);
    
    setPrompts(combined);
    setShowCategories(false);
    setLoading(false);
  };

  useEffect(() => {
    generatePrompts('mixed');
  }, [generatePrompts]);

  const handleStart = () => {
    if (prompts.length !== 5) {
      alert('Please wait for prompts to load');
      return;
    }
    
    socket.emit('set-prompts', { roomId, prompts });
    
    setTimeout(() => {
      socket.emit('start-game', roomId);
    }, 300);
  };

  const replacePrompt = (index) => {
    if (useAI && aiEnabled && socket) {
      // Generate a fresh AI prompt for replacement
      setLoading(true);
      socket.emit('fetch-ai-prompts', { 
        roomId, 
        category: difficulty, 
        count: 1,
        timestamp: Date.now(),
        replaceIndex: index
      });
    } else {
      // Use local prompts
      const available = ALL_PROMPTS.filter(p => !prompts.includes(p));
      if (available.length > 0) {
        const newPrompt = available[Math.floor(Math.random() * available.length)];
        const newPrompts = [...prompts];
        newPrompts[index] = newPrompt;
        setPrompts(newPrompts);
      }
    }
  };

  if (loading) {
    return (
      <div className="prompt-selection">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>{useAI && aiEnabled ? 'AI is generating fresh, unique prompts...' : 'Generating fun prompts...'}</p>
        </div>
      </div>
    );
  }

  const categoryNames = Object.keys(PROMPT_CATEGORIES);

  return (
    <div className="prompt-selection">
      <div className="selection-header">
        <h2>Choose Your Prompts</h2>
        <p>These 5 prompts will be used for all 3 rounds</p>
        
        {/* AI Status Indicator */}
        <div className="ai-status">
          {aiEnabled ? (
            <label className="ai-toggle">
              <input 
                type="checkbox" 
                checked={useAI} 
                onChange={(e) => {
                  setUseAI(e.target.checked);
                  if (!e.target.checked) {
                    generateLocalPrompts(difficulty);
                  }
                }}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label">
                {useAI ? (
                  <>
                    <IconRobot size={16} style={{ marginRight: '6px', display: 'inline-flex', verticalAlign: 'middle' }} />
                    AI Prompts (Fresh)
                  </>
                ) : (
                  <>
                    <IconDocument size={16} style={{ marginRight: '6px', display: 'inline-flex', verticalAlign: 'middle' }} />
                    Local Prompts
                  </>
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

      {/* Difficulty / Mode Selector */}
      <div className="mode-selector">
        <button 
          className={`mode-btn ${difficulty === 'easy' ? 'active' : ''}`}
          onClick={() => generatePrompts('easy')}
        >
          <IconTarget size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
          Easy
        </button>
        <button 
          className={`mode-btn ${difficulty === 'mixed' ? 'active' : ''}`}
          onClick={() => generatePrompts('mixed')}
        >
          Mixed
        </button>
        <button 
          className={`mode-btn ${difficulty === 'tricky' ? 'active' : ''}`}
          onClick={() => generatePrompts('tricky')}
        >
          Tricky
        </button>
        <button 
          className={`mode-btn ${difficulty === 'desi' ? 'active' : ''}`}
          onClick={() => generatePrompts('desi')}
        >
          Desi
        </button>
      </div>

      {/* Category Picker */}
      <div className="category-section">
        <button 
          className="category-toggle"
          onClick={() => setShowCategories(!showCategories)}
        >
          {showCategories ? 'Hide Categories ▲' : 'Pick by Category ▼'}
        </button>
        
        {showCategories && (
          <div className="category-grid">
            {categoryNames.map(cat => (
              <button
                key={cat}
                className="category-chip"
                onClick={() => generateFromCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Prompts List */}
      <div className="prompts-list">
        {prompts.map((prompt, index) => (
          <div key={index} className="prompt-item">
            <span className="prompt-number">{index + 1}</span>
            <span className="prompt-text">{prompt}</span>
            <button 
              className="replace-btn"
              onClick={() => replacePrompt(index)}
              title="Replace this prompt"
            >
              ↻
            </button>
          </div>
        ))}
      </div>

      {/* Shuffle Button */}
      <button onClick={() => generatePrompts(difficulty)} className="shuffle-btn">
        <IconRefresh size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
        Generate Fresh Prompts
      </button>

      {/* Players Preview */}
      {room && room.players && (
        <div className="players-section">
          <h3>Players Ready ({room.players.length})</h3>
          <div className="players-list">
            {room.players.map(player => (
              <div key={player.id} className={`player-chip ${player.id === room.hostId ? 'host' : ''}`}>
                {player.name}
                {player.id === room.hostId && <span className="host-star">★</span>}
              </div>
            ))}
          </div>
          {room.players.length === 1 && (
            <p className="solo-hint">You can play solo or wait for more players to join</p>
          )}
        </div>
      )}

      {/* Game Info */}
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
          <span>Unique = +1, Duplicate = 0</span>
        </div>
      </div>

      {/* Start Button */}
      <button onClick={handleStart} className="start-btn">
        Start Game
        <span className="player-count">({room?.players?.length || 1} player{room?.players?.length !== 1 ? 's' : ''})</span>
      </button>
    </div>
  );
}

export default PromptSelection;
