import { useProgress } from '../context/ProgressContext';

const LinkGroup = ({ icon, links }) => {
  if (!links?.length || !links.some(l => l.url)) return null;
  return (
    <>
      {links.filter(l => l.url).map((link, i) => (
        <a key={i} className="modal-link" href={link.url} target="_blank" rel="noreferrer">
          {icon} {link.label || `Link ${i + 1}`}
        </a>
      ))}
    </>
  );
};

const Modal = ({ topic, onClose }) => {
  const { isDone, toggleDone } = useProgress();
  if (!topic) return null;
  const done = isDone(topic.id);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-num">#{String(topic.id).padStart(2, '0')}</div>
        <div className="modal-title">{topic.title}</div>
        {topic.description && <p className="modal-desc">{topic.description}</p>}

        <div className="modal-links">
          <LinkGroup icon="⬡" links={topic.githubLinks} />
          <LinkGroup icon="📓" links={topic.notebookLinks} />
          <LinkGroup icon="🔬" links={topic.colabLinks} />
          <LinkGroup icon="🎥" links={topic.youtubeLinks} />
        </div>

        <button
          className={`modal-done-btn ${done ? '' : 'undone'}`}
          onClick={() => toggleDone(topic.id)}
        >
          {done ? '✓ Completed — Mark Undone' : '☐ Mark as Done'}
        </button>
      </div>
    </div>
  );
};

export default Modal;