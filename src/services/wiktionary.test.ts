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
      partsOfSpeech: [
        {
          name: 'Verb',
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
      ],
    });
  });

  it('returns word info for vir', async () => {
    const result = await service.getWordInfo('vir');
    expect(result).toEqual({
      word: 'vir',
      partsOfSpeech: [
        {
          name: 'Verb',
          definitions: [
            '(intransitive) to come (to move towards the speaker or the agent)',
            '(intransitive) to come; to arrive (to reach a destination, especially where the speaker is)',
            '(intransitive) to come (to manifest itself; to occur)',
            '(intransitive) to come (to be located in a certain position in a sequence)',
            '(intransitive) to come from; to be from (to have as one’s place of origin) [with de ‘somewhere’]',
            '(intransitive) to be caused by; to be due to [with de ‘a cause’]',
            'to come back; to return [with de ‘from somewhere’]',
            '(auxiliary) have/has been (forms the present perfect progressive aspect) [with gerund]',
            '(auxiliary) to end up (to eventually do) [with a (+ infinitive) ‘doing something’]',
            '(intransitive, colloquial) to bitch; to whine (to complain, especially unnecessarily) [with com ‘about someone/something’]',
            '(reflexive) to come (to have an orgasm)',
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
                      form: 'vir',
                    },
                    {
                      person: 'plural',
                      form: 'vir',
                    },
                  ],
                },
                {
                  name: 'Personal',
                  forms: [
                    {
                      person: 'singular',
                      form: 'vir',
                    },
                    {
                      person: 'plural',
                      form: 'vires',
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
                      form: 'vindo',
                    },
                    {
                      person: 'plural',
                      form: 'vindos',
                    },
                  ],
                },
                {
                  name: 'Feminine',
                  forms: [
                    {
                      person: 'singular',
                      form: 'vinda',
                    },
                    {
                      person: 'plural',
                      form: 'vindas',
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
                      form: 'venho',
                    },
                    {
                      person: 'tu',
                      form: 'vens',
                    },
                    {
                      person: 'ele',
                      form: 'vem',
                    },
                    {
                      person: 'nós',
                      form: 'vimos',
                    },
                    {
                      person: 'eles',
                      form: 'vêm',
                    },
                  ],
                },
                {
                  name: 'Imperfect',
                  forms: [
                    {
                      person: 'eu',
                      form: 'vinha',
                    },
                    {
                      person: 'tu',
                      form: 'vinhas',
                    },
                    {
                      person: 'ele',
                      form: 'vinha',
                    },
                    {
                      person: 'nós',
                      form: 'vínhamos',
                    },
                    {
                      person: 'eles',
                      form: 'vinham',
                    },
                  ],
                },
                {
                  name: 'Preterite',
                  forms: [
                    {
                      person: 'eu',
                      form: 'vim',
                    },
                    {
                      person: 'tu',
                      form: 'vieste',
                    },
                    {
                      person: 'ele',
                      form: 'veio',
                    },
                    {
                      person: 'nós',
                      form: 'viemos',
                    },
                    {
                      person: 'eles',
                      form: 'vieram',
                    },
                  ],
                },
                {
                  name: 'Pluperfect',
                  forms: [
                    {
                      person: 'eu',
                      form: 'viera',
                    },
                    {
                      person: 'tu',
                      form: 'vieras',
                    },
                    {
                      person: 'ele',
                      form: 'viera',
                    },
                    {
                      person: 'nós',
                      form: 'viéramos',
                    },
                    {
                      person: 'eles',
                      form: 'vieram',
                    },
                  ],
                },
                {
                  name: 'Future',
                  forms: [
                    {
                      person: 'eu',
                      form: 'virei',
                    },
                    {
                      person: 'tu',
                      form: 'virás',
                    },
                    {
                      person: 'ele',
                      form: 'virá',
                    },
                    {
                      person: 'nós',
                      form: 'viremos',
                    },
                    {
                      person: 'eles',
                      form: 'virão',
                    },
                  ],
                },
                {
                  name: 'Conditional',
                  forms: [
                    {
                      person: 'eu',
                      form: 'viria',
                    },
                    {
                      person: 'tu',
                      form: 'virias',
                    },
                    {
                      person: 'ele',
                      form: 'viria',
                    },
                    {
                      person: 'nós',
                      form: 'viríamos',
                    },
                    {
                      person: 'eles',
                      form: 'viriam',
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
                      form: 'venha',
                    },
                    {
                      person: 'tu',
                      form: 'venhas',
                    },
                    {
                      person: 'ele',
                      form: 'venha',
                    },
                    {
                      person: 'nós',
                      form: 'venhamos',
                    },
                    {
                      person: 'eles',
                      form: 'venham',
                    },
                  ],
                },
                {
                  name: 'Imperfect',
                  forms: [
                    {
                      person: 'eu',
                      form: 'viesse',
                    },
                    {
                      person: 'tu',
                      form: 'viesses',
                    },
                    {
                      person: 'ele',
                      form: 'viesse',
                    },
                    {
                      person: 'nós',
                      form: 'viéssemos',
                    },
                    {
                      person: 'eles',
                      form: 'viessem',
                    },
                  ],
                },
                {
                  name: 'Future',
                  forms: [
                    {
                      person: 'eu',
                      form: 'vier',
                    },
                    {
                      person: 'tu',
                      form: 'vieres',
                    },
                    {
                      person: 'ele',
                      form: 'vier',
                    },
                    {
                      person: 'nós',
                      form: 'viermos',
                    },
                    {
                      person: 'eles',
                      form: 'vierem',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'Verb',
          definitions: [
            'first/third-person singular future subjunctive of ver',
          ],
        },
        {
          name: 'Noun',
          definitions: ['whirlpool', '(regional) source'],
        },
      ],
    });
  });
});
