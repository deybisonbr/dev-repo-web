import React, { useState } from 'react';

const Repositories = ({ repositoriesIndex, onDeleteRepository, onNewRepository }) => {

  const [newRepository, setNewRepository] = useState('')


  return (
    <div className="repositories">
      <h2 className="title">Repositórios</h2>
      <ul className="list">
        {
          repositoriesIndex.map((repository) => (

            <li className="item" key={repository._id}>
            <div className="info">
              <div className="owner">{repository.name.substring(0, repository.name.indexOf('/'))}</div>
              <div className="name">{repository.name.substring(repository.name.indexOf('/') + 1)}</div>
            </div>
            <button onClick={() => onDeleteRepository(repository)}>Apagar</button>
          </li>

          ))
        }



      </ul>

      <div className="new">
        <input
          type="url"
          name="new-repo"
          id="new-repo"
          placeholder="Adicionar novo repositório"
          value={newRepository}
          onChange={(e) => setNewRepository(e.target.value)}

        />
        <button onClick={() => onNewRepository(newRepository)}>Adicionar</button>
      </div>
    </div>

  )
}


export default Repositories;