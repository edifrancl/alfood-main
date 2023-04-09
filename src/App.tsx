import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/FormularioRestaurante';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';
import AdministracaoPratos from './paginas/Administracao/Pratos/AdministracaoPratos';
import FormularioPrato from './paginas/Administracao/Pratos/FormularioPrato';

function App() {

  // usando o id, a gente diz para o router dom que o segmento eh dinamico, eu consigo
  // capturar ele no formulario
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path='/admin' element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />      
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />      

        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path='pratos/novo' element={<FormularioPrato />} />
        <Route path='pratos/:id' element={<FormularioPrato />} />
      </Route>

    </Routes>
)}

export default App;
