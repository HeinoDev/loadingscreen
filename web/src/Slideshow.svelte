<script>
  import { onMount } from 'svelte';

  const HOLD = 6000;
  const MAX = 5;

  let slides = $state([]);
  let current = $state(0);

  function exists(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  onMount(() => {
    const names = [];
    for (let i = 1; i <= MAX; i++) {
      names.push(`hero/${String(i).padStart(2, '0')}.webp`);
    }
    Promise.all(names.map(exists)).then((found) => {
      slides = found.filter(Boolean);
    });

    const timer = setInterval(() => {
      if (slides.length > 1) current = (current + 1) % slides.length;
    }, HOLD);
    return () => clearInterval(timer);
  });
</script>

<div class="slideshow" aria-hidden="true">
  {#each slides as src, i (src)}
    <div class="slide" class:active={i === current} style:background-image="url('{src}')"></div>
  {/each}
</div>

<style>
  .slideshow {
    position: fixed;
    inset: 0;
    background: var(--bg);
  }

  .slide {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    filter: brightness(0.45) saturate(0.8);
    transition: opacity 1600ms ease-in-out;
  }

  .slide.active {
    opacity: 1;
  }

  .slideshow::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10, 10, 11, 0.85), rgba(10, 10, 11, 0) 60%);
  }
</style>
