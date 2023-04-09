import axios from "axios";

// A ideia aqui eh evitar repeticao de codigo e facilitar a alteracao do mesmo
/* Imagine que vc tem um endereco usado no codigo em varias partes do codigo.  Ao inves de
voce alterar  */

const http = axios.create({

  baseURL: 'http://localhost:8000/api/v2/'

});

export default http;