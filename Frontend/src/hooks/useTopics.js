import { useState, useEffect } from 'react';
import { phases as fallbackPhases } from '../data/topics';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useTopics = () => {
  const [phases, setPhases] = useState(fallbackPhases);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axios.get(`${API_URL}/topics`);
        const topics = res.data.data;

        const grouped = fallbackPhases.map((phase) => ({
          ...phase,
          topics: topics.filter((t) => t.phase === phase.id).sort((a, b) => a.order - b.order),
        }));

        const hasData = grouped.some((p) => p.topics.length > 0);
        if (hasData) setPhases(grouped);
      } catch (err) {
        setError(err.message);
        console.log('API down, using fallback data');
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  return { phases, loading, error };
};