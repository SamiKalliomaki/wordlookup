import { describe, it, expect, beforeEach } from 'vitest';
import WiktionaryService from './wiktionary';

describe('WiktionaryService', () => {
  let service: WiktionaryService;

  beforeEach(() => {
    service = new WiktionaryService();
  });

  it('returns word info', async () => {
    const result = await service.getWordInfo('esperar');
    expect(result).toEqual({
      word: 'esperar',
      partsOfSpeech: {
        Verb: {
          definitions: [
            'to wait',
            'to hope',
            'to expect; to anticipate (to know or think that something will happen) [with direct object or por ‘something’]',
          ],
          conjugations: [
            {
              name: 'Infinitive',
              tenses: [
                {
                  name: 'Impersonal',
                  forms: [
                    {
                      person: 'singular',
                      form: 'esperar',
                    },
                    {
                      person: 'plural',
                      form: 'esperar',
                    },
                  ],
                },
                {
                  name: 'Personal',
                  forms: [
                    {
                      person: 'singular',
                      form: 'esperar',
                    },
                    {
                      person: 'plural',
                      form: 'esperares',
                    },
                  ],
                },
              ],
            },
            {
              name: 'Past participle',
              tenses: [
                {
                  name: 'Masculine',
                  forms: [
                    {
                      person: 'singular',
                      form: 'esperado',
                    },
                    {
                      person: 'plural',
                      form: 'esperados',
                    },
                  ],
                },
                {
                  name: 'Feminine',
                  forms: [
                    {
                      person: 'singular',
                      form: 'esperada',
                    },
                    {
                      person: 'plural',
                      form: 'esperadas',
                    },
                  ],
                },
              ],
            },
            {
              name: 'Indicative',
              tenses: [
                {
                  name: 'Present',
                  forms: [
                    {
                      person: 'eu',
                      form: 'espero',
                    },
                    {
                      person: 'tu',
                      form: 'esperas',
                    },
                    {
                      person: 'ele',
                      form: 'espera',
                    },
                    {
                      person: 'nós',
                      form: 'esperamos',
                    },
                    {
                      person: 'eles',
                      form: 'esperam',
                    },
                  ],
                },
                {
                  name: 'Imperfect',
                  forms: [
                    {
                      person: 'eu',
                      form: 'esperava',
                    },
                    {
                      person: 'tu',
                      form: 'esperavas',
                    },
                    {
                      person: 'ele',
                      form: 'esperava',
                    },
                    {
                      person: 'nós',
                      form: 'esperávamos',
                    },
                    {
                      person: 'eles',
                      form: 'esperavam',
                    },
                  ],
                },
                {
                  name: 'Preterite',
                  forms: [
                    {
                      person: 'eu',
                      form: 'esperei',
                    },
                    {
                      person: 'tu',
                      form: 'esperaste',
                    },
                    {
                      person: 'ele',
                      form: 'esperou',
                    },
                    {
                      person: 'nós',
                      form: 'esperámos',
                    },
                    {
                      person: 'eles',
                      form: 'esperaram',
                    },
                  ],
                },
                {
                  name: 'Pluperfect',
                  forms: [
                    {
                      person: 'eu',
                      form: 'esperara',
                    },
                    {
                      person: 'tu',
                      form: 'esperaras',
                    },
                    {
                      person: 'ele',
                      form: 'esperara',
                    },
                    {
                      person: 'nós',
                      form: 'esperáramos',
                    },
                    {
                      person: 'eles',
                      form: 'esperaram',
                    },
                  ],
                },
                {
                  name: 'Future',
                  forms: [
                    {
                      person: 'eu',
                      form: 'esperarei',
                    },
                    {
                      person: 'tu',
                      form: 'esperarás',
                    },
                    {
                      person: 'ele',
                      form: 'esperará',
                    },
                    {
                      person: 'nós',
                      form: 'esperaremos',
                    },
                    {
                      person: 'eles',
                      form: 'esperarão',
                    },
                  ],
                },
                {
                  name: 'Conditional',
                  forms: [
                    {
                      person: 'eu',
                      form: 'esperaria',
                    },
                    {
                      person: 'tu',
                      form: 'esperarias',
                    },
                    {
                      person: 'ele',
                      form: 'esperaria',
                    },
                    {
                      person: 'nós',
                      form: 'esperaríamos',
                    },
                    {
                      person: 'eles',
                      form: 'esperariam',
                    },
                  ],
                },
              ],
            },
            {
              name: 'Subjunctive',
              tenses: [
                {
                  name: 'Present',
                  forms: [
                    {
                      person: 'eu',
                      form: 'espere',
                    },
                    {
                      person: 'tu',
                      form: 'esperes',
                    },
                    {
                      person: 'ele',
                      form: 'espere',
                    },
                    {
                      person: 'nós',
                      form: 'esperemos',
                    },
                    {
                      person: 'eles',
                      form: 'esperem',
                    },
                  ],
                },
                {
                  name: 'Imperfect',
                  forms: [
                    {
                      person: 'eu',
                      form: 'esperasse',
                    },
                    {
                      person: 'tu',
                      form: 'esperasses',
                    },
                    {
                      person: 'ele',
                      form: 'esperasse',
                    },
                    {
                      person: 'nós',
                      form: 'esperássemos',
                    },
                    {
                      person: 'eles',
                      form: 'esperassem',
                    },
                  ],
                },
                {
                  name: 'Future',
                  forms: [
                    {
                      person: 'eu',
                      form: 'esperar',
                    },
                    {
                      person: 'tu',
                      form: 'esperares',
                    },
                    {
                      person: 'ele',
                      form: 'esperar',
                    },
                    {
                      person: 'nós',
                      form: 'esperarmos',
                    },
                    {
                      person: 'eles',
                      form: 'esperarem',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    });
  });
});
