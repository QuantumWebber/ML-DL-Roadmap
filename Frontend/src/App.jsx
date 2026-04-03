import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Roadmap from './pages/Roadmap';
import NotFound from './pages/NotFound';
import './index.css';
import Admin from './pages/Admin';

const App = () => {
  return (
    <BrowserRouter>
      <ProgressProvider>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </ProgressProvider>
    </BrowserRouter>
  );
};

export default App;