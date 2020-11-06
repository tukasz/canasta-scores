<script lang="ts">
  import { CalculatorFormFieldType } from './types';
  import type { CalculatorFormField } from './types';

  let fields: CalculatorFormField[] = [
    {
      label: 'Wyłożono wszystkie karty za jednym razem',
      type: CalculatorFormFieldType.CHECKBOX,
      points: 200
    },
    {
      label: 'Wyłożono wszystkie karty',
      type: CalculatorFormFieldType.CHECKBOX,
      points: 100
    },
    {
      label: 'Kanasty Joker / 2',
      type: CalculatorFormFieldType.NUMBER,
      points: 1000
    },
    {
      label: 'Naturalne kanasty',
      type: CalculatorFormFieldType.NUMBER,
      points: 500
    },
    {
      label: 'Mieszane kanasty',
      type: CalculatorFormFieldType.NUMBER,
      points: 300
    },
    {
      label: 'Czerwone 3',
      type: CalculatorFormFieldType.NUMBER,
      points: 100,
      isSpecial: true
    },
    {
      label: 'Karty Joker na stole',
      type: CalculatorFormFieldType.NUMBER,
      points: 50
    },
    {
      label: 'Karty A, 2 na stole',
      type: CalculatorFormFieldType.NUMBER,
      points: 20
    },
    {
      label: 'Karty K, Q, J, 10, 9, 8 na stole',
      type: CalculatorFormFieldType.NUMBER,
      points: 10
    },
    {
      label: 'Karty 7, 6, 5, 4, 3 na stole',
      type: CalculatorFormFieldType.NUMBER,
      points: 5
    },
    {
      label: 'Karty Joker na ręce',
      type: CalculatorFormFieldType.NUMBER,
      points: -50
    },
    {
      label: 'Karty A, 2 na ręce',
      type: CalculatorFormFieldType.NUMBER,
      points: -20
    },
    {
      label: 'Karty K, Q, J, 10, 9, 8 na ręce',
      type: CalculatorFormFieldType.NUMBER,
      points: -10
    },
    {
      label: 'Karty 7, 6, 5, 4, 3 na ręce',
      type: CalculatorFormFieldType.NUMBER,
      points: -5
    }
  ]

  let score = 0

  function updateScore() {
    score = fields.reduce((sum, field) => {
      if (field.isSpecial) {
        let value = ((field.value || 0) * field.points)

        if (value === 400) {
          value = 800;
        }

        if (!fields[0].value && !fields[1].value) {
          value = -value;
        }

        return sum + value;
      } else {
        switch (field.type) {
          case CalculatorFormFieldType.CHECKBOX:
            return sum + (field.value ? field.points : 0)

          case CalculatorFormFieldType.NUMBER:
            return sum + ((field.value || 0) * field.points)
        }
      }

      return sum
    }, 0)
  }

  function resetScore() {
    fields = fields.map(field => ({
      ...field,
      value: null
    }))

    updateScore()
  }
</script>

<div class="calculator">
  {#each fields as field}
    <div class="row">
      <div class="description">
        <div class="label">{field.label}</div>

        {#if field.description}
           <div class="sublabel">{field.description}</div>
        {/if}
      </div>

      <div class="value">
        {#if field.type === CalculatorFormFieldType.CHECKBOX}
          <input type="checkbox" bind:checked={field.value} on:change={updateScore} on:input={updateScore}>
        {:else if  field.type === CalculatorFormFieldType.NUMBER}
          <input type="number" bind:value={field.value} on:change={updateScore} on:input={updateScore}>
        {/if}
      </div>
    </div>
  {/each}

  <h3>Wynik: {score}</h3>

  <button on:click={resetScore}>Wyczyść</button>
</div>

<style>
  .row {
    /* display: flex; */
    margin-bottom: 0.5rem;
  }
</style>