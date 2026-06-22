import React from 'react';
import FilaDesembarque from './FilaDesembarque';

function ListaDesembarques({ datos, prioritarios, onTogglePrioritario }) {
  if (datos.length === 0) {
    return <p className="status-msg">No se encontraron registros de desembarque.</p>;
  }

  return (
    <div className="table-responsive-container">
      <table className="custom-table">
        <thead className="table-header">
          <tr>
            <th>ID</th>
            <th>Especie</th>
            <th>Embarcación</th>
            <th>Fecha</th>
            <th>Kilos</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((lote) => (
            <FilaDesembarque 
              key={lote.id} 
              desembarque={lote} 
              isPrioritario={prioritarios.includes(lote.id)} 
              onTogglePrioritario={onTogglePrioritario}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaDesembarques;