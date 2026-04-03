import { useState } from 'react';
import NodeCard from './NodeCard';
import Modal from './Modal';

const PhaseSection = ({ phase }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="phase-section">
      <div className="phase-label" style={{ color: phase.color }}>
        — {phase.label}
      </div>
      <div className="nodes-grid">
        {phase.topics.map((topic) => (
          <NodeCard
            key={topic.id}
            topic={topic}
            phaseColor={phase.color}
            onClick={setSelected}
          />
        ))}
      </div>
      {selected && <Modal topic={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default PhaseSection;