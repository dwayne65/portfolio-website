(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  const root = document.documentElement;
  const applyTheme = (t) => {
    root.setAttribute("data-theme", t);
    root.setAttribute("data-bs-theme", t);
    $$(".theme-toggle i").forEach((i) => { i.className = t === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill"; });
  };
  const preferred = store.get("theme") ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  applyTheme(preferred);
  $$(".theme-toggle").forEach((btn) => btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    store.set("theme", next);
  }));

  window.addEventListener("load", () => {
    const l = $(".loader");
    if (l) setTimeout(() => l.classList.add("hidden"), 250);
  });
  setTimeout(() => { const l = $(".loader"); if (l) l.classList.add("hidden"); }, 2500);

  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$(".navbar .nav-link").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === page || (page === "" && href === "index.html")) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });

  const navWrap = $(".nav-wrap");
  const progress = $(".scroll-progress");
  const toTop = $(".to-top");
  const onScroll = () => {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (navWrap) navWrap.classList.toggle("scrolled", y > 30);
    if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    if (toTop) toTop.classList.toggle("show", y > 500);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  $$(".navbar-collapse .nav-link").forEach((a) => a.addEventListener("click", () => {
    const c = $(".navbar-collapse.show");
    if (c && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(c).hide();
  }));

  const glow = $(".cursor-glow");
  if (glow && window.matchMedia("(hover: hover)").matches) {
    window.addEventListener("mousemove", (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    }, { passive: true });
  }
  $$(".glass-hover").forEach((card) => card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  }));

  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const dur = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const fillBar = (el) => { el.style.width = el.dataset.width + "%"; };

  const io = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      if (el.classList.contains("reveal")) el.classList.add("in");
      if (el.dataset.count) animateCount(el);
      if (el.dataset.width) fillBar(el);
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }) : null;

  $$(".reveal, [data-count], [data-width]").forEach((el) => {
    if (io) io.observe(el);
    else {
      el.classList.add("in");
      if (el.dataset.count) el.textContent = el.dataset.count + (el.dataset.suffix || "");
      if (el.dataset.width) fillBar(el);
    }
  });

  const typed = $(".typed");
  if (typed) {
    const words = JSON.parse(typed.dataset.words || "[]");
    let w = 0, c = 0, deleting = false;
    const tick = () => {
      const word = words[w] || "";
      typed.textContent = word.slice(0, c);
      if (!deleting && c < word.length) { c++; setTimeout(tick, 80); }
      else if (!deleting && c === word.length) { deleting = true; setTimeout(tick, 1600); }
      else if (deleting && c > 0) { c--; setTimeout(tick, 40); }
      else { deleting = false; w = (w + 1) % words.length; setTimeout(tick, 300); }
    };
    if (words.length) tick();
  }

  $$("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

  const filterBtns = $$(".filter-btn");
  const items = $$(".g-item");
  filterBtns.forEach((btn) => btn.addEventListener("click", () => {
    filterBtns.forEach((b) => { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    const f = btn.dataset.filter;
    items.forEach((it) => {
      const show = f === "all" || it.dataset.cat === f;
      it.classList.toggle("hide", !show);
      if (show) { it.style.opacity = 0; requestAnimationFrame(() => { it.style.opacity = 1; }); }
    });
  }));

  const lbEl = $("#lightbox");
  if (lbEl && window.bootstrap) {
    const lb = new bootstrap.Modal(lbEl);
    const img = $("#lb-img"), title = $("#lb-title"), desc = $("#lb-desc");
    let idx = 0;
    const visible = () => items.filter((it) => !it.classList.contains("hide"));
    const show = (i) => {
      const list = visible();
      if (!list.length) return;
      idx = (i + list.length) % list.length;
      const card = $(".g-card", list[idx]);
      const im = $("img", card);
      img.src = im.dataset.full || im.src;
      img.alt = im.alt;
      title.textContent = $("h5", card).textContent;
      desc.textContent = $("p", card).textContent;
    };
    items.forEach((it) => {
      const card = $(".g-card", it);
      const open = () => { show(visible().indexOf(it)); lb.show(); };
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
    $(".lb-prev").addEventListener("click", () => show(idx - 1));
    $(".lb-next").addEventListener("click", () => show(idx + 1));
    lbEl.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  const video = $("#motivation-video");
  if (video) {
    const fb = $(".video-fallback");
    const showFallback = () => fb && fb.classList.add("show");
    const source = $("source", video);
    if (source) source.addEventListener("error", showFallback);
    video.addEventListener("error", showFallback);
    setTimeout(() => { if (video.networkState === 3) showFallback(); }, 1200);
  }

  const form = $("#contact-form");
  if (form) {
    const msg = $("#message"), counter = $("#char-count"), max = parseInt(msg.getAttribute("maxlength"), 10);
    const updateCount = () => { counter.textContent = `${msg.value.length} / ${max}`; };
    msg.addEventListener("input", updateCount);
    updateCount();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        const firstBad = $(":invalid", form);
        if (firstBad) firstBad.focus();
        return;
      }
      const data = Object.fromEntries(new FormData(form));
      const btn = $("button[type=submit]", form);
      const label = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending…';

      setTimeout(() => {
        const to = form.dataset.to;
        const body = `${data.message}\n\n— ${data.name} (${data.email})`;
        window.location.href = `mailto:${to}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
        btn.disabled = false;
        btn.innerHTML = label;
        form.reset();
        form.classList.remove("was-validated");
        updateCount();
        const t = $("#form-toast");
        if (t && window.bootstrap) bootstrap.Toast.getOrCreateInstance(t).show();
      }, 900);
    });
  }
})();
