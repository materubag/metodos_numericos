import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { parse } from 'mathjs';
import './App.css';


export default function App() {
  // Inicializar los estados vacíos
  const [expr, setExpr] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [h, setH] = useState('');
  const [delta, setDelta] = useState('');
  const [y0, setY0] = useState('');
  const [method, setMethod] = useState('');
  const [plotData, setPlotData] = useState(null);
  const [area, setArea] = useState(null);
  const [theme, setTheme] = useState('light');
  const [procedure, setProcedure] = useState("");

  const isDark = theme === 'dark';

  const simpson = (f, a, b, n) => {
    // Simpson 1/3 clásico para integración definida
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
    // Normalizar posibles signos menos Unicode a ASCII
    const exprNormalized = expr.replace(/[−–—]/g, '-');
    // Convertir todos los valores a número antes de usarlos
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const hNum = parseFloat(h);
    const deltaNum = parseFloat(delta);
    const y0Num = parseFloat(y0);
    let f;
    try {
      f = parse(exprNormalized).compile();
    } catch (e) {
      setProcedure(`<span style='color:#e53935;font-weight:bold;'>Error de sintaxis en la expresión: ${e.message}</span>`);
      setPlotData(null);
      setArea(null);
      return;
    }
    let proc = "";
    if (method === 'simpson') {
      // Simpson solo depende de x
      let exprFixed = exprNormalized.replace(/\by\b/g, '0');
      if (/\by\b/.test(exprNormalized)) {
        setProcedure('<span style="color:#e53935;font-weight:bold;">Advertencia: La expresión para Simpson solo debe depender de x. Se ignoró la variable y.</span><br>');
      } else {
        setProcedure("");
      }
      const fSimpson = parse(exprFixed).compile();
      // Calcular n como número de subintervalos (par)
      let n = Math.round((bNum - aNum) / deltaNum);
      if (n % 2 !== 0) n++;
      const hSimpson = (bNum - aNum) / n;
      let xs = [], ys = [];
      let table = `<b>Tabla de nodos usados:</b><br><table class='procedure-table'><tr><th>i</th><th>x_i</th><th>f(x_i)</th></tr>`;
      for (let i = 0; i <= n; i++) {
        let xi = aNum + i * hSimpson;
        let yi = fSimpson.evaluate({ x: xi });
        xs.push(xi);
        ys.push(yi);
        table += `<tr><td>${i}</td><td>${Number(xi).toFixed(6)}</td><td>${Number(yi).toFixed(6)}</td></tr>`;
      }
      table += '</table>';
      // Simpson 1/3
      let sum = ys[0] + ys[n];
      for (let i = 1; i < n; i++) {
        sum += (i % 2 === 0 ? 2 : 4) * ys[i];
      }
      const areaVal = (hSimpson / 3) * sum;
      proc = `<b>Procedimiento Simpson 1/3:</b><br>n = ${n} (subintervalos, debe ser par)<br>h = (b-a)/n = (${bNum}-${aNum})/${n} = ${hSimpson.toFixed(6)}<br>` +
        `S = f(x_0) + f(x_n) + 4 * sum(f(x_impares)) + 2 * sum(f(x_pares))<br>` +
        `Área ≈ (h/3) * S = (${hSimpson.toFixed(6)}/3) * ${sum.toFixed(6)} = <b>${areaVal.toFixed(6)}</b><br>` + table;
      setPlotData({ x: xs, y: ys });
      setArea(areaVal);
      setProcedure(proc);
    } else if (method === 'euler') {
      if (!/\by\b/.test(expr)) {
        alert('La expresión para Euler debe depender de x y de y.');
        return;
      }
      let xs = [aNum], ys = [y0Num];
      let x = aNum, y = y0Num;
      let steps = `<b>Tabla de iteraciones:</b><br><table class='procedure-table'><tr><th>i</th><th>x</th><th>y</th><th>f(x,y)</th></tr>`;
      let i = 0;
      while (x < bNum) {
        let k1 = f.evaluate({ x, y });
        steps += `<tr><td>${i}</td><td>${x.toFixed(4)}</td><td>${y.toFixed(6)}</td><td>${k1.toFixed(6)}</td></tr>`;
        y = y + hNum * k1;
        x = x + hNum;
        xs.push(x);
        ys.push(y);
        i++;
      }
      steps += '</table>';
      proc = `<b>Procedimiento Euler:</b><br>y_{i+1} = y_i + h * f(x_i, y_i)<br>h = ${hNum}<br>` + steps + `<br>Respuesta final: <b>y(${bNum}) ≈ ${ys[ys.length-1].toFixed(6)}</b>`;
      setPlotData({ x: xs, y: ys });
      setArea(null);
      setProcedure(proc);
    } else if (method === 'rk2') {
      if (!/\by\b/.test(expr)) {
        alert('La expresión para Runge-Kutta 2 debe depender de x y de y.');
        return;
      }
      let xs = [aNum], ys = [y0Num];
      let x = aNum, y = y0Num;
      let steps = `<b>Tabla de iteraciones:</b><br><table class='procedure-table'><tr><th>i</th><th>x</th><th>y</th><th>k1</th><th>k2</th></tr>`;
      let i = 0;
      while (x < bNum) {
        let k1 = f.evaluate({ x, y });
        let k2 = f.evaluate({ x: x + hNum, y: y + hNum * k1 });
        steps += `<tr><td>${i}</td><td>${x.toFixed(4)}</td><td>${y.toFixed(6)}</td><td>${k1.toFixed(6)}</td><td>${k2.toFixed(6)}</td></tr>`;
        y = y + (hNum / 2) * (k1 + k2);
        x = x + hNum;
        xs.push(x);
        ys.push(y);
        i++;
      }
      steps += '</table>';
      proc = `<b>Procedimiento Runge-Kutta 2° Orden:</b><br>k1 = f(x_i, y_i)<br>k2 = f(x_i + h, y_i + h * k1)<br>y_{i+1} = y_i + (h/2)*(k1 + k2)<br>h = ${hNum}<br>` + steps + `<br>Respuesta final: <b>y(${bNum}) ≈ ${ys[ys.length-1].toFixed(6)}</b>`;
      setPlotData({ x: xs, y: ys });
      setArea(null);
      setProcedure(proc);
    }
  };

  // Al cambiar de método, limpiar todo
  const handleMethodChange = e => {
    setMethod(e.target.value);
    setExpr('');
    setA('');
    setB('');
    setH('');
    setDelta('');
    setY0('');
    setPlotData(null);
    setArea(null);
    setProcedure('');
  };

  return (
    <div className={`app ${theme} animate__animated animate__fadeIn`} style={{ minHeight: '100vh', background: isDark ? '#181c2b' : '#f8fafc', transition: 'background 0.5s' }}>
      <div className="container py-4 animate__animated animate__fadeInUp animate__faster">
        <header className="d-flex justify-content-between align-items-center mb-4 animate__animated animate__fadeInDown animate__faster">
          <div className="d-flex align-items-center gap-3">
            <img src="/logo192.png" alt="Logo" style={{ width: 48, height: 48, borderRadius: 12, boxShadow: isDark ? '0 2px 8px #00dfd8aa' : '0 2px 8px #007cf088' }} />
            <h1 className="display-5 fw-bold mb-0" style={{ color: isDark ? '#fff' : '#232526', letterSpacing: 1 }}>Métodos Numéricos</h1>
          </div>
          <button className={`btn ${isDark ? 'btn-outline-info' : 'btn-outline-dark'} d-flex align-items-center animate__animated animate__fadeInRight animate__faster shadow-sm`} style={{ borderRadius: 30, background: isDark ? '#181c2b' : '#fff', color: isDark ? '#00dfd8' : '#007cf0', borderColor: isDark ? '#00dfd8' : '#007cf0', transition: 'all 0.3s' }} onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
            <i className={`bi bi-${theme === 'light' ? 'moon-stars' : 'sun'} me-2`}></i>
            {theme === 'light' ? 'Oscuro' : 'Claro'}
          </button>
        </header>

        <div className="row g-4">
          <div className="col-md-4 animate__animated animate__fadeInLeft animate__faster">
            <div className="card p-4 shadow-sm border-0 animate__animated animate__zoomIn animate__faster" style={{ borderRadius: 16, background: isDark ? '#232526' : '#fff', boxShadow: isDark ? '0 2px 16px #00dfd855' : '0 2px 16px #007cf055', transition: 'background 0.5s' }}>
              <div className="mb-4">
                <label className="form-label fw-semibold text-secondary" style={{ fontSize: 18 }}>Método</label>
                <select className="form-select shadow-sm" style={{ borderRadius: 10, borderColor: isDark ? '#00dfd8' : '#007cf0', color: isDark ? '#00dfd8' : '#007cf0', background: isDark ? '#232526' : '#fff', transition: 'all 0.3s' }} value={method} onChange={handleMethodChange}>
                  <option value="">-- Seleccionar --</option>
                  <option value="euler">Euler</option>
                  <option value="rk2">Runge-Kutta 2</option>
                  <option value="simpson">Simpson 1/3</option>
                </select>
              </div>

              {method && (
                <div className="mb-4 animate__animated animate__fadeIn animate__faster">
                  <label className="form-label fw-semibold text-secondary">f(x{method !== 'simpson' ? ', y' : ''})</label>
                  <input className="form-control shadow-sm" style={{ borderRadius: 10, borderColor: isDark ? '#00dfd8' : '#007cf0', color: isDark ? '#00dfd8' : '#007cf0', background: isDark ? '#232526' : '#fff', transition: 'all 0.3s' }} value={expr} onChange={e => setExpr(e.target.value)} />
                </div>
              )}

              {(method === 'euler' || method === 'rk2') && (
                <>
                  <div className="mb-3 animate__animated animate__fadeIn animate__faster">
                    <label className="form-label text-secondary">y₀</label>
                    <input className="form-control shadow-sm" style={{ borderRadius: 10, borderColor: isDark ? '#00dfd8' : '#007cf0', color: isDark ? '#00dfd8' : '#007cf0', background: isDark ? '#232526' : '#fff', transition: 'all 0.3s' }} type="number" step="any" value={y0} onChange={e => setY0(e.target.value)} />
                  </div>
                  <div className="mb-3 animate__animated animate__fadeIn animate__faster">
                    <label className="form-label text-secondary">h (paso)</label>
                    <input className="form-control shadow-sm" style={{ borderRadius: 10, borderColor: isDark ? '#00dfd8' : '#007cf0', color: isDark ? '#00dfd8' : '#007cf0', background: isDark ? '#232526' : '#fff', transition: 'all 0.3s' }} type="number" step="any" value={h} onChange={e => setH(e.target.value)} />
                  </div>
                </>
              )}

              {method === 'simpson' && (
                <div className="mb-3 animate__animated animate__fadeIn animate__faster">
                  <label className="form-label text-secondary">Δx (tamaño de subintervalo)</label>
                  <input className="form-control shadow-sm" style={{ borderRadius: 10, borderColor: isDark ? '#00dfd8' : '#007cf0', color: isDark ? '#00dfd8' : '#007cf0', background: isDark ? '#232526' : '#fff', transition: 'all 0.3s' }} type="number" step="any" value={delta} onChange={e => setDelta(e.target.value)} />
                </div>
              )}

              {method && (
                <>
                  <div className="mb-3 animate__animated animate__fadeIn animate__faster">
                    <label className="form-label text-secondary">a (inicio)</label>
                    <input className="form-control shadow-sm" style={{ borderRadius: 10, borderColor: isDark ? '#00dfd8' : '#007cf0', color: isDark ? '#00dfd8' : '#007cf0', background: isDark ? '#232526' : '#fff', transition: 'all 0.3s' }} type="number" step="any" value={a} onChange={e => setA(e.target.value)} />
                  </div>
                  <div className="mb-4 animate__animated animate__fadeIn animate__faster">
                    <label className="form-label text-secondary">b (fin)</label>
                    <input className="form-control shadow-sm" style={{ borderRadius: 10, borderColor: isDark ? '#00dfd8' : '#007cf0', color: isDark ? '#00dfd8' : '#007cf0', background: isDark ? '#232526' : '#fff', transition: 'all 0.3s' }} type="number" step="any" value={b} onChange={e => setB(e.target.value)} />
                  </div>
                  <button className="btn btn-primary w-100 py-2 fs-5 animate__animated animate__pulse animate__infinite shadow-sm" style={{ borderRadius: 12, background: isDark ? '#00dfd8' : '#007cf0', color: '#fff', border: 0, transition: 'background 0.3s' }} onClick={handleRun}>
                    <i className="bi bi-graph-up-arrow me-2"></i>Visualizar
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="col-md-8 animate__animated animate__fadeInRight animate__faster">
            <div className="card p-4 shadow-sm h-100 border-0 animate__animated animate__zoomIn animate__faster" style={{ borderRadius: 16, background: isDark ? '#232526' : '#fff', boxShadow: isDark ? '0 2px 16px #00dfd855' : '0 2px 16px #007cf055', transition: 'background 0.5s' }}>
              {plotData ? (
                <>
                  <Plot
                    data={[{
                      x: plotData.x,
                      y: plotData.y,
                      type: 'scatter',
                      mode: 'lines',
                      line: {
                        width: 4,
                        color: isDark ? '#00dfd8' : '#007cf0',
                        dash: method === 'rk2' ? 'dashdot' : (method === 'euler' ? 'dot' : 'solid')
                      },
                      marker: {
                        color: isDark ? '#00dfd8' : '#007cf0',
                        size: 8,
                        symbol: method === 'simpson' ? 'circle' : 'diamond'
                      },
                      name: method.toUpperCase(),
                      fill: method === 'simpson' ? 'tozeroy' : undefined,
                      fillcolor: method === 'simpson' ? (isDark ? 'rgba(0,223,216,0.2)' : 'rgba(0,124,240,0.2)') : undefined
                    }]}
                    layout={{
                      autosize: true,
                      title: {
                        text: 'Resultado',
                        font: { color: isDark ? '#00dfd8' : '#007cf0', size: 24 }
                      },
                      paper_bgcolor: isDark ? '#232526' : '#fff',
                      plot_bgcolor: isDark ? '#232526' : '#fff',
                      font: { color: isDark ? '#fff' : '#232526', size: 15 },
                      margin: { t: 40, l: 50, r: 30, b: 40 },
                      responsive: true,
                      xaxis: {
                        tickfont: { color: isDark ? '#00dfd8' : '#007cf0', size: 13 },
                        gridcolor: isDark ? '#232526' : '#eee',
                        linecolor: isDark ? '#00dfd8' : '#007cf0',
                        zerolinecolor: isDark ? '#00dfd8' : '#007cf0',
                        title: { font: { color: isDark ? '#00dfd8' : '#007cf0', size: 16 } }
                      },
                      yaxis: {
                        tickfont: { color: isDark ? '#00dfd8' : '#007cf0', size: 13 },
                        gridcolor: isDark ? '#232526' : '#eee',
                        linecolor: isDark ? '#00dfd8' : '#007cf0',
                        zerolinecolor: isDark ? '#00dfd8' : '#007cf0',
                        title: { font: { color: isDark ? '#00dfd8' : '#007cf0', size: 16 } }
                      },
                      showlegend: true,
                      legend: {
                        font: { color: isDark ? '#fff' : '#232526', size: 14 },
                        bgcolor: isDark ? '#232526' : 'rgba(255,255,255,0.8)',
                        bordercolor: isDark ? '#00dfd8' : '#007cf0',
                        borderwidth: 1
                      }
                    }}
                    useResizeHandler
                    style={{ width: '100%', height: '420px', borderRadius: 12, boxShadow: isDark ? '0 2px 16px #00dfd855' : '0 2px 16px #007cf055', transition: 'box-shadow 0.5s' }}
                    className="animate__animated animate__fadeIn animate__faster"
                  />
                  {method === 'simpson' && area !== null && (
                    <div className="alert mt-4 animate__animated animate__fadeInUp animate__faster d-flex align-items-center fs-5 shadow-sm" style={{ borderRadius: 10, background: isDark ? '#00dfd8' : '#007cf0', color: '#fff', border: 0, transition: 'background 0.3s' }}>
                      <i className="bi bi-calculator me-2"></i>Área ≈ {area.toFixed(6)}
                    </div>
                  )}
                  <div className="mt-4 animate__animated animate__fadeIn animate__faster" style={{ background: isDark ? '#181c2b' : '#f8fafc', borderRadius: 10, padding: 16, color: isDark ? '#fff' : '#232526', fontSize: 15, boxShadow: isDark ? '0 1px 6px #00dfd822' : '0 1px 6px #007cf022' }}>
                    <div dangerouslySetInnerHTML={{ __html: procedure }} />
                  </div>
                </>
              ) : <p className="text-muted animate__animated animate__fadeIn animate__faster fs-5 text-center">Selecciona método e ingresa parámetros.</p>}
            </div>
          </div>
        </div>
        <footer className="text-center mt-5 animate__animated animate__fadeInUp animate__delay-1s" style={{ color: isDark ? '#00dfd8' : '#007cf0', fontWeight: 500, letterSpacing: 1, fontSize: 16 }}>
          © {new Date().getFullYear()} Métodos Numéricos | Desarrollado por tu nombre
        </footer>
      </div>
    </div>
  );
}
