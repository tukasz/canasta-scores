<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { LabelValue } from './types';

  export let items: LabelValue[];
  export let value: string | number | boolean = null;

  const dispatch = createEventDispatcher<{ change: string | number | boolean }>();

  function toggle(item: LabelValue) {
    dispatch('change', item.value);
  }
</script>

<div class="toggle-buttons">
  {#each items as item}
    <button
      class="button btn btn-sm"
      class:btn-primary={value === item.value}
      class:btn-secondary={value !== item.value}
      on:click={() => toggle(item)}>{item.label}</button>
  {/each}
</div>

<style>
  .toggle-buttons {
    display: flex;
    width: 100%;
  }

  .button {
    flex: 1 auto;
    margin-right: 0.25rem;
  }

  .button:last-child {
    margin-right: 0;
  }
</style>
