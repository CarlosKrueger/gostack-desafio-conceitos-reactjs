import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      const data = response.data
      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      url: "https://github.com/CarlosKrueger",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });
    const repository = response.data;
    setRepositories([...repositories, repository ]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      const updatedRepositories = repositories.filter(repository => repository.id !== id);
      setRepositories(updatedRepositories)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
