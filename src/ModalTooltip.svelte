<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{ close: void }>()

  export let text: string;
  export let heading = 'Wskazówka';
</script>

<div class="modal-tooltip">
  <div class="overlay"></div>
  <div class="modal-container">
    <div class="tooltip-content">
      <div class="header">
        {heading}
        <div class="close-icon" on:click={() => dispatch('close')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        </div>
      </div>

      <div class="body">
        {@html text || 'Brak wskazówki :-('}
      </div>
    </div>
  </div>
</div>

<style>
  .modal-tooltip {
    display: inline;
  }

  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
    -o-filter: blur(2px);
    -ms-filter: blur(2px);
    filter: blur(2px);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .modal-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .tooltip-content {
    border-radius: 0.25rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
    max-width: 80vw;
  }

  .header {
    position: relative;
    padding: .5rem .75rem;
    padding-right: 2.5rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 500;
    background-color: #f7f7f7;
    border-bottom: 1px solid #ebebeb;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }

  .close-icon {
    position: absolute;
    cursor: pointer;
    right: 0.25rem;
    top: 0.5rem;
  }

  .body {
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
  }
</style>