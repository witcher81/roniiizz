(() => {
  /* Kick live badge (best-effort) */
  const liveEl = document.getElementById("kick-live");
  if (liveEl) {
    checkKickLive("roniiizz")
      .then((live) => {
        if (live) liveEl.hidden = false;
      })
      .catch(() => {});
  }

  async function checkKickLive(channel) {
    const endpoints = [
      `https://kick.com/api/v2/channels/${encodeURIComponent(channel)}`,
      `https://kick.com/api/v1/channels/${encodeURIComponent(channel)}`,
    ];
    for (const url of endpoints) {
      try {
        const res = await fetch(url, { credentials: "omit" });
        if (!res.ok) continue;
        const data = await res.json();
        if (data?.livestream != null) return Boolean(data.livestream);
      } catch {
        /* try next */
      }
    }
    return false;
  }

  /* Ember particles */
  const canvas = document.getElementById("embers");
  if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    initEmbers(canvas);
  }

  function initEmbers(cvs) {
    const ctx = cvs.getContext("2d");
    let particles = [];
    let raf = 0;

    function resize() {
      cvs.width = window.innerWidth * devicePixelRatio;
      cvs.height = window.innerHeight * devicePixelRatio;
      cvs.style.width = `${window.innerWidth}px`;
      cvs.style.height = `${window.innerHeight}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      spawn(Math.min(48, Math.floor(window.innerWidth / 18)));
    }

    function spawn(n) {
      particles = Array.from({ length: n }, () => makeParticle(true));
    }

    function makeParticle(randomY) {
      return {
        x: Math.random() * window.innerWidth,
        y: randomY ? Math.random() * window.innerHeight : window.innerHeight + 8,
        r: 0.6 + Math.random() * 2.2,
        vy: -(0.25 + Math.random() * 0.9),
        vx: (Math.random() - 0.5) * 0.35,
        life: 0.35 + Math.random() * 0.65,
        hue: 20 + Math.random() * 25,
      };
    }

    function tick() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(p.y * 0.01) * 0.15;
        p.y += p.vy;
        p.life -= 0.0015;
        if (p.y < -10 || p.life <= 0) {
          particles[i] = makeParticle(false);
          continue;
        }
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `hsla(${p.hue}, 95%, 62%, ${p.life})`);
        g.addColorStop(0.45, `hsla(${p.hue}, 90%, 50%, ${p.life * 0.45})`);
        g.addColorStop(1, `hsla(${p.hue}, 90%, 40%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    tick();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(tick);
    });
  }
})();
