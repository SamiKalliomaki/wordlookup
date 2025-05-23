import React from 'react';
import { ConjugationSection } from '../services/wiktionary';
import './Conjugations.css';

interface ConjugationsProps {
  conjugations: ConjugationSection[];
}

const Conjugations: React.FC<ConjugationsProps> = ({ conjugations }) => {
  if (!conjugations || conjugations.length === 0) {
    return null;
  }

  return (
    <div className="conjugations-section">
      <h4>Conjugations</h4>
      {conjugations
        .sort((a, b) => {
          // Place Indicative first
          if (a.name.toLowerCase().includes('indicative')) return -1;
          if (b.name.toLowerCase().includes('indicative')) return 1;
          return 0;
        })
        .map((section, sectionIdx) => (
          <div key={sectionIdx} className="conjugation-section">
            <h5>{section.name}</h5>
            {section.tenses.map((tense, tenseIdx) => (
              <div key={tenseIdx} className="tense-group">
                <h6>{tense.name}</h6>
                <div className="conjugation-forms">
                  {tense.forms.map((form, formIdx) => (
                    <span key={formIdx} className="conjugation-form">
                      <span className="person">{form.person}</span>
                      <span className="form">{form.form}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Conjugations;
