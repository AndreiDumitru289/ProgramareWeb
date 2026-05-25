import { useEffect, useState } from 'react';
import { API } from '../api';

function Home() {
  const [stats, setStats] = useState({
    total: 0,
    done: 0,
    inProgress: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(function () {
    loadStats();
  }, []);

  async function loadStats() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API + '/api/stats');

      if (!response.ok) {
        throw new Error('Statisticile nu au putut fi incarcate.');
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError('Eroare: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page-section">
      <h2>Home</h2>
      <p className="page-text">Bine ai venit pe dashboard-ul meu full stack.</p>

      {loading ? <p className="message">Se incarca statisticile...</p> : null}
      {error ? <p className="message error-message">{error}</p> : null}

      {!loading && !error ? (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.total}</h3>
            <p>Total proiecte</p>
          </div>
          <div className="stat-card">
            <h3>{stats.done}</h3>
            <p>Proiecte finalizate</p>
          </div>
          <div className="stat-card">
            <h3>{stats.inProgress}</h3>
            <p>Proiecte in lucru</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default Home;
