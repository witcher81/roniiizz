(() => {
  const cfg = window.RONIZ_CONFIG;
  if (!cfg) return;

  const ICONS = {
    kick: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 3h5.2v8.1L14.6 3H21l-8.3 9.7L21 21h-6.4l-6.4-7.7V21H3V3z"/></svg>`,
    gamechangers: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#e67e22"/><circle cx="12" cy="12" r="6.5" stroke="#0a0a0c" stroke-width="1.5"/><path d="M12 7.5v9M7.5 12h9" stroke="#0a0a0c" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="2" fill="#0a0a0c"/></svg>`,
    tiktok: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.6 7.2A6.3 6.3 0 0 1 16 6.1V15a5.2 5.2 0 1 1-5.2-5.2c.3 0 .6 0 .9.1v2.7a2.5 2.5 0 1 0 1.8 2.4V2h2.7a6.3 6.3 0 0 0 3.4 5.2z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="ig" x1="0" y1="24" x2="24" y2="0"><stop stop-color="#f9ce34"/><stop offset=".5" stop-color="#ee2a7b"/><stop offset="1" stop-color="#6228d7"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="6" fill="none" stroke="url(#ig)" stroke-width="2"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="url(#ig)" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="url(#ig)"/></svg>`,
    discord: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.3 5.2A16.6 16.6 0 0 0 15.2 4l-.4.8a14.7 14.7 0 0 1 3.5 1.5 12.7 12.7 0 0 0-12.6 0A14.7 14.7 0 0 1 9.2 4.8L8.8 4a16.6 16.6 0 0 0-4.1 1.2C1.8 9.2 1.1 13 1.4 16.8A16.7 16.7 0 0 0 6.6 19l.8-1.1a10.7 10.7 0 0 1-1.4-.7l.3-.3c2.3 1.1 4.8 1.1 7.2 0l.3.3c-.4.3-.9.5-1.4.7l.8 1.1a16.7 16.7 0 0 0 5.2-2.2c.4-4.2-.6-7.9-2.1-11.6zM8.7 14.5c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7zm6.6 0c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 12.2s0-3.2-.4-4.7c-.2-.9-.9-1.6-1.8-1.8C19.2 5.3 12 5.3 12 5.3s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.7c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.7.4-4.7zM9.8 15.5v-6.6l6 3.3-6 3.3z"/></svg>`,
    twitch: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.3 2 3 5.4v14.2h4.3V22l2.6-2.4h3.4L20.1 13V2H4.3zm14.2 10.1-3 3h-3l-2.6 2.4v-2.4H6.4V3.7h12.1v8.4zM15 6.7h1.7v5.1H15V6.7zm-4.3 0H12v5.1h-1.3V6.7z"/></svg>`,
  };

  /* ── Profile from config ──────────────── */

  const nameEl = document.getElementById("display-name");
  const tagEl = document.getElementById("tagline");
  const footerEl = document.getElementById("footer-name");
  const avatarEl = document.getElementById("avatar");

  if (nameEl) nameEl.textContent = cfg.name;
  if (tagEl) tagEl.textContent = cfg.tagline;
  if (footerEl) footerEl.textContent = cfg.name;
  if (avatarEl && cfg.avatar) {
    avatarEl.src = cfg.avatar;
    avatarEl.alt = cfg.name;
  }
  document.title = `${cfg.name} — ${cfg.tagline}`;

  /* ── Render links ─────────────────────── */

  const nav = document.getElementById("links");
  if (!nav) return;

  let isLive = cfg.showLiveBadge === true;

  function render() {
    nav.innerHTML = cfg.links
      .map((link, i) => {
        const showLive =
          link.showLive &&
          (cfg.showLiveBadge === true || (cfg.showLiveBadge === "auto" && isLive));

        const labelClass = link.gradientLabel
          ? "link__label link__label--gradient"
          : "link__label";

        const sub = showLive
          ? `<span class="link__sub"><span>on Live</span><span class="link__live-dot"></span></span>`
          : "";

        return `
          <a
            class="link link--${link.brand}"
            href="${escapeAttr(link.url)}"
            target="_blank"
            rel="noopener noreferrer"
            style="--i:${i}"
          >
            <span class="link__text">
              <span class="${labelClass}">${escapeHtml(link.label)}</span>
              ${sub}
            </span>
            <span class="link__icon" style="color:var(--brand)">${ICONS[link.brand] || ""}</span>
          </a>
        `;
      })
      .join("");
  }

  render();

  /* ── Kick live (best-effort) ──────────── */

  if (cfg.showLiveBadge === "auto" && cfg.kickChannel) {
    checkKickLive(cfg.kickChannel)
      .then((live) => {
        if (live !== isLive) {
          isLive = live;
          render();
        }
      })
      .catch(() => {});
  }

  async function checkKickLive(channel) {
    // Kick's public API may block CORS from browsers; fail soft.
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
        if (typeof data?.livestream?.is_live === "boolean") return data.livestream.is_live;
      } catch {
        /* try next */
      }
    }
    return false;
  }

  /* ── Ember particles ──────────────────── */

  const canvas = document.getElementById("embers");
  if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    initEmbers(canvas);
  }

  function initEmbers(cvs) {
    const ctx = cvs.getContext("2d");
    let w = 0;
    let h = 0;
    let particles = [];
    let raf = 0;

    function resize() {
      w = cvs.width = window.innerWidth * devicePixelRatio;
      h = cvs.height = window.innerHeight * devicePixelRatio;
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

  /* ── Utils ────────────────────────────── */

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, "&#39;");
  }
})();
