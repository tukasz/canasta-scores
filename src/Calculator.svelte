<script lang="ts">
  import ToggleButtons from './ToggleButtons.svelte';
  import NumberPicker from './NumberPicker.svelte';

  const meldsStyleButtons = [
    {
      label: 'Żadne',
      value: 'no',
    },
    {
      label: 'Część',
      value: 'some',
    },
    {
      label: 'Wszystkie',
      value: 'all',
    },
    {
      label: 'Wszystkie od razu',
      value: 'all-at-once',
    },
  ];

  let meldsStyle = null;

  const countersMap = {
    wildcardCanastas: {
      count: 0,
      score: 1000,
    },
    naturalCanastas: {
      count: 0,
      score: 500,
    },
    mixedCanastas: {
      count: 0,
      score: 300,
    },
    jokers: {
      count: 0,
      score: 50,
    },
    acesTwos: {
      count: 0,
      score: 20,
    },
    kingsToEights: {
      count: 0,
      score: 10,
    },
    sevensToThrees: {
      count: 0,
      score: 5,
    },
    jokersOnHand: {
      count: 0,
      score: -50,
    },
    acesTwosOnHand: {
      count: 0,
      score: -20,
    },
    kingsToEightsOnHand: {
      count: 0,
      score: -10,
    },
    sevensToThreesOnHand: {
      count: 0,
      score: -5,
    },
  };

  const counterFields: Array<{
    label: string;
    countersMapField: keyof typeof countersMap;
    group: number;
  }> = [
    {
      label: 'Kanasty "podpórkowe"',
      countersMapField: 'wildcardCanastas',
      group: 1,
    },
    {
      label: 'Kanasty naturalne',
      countersMapField: 'naturalCanastas',
      group: 1,
    },
    {
      label: 'Kanasty mieszane',
      countersMapField: 'mixedCanastas',
      group: 1,
    },
    {
      label: 'Jokery na stole',
      countersMapField: 'jokers',
      group: 2,
    },
    {
      label: 'Asy i 2 na stole',
      countersMapField: 'acesTwos',
      group: 2,
    },
    {
      label: 'K, Q, J, 10, 9, 8 na stole',
      countersMapField: 'kingsToEights',
      group: 2,
    },
    {
      label: '7, 6, 5, 4, 3 na stole',
      countersMapField: 'sevensToThrees',
      group: 2,
    },
    {
      label: 'Jokery na ręce',
      countersMapField: 'jokersOnHand',
      group: 3,
    },
    {
      label: 'Asy i 2 na ręce',
      countersMapField: 'acesTwosOnHand',
      group: 3,
    },
    {
      label: 'K, Q, J, 10, 9, 8 na ręce',
      countersMapField: 'kingsToEightsOnHand',
      group: 3,
    },
    {
      label: '7, 6, 5, 4, 3 na ręce',
      countersMapField: 'sevensToThreesOnHand',
      group: 3,
    },
  ];

  const meldCounters = counterFields.filter(fields => fields.group === 1);
  const tableCardsCounters = counterFields.filter(fields => fields.group === 2);
  const handCardsCounters = counterFields.filter(fields => fields.group === 3);

  let red3sCount = 0;

  let score = 0;

  function updateScore() {
    score = 0;

    // Melds
    switch (meldsStyle) {
      case 'all':
        score += 100;

        break;

      case 'all-at-once':
        score += 200;
    }

    // Standard numeric values
    counterFields.forEach(field => {
      score += countersMap[field.countersMapField].score * countersMap[field.countersMapField].count;
    });

    // Red threes
    if (meldsStyle === 'all' || meldsStyle === 'all-at-once') {
      score += red3sCount === 4 ? 800 : red3sCount * 100;
    } else {
      score -= red3sCount === 4 ? 800 : red3sCount * 100;
    }
  }

  function resetScore() {
    meldsStyle = null;
    red3sCount = 0;

    counterFields.forEach(field => {
      countersMap[field.countersMapField].count = 0;
    });

    updateScore();
  }

  function updateMeldsStyle(event: CustomEvent<string | number | boolean>) {
    meldsStyle = event.detail;

    if (meldsStyle === 'all' || meldsStyle === 'all-at-once') {
      handCardsCounters.forEach(counter => {
        countersMap[counter.countersMapField].count = 0;
      });
    }

    updateScore();
  }

  function updateCount(countName: keyof typeof countersMap, value: number) {
    countersMap[countName].count = value;

    updateScore();
  }

  function updateRed3sCount(value: number) {
    red3sCount = value;

    updateScore();
  }
</script>

<div class="calculator">
  <div class="form">
    <div class="row">
      <div class="field-label">Wyłożono karty:</div>

      <ToggleButtons items={meldsStyleButtons} value={meldsStyle} on:change={updateMeldsStyle} />
    </div>

    <div class="separator" />

    <div class="two-columns">
      {#each meldCounters as field}
        <div class="row">
          <div class="field-label">
            {@html field.label}:
          </div>

          <NumberPicker
            value={countersMap[field.countersMapField].count}
            on:change={event => updateCount(field.countersMapField, event.detail)} />
        </div>
      {/each}

      <div class="row">
        <div class="field-label">Czerwone 3:</div>

        <NumberPicker max={4} value={red3sCount} on:change={event => updateRed3sCount(event.detail)} />
      </div>
    </div>

    <div class="separator" />

    <div class="two-columns">
      {#each tableCardsCounters as field}
        <div class="row">
          <div class="field-label">
            {@html field.label}:
          </div>

          <NumberPicker
            value={countersMap[field.countersMapField].count}
            on:change={event => updateCount(field.countersMapField, event.detail)} />
        </div>
      {/each}
    </div>

    {#if meldsStyle === 'no' || meldsStyle === 'some'}
      <div class="separator" />

      <div class="two-columns">
        {#each handCardsCounters as field}
          <div class="row">
            <div class="field-label">
              {@html field.label}:
            </div>

            <NumberPicker
              value={countersMap[field.countersMapField].count}
              on:change={event => updateCount(field.countersMapField, event.detail)} />
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div class="footer panel panel-dark">
    <div class="score">Wynik: <span class="score-value">{score}</span></div>

    <div class="reset-button"><button class="btn btn-primary" on:click={resetScore}>Wyczyść</button></div>
  </div>
</div>

<style>
  .form {
    padding: 1rem;
    margin-bottom: 4rem;
  }

  .row {
    margin-bottom: 0.75rem;
  }

  .two-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2rem;
  }

  .field-label {
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }

  .footer {
    position: fixed;
    bottom: 0.25rem;
    left: 0.25rem;
    right: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .score-value {
    font-weight: bold;
  }

  .separator {
    width: 50%;
    margin: auto;
    border-top: 1px solid #c6c8ca;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
</style>
