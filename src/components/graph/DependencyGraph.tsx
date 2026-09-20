'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { SECTIONS, type Section } from './sections-data';

const accentVar: Record<string, string> = {
  purple: '--c-purple', yellow: '--c-yellow', blue: '--c-blue', green: '--c-green',
  cyan: '--c-cyan', pink: '--c-pink', orange: '--c-orange', teal: '--c-teal', red: '--c-red'
};

function Node({ section, index, onOpen }: { section: Section; index: number; onOpen: (s: Section) => void }) {
  const theta = `${index * 40}deg`;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const bubbleRef = useRef<HTMLSpanElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const r = bubbleRef.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <>
      <div
        className="edge in"
        style={{
          '--theta': theta,
          '--delay': `${index * 0.18}s`,
          '--dot-accent': `var(${accentVar[section.accent]})`,
          background: `linear-gradient(to top, var(${accentVar[section.accent]}), transparent 92%)`
        } as React.CSSProperties}
      />
      <div className="node" style={{ '--theta': theta } as React.CSSProperties}>
        <button
          className="node-btn in"
          aria-label={section.label}
          onClick={() => onOpen(section)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.span
            ref={bubbleRef}
            className={`bubble dot-accent-${section.accent}`}
            style={{ x: springX, y: springY }}
            dangerouslySetInnerHTML={{
              __html: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${section.icon}</svg>`
            }}
          />
          <span className="node-label">{section.label}</span>
        </button>
      </div>
    </>
  );
}

export default function DependencyGraph() {
  const [active, setActive] = useState<Section | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (active) closeBtnRef.current?.focus();
  }, [active]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActive(null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <main className="stage">
      <div className="graph">
        <div className="hub">
          <div className="ring" />
          <div className="role">Software Engineer</div>
          <div className="name">Mubashir</div>
        </div>
        {SECTIONS.map((s, i) => (
          <Node key={s.id} section={s} index={i} onOpen={setActive} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setActive(null); }}
          >
            <motion.div
              className="modal"
              role="dialog"
              aria-modal="true"
              style={{ '--tab-accent': `var(${accentVar[active.accent]})` } as React.CSSProperties}
              initial={{ y: 16, scale: 0.94, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 10, scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 0.8, 0.24, 1] }}
            >
              <div className="modal-tab">
                <div className="filename">
                  <span className="fdot" style={{ background: `var(${accentVar[active.accent]})` }} />
                  {active.file}
                </div>
                <div className="spacer" />
                <button ref={closeBtnRef} className="modal-close" onClick={() => setActive(null)} aria-label="Close">✕</button>
              </div>
              <div className="modal-body">{active.render()}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
