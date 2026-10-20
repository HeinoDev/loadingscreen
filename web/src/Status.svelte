<script>
  import { status, joinReady, joining } from './loader.js';
</script>

<div class="status" class:faded={$joining}>
  {#if $joinReady}
    <p>Tryk <kbd>ENTER</kbd> for at joine byen</p>
  {:else}
    <p>{$status}</p>
  {/if}
</div>

<style>
  .status {
    font-size: 15px;
    line-height: 1.8;
    color: var(--dim);
    white-space: nowrap;
    transition: opacity 200ms ease;
  }

  .status :global(kbd) {
    margin: 0 4px;
    padding: 3px 8px;
    line-height: 1.4;
    border: 1px solid var(--dim);
    border-radius: 2px;
    color: var(--ink);
    font-family: inherit;
    font-size: 12px;
    letter-spacing: 0.08em;
  }

  .faded {
    opacity: 0.4;
  }
</style>
