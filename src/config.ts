import { md2Html } from './utils';

export enum SpecialFieldType {
  RED_THREE = 'RED_THREE',
}

export interface CountableField {
  label: string;
  count: number;
  maxCount?: number;
  score: number;
  visibleFor: CardsOnTable[];
  tooltipHtml: string;
  specialFieldType?: SpecialFieldType;
}

interface CountableFieldsGroup {
  label: string;
  fields: CountableField[];
}

export enum CardsOnTable {
  NONE = 'no',
  SOME = 'some',
  ALL = 'all',
  ALL_AT_ONCE = 'all-at-once',
}

export const meldsStyleButtons = [
  {
    label: 'Żadne',
    value: CardsOnTable.NONE,
  },
  {
    label: 'Część',
    value: CardsOnTable.SOME,
  },
  {
    label: 'Wszystkie',
    value: CardsOnTable.ALL,
  },
  {
    label: 'Wszystkie od razu',
    value: CardsOnTable.ALL_AT_ONCE,
  },
];

export const countableFieldGroups: CountableFieldsGroup[] = [
  {
    label: 'Kanasty i czerwone trójki',
    fields: [
      {
        label: 'Kanasty z dzikich kart',
        count: 0,
        score: 1000,
        visibleFor: [CardsOnTable.SOME, CardsOnTable.ALL, CardsOnTable.ALL_AT_ONCE],
        tooltipHtml: md2Html(
          'Za każdą wyłożoną kanastę złożoną wyłącznie z dzikich kart (`Joker` lub `2`) gracz otrzymuje _1000_ punktów.'
        ),
      },
      {
        label: 'Kanasty naturalne',
        count: 0,
        score: 500,
        visibleFor: [CardsOnTable.SOME, CardsOnTable.ALL, CardsOnTable.ALL_AT_ONCE],
        tooltipHtml: md2Html('Za każdą wyłożoną kanastę naturalną (bez dzikich kart) gracz otrzymuje _500_ punktów.'),
      },
      {
        label: 'Kanasty mieszane',
        count: 0,
        score: 300,
        visibleFor: [CardsOnTable.SOME, CardsOnTable.ALL, CardsOnTable.ALL_AT_ONCE],
        tooltipHtml: md2Html(
          'Za każdą wyłożoną kanastę mieszaną (zawierającą "zwykłe" oraz dzikie karty) gracz otrzymuje _300_ punktów.'
        ),
      },
      {
        label: 'Czerwone 3',
        count: 0,
        maxCount: 4,
        score: 300,
        visibleFor: [CardsOnTable.NONE, CardsOnTable.SOME, CardsOnTable.ALL, CardsOnTable.ALL_AT_ONCE],
        tooltipHtml: md2Html(
          'Jeżeli gracz wyłożył na stół jakiekolwiek karty (oprócz czerwonych `3`) to:\\' +
            '- za każdą wyłożoną czerwoną `3` otrzymuje _100_ punktów.\\' +
            '- jeżeli wyłożył wszystkie cztery czerwone `3`, to otrzymuje _800_ punktów.\\' +
            'Jeżeli gracz poza czerwonymi `3` nie wyłożył na stół jakiekolwiek karty to:\\' +
            '- za każdą wyłożoną czerwoną `3` traci _100_ punktów.\\' +
            '- jeżeli wyłożył wszystkie cztery czerwone `3`, to traci _800_ punktów.\\'
        ),
        specialFieldType: SpecialFieldType.RED_THREE,
      },
    ],
  },
  {
    label: 'Karty na stole',
    fields: [
      {
        label: 'Jokery na stole',
        count: 0,
        score: 50,
        visibleFor: [CardsOnTable.SOME, CardsOnTable.ALL, CardsOnTable.ALL_AT_ONCE],
        tooltipHtml: md2Html('Za każdego wyłożonego `Joker`a gracz otrzymuje _50_ punktów.'),
      },
      {
        label: 'A i 2 na stole',
        count: 0,
        score: 20,
        visibleFor: [CardsOnTable.SOME, CardsOnTable.ALL, CardsOnTable.ALL_AT_ONCE],
        tooltipHtml: md2Html('Za każdą wyłożoną kartę `A` i `2` gracz otrzymuje _20_ punktów.'),
      },
      {
        label: 'K, Q, J, 10, 9, 8 na stole',
        count: 0,
        score: 10,
        visibleFor: [CardsOnTable.SOME, CardsOnTable.ALL, CardsOnTable.ALL_AT_ONCE],
        tooltipHtml: md2Html('Za każdą wyłożoną kartę `K`, `Q`, `J`, `10`, `9` lub `8` gracz otrzymuje _10_ punktów.'),
      },
      {
        label: '7, 6, 5, 4, 3 na stole',
        count: 0,
        score: 5,
        visibleFor: [CardsOnTable.SOME, CardsOnTable.ALL, CardsOnTable.ALL_AT_ONCE],
        tooltipHtml: md2Html('Za każdą wyłożoną kartę `7`, `6`, `5`, `4` lub czarną `3` gracz otrzymuje _5_ punktów.'),
      },
    ],
  },
  {
    label: 'Karty w ręku',
    fields: [
      {
        label: 'Jokery na ręce',
        count: 0,
        score: -50,
        visibleFor: [CardsOnTable.SOME, CardsOnTable.NONE],
        tooltipHtml: md2Html('Za każdego pozostałego na ręce `Joker`a gracz traci _50_ punktów.'),
      },
      {
        label: 'A i 2 na ręce',
        count: 0,
        score: -20,
        visibleFor: [CardsOnTable.SOME, CardsOnTable.NONE],
        tooltipHtml: md2Html('Za każdą pozostałą na ręce kartę `A` i `2` gracz traci _20_ punktów.'),
      },
      {
        label: 'K, Q, J, 10, 9, 8 na ręce',
        count: 0,
        score: -10,
        visibleFor: [CardsOnTable.SOME, CardsOnTable.NONE],
        tooltipHtml: md2Html(
          'Za każdą pozostałą na ręce kartę `K`, `Q`, `J`, `10`, `9` lub `8` gracz traci _10_ punktów.'
        ),
      },
      {
        label: '7, 6, 5, 4, 3 na ręce',
        count: 0,
        score: -5,
        visibleFor: [CardsOnTable.SOME, CardsOnTable.NONE],
        tooltipHtml: md2Html(
          'Za każdą pozostałą na ręce kartę `7`, `6`, `5`, `4` lub czarną `3` gracz traci _5_ punktów.'
        ),
      },
    ],
  },
];

export const cardsOnTableooltipHtml = md2Html(
  'Za wyłożenie wszystkich kart gracz otrzymuje _100_ punktów.\\' +
    'Za wyłożenie wszystkich kart w jednej kolejce gracz otrzymuje _200_ punktów.\\' +
    'Za wyłożenie tylko cześci lub nie wyłożenie żadnych kart (poza czerwonymi `3`) gracz nie otrzymuje punktów.'
);

export const footerTooltipHtml = md2Html(
  'Gdy gracz wykłana karty na stół pierwszy raz w danym rozdaniu, to suma punktów wyłożonych kart musi wynosić minimum:\\' +
    ' - _15_  - jeśli gracz ma mniej niż 0 punktów\\' +
    ' - _50_  - jeśli gracz ma od 0 do 1495 punktów\\' +
    ' - _90_  - jeśli gracz ma od 1500 do 2995 punktów\\' +
    ' - _120_ - jeśli gracz ma 3000 punktów lub więcej'
);
