import React, { useState, useEffect, memo } from 'react';
import Plot from 'react-plotly.js';
import { parse } from 'mathjs';
import './App.css';

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

// Componente principal
export default function App() {
  // Estados
  const [expr, setExpr] = useState('x^2');
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);
  const [h, setH] = useState(0.1);
  const [delta, setDelta] = useState(0.1);
  const [y0, setY0] = useState(1);
  const [method, setMethod] = useState('');
  const [plotData, setPlotData] = useState(null);
  const [area, setArea] = useState(null);
  const [theme, setTheme] = useState('light');
  const [error, setError] = useState('');
  const [procedureData, setProcedureData] = useState(null);

  const isDark = theme === 'dark';

  // Limpiar datos al cambiar el método
  useEffect(() => {
  // Limpiar todos los estados de resultados y visualización
  setPlotData(null);
  setArea(null);
  setError('');
  setProcedureData(null);
  
  // Actualizar expresión según el método
  if (method === 'simpson') {
    setExpr(prev => prev.includes('y') ? 'x^2' : prev);
  } else if (method === 'euler' || method === 'rk2') {
    // Asegurar que la expresión para EDOs tenga la variable y
    setExpr(prev => prev.includes('y') ? prev : 'x+y');
  }
}, [method]);

  // Validar expresión
  const validateExpression = (expression, methodType) => {
    // Caracteres inválidos
    if (/[`|:"']/.test(expression)) {
      setError('La expresión contiene caracteres no permitidos (`|:")');
      return false;
    }
    
    // Validar que en Simpson no se use 'y'
    if (methodType === 'simpson' && expression.includes('y')) {
      setError("El método Simpson no admite la variable 'y'");
      return false;
    }
    
    try {
      // Intentar compilar la expresión
      methodType === 'simpson' 
        ? parse(expression).compile().evaluate({ x: 1 })
        : parse(expression).compile().evaluate({ x: 1, y: 1 });
      return true;
    } catch (e) {
      setError(`Error en la expresión: ${e.message}`);
      return false;
    }
  };

  // Validar límites numéricos
  const validateNumber = (value, name) => {
    if (isNaN(value)) {
      setError(`${name} debe ser un número válido`);
      return false;
    }
    if (value < -1000000 || value > 1000000) {
      setError(`${name} debe estar entre -1000000 y 1000000`);
      return false;
    }
    return true;
  };



  // Función principal para cálculos
  const handleRun = () => {
    setError('');
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const hNum = parseFloat(h);
    const deltaNum = parseFloat(delta);
    const y0Num = parseFloat(y0);
    
    // Validación básica
    if (!method) {
      setError("Seleccione un método");
      return;
    }
    
    if (!validateExpression(expr, method)) return;
    
    if (!validateNumber(aNum, "Límite inferior (a)")) return;
    if (!validateNumber(bNum, "Límite superior (b)")) return;
    if (aNum >= bNum) {
      setError("El límite inferior debe ser menor que el superior");
      return;
    }
    
    if (method === 'simpson') {
      if (!validateNumber(deltaNum, "Paso (Δx)")) return;
      runSimpson(aNum, bNum, deltaNum);
    } else {
      if (!validateNumber(hNum, "Paso (h)")) return;
      if (!validateNumber(y0Num, "Valor inicial (y₀)")) return;
      
      if (method === 'euler') {
        runEuler(aNum, bNum, hNum, y0Num);
      } else if (method === 'rk2') {
        runRungeKutta(aNum, bNum, hNum, y0Num);
      }
    }
  };

  // Ejecutar método Simpson
  const runSimpson = (aNum, bNum, deltaNum) => {
    try {
      const f = parse(expr).compile();
      const fx = x => f.evaluate({ x });
      
      let n = Math.ceil((bNum - aNum) / deltaNum);
      if (n % 2 !== 0) n++; // Simpson requiere número par de subintervalos
      
      const h = (bNum - aNum) / n;
      const x = [];
      const y = [];
      
      for (let i = 0; i <= n; i++) {
        const xi = aNum + i * h;
        const yi = fx(xi);
        x.push(xi);
        y.push(yi);
      }
      
      // Calcular área usando Simpson 1/3
      let sum = y[0] + y[n];
      for (let i = 1; i < n; i++) {
        sum += (i % 2 === 0 ? 2 : 4) * y[i];
      }
      const calculatedArea = (h / 3) * sum;
      
      setPlotData({ x, y });
      setArea(calculatedArea);
      setProcedureData({
        x, y, h, aNum, bNum, n, 
        calculatedArea,
        formula: `(${h.toFixed(6)}/3) * [${y[0].toFixed(4)} + ${y[n].toFixed(4)} + 2*(suma de pares) + 4*(suma de impares)]`
      });
    } catch (e) {
      setError(`Error de cálculo: ${e.message}`);
    }
  };

  // Ejecutar método Euler
  const runEuler = (aNum, bNum, hNum, y0Num) => {
    try {
      const f = parse(expr).compile();
      
      const x = [aNum];
      const y = [y0Num];
      const slopes = [];
      let xi = aNum, yi = y0Num;
      
      // Calcular primer slope
      slopes.push(f.evaluate({ x: xi, y: yi }));
      
      while (xi < bNum) {
        const slope = f.evaluate({ x: xi, y: yi });
        yi = yi + hNum * slope;
        xi = xi + hNum;
        x.push(xi);
        y.push(yi);
        if (xi < bNum) slopes.push(f.evaluate({ x: xi, y: yi }));
      }
      
      setPlotData({ x, y });
      setProcedureData({
        x, y, slopes, 
        finalValue: y[y.length-1],
        iterations: x.length - 1,
        formula: `y(i+1) = y(i) + h * f(x(i), y(i))`
      });
    } catch (e) {
      setError(`Error de cálculo: ${e.message}`);
    }
  };

  // Ejecutar método Runge-Kutta
  const runRungeKutta = (aNum, bNum, hNum, y0Num) => {
    try {
      const f = parse(expr).compile();
      
      const x = [aNum];
      const y = [y0Num];
      const k1Values = [];
      const k2Values = [];
      let xi = aNum, yi = y0Num;
      
      while (xi < bNum) {
        const k1 = f.evaluate({ x: xi, y: yi });
        const k2 = f.evaluate({ x: xi + hNum, y: yi + hNum * k1 });
        
        k1Values.push(k1);
        k2Values.push(k2);
        
        yi = yi + (hNum / 2) * (k1 + k2);
        xi = xi + hNum;
        x.push(xi);
        y.push(yi);
      }
      
      setPlotData({ x, y });
      setProcedureData({
        x, y, k1Values, k2Values,
        finalValue: y[y.length-1],
        iterations: x.length - 1,
        formula: `y(i+1) = y(i) + (h/2) * (k₁ + k₂)`
      });
    } catch (e) {
      setError(`Error de cálculo: ${e.message}`);
    }
  };

  // Componente para renderizar el formulario
  const MethodForm = () => (
    <div className={`method-form ${isDark ? 'dark' : 'light'}`}>
      <h2 className="animate-title">Configuración</h2>
      
      <div className="form-group">
        <label htmlFor="method">Método numérico</label>
        <select 
          id="method"
          value={method} 
          onChange={e => setMethod(e.target.value)}
          className="form-control"
        >
          <option value="">-- Seleccionar método --</option>
          <option value="simpson">Simpson 1/3 (Integración)</option>
          <option value="euler">Euler (EDO)</option>
          <option value="rk2">Runge-Kutta 2° orden (EDO)</option>
        </select>
      </div>
      
      {method && (
        <>
          <div className="form-group">
            <label htmlFor="expr">
              {method === 'simpson' ? 'Función f(x)' : 'Función f(x,y)'}
            </label>
            <input
              id="expr"
              type="text"
              value={expr}
              onChange={e => setExpr(e.target.value)}
              className="form-control"
              placeholder={method === 'simpson' ? 'Ej: x^2' : 'Ej: x+y'}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="a">Límite inferior (a)</label>
              <input
                id="a"
                type="number"
                value={a}
                onChange={e => setA(parseFloat(e.target.value) || 0)}
                className="form-control"
                min="-1000000"
                max="1000000"
                step="0.1"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="b">Límite superior (b)</label>
              <input
                id="b"
                type="number"
                value={b}
                onChange={e => setB(parseFloat(e.target.value) || 0)}
                className="form-control"
                min="-1000000"
                max="1000000"
                step="0.1"
              />
            </div>
          </div>
          
          {method === 'simpson' && (
            <div className="form-group">
              <label htmlFor="delta">Paso (Δx)</label>
              <input
                id="delta"
                type="number"
                value={delta}
                onChange={e => setDelta(parseFloat(e.target.value) || 0.1)}
                className="form-control"
                min="0.000001"
                max="1"
                step="0.01"
              />
            </div>
          )}
          
          {(method === 'euler' || method === 'rk2') && (
            <>
              <div className="form-group">
                <label htmlFor="y0">Valor inicial (y₀)</label>
                <input
                  id="y0"
                  type="number"
                  value={y0}
                  onChange={e => setY0(parseFloat(e.target.value) || 0)}
                  className="form-control"
                  min="-1000000"
                  max="1000000"
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="h">Paso (h)</label>
                <input
                  id="h"
                  type="number"
                  value={h}
                  onChange={e => setH(parseFloat(e.target.value) || 0.1)}
                  className="form-control"
                  min="0.000001"
                  max="1"
                  step="0.01"
                />
              </div>
            </>
          )}
          
          <button 
            className="calculate-btn" 
            onClick={handleRun}
          >
            <span>Calcular y Visualizar</span>
          </button>
        </>
      )}
    </div>
  );

  // Componente para renderizar la visualización
const Visualization = () => (
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
);

  // Renderizado principal
  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <header className="app-header">
        <div className="logo-container">
          <img src="/logo192.png" alt="Logo UTA" className="app-logo pulse-animation" />
          <div className="title-container">
            <h1>Métodos Numéricos</h1>
            <p>Universidad Técnica de Ambato</p>
          </div>
        </div>
        <button 
          className="theme-toggle"
          onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        >
          <i className={`bi bi-${theme === 'light' ? 'moon' : 'sun'}`}></i>
          {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
        </button>
      </header>
      
      <main className="app-content">
        <div className="panel-left fade-in-animation">
          <MethodForm />
        </div>
        
        <div className="panel-right fade-in-animation">
          <Visualization />
        </div>
      </main>
      
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logo192.png" alt="Logo UTA" className="footer-img" />
          </div>
          <p>© {new Date().getFullYear()} Métodos Numéricos • Ingeniería en Sistemas</p>
          <p className="user-info">Sesión: materubag | {new Date().toLocaleString()}</p>
        </div>
      </footer>
    </div>
  );
}