import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [done, setDone] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('qw_done') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('qw_done', JSON.stringify(done));
  }, [done]);

  const toggleDone = (id) => {
    setDone((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const isDone = (id) => done.includes(id);

  return (
    <ProgressContext.Provider value={{ done, toggleDone, isDone }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);