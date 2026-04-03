import { useProgress } from '../context/ProgressContext';

const NodeCard = ({ topic, phaseColor, onClick }) => {
  const { isDone } = useProgress();
  const done = isDone(topic.id);
  const coming = topic.status === 'coming_soon';

  return (
    <div
      className={`node-card ${coming ? 'coming' : ''} ${done ? 'done' : ''}`}
      style={{ '--phase-color': phaseColor }}
      onClick={() => !coming && onClick(topic)}
    >
      <div className="node-num">#{String(topic.id).padStart(2, '0')}</div>
      <div className="node-title">{topic.title}</div>
      <span className="node-tag">{coming ? '🔒 Coming Soon' : done ? '✓ Done' : 'Notebook'}</span>
    </div>
  );
};

export default NodeCard;