<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let min = 0;
  export let max = 99;
  export let value = null;

  const dispatch = createEventDispatcher<{ change: number }>();

  function decrement() {
    if (value === null) {
      dispatch('change', 0);
    }

    if (value > min) {
      dispatch('change', value - 1);
    }
  }

  function increment() {
    if (value === null) {
      dispatch('change', 0);
    }

    if (value < max) {
      dispatch('change', value + 1);
    }
  }
</script>

<div class="number-picker">
  <button class="decrement btn btn-primary" on:click={decrement}>-</button>
  <div class="value">{value}</div>
  <button class="increment btn btn-primary" on:click={increment}>+</button>
</div>

<style>
  .number-picker {
    display: flex;
    align-items: center;
    background-color: #d6d8d9;
    border-radius: 0.25rem;
    padding: 0.25rem;
  }

  .decrement,
  .value,
  .increment {
    flex: 1;
  }

  .value {
    font-size: 1.2rem;
    display: flex;
    place-content: center;
  }
</style>
