import React,{useState,useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(()=>{
    api.get('/repositories').then(response=>{
      setRepositories(response.data);
    })
  },[]);

  async function handleAddRepository() {
    try{
      const response = await api.post('/repositories',{
        url: "https://github.com/IagoChaves",
        title: `ReactJS ${Date.now()}`,
        techs: ["ReactJs", "Something", "TypeScript"]
      });
      setRepositories([...repositories, response.data]);
    }catch(err){
      alert('Erro ao criar repositório');
    }
  }

  async function handleRemoveRepository(id) {
    try{
      await api.delete(`/repositories/${id}`);
      setRepositories(repositories.filter(repo=> repo.id !== id));
    }catch(err){
      alert('Erro ao deletar repositório');
    }
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo=>{
          return (
          <li key={repo.id}>{repo.title}
           <button onClick={()=> handleRemoveRepository(repo.id)}>Remover</button>
          </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
