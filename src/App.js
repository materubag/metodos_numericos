import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { parse } from 'mathjs';
import './App.css';


export default function App() {
  const [expr, setExpr] = useState('x + y');
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);
  const [h, setH] = useState(0.1);
  const [delta, setDelta] = useState(0.1);
  const [y0, setY0] = useState(1);
  const [method, setMethod] = useState('');
  const [plotData, setPlotData] = useState(null);
  const [area, setArea] = useState(null);
  const [theme, setTheme] = useState('light');

  const isDark = theme === 'dark';

  const simpson = (f, a, b, n = 100) => {
    if (n % 2 !== 0) n++;
    const h = (b - a) / n;
    let sum = f(a) + f(b);
    for (let i = 1; i < n; i++) {
      let x = a + i * h;
      sum += (i % 2 === 0 ? 2 : 4) * f(x);
    }
    return (h / 3) * sum;
  };

  const handleRun = () => {
    const f = parse(expr).compile();

    if (method === 'simpson') {
      const fx = x => f.evaluate({ x });
      const xs = [], ys = [];
      for (let x = a; x <= b; x += delta) {
        xs.push(x);
        ys.push(fx(x));
      }
      const areaVal = simpson(fx, a, b);
      setPlotData({ x: xs, y: ys });
      setArea(areaVal);
    } else {
      let xs = [a], ys = [y0];
      let x = a, y = y0;
      while (x < b) {
        let k1 = f.evaluate({ x, y });
        if (method === 'euler') {
          y += h * k1;
        } else if (method === 'rk2') {
          let k2 = f.evaluate({ x: x + h / 2, y: y + h * k1 / 2 });
          y += h * k2;
        }
        x += h;
        xs.push(x);
        ys.push(y);
      }
      setPlotData({ x: xs, y: ys });
      setArea(null);
    }
  };

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <header className="header">
          <h1> Métodos Numéricos</h1>
          <button className="theme-toggle" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? 'Oscuro' : ' Claro'}
          </button>
        </header>

        <div className="panel">
          <div className="inputs">
            <label>Método
              <select value={method} onChange={e => setMethod(e.target.value)}>
                <option value="">-- Seleccionar --</option>
                <option value="euler">Euler</option>
                <option value="rk2">Runge-Kutta 2</option>
                <option value="simpson">Simpson 1/3</option>
              </select>
            </label>

            {method && (
              <label>f(x{method !== 'simpson' ? ', y' : ''})<input value={expr} onChange={e => setExpr(e.target.value)} /></label>
            )}

            {(method === 'euler' || method === 'rk2') && (
              <>
                <label>y₀<input type="number" value={y0} onChange={e => setY0(+e.target.value)} /></label>
                <label>h (paso)<input type="number" value={h} step="0.01" onChange={e => setH(+e.target.value)} /></label>
              </>
            )}

            {method === 'simpson' && (
              <label>Δx<input type="number" value={delta} step="0.01" onChange={e => setDelta(+e.target.value)} /></label>
            )}

            {method && (
              <>
                <label>a (inicio)<input type="number" value={a} onChange={e => setA(+e.target.value)} /></label>
                <label>b (fin)<input type="number" value={b} onChange={e => setB(+e.target.value)} /></label>
                <button className="run-btn" onClick={handleRun}>Visualizar</button>
              </>
            )}
          </div>

          <div className="plot">
            {plotData ? (
              <>
                <Plot
                  data={[{
                    x: plotData.x,
                    y: plotData.y,
                    type: 'scatter',
                    mode: 'lines',
                    line: {
                      width: 2,
                      // --- CAMBIO AQUÍ: Color de la línea de la gráfica ---
                      color: isDark ? '#4285F4' : '#1d4ed8' // Azul de Google para oscuro, azul más oscuro para claro
                    },
                    marker: {
                      // --- CAMBIO AQUÍ: Color de los marcadores (si los hay) ---
                      color: isDark ? '#4285F4' : '#1d4ed8' // Mismo color que la línea
                    },
                    name: method.toUpperCase(),
                    fill: method === 'simpson' ? 'tozeroy' : undefined,
                    fillcolor: method === 'simpson' ? (isDark ? 'rgba(66,133,244,0.2)' : 'rgba(29,78,216,0.2)') : undefined // Relleno con transparencia del color de la línea
                  }]}
                  layout={{
                    autosize: true,
                    title: {
                      text: 'Resultado',
                      // --- CAMBIO AQUÍ: Color del título de la gráfica ---
                      font: {
                        color: isDark ? '#e0e0e0' : '#111' // Gris claro para oscuro, negro para claro
                      }
                    },
                    // --- CAMBIO AQUÍ: Colores de fondo del plot y papel ---
                    paper_bgcolor: isDark ? '#1f1f1f' : '#fff', // Fondo del "papel" de la gráfica (panel-bg-dark)
                    plot_bgcolor: isDark ? '#1f1f1f' : '#fff', // Fondo del área del plot

                    // --- CAMBIO AQUÍ: Color de la fuente general (ejes, ticks) ---
                    font: {
                      color: isDark ? '#e0e0e0' : '#111' // Gris claro para oscuro, negro para claro
                    },
                    margin: { t: 40, l: 50, r: 30, b: 40 },
                    responsive: true,
                    // --- CAMBIOS AQUÍ: Ejes X e Y ---
                    xaxis: {
                      tickfont: {
                        color: isDark ? '#b0b0b0' : '#555' // Gris suave para los números de los ejes
                      },
                      gridcolor: isDark ? '#3a3a3a' : '#eee', // Cuadrícula más sutil
                      linecolor: isDark ? '#5a5a5a' : '#ccc', // Línea del eje
                      zerolinecolor: isDark ? '#5a5a5a' : '#ccc', // Línea cero
                      title: { // Si quieres títulos en los ejes
                        font: {
                          color: isDark ? '#e0e0e0' : '#111'
                        }
                      }
                    },
                    yaxis: {
                      tickfont: {
                        color: isDark ? '#b0b0b0' : '#555' // Gris suave para los números de los ejes
                      },
                      gridcolor: isDark ? '#3a3a3a' : '#eee', // Cuadrícula más sutil
                      linecolor: isDark ? '#5a5a5a' : '#ccc', // Línea del eje
                      zerolinecolor: isDark ? '#5a5a5a' : '#ccc', // Línea cero
                      title: { // Si quieres títulos en los ejes
                        font: {
                          color: isDark ? '#e0e0e0' : '#111'
                        }
                      }
                    },
                    // --- CAMBIOS AQUÍ: Leyenda (si usas showlegend: true) ---
                    showlegend: true, // Asegúrate de que esto esté aquí si quieres que la leyenda se muestre
                    legend: {
                      font: {
                        color: isDark ? '#e0e0e0' : '#111' // Color de la fuente de la leyenda
                      },
                      bgcolor: isDark ? '#2a2a2a' : 'rgba(255,255,255,0.8)', // Fondo de la leyenda
                      bordercolor: isDark ? '#4a4a4a' : '#ccc', // Borde de la leyenda
                      borderwidth: 1
                    }
                  }}
                  useResizeHandler
                  style={{ width: '100%', height: '100%' }}
                />
                {method === 'simpson' && area !== null && (
                  // --- CAMBIO AQUÍ: Color del texto del área ---
                  <div className="area" style={{ color: isDark ? '#e0e0e0' : '#1a1a1a' }}>
                    Área ≈ {area.toFixed(6)}
                  </div>
                )}
              </>
            ) : <p className="placeholder">Selecciona método e ingresa parámetros.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
