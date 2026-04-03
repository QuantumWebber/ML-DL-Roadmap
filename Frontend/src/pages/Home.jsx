import { Link } from 'react-router-dom';
import StatsRow from '../components/StatsRow';

const Home = () => {
  return (
    <div className="home">
      <div className="home-hero">
        <h1 className="hero-title">
          Hi, I'm <span className="gradient-text">Jatin</span><br />
          aka QuantumWebber
        </h1>
        <p className="hero-sub">
          DTU student · ML/DL learner · Building in public <br />
          Every notebook is one step closer to mastery.
        </p>
        <div className="hero-buttons">
          <Link to="/roadmap" className="btn-primary">View Roadmap →</Link>
          <a href="https://github.com/QuantumWebber" target="_blank" rel="noreferrer" className="btn-secondary">GitHub ⬡</a>
        </div>
      </div>

      <StatsRow />

      <div className="home-cards">
        <div className="info-card">
          <div className="info-icon">📓</div>
          <div className="info-title">Jupyter Notebooks</div>
          <div className="info-desc">Hands-on code for every topic — directly on GitHub</div>
        </div>
        <div className="info-card">
          <div className="info-icon">🗺️</div>
          <div className="info-title">Interactive Roadmap</div>
          <div className="info-desc">From ML to DL — a structured learning path</div>
        </div>
        <div className="info-card">
          <div className="info-icon">📈</div>
          <div className="info-title">Progress Tracker</div>
          <div className="info-desc">Mark topics as done — track your growth</div>
        </div>
      </div>
    </div>
  );
};

export default Home;