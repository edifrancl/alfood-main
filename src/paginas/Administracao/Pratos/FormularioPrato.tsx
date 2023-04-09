import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";
import Itag from "../../../interfaces/Itag";
import IRestaurante from "../../../interfaces/IRestaurante";
import { useParams } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";

const FormularioPrato = () => {

  const parametros = useParams();
 
  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');

  const [tag, setTag] = useState('');
  const [restaurante, setRestaurante] = useState(0);

  const [imagem, setImagem] = useState<File | null>(null);

  const [tags, setTags] = useState<Itag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http.get<{ tags: Itag[]} > ('tags/')
      .then(resposta => setTags(resposta.data.tags))
    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setRestaurantes(resposta.data))
  }, []);

  useEffect(() => {
    if (parametros.id) {
      http.get<IPrato>(`pratos/${parametros.id}/`)
        .then( resposta => {
          setNomePrato(resposta.data.nome)
          setDescricao(resposta.data.descricao)
          setTag(resposta.data.tag)
          setRestaurante(resposta.data.restaurante)
        })
    }
  }, [parametros]);

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0])
    } else {
      setImagem(null);
    }      
  };

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    // Necessario para trabalhar com binarios (uma forma de fazer)
    const formData = new FormData();

    // lado esquero fica o nome do campo e do lado direito o valor
    formData.append('nome', nomePrato);
    formData.append('descricao', descricao);
    formData.append('tag', tag);
    formData.append('restaurante', restaurante.toString());
    
    if (!parametros.id && imagem) {
      formData.append('imagem', imagem);
    }

    http.request({
      url: 'pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(() => {
        setNomePrato('');
        setDescricao('');
        setTag('');
        setRestaurante(0);
        setImagem(null);
        alert('Prato cadastrado com sucesso!')
      })
      .catch(erro => console.log(erro))

  };

  useEffect(() => {
    http.get< { tags: Itag[]}>('tags/')
      .then(resposta => {
        //console.log(resposta.data.tags)
        setTags(resposta.data.tags)
        //console.log('resposta e data');
        //console.log(resposta.data);      
      })
    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setRestaurantes(resposta.data))  
  }, [])

  return (
            
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
      <Typography component='h1' variant='h5'>Formulário de Pratos</Typography>
      <Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>      
        <TextField
          value={nomePrato}
          onChange={ evento => setNomePrato(evento.target.value)}
          id="standard-basic" 
          label="Nome do Prato" 
          variant="standard"
          fullWidth
          required
          margin="dense"
        />
        <TextField
          value={descricao}
          onChange={ evento => setDescricao(evento.target.value)}
          id="standard-basic" 
          label="Descrição do prato" 
          variant="standard"
          fullWidth
          required
          margin='dense'
        />
        <FormControl margin='dense' fullWidth>
          <InputLabel id='select-tag'>Tag</InputLabel>
          <Select labelId='select-tag' value={tag} onChange={ evento => setTag(evento.target.value)}>
            {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
              {tag.value}
            </MenuItem>)}
          </Select>
        </FormControl>

        <FormControl margin='dense' fullWidth>
          <InputLabel id='select-restaurante'>Restaurante</InputLabel>
          <Select labelId='select-restaurante' value={restaurante} onChange={ evento => setRestaurante(Number(evento.target.value))} >
            {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
              {restaurante.nome}
            </MenuItem>)}
          </Select>
        </FormControl>

        <input type='file' onChange={selecionarArquivo} />

        <Button sx={{ marginTop: 1}} type="submit" variant="outlined" fullWidth> Salvar </Button>
      </Box>
    </Box>    
  )
};

export default FormularioPrato;