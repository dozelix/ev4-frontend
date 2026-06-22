import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ListaDesembarques from './components/ListaDesembarques'; // R1: Componente importado correctamente
import './styles/main.css'; // Centralización del compositor CSS global

function App() {
  const [desembarques, setDesembarques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // R4: Almacenamiento local para persistencia de lotes de urgencia
  const [prioritarios, setPrioritarios] = useState(() => {
    const guardados = localStorage.getItem('lotes_prioritarios');
    return guardados ? JSON.parse(guardados) : [];
  });

  // R5: Estado reactivo para el filtrado en tiempo real
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  // Sincronización del estado con Local Storage
  useEffect(() => {
    localStorage.setItem('lotes_prioritarios', JSON.stringify(prioritarios));
  }, [prioritarios]);

  // R3 y R6: Consumo asíncrono seguro mediante Fetch y manejo estricto de excepciones
  useEffect(() => {
    const obtenerDesembarques = async () => {
      try {
        setLoading(true);
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) {
          throw new Error(`Error en el servidor: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setDesembarques(datos);
        setError(null);
      } catch (err) {
        console.error("Error al consumir la API:", err);
        setError("No se pudieron cargar los datos de los desembarques. Verifique la conexión con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    if (API_URL) {
      obtenerDesembarques();
    } else {
      // Resguardo de seguridad si la variable de entorno no se inyecta
      setError("Error de configuración: La URL de la API (VITE_API_URL) no está definida.");
      setLoading(false);
    }
  }, [API_URL]);

  // Manejador para alternar elementos marcados como prioritarios
  const togglePrioritario = (id) => {
    if (prioritarios.includes(id)) {
      setPrioritarios(prioritarios.filter(pId => pId !== id));
    } else {
      setPrioritarios([...prioritarios, id]);
    }
  };

  // R5 y R6: Sanitización de datos del cliente contra inyecciones XSS maliciosas
  const sanearEntrada = (texto) => {
    if (typeof texto !== 'string') return '';
    return texto.replace(/[<>]/g, '').trim();
  };

  const terminoSaneado = sanearEntrada(terminoBusqueda);

  // Discriminación lógica del set de datos basado en el string seguro
  const desembarquesFiltrados = desembarques.filter((lote) => {
    const especie = lote.especie.toLowerCase();
    const estado = lote.estado.toLowerCase();
    const busqueda = terminoSaneado.toLowerCase();
    return especie.includes(busqueda) || estado.includes(busqueda);
  });

  return (
    <div className="app-wrapper">
      <Navbar />
      <Hero />

      <main className="dashboard-main">
        {/* Sección de Control de Búsqueda */}
        <div className="filter-box">
          <label htmlFor="filtro-input">Filtrar por Especie o Estado:</label>
          <input
            id="filtro-input"
            type="text"
            className="filter-input"
            placeholder="Ej: Jurel, Merluza, procesado..."
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
          />
          {terminoSaneado && (
            <span className="filter-info">
              Mostrando coincidencias para: <strong className="filter-highlight">"{terminoSaneado}"</strong>
            </span>
          )}
        </div>

        {/* Renderizado Condicional Seguro */}
        {loading && <div className="status-msg">Cargando registros...</div>}
        {error && <div className="error-box">{error}</div>}
        
        {!loading && !error && (
          <div className="table-wrapper">
            <ListaDesembarques 
              datos={desembarquesFiltrados} 
              prioritarios={prioritarios} 
              onTogglePrioritario={togglePrioritario} 
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;