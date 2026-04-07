import { useState, useEffect } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(function() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setUsers(data);
        setLoading(false);
      })
      .catch(function(err) {
        setError('Eroare: ' + err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Se incarca utilizatorii...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h3>Utilizatori API</h3>

      <input
        type="text"
        placeholder="Cauta utilizator..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {users
          .filter(function(user) {
            return user.name.toLowerCase().includes(search.toLowerCase());
          })
          .map(function(user) {
            return (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default UsersList;