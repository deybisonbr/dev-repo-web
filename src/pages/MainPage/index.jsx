import React, { useState, useEffect} from 'react';

import { Link } from 'react-router-dom'

import Nav from './Nav';
import Repositories from './Repositories';
import Search from './Search';

import { getRepositories, createRepository, destroyRepository } from '../../services/api';

import "./styles.css"

const userId = '6375acdb4bad9e3a8e626b87'

const MainPage = () => {
  const [ repositoriesIndex, setRepositoriesIndex ] = useState([])
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false)


  const loadData = async (query = '') => {

    try{
      const response = await getRepositories(userId, query);
      console.log(response.data)
      setRepositoriesIndex(response.data)
      setLoading(false)

    } catch(err){
      console.error(err);
      setLoadingError(true);
    }
  }

  useEffect(() => {
    (async () => await loadData())();
  }, []);


  const handleLogout = () => {
    console.log('Logout')
  }

  const handleSearch = (query) => {
    loadData(query);
  }

  const handleDeleteRepository = async (repositoryIndex) => {
    await destroyRepository(userId, repositoryIndex._id)
    await loadData()
  }

  const handleNewRepository = async (url) => {
    console.log('new repo', url);
    try{
      await createRepository(userId, url)
      await loadData()
    }catch(err){
      console.error(err);
      setLoadingError(true);
    }
  }

  if (loadingError) {
    return(
      <div className="loading">
        Erro ao carregar os dados do respositório! <Link to="/login">Voltar</Link>.
      </div>
    )
  }

  if(loading) {
    return(
      <div className="loading">
        Carregando...
      </div>
    )
  }
  return (
    <div id="main">
      <Nav onLogout={handleLogout}/>

      <Search 
      onSearch={handleSearch} 
      />

      <Repositories 
      repositoriesIndex={repositoriesIndex}
      onDeleteRepository={handleDeleteRepository}
      onNewRepository={handleNewRepository}
      />
    </div>
  )
}

export default MainPage;