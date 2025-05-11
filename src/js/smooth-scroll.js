export const scrollToElement = (target, duration = 500) => {
      const start = window.scrollY;
      const end = target.getBoundingClientRect().top + start;
      const distance = end - start;
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, start + distance * ease);

        if (elapsed < duration) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    };