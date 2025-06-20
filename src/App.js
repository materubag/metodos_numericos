import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { parse } from 'mathjs';
import './App.css';

export default function App() {
  // Estados
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

  // Método Simpson 1/3
  const simpson = (f, a, b, n) => {
    if (n % 2 !== 0) n++;
    const h = (b - a) / n;
    let sum = f(a) + f(b);
    for (let i = 1; i < n; i++) {
      let x = a + i * h;
      sum += (i % 2 === 0 ? 2 : 4) * f(x);
    }
    return (h / 3) * sum;
  };

  // Función principal
  const handleRun = () => {
    const exprNormalized = expr.replace(/[−–—]/g, '-');
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const hNum = parseFloat(h);
    const deltaNum = parseFloat(delta);
    const y0Num = parseFloat(y0);
    let f;
    
    try {
      f = parse(exprNormalized).compile();
    } catch (e) {
      setProcedure(`<span style='color:#e53935;font-weight:bold;'>Error de sintaxis: ${e.message}</span>`);
      setPlotData(null);
      setArea(null);
      return;
    }    if (method === 'simpson') {
      if (isNaN(aNum) || isNaN(bNum) || isNaN(deltaNum)) {
        setProcedure("<span style='color:#e53935;font-weight:bold;'>Error: Faltan valores para Simpson 1/3</span>");
        return;
      }
      
      let n = Math.ceil((bNum - aNum) / deltaNum);
      if (n % 2 !== 0) n++; // Simpson requiere número par de subintervalos
      
      const h = (bNum - aNum) / n;
      const x = [];
      const y = [];
      
      for (let i = 0; i <= n; i++) {
        const xi = aNum + i * h;
        const yi = f.evaluate({ x: xi });
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
        let procHtml = `<div style='background: ${isDark ? 'linear-gradient(135deg, #2d3748, #1a202c)' : 'linear-gradient(135deg, #f8f9fa, #e9ecef)'}; padding: 20px; border-radius: 12px; border-left: 4px solid ${isDark ? '#00dfd8' : '#007bff'}; color: ${isDark ? '#e2e8f0' : '#2d3748'};'>`;
      procHtml += `<h4 style='color: ${isDark ? '#00dfd8' : '#007bff'}; margin-bottom: 15px;'><i class="bi bi-calculator"></i> Método Simpson 1/3</h4>`;
      procHtml += `<p><strong>Función:</strong> f(x) = ${expr}</p>`;
      procHtml += `<p><strong>Intervalo:</strong> [${aNum}, ${bNum}]</p>`;
      procHtml += `<p><strong>Número de subintervalos:</strong> ${n} (ajustado para ser par)</p>`;
      procHtml += `<p><strong>Paso h:</strong> ${h.toFixed(6)}</p>`;
      procHtml += `<p><strong>Fórmula:</strong> ∫f(x)dx ≈ (h/3)[f(x₀) + 4∑f(xᵢ) + 2∑f(xⱼ) + f(xₙ)]</p>`;
      procHtml += `<p><strong>Área calculada:</strong> ${calculatedArea.toFixed(6)} unidades²</p>`;
      
      // Tabla de valores
      procHtml += `<div style='margin-top: 20px;'>`;
      procHtml += `<h5 style='color: ${isDark ? '#00dfd8' : '#007bff'}; margin-bottom: 10px;'>Tabla de Puntos:</h5>`;
      procHtml += `<div style='overflow-x: auto; border-radius: 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(0, 123, 255, 0.3)'};'>`;
      procHtml += `<table style='width: 100%; border-collapse: collapse; font-size: 0.9em; background: ${isDark ? '#1a202c' : '#fff'};'>`;
      procHtml += `<thead><tr style='background: ${isDark ? '#00dfd8' : '#007bff'}; color: white;'>`;
      procHtml += `<th style='padding: 12px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(0, 123, 255, 0.3)'};'>i</th>`;
      procHtml += `<th style='padding: 12px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(0, 123, 255, 0.3)'};'>xᵢ</th>`;
      procHtml += `<th style='padding: 12px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(0, 123, 255, 0.3)'};'>f(xᵢ)</th>`;
      procHtml += `<th style='padding: 12px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(0, 123, 255, 0.3)'};'>Coeficiente</th>`;
      procHtml += `</tr></thead><tbody>`;
      
      for (let i = 0; i <= n; i++) {
        let coef = i === 0 || i === n ? 1 : (i % 2 === 0 ? 2 : 4);
        procHtml += `<tr style='${i % 2 === 0 ? (isDark ? "background: rgba(0, 223, 216, 0.05);" : "background: #f8f9fa;") : (isDark ? "background: rgba(26, 32, 44, 0.8);" : "background: #fff;")} color: ${isDark ? '#e2e8f0' : '#2d3748'};'>`;
        procHtml += `<td style='padding: 10px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center;'>${i}</td>`;
        procHtml += `<td style='padding: 10px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center;'>${x[i].toFixed(4)}</td>`;
        procHtml += `<td style='padding: 10px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center;'>${y[i].toFixed(6)}</td>`;
        procHtml += `<td style='padding: 10px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; font-weight: bold; color: ${isDark ? '#00dfd8' : '#007bff'};'>${coef}</td>`;
        procHtml += `</tr>`;
      }
      
      procHtml += `</tbody></table></div></div>`;
      procHtml += `</div>`;
      
      setProcedure(procHtml);
        } else if (method === 'euler') {
      if (isNaN(aNum) || isNaN(bNum) || isNaN(hNum) || isNaN(y0Num)) {
        setProcedure("<span style='color:#e53935;font-weight:bold;'>Error: Faltan valores para Euler</span>");
        return;
      }
      
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
      setArea(null);
        let procHtml = `<div style='background: ${isDark ? 'linear-gradient(135deg, #2d3748, #1a202c)' : 'linear-gradient(135deg, #f8f9fa, #e9ecef)'}; padding: 20px; border-radius: 12px; border-left: 4px solid ${isDark ? '#00dfd8' : '#28a745'}; color: ${isDark ? '#e2e8f0' : '#2d3748'};'>`;
      procHtml += `<h4 style='color: ${isDark ? '#00dfd8' : '#28a745'}; margin-bottom: 15px;'><i class="bi bi-arrow-right"></i> Método de Euler</h4>`;
      procHtml += `<p><strong>Ecuación diferencial:</strong> dy/dx = ${expr}</p>`;
      procHtml += `<p><strong>Condición inicial:</strong> y(${aNum}) = ${y0Num}</p>`;
      procHtml += `<p><strong>Paso h:</strong> ${hNum}</p>`;
      procHtml += `<p><strong>Fórmula:</strong> yᵢ₊₁ = yᵢ + h × f(xᵢ, yᵢ)</p>`;
      procHtml += `<p><strong>Valor final:</strong> y(${bNum}) ≈ ${y[y.length-1].toFixed(6)}</p>`;
      
      // Tabla de iteraciones
      procHtml += `<div style='margin-top: 20px;'>`;
      procHtml += `<h5 style='color: ${isDark ? '#00dfd8' : '#28a745'}; margin-bottom: 10px;'>Tabla de Iteraciones:</h5>`;
      procHtml += `<div style='overflow-x: auto; border-radius: 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(40, 167, 69, 0.3)'};'>`;
      procHtml += `<table style='width: 100%; border-collapse: collapse; font-size: 0.9em; background: ${isDark ? '#1a202c' : '#fff'};'>`;
      procHtml += `<thead><tr style='background: ${isDark ? '#00dfd8' : '#28a745'}; color: white;'>`;
      procHtml += `<th style='padding: 12px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(40, 167, 69, 0.3)'};'>i</th>`;
      procHtml += `<th style='padding: 12px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(40, 167, 69, 0.3)'};'>xᵢ</th>`;
      procHtml += `<th style='padding: 12px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(40, 167, 69, 0.3)'};'>yᵢ</th>`;
      procHtml += `<th style='padding: 12px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(40, 167, 69, 0.3)'};'>f(xᵢ,yᵢ)</th>`;
      procHtml += `<th style='padding: 12px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(40, 167, 69, 0.3)'};'>yᵢ₊₁</th>`;
      procHtml += `</tr></thead><tbody>`;
      
      for (let i = 0; i < x.length - 1; i++) {
        procHtml += `<tr style='${i % 2 === 0 ? (isDark ? "background: rgba(0, 223, 216, 0.05);" : "background: #f8f9fa;") : (isDark ? "background: rgba(26, 32, 44, 0.8);" : "background: #fff;")} color: ${isDark ? '#e2e8f0' : '#2d3748'};'>`;
        procHtml += `<td style='padding: 10px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center;'>${i}</td>`;
        procHtml += `<td style='padding: 10px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center;'>${x[i].toFixed(4)}</td>`;
        procHtml += `<td style='padding: 10px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center;'>${y[i].toFixed(6)}</td>`;
        procHtml += `<td style='padding: 10px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; color: ${isDark ? '#00dfd8' : '#28a745'};'>${slopes[i].toFixed(6)}</td>`;
        procHtml += `<td style='padding: 10px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; font-weight: bold; color: ${isDark ? '#00dfd8' : '#28a745'};'>${y[i+1].toFixed(6)}</td>`;
        procHtml += `</tr>`;
      }
      
      procHtml += `</tbody></table></div></div>`;
      procHtml += `</div>`;
      
      setProcedure(procHtml);
        } else if (method === 'rk2') {
      if (isNaN(aNum) || isNaN(bNum) || isNaN(hNum) || isNaN(y0Num)) {
        setProcedure("<span style='color:#e53935;font-weight:bold;'>Error: Faltan valores para RK2</span>");
        return;
      }
      
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
      setArea(null);
        let procHtml = `<div style='background: ${isDark ? 'linear-gradient(135deg, #2d3748, #1a202c)' : 'linear-gradient(135deg, #f8f9fa, #e9ecef)'}; padding: 20px; border-radius: 12px; border-left: 4px solid ${isDark ? '#00dfd8' : '#dc3545'}; color: ${isDark ? '#e2e8f0' : '#2d3748'};'>`;
      procHtml += `<h4 style='color: ${isDark ? '#00dfd8' : '#dc3545'}; margin-bottom: 15px;'><i class="bi bi-arrow-up-right"></i> Runge-Kutta 2° Orden</h4>`;
      procHtml += `<p><strong>Ecuación diferencial:</strong> dy/dx = ${expr}</p>`;
      procHtml += `<p><strong>Condición inicial:</strong> y(${aNum}) = ${y0Num}</p>`;
      procHtml += `<p><strong>Paso h:</strong> ${hNum}</p>`;
      procHtml += `<p><strong>Fórmulas:</strong></p>`;
      procHtml += `<ul style='margin-left: 20px;'>`;
      procHtml += `<li>k₁ = f(xᵢ, yᵢ)</li>`;
      procHtml += `<li>k₂ = f(xᵢ + h, yᵢ + h×k₁)</li>`;
      procHtml += `<li>yᵢ₊₁ = yᵢ + (h/2)×(k₁ + k₂)</li>`;
      procHtml += `</ul>`;
      procHtml += `<p><strong>Valor final:</strong> y(${bNum}) ≈ ${y[y.length-1].toFixed(6)}</p>`;
      
      // Tabla de iteraciones
      procHtml += `<div style='margin-top: 20px;'>`;
      procHtml += `<h5 style='color: ${isDark ? '#00dfd8' : '#dc3545'}; margin-bottom: 10px;'>Tabla de Iteraciones:</h5>`;
      procHtml += `<div style='overflow-x: auto; border-radius: 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(220, 53, 69, 0.3)'};'>`;
      procHtml += `<table style='width: 100%; border-collapse: collapse; font-size: 0.9em; background: ${isDark ? '#1a202c' : '#fff'};'>`;
      procHtml += `<thead><tr style='background: ${isDark ? '#00dfd8' : '#dc3545'}; color: white;'>`;
      procHtml += `<th style='padding: 12px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(220, 53, 69, 0.3)'};'>i</th>`;
      procHtml += `<th style='padding: 12px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(220, 53, 69, 0.3)'};'>xᵢ</th>`;
      procHtml += `<th style='padding: 12px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(220, 53, 69, 0.3)'};'>yᵢ</th>`;
      procHtml += `<th style='padding: 12px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(220, 53, 69, 0.3)'};'>k₁</th>`;
      procHtml += `<th style='padding: 12px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(220, 53, 69, 0.3)'};'>k₂</th>`;
      procHtml += `<th style='padding: 12px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.3)' : 'rgba(220, 53, 69, 0.3)'};'>yᵢ₊₁</th>`;
      procHtml += `</tr></thead><tbody>`;
      
      for (let i = 0; i < x.length - 1; i++) {
        procHtml += `<tr style='${i % 2 === 0 ? (isDark ? "background: rgba(0, 223, 216, 0.05);" : "background: #f8f9fa;") : (isDark ? "background: rgba(26, 32, 44, 0.8);" : "background: #fff;")} color: ${isDark ? '#e2e8f0' : '#2d3748'};'>`;
        procHtml += `<td style='padding: 10px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center;'>${i}</td>`;
        procHtml += `<td style='padding: 10px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center;'>${x[i].toFixed(4)}</td>`;
        procHtml += `<td style='padding: 10px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center;'>${y[i].toFixed(6)}</td>`;
        procHtml += `<td style='padding: 10px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; color: ${isDark ? '#00dfd8' : '#dc3545'};'>${k1Values[i].toFixed(6)}</td>`;
        procHtml += `<td style='padding: 10px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; color: ${isDark ? '#00dfd8' : '#dc3545'};'>${k2Values[i].toFixed(6)}</td>`;
        procHtml += `<td style='padding: 10px 8px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; font-weight: bold; color: ${isDark ? '#00dfd8' : '#dc3545'};'>${y[i+1].toFixed(6)}</td>`;
        procHtml += `</tr>`;
      }
      
      procHtml += `</tbody></table></div></div>`;
      procHtml += `</div>`;
      
      setProcedure(procHtml);
    }
  };
  return (
    <div className={`app ${theme} app-container`} style={{ background: isDark ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <div className="container-fluid app-main">
        <header className="header-modern app-header d-flex justify-content-between align-items-center" style={{ background: 'linear-gradient(135deg, #b71c1c 0%, #ffd600 100%)', color: '#fff', borderRadius: '15px', padding: '15px 25px' }}>
          <div className="d-flex align-items-center gap-3">
            <img src="/logo192.png" alt="Logo UTA" className="logo-modern" style={{ width: 45, height: 45, borderRadius: '50%', border: '2px solid #ffd600' }} />
            <div>
              <h1 className="fw-bold mb-0" style={{ fontSize: '1.8rem' }}>Métodos Numéricos</h1>
              <small className="text-warning">Universidad Técnica de Ambato</small>
            </div>
          </div>
          <button className="btn btn-outline-light" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
            <i className={`bi bi-${theme === 'light' ? 'moon-stars-fill' : 'sun-fill'} me-2`}></i>
            {theme === 'light' ? 'Oscuro' : 'Claro'}
          </button>
        </header>

        <div className="app-content">
          <div className="row g-4 h-100">
            <div className="col-lg-4 col-md-5">
              <div className="card card-scrollable p-4" style={{ background: isDark ? 'rgba(45, 55, 72, 0.95)' : 'rgba(255, 255, 255, 0.95)', borderRadius: '20px', border: 'none', height: 'fit-content', minHeight: '500px' }}>
                <h5 className="card-title fw-bold mb-4" style={{ color: isDark ? '#00dfd8' : '#b71c1c' }}>
                  <i className="bi bi-gear-fill me-2"></i>
                  Configuración
                </h5>
              
              <div className="mb-3">
                <label className="form-label fw-semibold">Método Numérico</label>
                <select 
                  className="form-select" 
                  value={method} 
                  onChange={(e) => setMethod(e.target.value)}
                  style={{ background: isDark ? '#2d3748' : '#fff', color: isDark ? '#e2e8f0' : '#2d3748' }}
                >
                  <option value="">Seleccionar método</option>
                  <option value="simpson">Simpson 1/3 (Integración)</option>
                  <option value="euler">Euler (EDO)</option>
                  <option value="rk2">Runge-Kutta 2° Orden (EDO)</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Función f(x) o f(x,y)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={expr} 
                  onChange={(e) => setExpr(e.target.value)}
                  placeholder="Ej: x^2, sin(x), x+y"
                  style={{ background: isDark ? '#2d3748' : '#fff', color: isDark ? '#e2e8f0' : '#2d3748' }}
                />
              </div>

              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label fw-semibold">Límite inferior (a)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={a} 
                    onChange={(e) => setA(e.target.value)}
                    style={{ background: isDark ? '#2d3748' : '#fff', color: isDark ? '#e2e8f0' : '#2d3748' }}
                  />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label fw-semibold">Límite superior (b)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={b} 
                    onChange={(e) => setB(e.target.value)}
                    style={{ background: isDark ? '#2d3748' : '#fff', color: isDark ? '#e2e8f0' : '#2d3748' }}
                  />
                </div>
              </div>

              {method === 'simpson' && (
                <div className="mb-3">
                  <label className="form-label fw-semibold">Δx (paso)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={delta} 
                    onChange={(e) => setDelta(e.target.value)}
                    step="0.01"
                    style={{ background: isDark ? '#2d3748' : '#fff', color: isDark ? '#e2e8f0' : '#2d3748' }}
                  />
                </div>
              )}

              {(method === 'euler' || method === 'rk2') && (
                <>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Paso h</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={h} 
                      onChange={(e) => setH(e.target.value)}
                      step="0.01"
                      style={{ background: isDark ? '#2d3748' : '#fff', color: isDark ? '#e2e8f0' : '#2d3748' }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Valor inicial y₀</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={y0} 
                      onChange={(e) => setY0(e.target.value)}
                      style={{ background: isDark ? '#2d3748' : '#fff', color: isDark ? '#e2e8f0' : '#2d3748' }}
                    />
                  </div>
                </>
              )}

              <button 
                className="btn btn-primary w-100 mt-3" 
                onClick={handleRun}
                style={{ background: isDark ? 'linear-gradient(135deg, #00dfd8, #667eea)' : 'linear-gradient(135deg, #b71c1c, #667eea)', border: 'none', padding: '12px' }}
              >
                <i className="bi bi-play-fill me-2"></i>
                Visualizar
              </button>
            </div>
          </div>          <div className="col-lg-8 col-md-7">
            <div className="card card-scrollable p-4 d-flex flex-column" style={{ background: isDark ? 'rgba(45, 55, 72, 0.95)' : 'rgba(255, 255, 255, 0.95)', borderRadius: '20px', border: 'none', minHeight: '500px' }}>
              <h5 className="card-title fw-bold mb-3" style={{ color: isDark ? '#00dfd8' : '#b71c1c' }}>
                <i className="bi bi-graph-up-arrow me-2"></i>
                Visualización
              </h5>
              
              <div className="flex-fill d-flex flex-column" style={{ minHeight: 0 }}>
                {plotData ? (
                  <>                    <div className="flex-fill" style={{ minHeight: '350px', height: '400px' }}>
                      <Plot 
                        data={[{
                          x: plotData.x,
                          y: plotData.y,
                          type: 'scatter',
                          mode: 'lines+markers',
                          line: { 
                            color: isDark ? '#00dfd8' : '#b71c1c', 
                            width: 3,
                            shape: 'spline'
                          },
                          marker: { 
                            color: isDark ? '#00dfd8' : '#b71c1c', 
                            size: 6,
                            line: { width: 1, color: isDark ? '#fff' : '#000' }
                          },
                          name: method === 'simpson' ? 'f(x) - Función a Integrar' : method === 'euler' ? 'y(x) - Solución por Euler' : 'y(x) - Solución por RK2',
                          fill: method === 'simpson' ? 'tozeroy' : undefined,
                          fillcolor: method === 'simpson' ? (isDark ? 'rgba(0,223,216,0.15)' : 'rgba(183,28,28,0.15)') : undefined
                        }]}
                        layout={{
                          autosize: true,
                          title: { 
                            text: `<b>${method === 'simpson' ? 'Simpson 1/3 - Integración Numérica' : method === 'euler' ? 'Euler - Solución EDO' : 'Runge-Kutta 2° - Solución EDO'}</b>`, 
                            font: { 
                              color: isDark ? '#00dfd8' : '#b71c1c', 
                              size: 16,
                              family: 'Inter, sans-serif'
                            },
                            x: 0.5,
                            y: 0.95
                          },
                          paper_bgcolor: 'rgba(0,0,0,0)',
                          plot_bgcolor: isDark ? 'rgba(26, 32, 44, 0.3)' : 'rgba(248, 250, 252, 0.8)',
                          font: { 
                            color: isDark ? '#e2e8f0' : '#2d3748',
                            family: 'Inter, sans-serif',
                            size: 12
                          },
                          margin: { t: 60, l: 60, r: 40, b: 50 },
                          xaxis: { 
                            title: {
                              text: '<b>x</b>',
                              font: { color: isDark ? '#00dfd8' : '#b71c1c', size: 14 }
                            },
                            gridcolor: isDark ? 'rgba(0, 223, 216, 0.2)' : 'rgba(183, 28, 28, 0.2)',
                            linecolor: isDark ? '#00dfd8' : '#b71c1c',
                            tickcolor: isDark ? '#00dfd8' : '#b71c1c',
                            tickfont: { color: isDark ? '#a0aec0' : '#4a5568' },
                            zerolinecolor: isDark ? 'rgba(0, 223, 216, 0.5)' : 'rgba(183, 28, 28, 0.5)'
                          },
                          yaxis: { 
                            title: {
                              text: method === 'simpson' ? '<b>f(x)</b>' : '<b>y</b>',
                              font: { color: isDark ? '#00dfd8' : '#b71c1c', size: 14 }
                            },
                            gridcolor: isDark ? 'rgba(0, 223, 216, 0.2)' : 'rgba(183, 28, 28, 0.2)',
                            linecolor: isDark ? '#00dfd8' : '#b71c1c',
                            tickcolor: isDark ? '#00dfd8' : '#b71c1c',
                            tickfont: { color: isDark ? '#a0aec0' : '#4a5568' },
                            zerolinecolor: isDark ? 'rgba(0, 223, 216, 0.5)' : 'rgba(183, 28, 28, 0.5)'
                          },
                          showlegend: true,
                          legend: {
                            x: 0.02,
                            y: 0.98,
                            bgcolor: isDark ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                            bordercolor: isDark ? '#00dfd8' : '#b71c1c',
                            borderwidth: 1,
                            font: { 
                              color: isDark ? '#e2e8f0' : '#2d3748',
                              size: 11
                            }
                          }
                        }}
                        config={{ 
                          responsive: true, 
                          displayModeBar: false,
                          staticPlot: false
                        }}
                        style={{ 
                          width: '100%', 
                          height: '100%',
                          border: `1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : 'rgba(183, 28, 28, 0.2)'}`,
                          borderRadius: '10px',
                          overflow: 'hidden'
                        }}
                        useResizeHandler={true}
                      />
                    </div>
                    
                    {area !== null && (
                      <div className="mt-3 p-3 rounded" style={{ background: isDark ? 'rgba(0, 223, 216, 0.1)' : 'rgba(183, 28, 28, 0.1)' }}>
                        <h6 className="fw-bold" style={{ color: isDark ? '#00dfd8' : '#b71c1c' }}>
                          <i className="bi bi-calculator me-2"></i>
                          Área: {area.toFixed(6)} unidades²
                        </h6>
                      </div>
                    )}
                    
                    <div className="mt-3">
                      <h6 className="fw-bold mb-2" style={{ color: isDark ? '#00dfd8' : '#b71c1c' }}>
                        <i className="bi bi-list-ul me-2"></i>
                        Procedimiento
                      </h6>
                      <div 
                        className="procedure-scroll"
                        dangerouslySetInnerHTML={{ __html: procedure }} 
                        style={{ 
                          fontSize: '0.9rem',
                          padding: '15px',
                          background: isDark ? 'rgba(26, 32, 44, 0.3)' : 'rgba(248, 250, 252, 0.5)',
                          borderRadius: '10px',
                          border: `1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : 'rgba(183, 28, 28, 0.2)'}`
                        }} 
                      />
                    </div>
                  </>
                ) : (
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <div className="text-center">
                      <i className="bi bi-graph-up display-1 mb-3" style={{ opacity: 0.3, color: isDark ? '#00dfd8' : '#b71c1c' }}></i>
                      <h4 className="mb-3" style={{ color: isDark ? '#a0aec0' : '#4a5568' }}>
                        ¡Comienza tu Análisis!
                      </h4>
                      <p className="text-muted">
                        Selecciona un método y presiona "Visualizar"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>

        <footer className="footer-modern text-center app-footer" style={{ background: isDark ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(135deg, #b71c1c 0%, #2d3748 100%)', color: '#fff', borderRadius: '15px', padding: '20px 0', marginTop: '20px' }}>
          <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
            <img src="/logo192.png" alt="UTA" style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid #ffd600' }} />
            <span className="fw-bold">Universidad Técnica de Ambato</span>
          </div>
          <div style={{ opacity: 0.8, fontSize: '14px' }}>
            © {new Date().getFullYear()} Métodos Numéricos • Ingeniería en Sistemas
          </div>
        </footer>
      </div>
    </div>
  );
}
