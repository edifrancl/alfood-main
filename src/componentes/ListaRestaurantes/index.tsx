import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import IPaginacao from '../../interfaces/IPaginacao';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { Button, TextField } from '@mui/material';

// esses sao os possiveis parametros que voce pode enviar para a API
interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');

  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState('');

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {    
    
    //get permite eu coloque o tipo de resposta que eu vou voltar
    // agora, o carregarDados recebe opcionalmente as opções de configuração do axios
    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
    .then(resposta => {
      setRestaurantes(resposta.data.results);
      setProximaPagina(resposta.data.next);
      setPaginaAnterior(resposta.data.previous);
    })
    .catch(erro => {
      console.log(erro);
    })
  }
  // a cada busca, montamos um objeto de opções
  const buscar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const opcoes = {
      params: {

      } as IParametrosBusca
    }
    if (busca) {
      opcoes.params.search = busca
      if (ordenacao) {
        opcoes.params.ordering = ordenacao
      }
    }    

    carregarDados(`http://localhost:8000/api/v1/restaurantes/`, opcoes);    
  }

  useEffect(() => {
    //Obter restaurantes
    carregarDados('http://localhost:8000/api/v1/restaurantes/');
    
  }, []);  

  /*
  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
    .then(resposta => {
      setRestaurantes([...restaurantes, ...resposta.data.results]);
      setProximaPagina(resposta.data.next);
    })
    .catch(erro => {
      console.log(erro);
    })
  } */

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      <form onSubmit={buscar}>
        <TextField 
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          label='Digite o nome do restaurante'
          variant='standard'
        />
        <Button type='submit' variant='outlined'>Pesquisar</Button>
        <select name='selecionar-ordenacao' id='selecionar-ordenacao' value={ordenacao} onChange={(e) => {setOrdenacao(e.target.value)}}>
          <option value=''>Padrão</option>
          <option value='id'>Código do restaurante</option>
          <option value='nome'>Nome do restaurante</option>
        </select>
      </form>
      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
      {proximaPagina && <Button variant="contained" onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>
          Proxima Página
        </Button>}
      {paginaAnterior && <Button variant="contained" onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
          Pagina Anterior
        </Button>}      
    </section>          
  )
}

export default ListaRestaurantes