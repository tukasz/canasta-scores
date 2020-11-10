<script lang="ts">
  import ToggleButtons from './ToggleButtons.svelte';
  import NumberPicker from './NumberPicker.svelte';
  import TooltipIcon from './TooltipIcon.svelte';
  import type { CountableField } from './config';
  import { CardsOnTable, SpecialFieldType, cardsOnTableooltipHtml, footerTooltipHtml, countableFieldGroups, meldsStyleButtons } from './config';

  let fieldGroups = [...countableFieldGroups]

  let meldsStyle = null;

  let score = 0;

  function updateScore() {
    score = 0;

    // Melds
    switch (meldsStyle) {
      case CardsOnTable.ALL:
        score += 100;

        break;

      case CardsOnTable.ALL_AT_ONCE:
        score += 200;
    }

    fieldGroups.forEach(group => {
      group.fields.forEach(field => {
        if (field.specialFieldType === SpecialFieldType.RED_THREE) {
          // Red threes
          if (meldsStyle === CardsOnTable.ALL || meldsStyle === CardsOnTable.ALL_AT_ONCE || meldsStyle === CardsOnTable.SOME) {
            score += field.count === 4 ? 800 : field.count * 100;
          } else {
            score -= field.count === 4 ? 800 : field.count * 100;
          }
        } else {
          // Standard numeric values
          score += field.count * field.score
        }
      })
    })
  }

  function resetScore() {
    meldsStyle = null;

    fieldGroups.forEach(group => {
      group.fields.forEach(field => {
        field.count  = 0
      })
    })

    updateScore();
  }

  function updateMeldsStyle(event: CustomEvent<string | number | boolean>) {
    meldsStyle = event.detail;

    if (meldsStyle === CardsOnTable.ALL || meldsStyle === CardsOnTable.ALL_AT_ONCE) {
      fieldGroups.forEach(group => {
        group.fields.forEach(field => {
          if (field.score < 0) {
            field.count  = 0
          }
        })
      })
    }

    if (meldsStyle === CardsOnTable.NONE) {
      fieldGroups.forEach(group => {
        group.fields.forEach(field => {
          if (field.score > 0 && field.specialFieldType !== SpecialFieldType.RED_THREE) {
            field.count  = 0
          }
        })
      })
    }

    updateScore();
  }

  function updateCount(field: CountableField, value: number) {
    fieldGroups = fieldGroups.map(group => {
      return {
        ...group,
        fields: group.fields.map(f => {
          if (f === field) {
            return {
              ...f,
              count: value
            }
          }

          return {
            ...f
          }
        })
      }
    })

    updateScore();
  }
</script>

<div class="calculator">
  <div class="form">
    <div class="row">
      <div class="field-label">Wyłożono karty: <TooltipIcon text={cardsOnTableooltipHtml} heading='Wyłożone karty' /></div>

      <ToggleButtons items={meldsStyleButtons} value={meldsStyle} on:change={updateMeldsStyle} />
    </div>

    {#each fieldGroups as group}
      {#if group.fields.reduce((result, field) => {
        return [
          ...result,
          ...field.visibleFor
        ]
      }, []).includes(meldsStyle)}
        <div class="separator" />

        <div class="two-columns">
          {#each group.fields as field}
            {#if field.visibleFor.includes(meldsStyle)}
              <div class="row">
                <div class="field-label">
                  {field.label} <TooltipIcon text={field.tooltipHtml} heading={field.label} />:
                </div>

                <NumberPicker
                  value={field.count}
                  on:change={event => updateCount(field, event.detail)}
                  max={field.maxCount} />
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    {/each}

    <div class="footer panel panel-dark">
      <div class="score">Wynik: <span class="score-value">{score}</span></div>

      <TooltipIcon text={footerTooltipHtml} heading='Minimalna ilość punktów' size={24} />

      <div class="reset-button"><button class="btn btn-primary" on:click={resetScore}>Wyczyść</button></div>
    </div>
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
    margin-bottom: 0.5rem;
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
