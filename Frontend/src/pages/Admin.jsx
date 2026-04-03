import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const PHASES = ['ml', 'dl', 'adv', 'proj'];
const STATUSES = ['published', 'coming_soon', 'draft'];

const emptyLink = { label: '', url: '' };
const empty = {
  id: '', title: '', phase: 'ml', description: '', status: 'published', order: '',
  githubLinks: [{ ...emptyLink }],
  notebookLinks: [{ ...emptyLink }],
  colabLinks: [{ ...emptyLink }],
  youtubeLinks: [{ ...emptyLink }],
};

// Helper — add/remove/update link arrays
const updateLink = (arr, i, field, val) =>
  arr.map((item, idx) => idx === i ? { ...item, [field]: val } : item);
const addLink = (arr) => [...arr, { ...emptyLink }];
const removeLink = (arr, i) => arr.filter((_, idx) => idx !== i);

const LinkSection = ({ title, icon, links, onChange }) => (
  <div className="form-group full">
    <label>{icon} {title}</label>
    {links.map((link, i) => (
      <div key={i} className="link-row">
        <input
          className="admin-input"
          placeholder="Label (e.g. Part 1)"
          value={link.label}
          onChange={(e) => onChange(updateLink(links, i, 'label', e.target.value))}
        />
        <input
          className="admin-input"
          placeholder="URL"
          value={link.url}
          onChange={(e) => onChange(updateLink(links, i, 'url', e.target.value))}
        />
        {links.length > 1 && (
          <button type="button" className="link-remove" onClick={() => onChange(removeLink(links, i))}>✕</button>
        )}
      </div>
    ))}
    <button type="button" className="link-add" onClick={() => onChange(addLink(links))}>
      + Add {title}
    </button>
  </div>
);

const Admin = () => {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [topics, setTopics] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const headers = { 'x-admin-password': password };

  const fetchTopics = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/topics`, { headers });
      setTopics(res.data.data);
    } catch {
      setMsg('❌ Error fetching topics');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/topics`, { headers });
      setTopics(res.data.data);
      setLoggedIn(true);
      setMsg('');
    } catch {
      setMsg('❌ Wrong password!');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await axios.put(`${API_URL}/admin/topics/${editing}`, form, { headers });
        setMsg('✅ Topic updated!');
      } else {
        await axios.post(`${API_URL}/admin/topics`, form, { headers });
        setMsg('✅ Topic added!');
      }
      setForm(empty);
      setEditing(null);
      fetchTopics();
    } catch (err) {
      setMsg('❌ Error: ' + err.response?.data?.message);
    }
    setLoading(false);
  };

  const handleEdit = (topic) => {
    setEditing(topic.id);
    setForm({
      id: topic.id,
      title: topic.title,
      phase: topic.phase,
      description: topic.description || '',
      status: topic.status,
      order: topic.order,
      githubLinks: topic.githubLinks?.length ? topic.githubLinks : [{ ...emptyLink }],
      notebookLinks: topic.notebookLinks?.length ? topic.notebookLinks : [{ ...emptyLink }],
      colabLinks: topic.colabLinks?.length ? topic.colabLinks : [{ ...emptyLink }],
      youtubeLinks: topic.youtubeLinks?.length ? topic.youtubeLinks : [{ ...emptyLink }],
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this topic?')) return;
    try {
      await axios.delete(`${API_URL}/admin/topics/${id}`, { headers });
      setMsg('✅ Topic deleted!');
      fetchTopics();
    } catch {
      setMsg('❌ Delete failed');
    }
  };

  const cancelEdit = () => { setEditing(null); setForm(empty); setMsg(''); };

  if (!loggedIn) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <div className="hero-badge">🔐 Admin Portal</div>
          <h2>QuantumWebber Admin</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password" placeholder="Enter admin password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="admin-input" autoFocus
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Checking...' : 'Login →'}
            </button>
          </form>
          {msg && <p className="admin-msg error">{msg}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="admin-header">
        <div className="hero-badge">🔐 Admin Portal</div>
        <h1 className="hero-title">{editing ? '✏️ Edit Topic' : '➕ Add New Topic'}</h1>
      </div>

      {msg && <div className={`admin-msg ${msg.includes('❌') ? 'error' : 'success'}`}>{msg}</div>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-row">
          <div className="form-group">
            <label>ID *</label>
            <input className="admin-input" type="number" placeholder="22"
              value={form.id} onChange={(e) => setForm({ ...form, id: +e.target.value })}
              required disabled={!!editing} />
          </div>
          <div className="form-group">
            <label>Order</label>
            <input className="admin-input" type="number" placeholder="22"
              value={form.order} onChange={(e) => setForm({ ...form, order: +e.target.value })} />
          </div>
          <div className="form-group">
            <label>Phase *</label>
            <select className="admin-input" value={form.phase}
              onChange={(e) => setForm({ ...form, phase: e.target.value })}>
              {PHASES.map(p => <option key={p} value={p}>{p.toUpperCase()}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Status *</label>
            <select className="admin-input" value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group full">
          <label>Title *</label>
          <input className="admin-input" type="text" placeholder="Neural Networks Basics"
            value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </div>

        <div className="form-group full">
          <label>Description</label>
          <textarea className="admin-input" rows={2} placeholder="Topic description..."
            value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>

        <LinkSection title="GitHub Links" icon="⬡"
          links={form.githubLinks}
          onChange={(val) => setForm({ ...form, githubLinks: val })} />

        <LinkSection title="Notebook Links" icon="📓"
          links={form.notebookLinks}
          onChange={(val) => setForm({ ...form, notebookLinks: val })} />

        <LinkSection title="Colab Links" icon="🔬"
          links={form.colabLinks}
          onChange={(val) => setForm({ ...form, colabLinks: val })} />

        <LinkSection title="YouTube Links" icon="🎥"
          links={form.youtubeLinks}
          onChange={(val) => setForm({ ...form, youtubeLinks: val })} />

        <div className="form-btns">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : editing ? '💾 Update Topic' : '➕ Add Topic'}
          </button>
          {editing && <button type="button" className="btn-secondary" onClick={cancelEdit}>Cancel</button>}
        </div>
      </form>

      <div className="admin-list-header">
        <h2>All Topics ({topics.length})</h2>
      </div>
      <div className="admin-list">
        {topics.map((topic) => (
          <div key={topic.id} className="admin-topic-row">
            <div className="atr-info">
              <span className="atr-id">#{String(topic.id).padStart(2, '0')}</span>
              <span className="atr-title">{topic.title}</span>
              <span className={`atr-badge ${topic.phase}`}>{topic.phase.toUpperCase()}</span>
              <span className={`atr-badge ${topic.status}`}>{topic.status}</span>
            </div>
            <div className="atr-btns">
              <button className="atr-edit" onClick={() => handleEdit(topic)}>✏️ Edit</button>
              <button className="atr-delete" onClick={() => handleDelete(topic.id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;