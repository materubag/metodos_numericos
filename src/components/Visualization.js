import React, { memo } from 'react';
import Plot from 'react-plotly.js';
import ProcedureTable from './ProcedureTable';

const Visualization = memo(({ 
  method, 
  plotData, 
  area, 
  procedureData, 
  error, 
  isDark, 
  a, 
  b 
}) => (
  <div className={`visualization ${isDark ? 'dark' : 'light'}`}>
    <h2 className="animate-title">Visualización</h2>
    
    {error && (
      <div className="error-message">
        {error}
      </div>
    )}
    
    {plotData ? (
      <div className="result-container">
        <div className="plot-container">
          <Plot
            data={[{
              x: plotData.x,
              y: plotData.y,
              type: 'scatter',
              mode: 'lines+markers',
              line: { 
                color: isDark ? '#ffffff' : '#b71c1c', 
                width: 2,
                shape: 'spline'
              },
              marker: { 
                color: isDark ? '#ffffff' : '#b71c1c', 
                size: 5,
                line: { width: 1, color: isDark ? '#333' : '#fff' }
              },
              name: method === 'simpson' ? 'f(x)' : 'y(x)',
              fill: method === 'simpson' ? 'tozeroy' : undefined,
              fillcolor: method === 'simpson' ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(183,28,28,0.1)') : undefined
            }]}
            layout={{
              autosize: true,
              title: { 
                text: `${method === 'simpson' ? 'Integración Numérica - Simpson 1/3' : 
                       method === 'euler' ? 'Método de Euler - EDO' : 
                       'Método de Runge-Kutta 2° - EDO'}`,
                font: { 
                  color: isDark ? '#ffffff' : '#b71c1c', 
                  size: 16 
                }
              },
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(240,240,240,0.5)',
              font: { 
                color: isDark ? '#ffffff' : '#333333',
                family: 'Arial, sans-serif',
                size: 12
              },
              margin: { t: 50, l: 60, r: 40, b: 50 },
              xaxis: {
                title: {
                  text: 'x',
                  font: { color: isDark ? '#ffffff' : '#b71c1c' }
                },
                gridcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                zerolinecolor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'
              },
              yaxis: { 
                title: {
                  text: method === 'simpson' ? 'f(x)' : 'y',
                  font: { color: isDark ? '#ffffff' : '#b71c1c' }
                },
                gridcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                zerolinecolor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'
              }
            }}
            config={{ 
              responsive: true, 
              displayModeBar: false
            }}
            style={{ 
              width: '100%', 
              height: '300px'
            }}
          />
        </div>
        
        {/* Resultado para Simpson */}
        {method === 'simpson' && area !== null && (
          <div className="area-result">
            <h3>Resultado:</h3>
            <p>Área bajo la curva: <strong>{area.toFixed(6)}</strong> unidades²</p>
          </div>
        )}
        
        {/* Resultado para Euler/RK2 - Verificación más estricta */}
        {(method === 'euler' || method === 'rk2') && 
         procedureData && 
         procedureData.finalValue !== undefined && 
         procedureData.iterations !== undefined && (
          <div className="result-info">
            <h3>Resultado:</h3>
            <p>Valor final y({b}): <strong>{procedureData.finalValue.toFixed(6)}</strong></p>
            <p>Iteraciones: {procedureData.iterations}</p>
          </div>
        )}
        
        {/* Sección de procedimiento - Solo se muestra si el método y los datos corresponden */}
        {procedureData && (
          <div className="procedure">
            <h3>Procedimiento</h3>
            
            <div className="procedure-formula">
              <h4>Fórmula utilizada:</h4>
              {method === 'simpson' && (
                <div className="formula">
                  ∫<sub>{a}</sub><sup>{b}</sup> f(x) dx ≈ h/3 [f(x<sub>0</sub>) + 4f(x<sub>1</sub>) + 2f(x<sub>2</sub>) + ... + f(x<sub>n</sub>)]
                </div>
              )}
              
              {method === 'euler' && (
                <div className="formula">
                  y<sub>i+1</sub> = y<sub>i</sub> + h × f(x<sub>i</sub>, y<sub>i</sub>)
                </div>
              )}
              
              {method === 'rk2' && (
                <>
                  <div className="formula">
                    k<sub>1</sub> = f(x<sub>i</sub>, y<sub>i</sub>)
                  </div>
                  <div className="formula">
                    k<sub>2</sub> = f(x<sub>i</sub> + h, y<sub>i</sub> + h × k<sub>1</sub>)
                  </div>
                  <div className="formula">
                    y<sub>i+1</sub> = y<sub>i</sub> + (h/2) × (k<sub>1</sub> + k<sub>2</sub>)
                  </div>
                </>
              )}
            </div>
            
            <div className="table-container">
              <h4>Tabla de valores:</h4>
              <ProcedureTable data={procedureData} method={method} isDark={isDark} />
            </div>
          </div>
        )}
      </div>
    ) : (
      <div className="placeholder-message">
        <p>Selecciona un método numérico e ingresa los parámetros para visualizar resultados.</p>
      </div>
    )}
  </div>
));

export default Visualization;