// Wiktionary API module for fetching word information

const WIKTIONARY_BASE_URL = 'https://en.wiktionary.org/w/api.php';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export interface ConjugationForm {
  person: string;
  form: string;
}

export interface ConjugationTense {
  name: string;
  forms: ConjugationForm[];
}

export interface ConjugationSection {
  name: string;
  tenses: ConjugationTense[];
}

export interface PartOfSpeechInfo {
  name: string;
  definitions: string[];
  conjugations?: ConjugationSection[];
}

export interface WordInfo {
  word: string;
  partsOfSpeech: PartOfSpeechInfo[];
}

export interface CacheEntry<T = unknown> {
  data: T;
  timestamp: number;
}

export interface PartOfSpeechSection {
  name: string;
  element: Element;
}

class WiktionaryService {
  private cache: Map<string, CacheEntry<WordInfo | null>>;

  constructor() {
    this.cache = new Map();
  }

  /**
   * Get word information from Wiktionary
   * @param word - The word to look up
   * @param language - Language code (default: 'Portuguese')
   * @returns Word information
   */
  async getWordInfo(
    word: string,
    language: string = 'Portuguese'
  ): Promise<WordInfo | null> {
    word = word.toLowerCase();

    const cacheKey = `${word}_${language}`;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      if (Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
      }
    }

    try {
      const result = await this.fetchFromWiktionary(word, language);

      // Cache the result
      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now(),
      });

      return result;
    } catch (error) {
      console.error('Error fetching from Wiktionary:', error);
      throw error;
    }
  }

  /**
   * Fetch word data from Wiktionary API
   * @param word - The word to look up
   * @param language - Language to search for
   * @returns Word information with raw content
   */
  private async fetchFromWiktionary(
    word: string,
    language: string
  ): Promise<WordInfo | null> {
    const pageData = await this.getPageContent(word);
    if (!pageData) {
      return null;
    }

    // Parse HTML once and pass DOM document around
    const parser = new DOMParser();
    const doc = parser.parseFromString(pageData.content, 'text/html');

    // Parse the HTML content to extract language sections
    const languageSections = parseLanguageSections(doc);
    const languageSection = languageSections[language];
    if (!languageSection) return null;

    // Extract part-of-speech sections from the language section
    const posSections = extractPartOfSpeechSections(languageSection);

    // Extract conjugations and definitions from each part-of-speech section
    const partsOfSpeech: PartOfSpeechInfo[] = [];

    for (const posSection of posSections) {
      // Extract conjugations for this part of speech (mainly for verbs)
      const posConjugations = extractConjugationsFromSection(
        posSection.element
      );

      // Extract definitions for this part of speech
      const posDefinitions = extractDefinitionsFromSection(posSection.element);

      const posInfo: PartOfSpeechInfo = {
        name: posSection.name,
        definitions: posDefinitions,
      };

      // Only include conjugations if they exist
      if (posConjugations.length > 0) {
        posInfo.conjugations = posConjugations;
      }

      partsOfSpeech.push(posInfo);
    }

    return {
      word,
      partsOfSpeech,
    };
  }

  /**
   * Get page content from Wiktionary (rendered HTML)
   * @param title - Page title
   * @returns Page data with rendered content
   */
  private async getPageContent(title: string): Promise<{
    title: string;
    content: string;
  } | null> {
    const params = new URLSearchParams({
      action: 'parse',
      format: 'json',
      page: title,
      origin: '*',
    });

    const response = await fetch(`${WIKTIONARY_BASE_URL}?${params}`);
    const data = await response.json();

    if (data.error) {
      return null; // Page doesn't exist or error occurred
    }

    return {
      title: data.parse.title,
      content: data.parse.text['*'], // This is the rendered HTML
    };
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}

export default WiktionaryService;

/**
 * Parse HTML document to extract language sections
 * @param doc - The parsed HTML document from Wiktionary
 * @returns Record of language sections with DOM elements
 */
function parseLanguageSections(doc: Document): Record<string, Element> {
  try {
    const sections: Record<string, Element> = {};

    // Find all language section headers - they are h2 elements with IDs that don't contain underscores
    const h2Elements = doc.querySelectorAll('.mw-heading.mw-heading2 h2[id]');

    for (let i = 0; i < h2Elements.length; i++) {
      const h2 = h2Elements[i] as HTMLElement;
      const languageName = h2.id;

      // Skip if this doesn't look like a language name (contains underscore or other patterns)
      if (
        !languageName ||
        languageName.includes('_') ||
        languageName.includes('-')
      ) {
        continue;
      }

      // Get the section div that contains this h2
      const sectionDiv = h2.closest('.mw-heading.mw-heading2');
      if (!sectionDiv) {
        continue;
      }

      // Create a container element for this language section
      const sectionContainer = doc.createElement('div');
      sectionContainer.appendChild(sectionDiv.cloneNode(true));

      let currentElement = sectionDiv.nextElementSibling;

      while (currentElement) {
        // Check if this is the start of another language section
        const isLanguageSection =
          currentElement.classList?.contains('mw-heading') &&
          currentElement.classList?.contains('mw-heading2');

        if (isLanguageSection) {
          // Check if the h2 inside has an ID that looks like a language name
          const nextH2 = currentElement.querySelector('h2[id]') as HTMLElement;
          if (
            nextH2 &&
            nextH2.id &&
            !nextH2.id.includes('_') &&
            !nextH2.id.includes('-')
          ) {
            break; // This is another language section, stop here
          }
        }

        sectionContainer.appendChild(currentElement.cloneNode(true));
        currentElement = currentElement.nextElementSibling;
      }

      sections[languageName] = sectionContainer;
    }

    return sections;
  } catch (error) {
    console.error('Error parsing HTML content:', error);
    return {};
  }
}

const kPartOfSpeechNames = [
  'Abbreviation',
  'Adjective',
  'Adverb',
  'Article',
  'Conjunction',
  'Contraction',
  'Determiner',
  'Expression',
  'Interjection',
  'Noun',
  'Numeral',
  'Particle',
  'Postposition',
  'Preposition',
  'Pronoun',
  'Proper noun',
  'Verb',
];

/**
 * Extract part-of-speech sections from a language section
 * @param languageElement - The HTML element containing the language section
 * @returns Array of part-of-speech sections with their names and DOM elements
 */
function extractPartOfSpeechSections(
  languageElement: Element
): PartOfSpeechSection[] {
  try {
    const posSections: PartOfSpeechSection[] = [];

    // Find all part-of-speech headers (h3 and h4 elements with IDs)
    const posHeaders = languageElement.querySelectorAll(
      '.mw-heading.mw-heading3 h3[id], .mw-heading.mw-heading4 h4[id]'
    );

    for (let i = 0; i < posHeaders.length; i++) {
      const header = posHeaders[i] as HTMLElement;
      const posName = header.textContent?.trim();

      if (!posName) continue;
      if (!kPartOfSpeechNames.includes(posName)) {
        continue;
      }

      // Get the section div that contains this header
      const headerParent = header.closest('.mw-heading');
      if (!headerParent) continue;
      const headerParentLevel = headerParent.classList.contains('mw-heading3')
        ? 3
        : 4;

      // Create a container element for this part-of-speech section
      const sectionContainer =
        languageElement.ownerDocument!.createElement('div');
      sectionContainer.appendChild(headerParent.cloneNode(true));

      let currentElement = headerParent.nextElementSibling;

      while (currentElement) {
        // Check if this is the start of another section at the same or higher level
        const isHeaderSection =
          currentElement.classList?.contains('mw-heading');

        if (isHeaderSection) {
          // Check the heading level
          const isH2 = currentElement.classList?.contains('mw-heading2');
          const isH3 = currentElement.classList?.contains('mw-heading3');
          const isH4 = currentElement.classList?.contains('mw-heading4');

          // Stop if we hit another language section (h2) or same-level POS section
          if (isH2 || isH3 || (headerParentLevel === 4 && isH4)) {
            break;
          }
        }

        sectionContainer.appendChild(currentElement.cloneNode(true));
        currentElement = currentElement.nextElementSibling;
      }

      posSections.push({
        name: posName,
        element: sectionContainer,
      });
    }

    return posSections;
  } catch (error) {
    console.error('Error extracting part-of-speech sections:', error);
    return [];
  }
}

/**
 * Extract verb conjugations from a specific part-of-speech section
 * @param posElement - The HTML element containing the part-of-speech section
 * @returns Array of conjugation sections organized by mood/section
 */
function extractConjugationsFromSection(
  posElement: Element
): ConjugationSection[] {
  try {
    const conjugationSections: ConjugationSection[] = [];
    const sectionMap = new Map<string, ConjugationTense[]>();

    // Find conjugation tables within this section
    const tables = posElement.querySelectorAll('table.roa-inflection-table');

    // Analyze footnotes to determine European Portuguese markers
    const europeanPortugueseMarkers = analyzeFootnotes(posElement);

    tables.forEach(table => {
      const rows = table.querySelectorAll('tr');
      let currentTense = '';

      let currentSection: ConjugationSection = {
        name: '',
        tenses: [],
      };

      rows.forEach(row => {
        // Check for section headers (indicative, subjunctive, etc.)
        const sectionHeader = row.querySelector('th[colspan="7"]');
        if (sectionHeader) {
          if (currentSection.tenses.length > 0) {
            conjugationSections.push(currentSection);
          }

          currentSection = {
            name: sectionHeader.textContent?.trim() || '',
            tenses: [],
          };
          return;
        }

        // Indicative, subjunctive
        const tenseHeader = row.querySelector(
          'th.roa-indicative-left-rail, th.roa-subjunctive-left-rail'
        );
        if (tenseHeader && !tenseHeader.hasAttribute('rowspan')) {
          currentTense = tenseHeader.textContent?.trim() || '';

          // Get conjugated forms from the same row
          const cells = row.querySelectorAll('td:has(span)');
          if (cells.length >= 6) {
            currentSection.tenses.push({
              name: currentTense,
              forms: [
                {
                  person: 'eu',
                  form: extractEuropeanPortuguese(
                    cells[0],
                    europeanPortugueseMarkers
                  ),
                },
                {
                  person: 'tu',
                  form: extractEuropeanPortuguese(
                    cells[1],
                    europeanPortugueseMarkers
                  ),
                },
                {
                  person: 'ele',
                  form: extractEuropeanPortuguese(
                    cells[2],
                    europeanPortugueseMarkers
                  ),
                },
                {
                  person: 'nós',
                  form: extractEuropeanPortuguese(
                    cells[3],
                    europeanPortugueseMarkers
                  ),
                },
                {
                  person: 'eles',
                  form: extractEuropeanPortuguese(
                    cells[5],
                    europeanPortugueseMarkers
                  ),
                },
              ],
            });
          }
        }

        // Imperative
        const imperativeHeader = row.querySelector(
          'th.roa-imperative-left-rail'
        );
        if (imperativeHeader && !imperativeHeader.hasAttribute('colspan')) {
          currentTense = imperativeHeader.textContent?.trim() || '';

          const cells = row.querySelectorAll('td:has(span)');
          if (cells.length >= 5) {
            currentSection.tenses.push({
              name: currentTense,
              forms: [
                {
                  person: 'tu',
                  form: extractEuropeanPortuguese(
                    cells[0],
                    europeanPortugueseMarkers
                  ),
                },
                {
                  person: 'ele',
                  form: extractEuropeanPortuguese(
                    cells[1],
                    europeanPortugueseMarkers
                  ),
                },
                {
                  person: 'nós',
                  form: extractEuropeanPortuguese(
                    cells[2],
                    europeanPortugueseMarkers
                  ),
                },
                {
                  person: 'eles',
                  form: extractEuropeanPortuguese(
                    cells[4],
                    europeanPortugueseMarkers
                  ),
                },
              ],
            });
          }
        }

        // Handle non-finite forms (infinitive, gerund, past participle)
        const nonFiniteHeader = row.querySelector('th.roa-nonfinite-header');
        if (nonFiniteHeader && !nonFiniteHeader.hasAttribute('colspan')) {
          const formType = nonFiniteHeader.textContent?.trim() || '';
          const cells = row.querySelectorAll('td:has(span)');

          const sectionName = 'Non-finite forms';

          if (!sectionMap.has(sectionName)) {
            sectionMap.set(sectionName, []);
          }

          if (cells.length >= 2) {
            currentSection.tenses.push({
              name: formType,
              forms: [
                {
                  person: 'singular',
                  form: extractEuropeanPortuguese(
                    cells[0],
                    europeanPortugueseMarkers
                  ),
                },
                {
                  person: 'plural',
                  form: extractEuropeanPortuguese(
                    cells[1],
                    europeanPortugueseMarkers
                  ),
                },
              ],
            });
          } else if (cells.length === 1) {
            currentSection.tenses.push({
              name: formType,
              forms: [
                {
                  person: 'singular',
                  form: extractEuropeanPortuguese(
                    cells[0],
                    europeanPortugueseMarkers
                  ),
                },
                {
                  person: 'plural',
                  form: extractEuropeanPortuguese(
                    cells[0],
                    europeanPortugueseMarkers
                  ),
                },
              ],
            });
          }
        }
      });
    });

    return conjugationSections;
  } catch (error) {
    console.error('Error extracting conjugations from section:', error);
    return [];
  }
}

/**
 * Extract definitions from a specific part-of-speech section
 * @param posElement - The HTML element containing the part-of-speech section
 * @returns Array of definition strings
 */
function extractDefinitionsFromSection(posElement: Element): string[] {
  try {
    const definitions: string[] = [];

    // Look for definition lists (ol elements) within this section
    const definitionLists = posElement.querySelectorAll(':scope > ol');

    definitionLists.forEach(ol => {
      const listItems = ol.querySelectorAll(':scope > li');
      listItems.forEach(li => {
        // Extract the definition text, excluding usage examples and sub-definitions
        const definitionText = extractDefinitionText(li);
        if (definitionText) {
          definitions.push(definitionText);
        }
      });
    });

    return definitions;
  } catch (error) {
    console.error('Error extracting definitions from section:', error);
    return [];
  }
}

/**
 * Analyze footnotes to determine which superscript numbers correspond to European Portuguese
 * @param element - The HTML element containing the conjugation section
 * @returns Set of superscript numbers that indicate European Portuguese
 */
function analyzeFootnotes(element: Element): Set<string> {
  const europeanMarkers = new Set<string>();

  // Look for footnote sections
  const footnotes = element.querySelectorAll(
    '.roa-footnote-inner-div, .roa-footnote-outer-div'
  );

  footnotes.forEach(footnote => {
    // Look for superscript elements and their associated text
    const superscripts = footnote.querySelectorAll('sup[style*="color: red"]');

    superscripts.forEach(sup => {
      const supNumber = sup.textContent?.trim();
      if (!supNumber) return;

      // Get the text that follows this superscript
      let nextText = '';
      let nextNode = sup.nextSibling;

      // Collect text until we hit another superscript or end of content
      while (nextNode) {
        if (nextNode.nodeType === Node.TEXT_NODE) {
          nextText += nextNode.textContent || '';
        } else if (nextNode.nodeType === Node.ELEMENT_NODE) {
          const element = nextNode as Element;
          if (
            element.tagName === 'SUP' &&
            element.getAttribute('style')?.includes('color: red')
          ) {
            break; // Stop at next superscript
          }
          nextText += element.textContent || '';
        }
        nextNode = nextNode.nextSibling;
      }

      // Check if this text indicates European Portuguese
      const lowerText = nextText.toLowerCase();
      if (lowerText.includes('european portuguese')) {
        europeanMarkers.add(supNumber);
      }
    });
  });

  return europeanMarkers;
}

/**
 * Extract European Portuguese form from a table cell that may contain multiple variants
 * @param cell - The table cell element
 * @param europeanMarkers - Set of superscript numbers that indicate European Portuguese
 * @returns The European Portuguese form or the whole text if unclear
 */
function extractEuropeanPortuguese(
  cell: Element,
  europeanMarkers: Set<string>
): string {
  const textContent = cell.textContent?.trim() || '';

  // If there's no comma, return the text as is
  if (!textContent.includes(',')) {
    return textContent;
  }

  // Look for superscript numbers to identify variants
  const superscripts = cell.querySelectorAll('sup[style*="color: red"]');

  if (superscripts.length > 0 && europeanMarkers.size > 0) {
    // Try to find European Portuguese form based on analyzed footnotes
    for (const sup of superscripts) {
      const supText = sup.textContent?.trim();

      if (supText && europeanMarkers.has(supText)) {
        // Find the span that comes before this superscript
        const spans = cell.querySelectorAll('span');

        for (const span of spans) {
          if (
            span.nextElementSibling === sup ||
            (span.parentElement &&
              span.parentElement.nextElementSibling === sup)
          ) {
            const europeanForm = span.textContent?.trim() || '';
            if (europeanForm) {
              return europeanForm;
            }
          }
        }
      }
    }
  }

  // If no clear European Portuguese form found, return the whole text
  return textContent;
}

/**
 * Extract clean definition text from a list item element
 * @param li - The list item element containing the definition
 * @returns Clean definition text
 */
function extractDefinitionText(li: Element): string {
  // Clone the element to avoid modifying the original
  const clone = li.cloneNode(true) as Element;

  // Remove usage examples (usually in dl/dd elements)
  clone.querySelectorAll('dl, dd').forEach(el => el.remove());

  // Remove nested lists (sub-definitions)
  clone.querySelectorAll('ol, ul').forEach(el => el.remove());

  // Remove styles
  clone.querySelectorAll('style').forEach(el => el.remove());

  // Remove quotations and citations
  clone
    .querySelectorAll('.h-quotation, .citation-whole')
    .forEach(el => el.remove());

  // Get the text content and clean it up
  let definitionText = clone.textContent?.trim() || '';

  // Remove extra whitespace and normalize
  definitionText = definitionText.replace(/\s+/g, ' ').trim();

  // Remove empty parentheses and brackets
  definitionText = definitionText
    .replace(/\(\s*\)/g, '')
    .replace(/\[\s*\]/g, '');

  return definitionText;
}
