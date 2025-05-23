import React from 'react';
import { PartOfSpeechInfo } from '../services/wiktionary';
import Definitions from './Definitions';
import Conjugations from './Conjugations';
import './WordCard.css';

interface WordCardProps {
  word: string;
  partOfSpeech: string;
  posInfo: PartOfSpeechInfo;
  isDefinitionsExpanded: boolean;
  onToggleDefinitionsExpanded: (partOfSpeech: string) => void;
}

const WordCard: React.FC<WordCardProps> = ({
  word,
  partOfSpeech,
  posInfo,
  isDefinitionsExpanded,
  onToggleDefinitionsExpanded,
}) => {
  return (
    <div className="word-card wiktionary-card">
      <div className="word-header">
        <h3 className="word-title">{word}</h3>
        <span className="word-category">{partOfSpeech}</span>
      </div>

      <Definitions
        definitions={posInfo.definitions}
        partOfSpeech={partOfSpeech}
        isExpanded={isDefinitionsExpanded}
        onToggleExpanded={onToggleDefinitionsExpanded}
      />

      <Conjugations conjugations={posInfo.conjugations || []} />
    </div>
  );
};

export default WordCard;
