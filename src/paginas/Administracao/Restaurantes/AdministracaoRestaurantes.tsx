import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

const AdministracaoRestaurantes = () => {
  
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setRestaurantes(resposta.data))
      .catch(erro => console.log(erro))
  }, []);

  const excluir = (restauranteASerExcluido: IRestaurante) => {
    http.delete(`restaurantes/${restauranteASerExcluido.id}/`)
      .then(() => {
        const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteASerExcluido.id);
        setRestaurantes([...listaRestaurante]);        
      })
  }

  /*
  Olá, Edifran!

  A função setRestaurantes é utiliza da para atualizar o estado da lista de restaurantes que está sendo 
  exibida na tela. Quando utilizamos setRestaurantes(listaRestaurante), estamos simplesmente atualizando
  o estado com a lista de restaurantes filtrada, ou seja, estamos substituindo o valor anterior pelo novo 
  valor.

  Já quando utilizamos setRestaurantes([...listaRestaurante]), estamos criando um novo array com os 
  elementos da lista de restaurantes filtrada e atualizando o estado com esse novo array. Isso é necessário
  porque o React compara o estado anterior com o novo estado para determinar se precisa ou não atualizar 
  a tela. Se utilizarmos o mesmo array, mesmo que os elementos tenham sido modificados, o React não 
  detectará a mudança e não atualizará a tela.

  Espero ter ajudado e bons estudos!
  
  */

  return(
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Deletar
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
              <TableCell>
                {restaurante.nome}
              </TableCell>
              <TableCell>
                <Link to={`/admin/restaurantes/${restaurante.id}`}>[ Editar ]</Link>
              </TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdministracaoRestaurantes;