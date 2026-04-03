import { useState, useEffect, useRef } from 'react';
import { useTopics } from '../hooks/useTopics';
import { useProgress } from '../context/ProgressContext';
import Modal from '../components/Modal';

function RoadmapNode({ topic, phaseColor, onClick, isDone, index, isLast }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const isComing = topic.status === 'coming_soon';
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className={`road-row ${isLeft ? 'road-left' : 'road-right'}`}>
      {/* Node card */}
      <div
        ref={ref}
        className={`road-node ${isComing ? 'coming' : ''} ${isDone ? 'done' : ''} ${visible ? 'road-visible' : ''}`}
        style={{ '--phase-color': phaseColor, '--delay': `${index * 100}ms` }}
        onClick={() => !isComing && onClick(topic)}
      >
        <div className="road-num" style={{ color: phaseColor }}>
          #{String(topic.id ?? topic.order).padStart(2, '0')}
        </div>
        <div className="road-title">{topic.title}</div>
        <div className="road-tag">
          {isComing ? '🔒 Soon' : isDone ? '✓ Done' : '📓 Notebook'}
        </div>
      </div>

      {/* Path dot + curve connector */}
     <div className="road-path-col">
  <div className="road-dot" style={{ background: isDone ? phaseColor : undefined }} />
  <div className="road-h-line" />
  {!isLast && (
    <div className={`road-curve ${isLeft ? 'curve-right' : 'curve-left'}`} />
  )}
</div>
    </div>
  );
}

const Roadmap = () => {
  const { phases, loading } = useTopics();
  const { done } = useProgress();
  const [selected, setSelected] = useState(null);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Loading roadmap...</p>
      </div>
    );
  }

  const allPublished = phases.flatMap((p) => p.topics).filter((t) => t.status === 'published');
  const total = allPublished.length;
  const completed = done.length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="roadmap">
      {/* Header */}
      <div className="roadmap-header">
        <div className="hero-badge">⚡ Interactive Roadmap</div>
        <h1 className="hero-title">
          QuantumWebber's <span className="gradient-text">Learning Path</span>
        </h1>
        <p className="hero-sub">Click any node to open notebook · Mark done to track progress</p>
      </div>

      {/* Progress Bar */}
      <div className="rm-progress-wrap">
        <div className="rm-progress-top">
          <span className="rm-progress-label">Overall Progress</span>
          <span className="rm-progress-pct">{completed} / {total} topics · {pct}%</span>
        </div>
        <div className="rm-progress-track">
          <div className="rm-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="rm-progress-phases">
          {phases.map((phase) => {
            const phasePublished = phase.topics.filter((t) => t.status === 'published');
            const phaseDone = phasePublished.filter((t) => done.includes(t.id));
            const phasePct = phasePublished.length
              ? Math.round((phaseDone.length / phasePublished.length) * 100)
              : 0;
            return (
              <div key={phase.id} className="rm-phase-stat">
                <span className="rm-phase-dot" style={{ background: phase.color }} />
                <span className="rm-phase-name">{phase.label}</span>
                <span className="rm-phase-pct">{phasePct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phases */}
      <div className="rm-phases">
        {phases.map((phase, pi) => (
          <div key={phase.id} className="rm-phase rm-phase-animated" style={{ '--pi': pi }}>

            {/* Section Header */}
            <div className="rm-section-header">
              <div className="rm-section-line" style={{ background: phase.color }} />
              <span className="rm-section-title" style={{ color: phase.color }}>
                {phase.label}
              </span>
              <span className="rm-section-count">
                {phase.topics.filter((t) => t.status === 'published').length} topics
              </span>
            </div>

            {/* Road-style nodes */}
            <div className="road-track">
              {phase.topics.map((topic, ti) => (
                <RoadmapNode
                  key={topic.id ?? topic._id}
                  topic={topic}
                  phaseColor={phase.color}
                  isDone={done.includes(topic.id ?? topic._id)}
                  index={ti}
                  isLast={ti === phase.topics.length - 1}
                  onClick={setSelected}
                />
              ))}
            </div>

            {/* Arrow to next section */}
            {pi < phases.length - 1 && (
              <div className="rm-section-arrow">
                <div className="rm-arrow-line rm-arrow-animated" />
                <div className="rm-arrow-head">↓</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selected && <Modal topic={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default Roadmap;