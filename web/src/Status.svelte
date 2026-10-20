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
    color: var(--dim);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 70vw;
    transition: opacity 200ms ease;
  }

  .status :global(kbd) {
    margin: 0 4px;
    padding: 2px 7px;
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
