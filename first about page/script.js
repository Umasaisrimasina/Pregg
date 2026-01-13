/**
 * Maternal Care Landing Page — Scroll-Driven Animation
 * Canvas-based frame animation mapped to scroll position
 * Supports Light/Dark theme with separate frame sequences
 */

(function () {
    'use strict';

    // =============================================
    // CONFIGURATION
    // =============================================
    const CONFIG = {
        // Theme-specific settings
        totalFrames: {
            light: 192,
            dark: 240
        },
        path: {
            light: './split frames light theme/',
            dark: './split frames dark theme/'
        },
        // Filename delay patterns for each theme
        delays: {
            light: ['0.041s', '0.042s', '0.042s'], // Repetitive pattern for light
            dark: ['0.033s', '0.033s', '0.034s']   // Repetitive pattern for dark
        },

        // Section timing (based on scroll percentage 0-1)
        // Sections OVERLAP to ensure there's always content visible
        sections: {
            intro: { start: 0, end: 0.12 },       // Intro visible 0-12%
            problem: { start: 0.08, end: 0.22 },  // Problem appears at 8%, overlaps intro
            features: { start: 0.18, end: 0.96 }, // Features start at 18%, overlaps problem
            cta: { start: 0.92, end: 1.0 }        // CTA overlaps last feature
        },

        // Feature card timing (within features section)
        featureCards: [
            { id: 'feature-1', start: 0.0, end: 0.28 },
            { id: 'feature-2', start: 0.24, end: 0.52 },
            { id: 'feature-3', start: 0.48, end: 0.76 },
            { id: 'feature-4', start: 0.72, end: 1.0 }
        ]
    };

    // =============================================
    // STATE
    // =============================================
    const state = {
        // Store images in separate caches
        frames: {
            light: [],
            dark: []
        },
        theme: localStorage.getItem('theme') || 'light',
        currentFrame: 0,
        isLoading: true,
        isMobile: false,
        reducedMotion: false,
        canvas: null,
        ctx: null,
        rafId: null
    };

    // =============================================
    // UTILITIES
    // =============================================

    /**
     * Generate frame filename based on theme and index
     * Logic adapted for specific file naming patterns
     */
    function getFrameFilename(index, theme) {
        // Pattern logic: cycle through the delay pattern
        const pattern = CONFIG.delays[theme];
        const delay = pattern[index % pattern.length];
        const number = index.toString().padStart(3, '0');
        return `frame_${number}_delay-${delay}.webp`;
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function getScrollProgress() {
        // Use documentElement or body max scroll height
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight <= 0) return 0;
        return clamp(window.scrollY / scrollHeight, 0, 1);
    }

    function checkMobile() {
        return window.innerWidth <= 768 ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function checkReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // =============================================
    // THEME MANAGEMENT
    // =============================================

    function setTheme(theme) {
        state.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('maternal-care-theme', theme);

        // Update mobile fallback image (using frame 45 as representative)
        const fallbackImg = document.querySelector('#mobile-fallback img');
        if (fallbackImg) {
            fallbackImg.src = CONFIG.path[theme] + getFrameFilename(45, theme);
        }

        // Re-render current frame with new theme IMMEDIATELY
        if (!state.isMobile && !state.reducedMotion) {
            // Ensure we don't go out of bounds if switching from Dark(240) to Light(192)
            const maxFrames = CONFIG.totalFrames[theme];
            if (state.currentFrame >= maxFrames) {
                state.currentFrame = maxFrames - 1;
            }

            if (state.frames[theme][state.currentFrame]) {
                renderFrame(state.currentFrame);
            }
        }

        updateThemeToggleIcon();

        // If switching themes and that theme isn't fully loaded, trigger load
        if (state.frames[theme].length < CONFIG.totalFrames[theme]) {
            preloadFramesForTheme(theme);
        }
    }

    function toggleTheme() {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    function updateThemeToggleIcon() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = state.theme === 'light'
                ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
                : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
            toggleBtn.setAttribute('aria-label', state.theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
        }
    }

    function initTheme() {
        const savedTheme = localStorage.getItem('maternal-care-theme');
        const initialTheme = savedTheme || getSystemTheme();
        setTheme(initialTheme);

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('maternal-care-theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // =============================================
    // FRAME LOADING
    // =============================================

    async function preloadFramesForTheme(theme) {
        const total = CONFIG.totalFrames[theme];
        const path = CONFIG.path[theme];

        // Prevent duplicate loading if already done
        // We check if the array has enough items (filtering out undefined/null)
        if (state.frames[theme].filter(Boolean).length >= total) return;

        const loadPromises = [];

        console.log(`Starting load for ${theme} theme (${total} frames)...`);

        for (let i = 0; i < total; i++) {
            // Skip if already loaded
            if (state.frames[theme][i]) continue;

            const img = new Image();
            const filename = getFrameFilename(i, theme);
            const fullPath = path + filename;

            const promise = new Promise((resolve) => {
                img.onload = () => {
                    state.frames[theme][i] = img;
                    resolve(img);
                };
                img.onerror = () => {
                    console.warn(`Failed to load frame: ${fullPath} (Index: ${i}, Theme: ${theme})`);

                    // Fallback logic for mismatched delays (if filenames are slightly different than pattern)
                    // Try the alternate delay
                    const altDelay = filename.includes('0.041s') ? '0.042s' :
                        filename.includes('0.042s') ? '0.041s' :
                            filename.includes('0.033s') ? '0.034s' : '0.033s';

                    const altFilename = filename.replace(/delay-0\.0\d\ds/, `delay-${altDelay}`);
                    const altPath = path + altFilename;

                    const altImg = new Image();
                    altImg.src = altPath;
                    altImg.onload = () => {
                        state.frames[theme][i] = altImg;
                        resolve(altImg);
                    };
                    altImg.onerror = () => {
                        // Hard fail fallback: use previous frame
                        state.frames[theme][i] = state.frames[theme][i - 1] || null;
                        resolve(null);
                    };
                };
            });

            img.src = fullPath;
            loadPromises.push(promise);

            // Optimization: If we are calling this initial load, we might want to resolve in batches
            // But for simplicity, we push all promises.
        }

        // We don't await everything to block UI, but we can log when done
        Promise.all(loadPromises).then(() => {
            console.log(`Finished loading ${theme} theme.`);
        });
    }

    async function preloadFrames() {
        // Load current theme first
        await preloadFramesForTheme(state.theme);

        // Render first frame immediately if available
        if (state.frames[state.theme][0]) {
            renderFrame(0);
        }

        // Load other theme in background
        const otherTheme = state.theme === 'light' ? 'dark' : 'light';
        setTimeout(() => preloadFramesForTheme(otherTheme), 100);
    }

    // =============================================
    // CANVAS RENDERING
    // =============================================

    function initCanvas() {
        state.canvas = document.getElementById('animation-canvas');
        if (!state.canvas) return false;

        state.ctx = state.canvas.getContext('2d');
        resizeCanvas();
        return true;
    }

    function resizeCanvas() {
        if (!state.canvas) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = state.canvas.getBoundingClientRect();

        state.canvas.width = rect.width * dpr;
        state.canvas.height = rect.height * dpr;

        state.ctx.scale(dpr, dpr);

        if (state.frames[state.theme] && state.frames[state.theme][state.currentFrame]) {
            renderFrame(state.currentFrame);
        }
    }

    function renderFrame(frameIndex) {
        // Safety check for array bounds
        const frames = state.frames[state.theme];
        if (!state.ctx || !frames || !frames[frameIndex]) return;

        const img = frames[frameIndex];

        if (!img.complete) return;

        const canvas = state.canvas;
        const ctx = state.ctx;

        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);

        ctx.clearRect(0, 0, width, height);

        const canvasRatio = width / height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, drawX, drawY;

        // "Cover" fit logic
        if (imgRatio > canvasRatio) {
            drawHeight = height;
            drawWidth = drawHeight * imgRatio;
            drawX = (width - drawWidth) / 2;
            drawY = 0;
        } else {
            drawWidth = width;
            drawHeight = drawWidth / imgRatio;
            drawX = 0;
            drawY = (height - drawHeight) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }

    // =============================================
    // SECTION VISIBILITY
    // =============================================

    function updateSections(scrollProgress) {
        const { sections } = CONFIG;

        // Helper to toggle visibility
        const toggle = (id, visible) => {
            const el = document.getElementById(id);
            if (el) el.classList.toggle('visible', visible);
        };

        // Intro
        toggle('intro-text', scrollProgress >= sections.intro.start && scrollProgress < sections.intro.end);

        // Problem
        const problemStatement = document.querySelector('#problem-text .statement');
        if (problemStatement) {
            // Problem text visibility logic handled by #problem-text or specific child? 
            // The CSS puts .text-overlay on #problem-text
            toggle('problem-text', scrollProgress >= sections.problem.start && scrollProgress < sections.problem.end);
        }

        // Features
        if (scrollProgress >= sections.features.start && scrollProgress < sections.features.end) {
            const featuresProgress = (scrollProgress - sections.features.start) / (sections.features.end - sections.features.start);
            updateFeatureCards(featuresProgress);
        } else {
            // Hide all cards if outside features section
            CONFIG.featureCards.forEach(card => toggle(card.id, false));
        }

        // CTA
        toggle('cta-content', scrollProgress >= sections.cta.start);
    }

    function updateFeatureCards(featuresProgress) {
        CONFIG.featureCards.forEach(card => {
            const isVisible = featuresProgress >= card.start && featuresProgress < card.end;
            const el = document.getElementById(card.id);
            if (el) el.classList.toggle('visible', isVisible);
        });
    }

    // =============================================
    // SCROLL HANDLER
    // =============================================

    function onScroll() {
        if (state.isLoading || state.isMobile || state.reducedMotion) return;

        const scrollProgress = getScrollProgress();

        // Use the total frames of the CURRENT theme
        const total = CONFIG.totalFrames[state.theme];
        const frameIndex = Math.min(total - 1, Math.floor(scrollProgress * (total - 1)));

        if (frameIndex !== state.currentFrame) {
            state.currentFrame = frameIndex;

            if (state.rafId) {
                cancelAnimationFrame(state.rafId);
            }
            state.rafId = requestAnimationFrame(() => {
                renderFrame(frameIndex);
            });
        }

        updateSections(scrollProgress);
    }

    // =============================================
    // INITIALIZATION
    // =============================================

    async function init() {
        document.body.classList.add('loading');

        state.isMobile = checkMobile();
        state.reducedMotion = checkReducedMotion();

        initTheme();

        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.removeEventListener('click', toggleTheme); // dedupe re-runs
            themeToggle.addEventListener('click', toggleTheme);
            updateThemeToggleIcon();
        }

        // Setup reduce motion listener
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        motionQuery.addEventListener('change', () => {
            state.reducedMotion = motionQuery.matches;
            if (state.reducedMotion) {
                document.querySelectorAll('.text-overlay, .feature-card, .cta-container').forEach(el => {
                    el.classList.add('visible');
                });
            }
        });

        // Initialize Canvas & Load Images if suitable
        if (!state.isMobile && !state.reducedMotion) {
            if (!initCanvas()) {
                console.error('Failed to initialize canvas');
            } else {
                await preloadFrames();
            }
        }

        // Handle Mobile/Reduced Motion Fallbacks
        if (state.isMobile || state.reducedMotion) {
            document.querySelectorAll('.text-overlay, .cta-container').forEach(el => {
                el.classList.add('visible');
            });
            const firstCard = document.getElementById('feature-1');
            if (firstCard) firstCard.classList.add('visible');
        }

        state.isLoading = false;
        document.body.classList.remove('loading');

        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });

        window.removeEventListener('resize', resizeCanvas);
        window.addEventListener('resize', () => {
            state.isMobile = checkMobile();
            if (!state.isMobile) {
                resizeCanvas();
            }
        });

        // Initial render check
        onScroll();

        console.log('Maternal Care landing page initialized');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
