import React, { memo } from 'react';

// Componente para la tabla del procedimiento
const ProcedureTable = memo(({ data, method, isDark }) => {
  // Verificación más estricta de los datos
  if (!data || typeof data !== 'object') return null;

  if (method === 'simpson') {
    // Verificar que los arrays necesarios existan y tengan datos
    if (!Array.isArray(data.x) || !Array.isArray(data.y) || 
        data.x.length === 0 || data.y.length === 0 || 
        data.n === undefined) {
      return null;
    }
    
    const { x, y, n } = data;
    
    return (
      <table className={`procedure-table ${isDark ? 'dark' : 'light'}`}>
        <thead>
          <tr>
            <th>i</th>
            <th>x<sub>i</sub></th>
            <th>f(x<sub>i</sub>)</th>
            <th>Coeficiente</th>
          </tr>
        </thead>
        <tbody>
          {x.map((xi, i) => {
            const coef = i === 0 || i === n ? 1 : (i % 2 === 0 ? 2 : 4);
            return (
              <tr key={i} className={i % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{i}</td>
                <td>{xi.toFixed(4)}</td>
                <td>{y[i].toFixed(6)}</td>
                <td className={`coef-${coef}`}>{coef}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else if (method === 'euler') {
    // Verificar que los arrays necesarios existan y tengan datos
    if (!Array.isArray(data.x) || !Array.isArray(data.y) || !Array.isArray(data.slopes) ||
        data.x.length < 2 || data.y.length < 2 || data.slopes.length === 0) {
      return null;
    }
    
    const { x, y, slopes } = data;
    
    return (
      <table className={`procedure-table ${isDark ? 'dark' : 'light'}`}>
        <thead>
          <tr>
            <th>i</th>
            <th>x<sub>i</sub></th>
            <th>y<sub>i</sub></th>
            <th>f(x<sub>i</sub>,y<sub>i</sub>)</th>
            <th>y<sub>i+1</sub></th>
          </tr>
        </thead>
        <tbody>
          {x.slice(0, -1).map((xi, i) => (
            <tr key={i} className={i % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{i}</td>
              <td>{xi.toFixed(4)}</td>
              <td>{y[i].toFixed(6)}</td>
              <td>{slopes[i].toFixed(6)}</td>
              <td>{y[i+1].toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (method === 'rk2') {
    // Verificar que los arrays necesarios existan y tengan datos
    if (!Array.isArray(data.x) || !Array.isArray(data.y) || 
        !Array.isArray(data.k1Values) || !Array.isArray(data.k2Values) ||
        data.x.length < 2 || data.y.length < 2 || 
        data.k1Values.length === 0 || data.k2Values.length === 0) {
      return null;
    }
    
    const { x, y, k1Values, k2Values } = data;
    
    return (
      <table className={`procedure-table ${isDark ? 'dark' : 'light'}`}>
        <thead>
          <tr>
            <th>i</th>
            <th>x<sub>i</sub></th>
            <th>y<sub>i</sub></th>
            <th>k₁</th>
            <th>k₂</th>
            <th>y<sub>i+1</sub></th>
          </tr>
        </thead>
        <tbody>
          {x.slice(0, -1).map((xi, i) => (
            <tr key={i} className={i % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{i}</td>
              <td>{xi.toFixed(4)}</td>
              <td>{y[i].toFixed(6)}</td>
              <td>{k1Values[i].toFixed(6)}</td>
              <td>{k2Values[i].toFixed(6)}</td>
              <td>{y[i+1].toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return null;
});

export default ProcedureTable;