import React, { useState, useEffect } from 'react';

import api from './services/api';
import './App.css';
import backgroundImage from './assets/background.jpg';

import Header from './components/Header';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddProjects() {        
    // setProjects([...projects, `Novo projeto ${Date.now()}`]);

    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Diego Fernandes"
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="HomePage" />

      <img width={300} src={backgroundImage} />
        
      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button tyoe="button" onClick={handleAddProjects}>Adicionar Projeto</button>
    </>
  );
}

export default App;