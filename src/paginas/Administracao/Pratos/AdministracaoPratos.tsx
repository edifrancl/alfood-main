import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {
  
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>('pratos/')
      .then(resposta => setPratos(resposta.data))
      .catch(erro => console.log(erro))
  }, []);

  const excluir = (pratoASerExcluido: IPrato) => {
    http.delete(`pratos/${pratoASerExcluido.id}/`)
      .then(() => {
        const listaPratos = pratos.filter(prato => prato.id !== pratoASerExcluido.id);
        setPratos([...listaPratos]);        
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
              Tag
            </TableCell>
            <TableCell>
              Imagem
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
           {pratos.map(prato => <TableRow key={prato.id}>
              <TableCell>
                {prato.nome}
              </TableCell>
              <TableCell>
                {prato.tag}
              </TableCell>
              <TableCell>
                <a href={prato.imagem} target="_blank" rel="noreferrer"> Ver Imagem</a>
              </TableCell>
              <TableCell>
                <Link to={`/admin/pratos/${prato.id}`}>[ Editar ]</Link>
              </TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdministracaoPratos;