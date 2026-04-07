import Card from './Card';

import { useState } from 'react';

function App() {

  const [count, setCount] = useState(0);

  const projects = [
    { title: "Proiect 1", description: "Pagina personala" },
    { title: "Proiect 2", description: "Calculator buget" },
    { title: "Proiect 3", description: "Dashboard React" },
    { title: "Proiect 4", description: "Aplicatie de notite" },
    { title: "Proiect 5", description: "Joc de trivia" }

  ];

  return (

<div>
      <h1>Dashboard</h1>
      {projects.map(function(item, index) {
        return (
          <Card
            key={index}
            title={item.title}
            description={item.description}

            />
        );


})}
  <br />
  <p>Ai apasat butonul de {count} ori</p>
  <button onClick={() => setCount(count + 1)}>Click</button>
  <br />
  <button onClick={() => setCount(count - 1)}>-1</button>
  <br />
  <button onClick={() => setCount(0)}>Reset</button>
</div>


);
}
export default App;