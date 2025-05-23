import React from 'react';
import './Definitions.css';

interface DefinitionsProps {
  definitions: string[];
  partOfSpeech: string;
  isExpanded: boolean;
  onToggleExpanded: (partOfSpeech: string) => void;
}

const Definitions: React.FC<DefinitionsProps> = ({
  definitions,
  partOfSpeech,
  isExpanded,
  onToggleExpanded,
}) => {
  if (definitions.length === 0) {
    return null;
  }

  return (
    <div className="definitions-section">
      <h4>Definitions</h4>
      <ul>
        {(isExpanded ? definitions : definitions.slice(0, 3)).map(
          (def, idx) => (
            <li key={idx}>{def}</li>
          )
        )}
      </ul>
      {definitions.length > 3 && (
        <button
          onClick={() => onToggleExpanded(partOfSpeech)}
          className="expand-button"
        >
          {isExpanded
            ? `Show less (${definitions.length - 3} fewer)`
            : `Show more (${definitions.length - 3} more)`}
        </button>
      )}
    </div>
  );
};

export default Definitions;
