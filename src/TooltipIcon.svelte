<script lang="ts">
  import ModalTooltip from "./ModalTooltip.svelte";

  export let text: string;
  export let heading = 'Wskazówka';
  export let size = 16;

  let isModalVisible = false;
</script>

<div class="tooltip-icon">
  <span
    class="icon"
    on:click={() => isModalVisible = true}
  ><svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>
</div>

{#if isModalVisible}
  <ModalTooltip {text} {heading} on:close={() => isModalVisible = false} />
{/if}

<style>
  .tooltip-icon {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .icon {
    position: relative;
    top: 0.2rem;
  }
</style>