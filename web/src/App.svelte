<script>
  import { onMount } from 'svelte';
  import Slideshow from './Slideshow.svelte';
  import Status from './Status.svelte';
  import logo from './assets/logo.webp';
  import { progress, serverName, brand, onMessage, onKey } from './loader.js';

  onMount(() => {
    document.title = `${serverName} Loadingscreen`;
    window.addEventListener('message', onMessage);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('message', onMessage);
      window.removeEventListener('keydown', onKey);
    };
  });
</script>

<Slideshow />

<header class="brand">
  {#if brand === 'logo'}
    <img src={logo} alt={serverName} />
  {:else}
    <span>{serverName}</span>
  {/if}
</header>

<footer class="bottom">
  <Status />
  <span class="percent">{Math.floor($progress * 100)}%</span>
</footer>

<div class="track">
  <div class="fill" style:transform="scaleX({$progress})"></div>
</div>

<style>
  .brand {
    position: fixed;
    top: 48px;
    left: 56px;
    animation: rise 700ms ease-out both;
  }

  .brand img {
    display: block;
    width: 96px;
    height: auto;
    user-select: none;
    -webkit-user-drag: none;
  }

  .brand span {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .bottom {
    position: fixed;
    left: 56px;
    right: 56px;
    bottom: 56px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    animation: rise 700ms ease-out both;
  }

  .percent {
    font-size: 56px;
    font-weight: 300;
    line-height: 0.9;
    font-variant-numeric: tabular-nums;
  }

  .track {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: var(--line);
  }

  .fill {
    width: 100%;
    height: 100%;
    background: var(--accent);
    transform-origin: left center;
    transition: transform 250ms ease-out;
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .brand,
    .bottom {
      animation: none;
    }
  }
</style>
