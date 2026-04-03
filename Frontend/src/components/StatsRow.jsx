import { useProgress } from '../context/ProgressContext';
import { useTopics } from '../hooks/useTopics';

const StatsRow = () => {
  const { done } = useProgress();
  const { phases } = useTopics();
  const total = phases.flatMap((p) => p.topics).filter((t) => t.status === 'published').length;
  const pct = total ? Math.round((done.length / total) * 100) : 0;

  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-val purple">{done.length}</div>
        <div className="stat-label">Completed</div>
      </div>
      <div className="stat-card">
        <div className="stat-val pink">{total}</div>
        <div className="stat-label">Total Topics</div>
      </div>
      <div className="stat-card">
        <div className="stat-val blue">{pct}%</div>
        <div className="stat-label">Progress</div>
      </div>
    </div>
  );
};

export default StatsRow;