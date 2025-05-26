import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import './App.css';
import WiktionaryService, { WordInfo } from './services/wiktionary';
import WordCard from './components/WordCard';

function App(): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [wiktionaryResults, setWiktionaryResults] = useState<WordInfo | null>(
    null
  );
  const [expandedDefinitions, setExpandedDefinitions] = useState<{
    [key: string]: boolean;
  }>({});
  const currentSearchTerm = useRef<string>('');
  const debounceTimer = useRef<number | null>(null);

  // Initialize Wiktionary service
  const wiktionaryService = new WiktionaryService();

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const toggleDefinitionsExpanded = (partOfSpeech: string): void => {
    setExpandedDefinitions(prev => ({
      ...prev,
      [partOfSpeech]: !prev[partOfSpeech],
    }));
  };

  const handleSearch = async (term: string): Promise<void> => {
    if (!term.trim()) {
      setIsLoading(false);
      setWiktionaryResults(null);
      setError('');
      setExpandedDefinitions({});
      return;
    }

    setIsLoading(true);
    setError('');
    setExpandedDefinitions({});

    try {
      // Search Wiktionary for Portuguese words
      const wiktionaryResult = await wiktionaryService.getWordInfo(term);
      if (currentSearchTerm.current === term) {
        setWiktionaryResults(wiktionaryResult);
      }
    } catch (err) {
      if (currentSearchTerm.current === term) {
        setError('An error occurred while searching');
        console.error('Search error:', err);
      }
    } finally {
      if (currentSearchTerm.current === term) {
        setIsLoading(false);
      }
    }
  };

  const debouncedSearch = (term: string): void => {
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer
    debounceTimer.current = setTimeout(() => {
      handleSearch(term);
    }, 500);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    currentSearchTerm.current = value;
    setSearchTerm(value);

    // Use debounced search instead of immediate search
    debouncedSearch(value);
  };

  const clearSearch = (): void => {
    // Clear debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    currentSearchTerm.current = '';
    setSearchTerm('');
    setWiktionaryResults(null);
    setError('');
    setExpandedDefinitions({});
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Portuguese Word Lookup</h1>
      </header>

      <main className="main">
        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Enter a Portuguese word to find conjugations..."
              value={searchTerm}
              onChange={handleInputChange}
              className="search-input"
            />
            {searchTerm && (
              <button onClick={clearSearch} className="clear-button">
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="results-container">
          {isLoading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Searching...</p>
            </div>
          )}

          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}

          {/* Wiktionary results */}
          {!isLoading && !error && wiktionaryResults && (
            <div className="results">
              <div className="wiktionary-results">
                {wiktionaryResults.partsOfSpeech.length > 0 ? (
                  wiktionaryResults.partsOfSpeech.map(posInfo => (
                    <WordCard
                      key={posInfo.name}
                      word={wiktionaryResults.word}
                      partOfSpeech={posInfo.name}
                      posInfo={posInfo}
                      isDefinitionsExpanded={
                        expandedDefinitions[posInfo.name] || false
                      }
                      onToggleDefinitionsExpanded={toggleDefinitionsExpanded}
                    />
                  ))
                ) : (
                  <div className="no-results">
                    <p>
                      No Portuguese entries found for "{wiktionaryResults.word}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {!isLoading && !error && searchTerm && !wiktionaryResults && (
            <div className="no-results">
              <p>No words found. Try a different search term.</p>
            </div>
          )}

          {!searchTerm && !isLoading && (
            <div className="welcome">
              <h2>Welcome to Portuguese Word Lookup!</h2>
              <p>Start typing to search for Portuguese words.</p>
              <div className="sample-words">
                <p>Try searching for:</p>
                <div className="word-suggestions">
                  {[
                    'ser',
                    'estar',
                    'fazer',
                    'ter',
                    'dizer',
                    'ir',
                    'ver',
                    'vir',
                  ].map(word => (
                    <button
                      key={word}
                      onClick={() => {
                        currentSearchTerm.current = word;
                        setSearchTerm(word);
                        handleSearch(word);
                      }}
                      className="suggestion-button"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
