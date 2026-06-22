import React from 'react';

function FilaDesembarque({ desembarque, isPrioritario, onTogglePrioritario }) {
  return (
    <tr style={{ backgroundColor: isPrioritario ? '#f9f9e0' : 'transparent' }}>
      <td>{desembarque.id}</td>
      <td><strong>{desembarque.especie}</strong></td>
      <td>{desembarque.embarcacion}</td>
      <td>{desembarque.fecha}</td>
      <td>{desembarque.kilos.toLocaleString('es-CL')} kg</td>
      <td>
        <span style={{
          padding: '4px 8px',
          borderRadius: '4px',
          backgroundColor: 
            desembarque.estado === 'procesado' ? '#d4edda' :
            desembarque.estado === 'pendiente' ? '#fff3cd' : '#f8d7da',
          color: 
            desembarque.estado === 'procesado' ? '#155724' :
            desembarque.estado === 'pendiente' ? '#856404' : '#721c24'
        }}>
          {desembarque.estado}
        </span>
      </td>
      <td>
        <button 
          onClick={() => onTogglePrioritario(desembarque.id)}
          style={{
            cursor: 'pointer',
            backgroundColor: isPrioritario ? '#ffc107' : '#e2e8f0',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            padding: '4px 8px'
          }}
        >
          {isPrioritario ? '⭐ Prioritario' : '☆ Marcar'}
        </button>
      </td>
    </tr>
  );
}

export default FilaDesembarque;