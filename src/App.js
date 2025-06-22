import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { parse } from 'mathjs';
import './App.css';
import 'animate.css';

export default function App() {
  // Estados
  const [expr, setExpr] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [h, setH] = useState('');
  const [delta, setDelta] = useState('');  const [y0, setY0] = useState('');
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
      setArea(calculatedArea);      let procHtml = `<div style='background: ${isDark ? 'linear-gradient(135deg, #2d3748, #1a202c)' : 'linear-gradient(135deg, #f8f9fa, #e9ecef)'}; padding: 25px; border-radius: 15px; border-left: 5px solid ${isDark ? '#1a1a2e' : '#007bff'}; color: ${isDark ? '#e2e8f0' : '#2d3748'}; box-shadow: 0 4px 12px rgba(0,0,0,0.1);'>`;
      
      procHtml += `<div style='text-align: center; margin-bottom: 25px; padding: 15px; background: ${isDark ? 'rgba(26, 26, 46, 0.2)' : 'rgba(0, 123, 255, 0.1)'}; border-radius: 10px;'>`;
      procHtml += `<h3 style='color: ${isDark ? '#1a1a2e' : '#007bff'}; margin: 0; font-weight: 700;'><i class="bi bi-calculator-fill"></i> Regla de Simpson 1/3</h3>`;
      procHtml += `<p style='margin: 5px 0 0 0; font-style: italic; opacity: 0.8;'>Integración Numérica</p>`;
      procHtml += `</div>`;
      
      procHtml += `<div style='display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;'>`;
      procHtml += `<div style='background: ${isDark ? 'rgba(26, 32, 44, 0.6)' : 'rgba(255, 255, 255, 0.8)'}; padding: 15px; border-radius: 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(0, 123, 255, 0.3)'};'>`;
      procHtml += `<h5 style='color: ${isDark ? '#1a1a2e' : '#007bff'}; margin-bottom: 10px;'><i class="bi bi-info-circle"></i> Datos del Problema</h5>`;
      procHtml += `<p><strong>Función:</strong> <code style='background: ${isDark ? '#1a202c' : '#f8f9fa'}; padding: 2px 6px; border-radius: 4px; color: ${isDark ? '#1a1a2e' : '#007bff'};'>f(x) = ${expr}</code></p>`;
      procHtml += `<p><strong>Intervalo:</strong> <code>[${aNum}, ${bNum}]</code></p>`;
      procHtml += `<p><strong>Δx inicial:</strong> <code>${deltaNum}</code></p>`;
      procHtml += `<p><strong>Subintervalos (n):</strong> <code>${n}</code> ${n % 2 === 0 ? '✓' : '(ajustado)'}</p>`;
      procHtml += `<p><strong>Paso real (h):</strong> <code>${h.toFixed(6)}</code></p>`;
      procHtml += `</div>`;
      
      procHtml += `<div style='background: ${isDark ? 'rgba(26, 32, 44, 0.6)' : 'rgba(255, 255, 255, 0.8)'}; padding: 15px; border-radius: 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(0, 123, 255, 0.3)'};'>`;
      procHtml += `<h5 style='color: ${isDark ? '#1a1a2e' : '#007bff'}; margin-bottom: 10px;'><i class="bi bi-calculator"></i> Fórmula de Simpson</h5>`;
      procHtml += `<div style='text-align: center; font-size: 16px; line-height: 1.6; background: ${isDark ? '#1a202c' : '#f8f9fa'}; padding: 12px; border-radius: 8px; margin: 10px 0;'>`;
      procHtml += `<strong style='color: ${isDark ? '#1a1a2e' : '#007bff'};'>∫<sub>${aNum}</sub><sup>${bNum}</sup> f(x) dx ≈ <span style='color: ${isDark ? '#ffd600' : '#dc3545'};'>h/3</span> [f(x₀) + 4∑f(x<sub>impar</sub>) + 2∑f(x<sub>par</sub>) + f(xₙ)]</strong>`;
      procHtml += `</div>`;
      procHtml += `<p><strong>Donde:</strong></p>`;
      procHtml += `<ul style='margin: 5px 0; padding-left: 20px;'>`;
      procHtml += `<li><strong>h</strong> = (b-a)/n = (${bNum}-${aNum})/${n} = ${h.toFixed(6)}</li>`;
      procHtml += `<li><strong>xᵢ</strong> = a + i·h</li>`;
      procHtml += `<li>Coeficientes: 1, 4, 2, 4, 2, ..., 4, 1</li>`;
      procHtml += `</ul>`;
      procHtml += `</div>`;
      procHtml += `</div>`;
      
      // Cálculo paso a paso
      procHtml += `<div style='margin: 20px 0; padding: 15px; background: ${isDark ? 'rgba(26, 32, 44, 0.6)' : 'rgba(255, 255, 255, 0.8)'}; border-radius: 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(0, 123, 255, 0.3)'};'>`;
      procHtml += `<h5 style='color: ${isDark ? '#1a1a2e' : '#007bff'}; margin-bottom: 15px;'><i class="bi bi-gear"></i> Cálculo Paso a Paso</h5>`;
      
      let sumCalculation = `S = f(${aNum}) + f(${bNum})`;
      for (let i = 1; i < n; i++) {
        let coef = i % 2 === 0 ? 2 : 4;
        sumCalculation += ` + ${coef}·f(${(aNum + i * h).toFixed(2)})`;
      }
      
      let sumValues = `S = ${y[0].toFixed(3)} + ${y[n].toFixed(3)}`;
      for (let i = 1; i < n; i++) {
        let coef = i % 2 === 0 ? 2 : 4;
        sumValues += ` + ${coef}·${y[i].toFixed(3)}`;
      }
      
      procHtml += `<p><strong>1. Aplicamos la fórmula:</strong></p>`;
      procHtml += `<div style='background: ${isDark ? '#1a202c' : '#f8f9fa'}; padding: 10px; border-radius: 6px; font-family: monospace; margin: 10px 0;'>`;
      procHtml += `${sumCalculation}`;
      procHtml += `</div>`;
      
      procHtml += `<p><strong>2. Sustituimos los valores:</strong></p>`;
      procHtml += `<div style='background: ${isDark ? '#1a202c' : '#f8f9fa'}; padding: 10px; border-radius: 6px; font-family: monospace; margin: 10px 0;'>`;
      procHtml += `${sumValues}`;
      procHtml += `</div>`;
      
      procHtml += `<p><strong>3. Sumamos:</strong></p>`;
      procHtml += `<div style='background: ${isDark ? '#1a202c' : '#f8f9fa'}; padding: 10px; border-radius: 6px; font-family: monospace; margin: 10px 0;'>`;
      procHtml += `S = ${sum.toFixed(6)}`;
      procHtml += `</div>`;
      
      procHtml += `<p><strong>4. Resultado final:</strong></p>`;
      procHtml += `<div style='background: ${isDark ? 'rgba(0, 223, 216, 0.2)' : 'rgba(0, 123, 255, 0.2)'}; padding: 12px; border-radius: 8px; font-size: 18px; text-align: center; margin: 10px 0; border: 2px solid ${isDark ? '#1a1a2e' : '#007bff'};'>`;
      procHtml += `<strong style='color: ${isDark ? '#1a1a2e' : '#007bff'};'>∫ f(x) dx = (${h.toFixed(6)}/3) × ${sum.toFixed(6)} = <span style='font-size: 20px; color: ${isDark ? '#ffd600' : '#dc3545'};'>${calculatedArea.toFixed(6)} unidades²</span></strong>`;
      procHtml += `</div>`;
      procHtml += `</div>`;
        // Tabla de valores
      procHtml += `<div style='margin-top: 20px;'>`;
      procHtml += `<h5 style='color: ${isDark ? '#1a1a2e' : '#007bff'}; margin-bottom: 15px; font-weight: 600;'><i class="bi bi-table"></i> Tabla de Puntos - Regla de Simpson 1/3</h5>`;
      procHtml += `<div style='overflow-x: auto; border-radius: 12px; border: 2px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(0, 123, 255, 0.3)'}; box-shadow: 0 4px 12px rgba(0,0,0,0.1);'>`;
      procHtml += `<table style='width: 100%; border-collapse: collapse; font-size: 0.9em; background: ${isDark ? '#1a202c' : '#fff'};'>`;
      procHtml += `<thead><tr style='background: ${isDark ? 'linear-gradient(135deg, #1a1a2e, #0db7b7)' : 'linear-gradient(135deg, #007bff, #0056b3)'}; color: white;'>`;
      procHtml += `<th style='padding: 15px 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(0, 123, 255, 0.3)'}; font-weight: 700; text-align: center;'>i</th>`;
      procHtml += `<th style='padding: 15px 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(0, 123, 255, 0.3)'}; font-weight: 700; text-align: center;'>x<sub>i</sub></th>`;
      procHtml += `<th style='padding: 15px 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(0, 123, 255, 0.3)'}; font-weight: 700; text-align: center;'>f(x<sub>i</sub>)</th>`;
      procHtml += `<th style='padding: 15px 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(0, 123, 255, 0.3)'}; font-weight: 700; text-align: center; background: rgba(255,255,255,0.2);'>Coeficiente</th>`;
      procHtml += `</tr></thead><tbody>`;
      
      for (let i = 0; i <= n; i++) {
        let coef = i === 0 || i === n ? 1 : (i % 2 === 0 ? 2 : 4);
        const isEven = i % 2 === 0;
        let coefColor = coef === 1 ? (isDark ? '#ffd600' : '#ff6b00') : coef === 2 ? (isDark ? '#ff6b00' : '#dc3545') : (isDark ? '#1a1a2e' : '#007bff');
        
        procHtml += `<tr style='${isEven ? (isDark ? "background: rgba(0, 223, 216, 0.08);" : "background: #f8f9fa;") : (isDark ? "background: rgba(26, 32, 44, 0.8);" : "background: #fff;")} color: ${isDark ? '#e2e8f0' : '#2d3748'}; transition: all 0.3s ease;' onmouseover='this.style.background="${isDark ? 'rgba(0, 223, 216, 0.15)' : 'rgba(0, 123, 255, 0.08)'}";' onmouseout='this.style.background="${isEven ? (isDark ? 'rgba(0, 223, 216, 0.08)' : '#f8f9fa') : (isDark ? 'rgba(26, 32, 44, 0.8)' : '#fff')}";'>`;
        procHtml += `<td style='padding: 12px 10px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; font-weight: 600;'>${i}</td>`;
        procHtml += `<td style='padding: 12px 10px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; font-family: monospace;'>${x[i].toFixed(4)}</td>`;
        procHtml += `<td style='padding: 12px 10px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; font-family: monospace;'>${y[i].toFixed(6)}</td>`;
        procHtml += `<td style='padding: 12px 10px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; font-weight: bold; color: ${coefColor}; font-size: 1.1em; background: ${isDark ? 'rgba(0, 223, 216, 0.05)' : 'rgba(0, 123, 255, 0.05)'}; border-left: 3px solid ${coefColor};'>${coef}</td>`;
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
      setArea(null);        let procHtml = `<div style='background: ${isDark ? 'linear-gradient(135deg, #2d3748, #1a202c)' : 'linear-gradient(135deg, #f8f9fa, #e9ecef)'}; padding: 25px; border-radius: 15px; border-left: 5px solid ${isDark ? '#1a1a2e' : '#28a745'}; color: ${isDark ? '#e2e8f0' : '#2d3748'}; box-shadow: 0 8px 32px rgba(0,0,0,0.1);'>`;
      
      procHtml += `<div style='text-align: center; margin-bottom: 25px; padding: 15px; background: ${isDark ? 'rgba(26, 26, 46, 0.2)' : 'rgba(40, 167, 69, 0.1)'}; border-radius: 10px;'>`;
      procHtml += `<h3 style='color: ${isDark ? '#1a1a2e' : '#28a745'}; margin: 0; font-weight: 700;'><i class="bi bi-graph-up-arrow"></i> Método de Euler</h3>`;
      procHtml += `<p style='margin: 5px 0 0 0; font-style: italic; opacity: 0.8;'>Solución Numérica de Ecuaciones Diferenciales Ordinarias</p>`;
      procHtml += `</div>`;
      
      // Información del problema
      procHtml += `<div style='background: ${isDark ? 'rgba(0, 223, 216, 0.08)' : 'rgba(40, 167, 69, 0.08)'}; padding: 15px; border-radius: 10px; margin-bottom: 20px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : 'rgba(40, 167, 69, 0.2)'};'>`;
      procHtml += `<h5 style='color: ${isDark ? '#1a1a2e' : '#28a745'}; margin-bottom: 12px; font-weight: 600;'><i class="bi bi-info-circle"></i> Datos del Problema</h5>`;
      procHtml += `<div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;'>`;
      procHtml += `<div><strong>EDO:</strong> <code style='background: ${isDark ? '#1a202c' : '#f8f9fa'}; padding: 4px 8px; border-radius: 4px; color: ${isDark ? '#1a1a2e' : '#28a745'};'>dy/dx = ${expr}</code></div>`;
      procHtml += `<div><strong>Condición inicial:</strong> <code style='background: ${isDark ? '#1a202c' : '#f8f9fa'}; padding: 4px 8px; border-radius: 4px;'>y(${aNum}) = ${y0Num}</code></div>`;
      procHtml += `<div><strong>Intervalo:</strong> <code style='background: ${isDark ? '#1a202c' : '#f8f9fa'}; padding: 4px 8px; border-radius: 4px;'>[${aNum}, ${bNum}]</code></div>`;
      procHtml += `<div><strong>Paso h:</strong> <code style='background: ${isDark ? '#1a202c' : '#f8f9fa'}; padding: 4px 8px; border-radius: 4px;'>${hNum}</code></div>`;
      procHtml += `</div></div>`;
      
      // Fórmula matemática
      procHtml += `<div style='background: ${isDark ? 'rgba(0, 223, 216, 0.05)' : 'rgba(40, 167, 69, 0.05)'}; padding: 20px; border-radius: 10px; margin-bottom: 20px; text-align: center; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : 'rgba(40, 167, 69, 0.2)'};'>`;
      procHtml += `<h5 style='color: ${isDark ? '#1a1a2e' : '#28a745'}; margin-bottom: 15px; font-weight: 600;'><i class="bi bi-calculator-fill"></i> Fórmula del Método de Euler</h5>`;
      procHtml += `<div style='font-size: 1.2em; font-family: "Courier New", monospace; background: ${isDark ? '#1a202c' : '#fff'}; padding: 15px; border-radius: 8px; border: 2px solid ${isDark ? '#1a1a2e' : '#28a745'}; color: ${isDark ? '#1a1a2e' : '#28a745'}; margin-bottom: 15px;'>`;
      procHtml += `<strong>y<sub>i+1</sub> = y<sub>i</sub> + h · f(x<sub>i</sub>, y<sub>i</sub>)</strong>`;
      procHtml += `</div>`;
      procHtml += `<div style='text-align: left; color: ${isDark ? '#cbd5e0' : '#4a5568'}; font-size: 0.9em;'>`;
      procHtml += `<p><strong>Donde:</strong></p>`;
      procHtml += `<ul style='margin: 5px 0; padding-left: 20px;'>`;
      procHtml += `<li><strong>y<sub>i+1</sub></strong>: Valor aproximado en el siguiente punto</li>`;
      procHtml += `<li><strong>y<sub>i</sub></strong>: Valor conocido en el punto actual</li>`;
      procHtml += `<li><strong>h</strong>: Tamaño del paso = ${hNum}</li>`;
      procHtml += `<li><strong>f(x<sub>i</sub>, y<sub>i</sub>)</strong>: Pendiente de la recta tangente</li>`;
      procHtml += `</ul></div></div>`;
      
      // Resultado final destacado
      procHtml += `<div style='background: ${isDark ? 'linear-gradient(135deg, #065f46, #047857)' : 'linear-gradient(135deg, #10b981, #34d399)'}; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 20px; box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);'>`;
      procHtml += `<h5 style='color: white; margin-bottom: 10px; font-weight: 700;'><i class="bi bi-check-circle-fill"></i> Resultado Final</h5>`;
      procHtml += `<div style='font-size: 1.3em; font-weight: 700; color: white;'>y(${bNum}) ≈ ${y[y.length-1].toFixed(6)}</div>`;
      procHtml += `<div style='font-size: 0.9em; color: rgba(255,255,255,0.8); margin-top: 5px;'>Número de iteraciones: ${x.length - 1}</div>`;
      procHtml += `</div>`;
        // Tabla de iteraciones
      procHtml += `<div style='margin-top: 20px;'>`;
      procHtml += `<h5 style='color: ${isDark ? '#1a1a2e' : '#28a745'}; margin-bottom: 15px; font-weight: 600;'><i class="bi bi-table"></i> Tabla de Iteraciones - Método de Euler</h5>`;
      procHtml += `<div style='overflow-x: auto; border-radius: 12px; border: 2px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(40, 167, 69, 0.3)'}; box-shadow: 0 4px 12px rgba(0,0,0,0.1);'>`;
      procHtml += `<table style='width: 100%; border-collapse: collapse; font-size: 0.9em; background: ${isDark ? '#1a202c' : '#fff'};'>`;
      procHtml += `<thead><tr style='background: ${isDark ? 'linear-gradient(135deg, #1a1a2e, #0db7b7)' : 'linear-gradient(135deg, #28a745, #20c997)'}; color: white;'>`;
      procHtml += `<th style='padding: 15px 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(40, 167, 69, 0.3)'}; font-weight: 700; text-align: center;'>i</th>`;
      procHtml += `<th style='padding: 15px 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(40, 167, 69, 0.3)'}; font-weight: 700; text-align: center;'>x<sub>i</sub></th>`;
      procHtml += `<th style='padding: 15px 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(40, 167, 69, 0.3)'}; font-weight: 700; text-align: center;'>y<sub>i</sub></th>`;
      procHtml += `<th style='padding: 15px 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(40, 167, 69, 0.3)'}; font-weight: 700; text-align: center; background: rgba(255,255,255,0.1);'>f(x<sub>i</sub>,y<sub>i</sub>)</th>`;
      procHtml += `<th style='padding: 15px 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(40, 167, 69, 0.3)'}; font-weight: 700; text-align: center; background: rgba(255,255,255,0.2);'>y<sub>i+1</sub></th>`;
      procHtml += `</tr></thead><tbody>`;
      
      for (let i = 0; i < x.length - 1; i++) {
        const isEven = i % 2 === 0;
        procHtml += `<tr style='${isEven ? (isDark ? "background: rgba(0, 223, 216, 0.08);" : "background: #f8f9fa;") : (isDark ? "background: rgba(26, 32, 44, 0.8);" : "background: #fff;")} color: ${isDark ? '#e2e8f0' : '#2d3748'}; transition: all 0.3s ease;' onmouseover='this.style.background="${isDark ? 'rgba(0, 223, 216, 0.15)' : 'rgba(40, 167, 69, 0.08)'}";' onmouseout='this.style.background="${isEven ? (isDark ? 'rgba(0, 223, 216, 0.08)' : '#f8f9fa') : (isDark ? 'rgba(26, 32, 44, 0.8)' : '#fff')}";'>`;
        procHtml += `<td style='padding: 12px 10px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; font-weight: 600;'>${i}</td>`;
        procHtml += `<td style='padding: 12px 10px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; font-family: monospace;'>${x[i].toFixed(4)}</td>`;
        procHtml += `<td style='padding: 12px 10px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; font-family: monospace;'>${y[i].toFixed(6)}</td>`;
        procHtml += `<td style='padding: 12px 10px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; color: ${isDark ? '#1a1a2e' : '#28a745'}; font-weight: 600; font-family: monospace; background: ${isDark ? 'rgba(0, 223, 216, 0.05)' : 'rgba(40, 167, 69, 0.05)'};'>${slopes[i].toFixed(6)}</td>`;
        procHtml += `<td style='padding: 12px 10px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; font-weight: bold; color: ${isDark ? '#1a1a2e' : '#28a745'}; font-family: monospace; background: ${isDark ? 'rgba(26, 26, 46, 0.2)' : 'rgba(40, 167, 69, 0.1)'}; border-left: 3px solid ${isDark ? '#1a1a2e' : '#28a745'};'>${y[i+1].toFixed(6)}</td>`;
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
      setArea(null);        let procHtml = `<div style='background: ${isDark ? 'linear-gradient(135deg, #2d3748, #1a202c)' : 'linear-gradient(135deg, #f8f9fa, #e9ecef)'}; padding: 25px; border-radius: 15px; border-left: 5px solid ${isDark ? '#1a1a2e' : '#dc3545'}; color: ${isDark ? '#e2e8f0' : '#2d3748'}; box-shadow: 0 8px 32px rgba(0,0,0,0.1);'>`;
      
      procHtml += `<div style='text-align: center; margin-bottom: 25px; padding: 15px; background: ${isDark ? 'rgba(26, 26, 46, 0.2)' : 'rgba(220, 53, 69, 0.1)'}; border-radius: 10px;'>`;
      procHtml += `<h3 style='color: ${isDark ? '#1a1a2e' : '#dc3545'}; margin: 0; font-weight: 700;'><i class="bi bi-graph-up"></i> Método de Runge-Kutta 2° Orden</h3>`;
      procHtml += `<p style='margin: 5px 0 0 0; font-style: italic; opacity: 0.8;'>Método de Heun - Solución Numérica Mejorada de EDOs</p>`;
      procHtml += `</div>`;
      
      // Información del problema
      procHtml += `<div style='background: ${isDark ? 'rgba(0, 223, 216, 0.08)' : 'rgba(220, 53, 69, 0.08)'}; padding: 15px; border-radius: 10px; margin-bottom: 20px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : 'rgba(220, 53, 69, 0.2)'};'>`;
      procHtml += `<h5 style='color: ${isDark ? '#1a1a2e' : '#dc3545'}; margin-bottom: 12px; font-weight: 600;'><i class="bi bi-info-circle"></i> Datos del Problema</h5>`;
      procHtml += `<div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;'>`;
      procHtml += `<div><strong>EDO:</strong> <code style='background: ${isDark ? '#1a202c' : '#f8f9fa'}; padding: 4px 8px; border-radius: 4px; color: ${isDark ? '#1a1a2e' : '#dc3545'};'>dy/dx = ${expr}</code></div>`;
      procHtml += `<div><strong>Condición inicial:</strong> <code style='background: ${isDark ? '#1a202c' : '#f8f9fa'}; padding: 4px 8px; border-radius: 4px;'>y(${aNum}) = ${y0Num}</code></div>`;
      procHtml += `<div><strong>Intervalo:</strong> <code style='background: ${isDark ? '#1a202c' : '#f8f9fa'}; padding: 4px 8px; border-radius: 4px;'>[${aNum}, ${bNum}]</code></div>`;
      procHtml += `<div><strong>Paso h:</strong> <code style='background: ${isDark ? '#1a202c' : '#f8f9fa'}; padding: 4px 8px; border-radius: 4px;'>${hNum}</code></div>`;
      procHtml += `</div></div>`;
      
      // Fórmulas matemáticas
      procHtml += `<div style='background: ${isDark ? 'rgba(0, 223, 216, 0.05)' : 'rgba(220, 53, 69, 0.05)'}; padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : 'rgba(220, 53, 69, 0.2)'};'>`;
      procHtml += `<h5 style='color: ${isDark ? '#1a1a2e' : '#dc3545'}; margin-bottom: 15px; font-weight: 600; text-align: center;'><i class="bi bi-calculator-fill"></i> Fórmulas del Método RK2</h5>`;
      
      procHtml += `<div style='display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 15px;'>`;
      procHtml += `<div style='background: ${isDark ? '#1a202c' : '#fff'}; padding: 12px; border-radius: 8px; border: 2px solid ${isDark ? '#1a1a2e' : '#dc3545'}; text-align: center;'>`;
      procHtml += `<div style='font-size: 1.1em; font-family: "Courier New", monospace; color: ${isDark ? '#1a1a2e' : '#dc3545'}; font-weight: bold;'>k₁ = f(xᵢ, yᵢ)</div>`;
      procHtml += `<div style='font-size: 0.8em; color: ${isDark ? '#cbd5e0' : '#6c757d'}; margin-top: 5px;'>Pendiente inicial</div>`;
      procHtml += `</div>`;
      
      procHtml += `<div style='background: ${isDark ? '#1a202c' : '#fff'}; padding: 12px; border-radius: 8px; border: 2px solid ${isDark ? '#1a1a2e' : '#dc3545'}; text-align: center;'>`;
      procHtml += `<div style='font-size: 1.1em; font-family: "Courier New", monospace; color: ${isDark ? '#1a1a2e' : '#dc3545'}; font-weight: bold;'>k₂ = f(xᵢ+h, yᵢ+h·k₁)</div>`;
      procHtml += `<div style='font-size: 0.8em; color: ${isDark ? '#cbd5e0' : '#6c757d'}; margin-top: 5px;'>Pendiente final</div>`;
      procHtml += `</div>`;
      
      procHtml += `<div style='background: ${isDark ? '#1a202c' : '#fff'}; padding: 12px; border-radius: 8px; border: 2px solid ${isDark ? '#1a1a2e' : '#dc3545'}; text-align: center;'>`;
      procHtml += `<div style='font-size: 1.1em; font-family: "Courier New", monospace; color: ${isDark ? '#1a1a2e' : '#dc3545'}; font-weight: bold;'>yᵢ₊₁ = yᵢ + (h/2)(k₁+k₂)</div>`;
      procHtml += `<div style='font-size: 0.8em; color: ${isDark ? '#cbd5e0' : '#6c757d'}; margin-top: 5px;'>Valor siguiente</div>`;
      procHtml += `</div>`;
      procHtml += `</div>`;
      
      procHtml += `<div style='text-align: center; color: ${isDark ? '#cbd5e0' : '#4a5568'}; font-size: 0.9em; background: ${isDark ? 'rgba(26, 32, 44, 0.6)' : 'rgba(248, 249, 250, 0.8)'}; padding: 10px; border-radius: 6px;'>`;
      procHtml += `<strong>Ventaja:</strong> Mayor precisión que Euler al promediar las pendientes inicial y final de cada intervalo`;
      procHtml += `</div>`;
      procHtml += `</div>`;
      
      // Resultado final destacado
      procHtml += `<div style='background: ${isDark ? 'linear-gradient(135deg, #7c2d12, #dc2626)' : 'linear-gradient(135deg, #dc2626, #ef4444)'}; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 20px; box-shadow: 0 4px 20px rgba(220, 38, 38, 0.3);'>`;
      procHtml += `<h5 style='color: white; margin-bottom: 10px; font-weight: 700;'><i class="bi bi-check-circle-fill"></i> Resultado Final</h5>`;
      procHtml += `<div style='font-size: 1.3em; font-weight: 700; color: white;'>y(${bNum}) ≈ ${y[y.length-1].toFixed(6)}</div>`;
      procHtml += `<div style='font-size: 0.9em; color: rgba(255,255,255,0.8); margin-top: 5px;'>Número de iteraciones: ${x.length - 1}</div>`;
      procHtml += `</div>`;
        // Tabla de iteraciones
      procHtml += `<div style='margin-top: 20px;'>`;
      procHtml += `<h5 style='color: ${isDark ? '#1a1a2e' : '#dc3545'}; margin-bottom: 15px; font-weight: 600;'><i class="bi bi-table"></i> Tabla de Iteraciones - Método RK2</h5>`;
      procHtml += `<div style='overflow-x: auto; border-radius: 12px; border: 2px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(220, 53, 69, 0.3)'}; box-shadow: 0 4px 12px rgba(0,0,0,0.1);'>`;
      procHtml += `<table style='width: 100%; border-collapse: collapse; font-size: 0.9em; background: ${isDark ? '#1a202c' : '#fff'};'>`;
      procHtml += `<thead><tr style='background: ${isDark ? 'linear-gradient(135deg, #1a1a2e, #0db7b7)' : 'linear-gradient(135deg, #dc3545, #c82333)'}; color: white;'>`;
      procHtml += `<th style='padding: 15px 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(220, 53, 69, 0.3)'}; font-weight: 700; text-align: center;'>i</th>`;
      procHtml += `<th style='padding: 15px 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(220, 53, 69, 0.3)'}; font-weight: 700; text-align: center;'>x<sub>i</sub></th>`;
      procHtml += `<th style='padding: 15px 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(220, 53, 69, 0.3)'}; font-weight: 700; text-align: center;'>y<sub>i</sub></th>`;
      procHtml += `<th style='padding: 15px 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(220, 53, 69, 0.3)'}; font-weight: 700; text-align: center; background: rgba(255,255,255,0.1);'>k₁</th>`;
      procHtml += `<th style='padding: 15px 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(220, 53, 69, 0.3)'}; font-weight: 700; text-align: center; background: rgba(255,255,255,0.1);'>k₂</th>`;
      procHtml += `<th style='padding: 15px 10px; border: 1px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(220, 53, 69, 0.3)'}; font-weight: 700; text-align: center; background: rgba(255,255,255,0.2);'>y<sub>i+1</sub></th>`;
      procHtml += `</tr></thead><tbody>`;
      
      for (let i = 0; i < x.length - 1; i++) {
        const isEven = i % 2 === 0;
        procHtml += `<tr style='${isEven ? (isDark ? "background: rgba(0, 223, 216, 0.08);" : "background: #f8f9fa;") : (isDark ? "background: rgba(26, 32, 44, 0.8);" : "background: #fff;")} color: ${isDark ? '#e2e8f0' : '#2d3748'}; transition: all 0.3s ease;' onmouseover='this.style.background="${isDark ? 'rgba(0, 223, 216, 0.15)' : 'rgba(220, 53, 69, 0.08)'}";' onmouseout='this.style.background="${isEven ? (isDark ? 'rgba(0, 223, 216, 0.08)' : '#f8f9fa') : (isDark ? 'rgba(26, 32, 44, 0.8)' : '#fff')}";'>`;
        procHtml += `<td style='padding: 12px 10px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; font-weight: 600;'>${i}</td>`;
        procHtml += `<td style='padding: 12px 10px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; font-family: monospace;'>${x[i].toFixed(4)}</td>`;
        procHtml += `<td style='padding: 12px 10px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; font-family: monospace;'>${y[i].toFixed(6)}</td>`;
        procHtml += `<td style='padding: 12px 10px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; color: ${isDark ? '#1a1a2e' : '#dc3545'}; font-weight: 600; font-family: monospace; background: ${isDark ? 'rgba(0, 223, 216, 0.05)' : 'rgba(220, 53, 69, 0.05)'};'>${k1Values[i].toFixed(6)}</td>`;
        procHtml += `<td style='padding: 12px 10px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; color: ${isDark ? '#1a1a2e' : '#dc3545'}; font-weight: 600; font-family: monospace; background: ${isDark ? 'rgba(0, 223, 216, 0.05)' : 'rgba(220, 53, 69, 0.05)'};'>${k2Values[i].toFixed(6)}</td>`;
        procHtml += `<td style='padding: 12px 10px; border: 1px solid ${isDark ? 'rgba(0, 223, 216, 0.2)' : '#dee2e6'}; text-align: center; font-weight: bold; color: ${isDark ? '#1a1a2e' : '#dc3545'}; font-family: monospace; background: ${isDark ? 'rgba(26, 26, 46, 0.2)' : 'rgba(220, 53, 69, 0.1)'}; border-left: 3px solid ${isDark ? '#1a1a2e' : '#dc3545'};'>${y[i+1].toFixed(6)}</td>`;
        procHtml += `</tr>`;
      }
      
      procHtml += `</tbody></table></div></div>`;
      
      procHtml += `</tbody></table></div></div>`;
      procHtml += `</div>`;
      
      setProcedure(procHtml);
    }
  };

  // Limpiar gráfica y procedimiento al cambiar de método
  React.useEffect(() => {
    setPlotData(null);
    setProcedure("");
    setArea(null);
  }, [method]);
  return (    <div className={`app ${theme} app-container`} style={{ background: isDark ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <div className="container-fluid app-main">
        <header className="header-modern app-header d-flex justify-content-between align-items-center" style={{ background: isDark ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(135deg, #b71c1c 0%, #2d3748 100%)', color: '#fff', borderRadius: '15px', padding: '15px 25px', boxShadow: isDark ? '0 8px 32px rgba(26, 26, 46, 0.3)' : '0 8px 32px rgba(183, 28, 28, 0.3)' }}>          <div className="d-flex align-items-center gap-3">
            <img src="/logo192.png" alt="Logo UTA" className="logo-modern animate__animated animate__rotateIn" style={{ 
              width: 50, 
              height: 50, 
              borderRadius: '50%', 
              border: '3px solid #ffd600', 
              filter: 'drop-shadow(0 6px 12px rgba(255, 213, 0, 0.4))',
              position: 'relative',
              zIndex: 1
            }} />
            <div>
              <h1 className="fw-bold mb-0" style={{ 
                fontSize: '1.9rem', 
                textShadow: '0 3px 6px rgba(0,0,0,0.4)',
                background: 'linear-gradient(45deg, #ffffff, #ffd700, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 100%',
                animation: 'textGlowPulse 3s ease-in-out infinite'
              }}>
                Métodos Numéricos
              </h1>
              <small style={{ 
                color: '#ffd600', 
                fontWeight: '600',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                animation: 'textGlowPulse 4s ease-in-out infinite'
              }}>
                Universidad Técnica de Ambato
              </small>
            </div>
          </div>          <button className="btn btn-outline-light interactive-element" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} style={{ 
            border: '3px solid #ffd600', 
            borderRadius: '15px',
            padding: '10px 20px',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'rgba(255, 215, 0, 0.15)',
            backdropFilter: 'blur(15px)',
            position: 'relative',
            overflow: 'hidden',
            fontWeight: '600',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-3px) scale(1.05)';
            e.target.style.boxShadow = '0 8px 25px rgba(255, 215, 0, 0.4), 0 0 20px rgba(255, 215, 0, 0.3)';
            e.target.style.background = 'rgba(255, 215, 0, 0.25)';
            e.target.style.borderColor = '#ffffff';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = 'none';
            e.target.style.background = 'rgba(255, 215, 0, 0.15)';
            e.target.style.borderColor = '#ffd600';
          }}
          >
            <i className={`bi bi-${theme === 'light' ? 'moon-stars-fill' : 'sun-fill'} me-2`} style={{
              fontSize: '1.2rem',
              animation: theme === 'light' ? 'sparkleRotate 3s ease-in-out infinite' : 'neonGlow 2s ease-in-out infinite'
            }}></i>
            {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
          </button>
        </header>

        <div className="app-content">
          <div className="row g-4 h-100">            <div className="col-lg-4 col-md-5 animate__animated animate__slideInLeft">
              <div className="card card-modern card-scrollable glass-card" style={{ 
                background: isDark ? 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.98) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)', 
                borderRadius: '28px', 
                border: `3px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(183, 28, 28, 0.3)'}`,
                height: '80vh',
                maxHeight: '800px',
                boxShadow: isDark ? 
                  '0 25px 70px rgba(26, 26, 46, 0.3), 0 10px 30px rgba(22, 33, 62, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)' : 
                  '0 25px 70px rgba(183, 28, 28, 0.2), 0 10px 30px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}><div style={{ 
                  padding: '24px 24px 16px 24px',                  borderBottom: `1px solid ${isDark ? 'rgba(26, 26, 46, 0.4)' : 'rgba(183, 28, 28, 0.2)'}`,
                  flexShrink: 0,
                  background: isDark ? 'rgba(26, 26, 46, 0.15)' : 'rgba(183, 28, 28, 0.05)'
                }}><h5 className="card-title fw-bold mb-0 text-gradient" style={{ 
                    background: isDark ? 'linear-gradient(135deg, #16213e, #ffd600)' : 'linear-gradient(135deg, #b71c1c, #2d3748)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '1.3rem',
                    letterSpacing: '0.5px'
                  }}>
                    <i className="bi bi-gear-fill me-2" style={{ color: isDark ? '#16213e' : '#b71c1c' }}></i>
                    Configuración
                  </h5>
                </div>
                  <div style={{
                  flex: 1,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  padding: '24px',
                  scrollbarWidth: 'thin',
                  scrollbarColor: isDark ? '#16213e rgba(26, 26, 46, 0.3)' : '#b71c1c rgba(248, 250, 252, 0.3)'
                }}><div className="mb-3 animate__animated animate__fadeInUp" style={{ animationDelay: '0.1s' }}>                <label className="form-label fw-semibold" style={{ 
                  color: isDark ? '#e2e8f0' : '#2d3748',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  marginBottom: '8px'
                }}>Método Numérico</label>                <select 
                  className="form-select form-select-modern interactive-element" 
                  value={method} 
                  onChange={(e) => setMethod(e.target.value)}style={{ 
                    background: isDark ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', 
                    color: isDark ? '#fff' : '#2d3748',
                    border: `2px solid ${isDark ? 'rgba(26, 26, 46, 0.6)' : 'rgba(183, 28, 28, 0.6)'}`,
                    borderRadius: '12px',
                    padding: '12px 16px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    boxShadow: isDark ? '0 4px 20px rgba(26, 26, 46, 0.3)' : '0 4px 20px rgba(183, 28, 28, 0.3)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                  }}                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = isDark ? '0 8px 30px rgba(26, 26, 46, 0.5)' : '0 8px 30px rgba(183, 28, 28, 0.5)';
                    e.target.style.borderColor = isDark ? '#1a1a2e' : '#b71c1c';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = isDark ? '0 4px 20px rgba(26, 26, 46, 0.3)' : '0 4px 20px rgba(183, 28, 28, 0.3)';
                    e.target.style.borderColor = isDark ? 'rgba(26, 26, 46, 0.6)' : 'rgba(183, 28, 28, 0.6)';
                  }}
                >
                  <option value="">🍷 Seleccionar método</option>
                  <option value="simpson">📊 Simpson 1/3 (Integración)</option>
                  <option value="euler">📈 Euler (EDO)</option>
                  <option value="rk2">🚀 Runge-Kutta 2° Orden (EDO)</option>
                </select>
              </div>{method !== '' && (
                <div className="animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ 
                      color: isDark ? '#e2e8f0' : '#2d3748',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      fontSize: '0.85rem',
                      marginBottom: '8px'
                    }}>🔧 Función f(x) o f(x,y)</label>                    <input 
                      type="text" 
                      className="form-control form-control-modern interactive-element" 
                      value={expr} 
                      onChange={(e) => setExpr(e.target.value)}
                      placeholder="Ej: x^2, sin(x), x+y"
                      style={{ 
                        background: isDark ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', 
                        color: isDark ? '#fff' : '#2d3748',
                        border: `2px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(183, 28, 28, 0.5)'}`,
                        borderRadius: '12px',
                        padding: '12px 16px',
                        fontSize: '1rem',
                        fontWeight: '500',
                        boxShadow: isDark ? '0 4px 20px rgba(26, 26, 46, 0.2)' : '0 4px 20px rgba(183, 28, 28, 0.2)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onFocus={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = isDark ? '0 8px 30px rgba(26, 26, 46, 0.4), 0 0 0 3px rgba(26, 26, 46, 0.2)' : '0 8px 30px rgba(183, 28, 28, 0.2), 0 0 0 3px rgba(183, 28, 28, 0.1)';
                        e.target.style.borderColor = isDark ? '#1a1a2e' : '#b71c1c';
                      }}
                      onBlur={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = isDark ? '0 4px 20px rgba(26, 26, 46, 0.2)' : '0 4px 20px rgba(183, 28, 28, 0.1)';
                        e.target.style.borderColor = isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(183, 28, 28, 0.3)';
                      }}
                    />
                  </div>

                  <div className="row">
                    <div className="col-6 mb-3">
                      <label className="form-label fw-semibold" style={{ 
                        color: isDark ? '#e2e8f0' : '#2d3748',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        fontSize: '0.85rem',
                        marginBottom: '8px'
                      }}>📍 Límite inferior (a)</label>
                      <input 
                        type="number" 
                        className="form-control form-control-modern interactive-element" 
                        value={a} 
                        onChange={(e) => setA(e.target.value)}
                        style={{ 
                          background: isDark ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', 
                          color: isDark ? '#fff' : '#2d3748',
                          border: `2px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(183, 28, 28, 0.3)'}`,
                          borderRadius: '12px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          fontWeight: '500',
                          boxShadow: isDark ? '0 4px 20px rgba(26, 26, 46, 0.2)' : '0 4px 20px rgba(183, 28, 28, 0.1)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        onFocus={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = isDark ? '0 8px 30px rgba(26, 26, 46, 0.4), 0 0 0 3px rgba(26, 26, 46, 0.2)' : '0 8px 30px rgba(183, 28, 28, 0.2), 0 0 0 3px rgba(183, 28, 28, 0.1)';
                          e.target.style.borderColor = isDark ? '#1a1a2e' : '#b71c1c';
                        }}
                        onBlur={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = isDark ? '0 4px 20px rgba(26, 26, 46, 0.2)' : '0 4px 20px rgba(183, 28, 28, 0.1)';
                          e.target.style.borderColor = isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(183, 28, 28, 0.3)';
                        }}
                      />
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label fw-semibold" style={{ 
                        color: isDark ? '#e2e8f0' : '#2d3748',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        fontSize: '0.85rem',
                        marginBottom: '8px'
                      }}>🎯 Límite superior (b)</label>
                      <input 
                        type="number" 
                        className="form-control form-control-modern interactive-element" 
                        value={b} 
                        onChange={(e) => setB(e.target.value)}
                        style={{ 
                          background: isDark ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', 
                          color: isDark ? '#fff' : '#2d3748',
                          border: `2px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(183, 28, 28, 0.3)'}`,
                          borderRadius: '12px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          fontWeight: '500',
                          boxShadow: isDark ? '0 4px 20px rgba(26, 26, 46, 0.2)' : '0 4px 20px rgba(183, 28, 28, 0.1)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        onFocus={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = isDark ? '0 8px 30px rgba(26, 26, 46, 0.4), 0 0 0 3px rgba(26, 26, 46, 0.2)' : '0 8px 30px rgba(183, 28, 28, 0.2), 0 0 0 3px rgba(183, 28, 28, 0.1)';
                          e.target.style.borderColor = isDark ? '#1a1a2e' : '#b71c1c';
                        }}
                        onBlur={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = isDark ? '0 4px 20px rgba(26, 26, 46, 0.2)' : '0 4px 20px rgba(183, 28, 28, 0.1)';
                          e.target.style.borderColor = isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(183, 28, 28, 0.3)';
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}              {method === 'simpson' && (
                <div className="mb-3 animate__animated animate__fadeInUp" style={{ animationDelay: '0.3s' }}>
                  <label className="form-label fw-semibold" style={{ 
                    color: isDark ? '#e2e8f0' : '#2d3748',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    fontSize: '0.85rem',
                    marginBottom: '8px'
                  }}>⚡ Δx (paso)</label>
                  <input 
                    type="number" 
                    className="form-control form-control-modern interactive-element" 
                    value={delta} 
                    onChange={(e) => setDelta(e.target.value)}
                    step="0.01"
                    style={{ 
                      background: isDark ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', 
                      color: isDark ? '#fff' : '#2d3748',
                      border: `2px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(183, 28, 28, 0.3)'}`,
                      borderRadius: '12px',
                      padding: '12px 16px',
                      fontSize: '1rem',
                      fontWeight: '500',
                      boxShadow: isDark ? '0 4px 20px rgba(26, 26, 46, 0.2)' : '0 4px 20px rgba(183, 28, 28, 0.1)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onFocus={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = isDark ? '0 8px 30px rgba(26, 26, 46, 0.4), 0 0 0 3px rgba(26, 26, 46, 0.2)' : '0 8px 30px rgba(183, 28, 28, 0.2), 0 0 0 3px rgba(183, 28, 28, 0.1)';
                      e.target.style.borderColor = isDark ? '#1a1a2e' : '#b71c1c';
                    }}
                    onBlur={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = isDark ? '0 4px 20px rgba(26, 26, 46, 0.2)' : '0 4px 20px rgba(183, 28, 28, 0.1)';
                      e.target.style.borderColor = isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(183, 28, 28, 0.3)';
                    }}
                  />
                </div>
              )}              {(method === 'euler' || method === 'rk2') && (
                <div className="animate__animated animate__fadeInUp" style={{ animationDelay: '0.3s' }}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ 
                      color: isDark ? '#e2e8f0' : '#2d3748',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      fontSize: '0.85rem',
                      marginBottom: '8px'
                    }}>⚡ Paso h</label>
                    <input 
                      type="number" 
                      className="form-control form-control-modern interactive-element" 
                      value={h} 
                      onChange={(e) => setH(e.target.value)}
                      step="0.01"
                      style={{ 
                        background: isDark ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', 
                        color: isDark ? '#fff' : '#2d3748',
                        border: `2px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(183, 28, 28, 0.3)'}`,
                        borderRadius: '12px',
                        padding: '12px 16px',
                        fontSize: '1rem',
                        fontWeight: '500',
                        boxShadow: isDark ? '0 4px 20px rgba(26, 26, 46, 0.2)' : '0 4px 20px rgba(183, 28, 28, 0.1)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onFocus={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = isDark ? '0 8px 30px rgba(26, 26, 46, 0.4), 0 0 0 3px rgba(26, 26, 46, 0.2)' : '0 8px 30px rgba(183, 28, 28, 0.2), 0 0 0 3px rgba(183, 28, 28, 0.1)';
                        e.target.style.borderColor = isDark ? '#1a1a2e' : '#b71c1c';
                      }}
                      onBlur={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = isDark ? '0 4px 20px rgba(26, 26, 46, 0.2)' : '0 4px 20px rgba(183, 28, 28, 0.1)';
                        e.target.style.borderColor = isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(183, 28, 28, 0.3)';
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ 
                      color: isDark ? '#e2e8f0' : '#2d3748',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      fontSize: '0.85rem',
                      marginBottom: '8px'
                    }}>🎯 Valor inicial y₀</label>
                    <input 
                      type="number" 
                      className="form-control form-control-modern interactive-element" 
                      value={y0} 
                      onChange={(e) => setY0(e.target.value)}
                      style={{ 
                        background: isDark ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', 
                        color: isDark ? '#fff' : '#2d3748',
                        border: `2px solid ${isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(183, 28, 28, 0.3)'}`,
                        borderRadius: '12px',
                        padding: '12px 16px',
                        fontSize: '1rem',
                        fontWeight: '500',
                        boxShadow: isDark ? '0 4px 20px rgba(26, 26, 46, 0.2)' : '0 4px 20px rgba(183, 28, 28, 0.1)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onFocus={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = isDark ? '0 8px 30px rgba(26, 26, 46, 0.4), 0 0 0 3px rgba(26, 26, 46, 0.2)' : '0 8px 30px rgba(183, 28, 28, 0.2), 0 0 0 3px rgba(183, 28, 28, 0.1)';
                        e.target.style.borderColor = isDark ? '#1a1a2e' : '#b71c1c';
                      }}
                      onBlur={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = isDark ? '0 4px 20px rgba(26, 26, 46, 0.2)' : '0 4px 20px rgba(183, 28, 28, 0.1)';
                        e.target.style.borderColor = isDark ? 'rgba(26, 26, 46, 0.5)' : 'rgba(183, 28, 28, 0.3)';
                      }}
                    />
                  </div>
                </div>
              )}              <button 
                className="btn btn-modern btn-gradient w-100 mt-3" 
                onClick={handleRun}
                style={{ 
                  background: isDark ? '#1a1a2e' : '#b71c1c', 
                  border: 'none',
                  padding: '20px 32px',
                  borderRadius: '25px',
                  fontSize: '1.2rem',
                  fontWeight: '800',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  boxShadow: isDark ? '0 15px 45px rgba(26, 26, 46, 0.6), 0 8px 25px rgba(26, 26, 46, 0.4), inset 0 2px 0 rgba(255,255,255,0.1)' : '0 15px 45px rgba(183, 28, 28, 0.6), 0 8px 25px rgba(183, 28, 28, 0.4), inset 0 2px 0 rgba(255,255,255,0.2)',
                  transition: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                  position: 'relative',
                  overflow: 'hidden',
                  color: '#fff',
                  textShadow: '0 3px 10px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(15px)',
                  transform: 'perspective(1000px) rotateX(0deg)',
                  cursor: 'pointer',
                  background: isDark ? 
                    'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)' : 
                    'linear-gradient(145deg, #b71c1c 0%, #8b0000 50%, #b71c1c 100%)',
                  backgroundSize: '200% 200%'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'perspective(1000px) rotateX(-8deg) translateY(-10px) scale(1.05)';
                  e.target.style.boxShadow = isDark ? '0 25px 70px rgba(26, 26, 46, 0.8), 0 15px 35px rgba(26, 26, 46, 0.6), inset 0 2px 0 rgba(255,255,255,0.2)' : '0 25px 70px rgba(183, 28, 28, 0.8), 0 15px 35px rgba(183, 28, 28, 0.6), inset 0 2px 0 rgba(255,255,255,0.3)';
                  e.target.style.backgroundPosition = '100% 100%';
                  e.target.style.textShadow = '0 5px 15px rgba(0,0,0,0.7)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0) scale(1)';
                  e.target.style.boxShadow = isDark ? '0 15px 45px rgba(26, 26, 46, 0.6), 0 8px 25px rgba(26, 26, 46, 0.4), inset 0 2px 0 rgba(255,255,255,0.1)' : '0 15px 45px rgba(183, 28, 28, 0.6), 0 8px 25px rgba(183, 28, 28, 0.4), inset 0 2px 0 rgba(255,255,255,0.2)';
                  e.target.style.backgroundPosition = '0% 0%';
                  e.target.style.textShadow = '0 3px 10px rgba(0,0,0,0.5)';
                }}
                onMouseDown={(e) => {
                  e.target.style.transform = 'perspective(1000px) rotateX(-3deg) translateY(-3px) scale(0.98)';
                }}
                onMouseUp={(e) => {
                  e.target.style.transform = 'perspective(1000px) rotateX(-8deg) translateY(-10px) scale(1.05)';
                }}
              >
                <span style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <i className="bi bi-rocket-takeoff-fill rocket-icon me-3" style={{ 
                    fontSize: '1.5rem',
                    filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.4))',
                  }}></i>
                  <span className="btn-text" style={{
                    background: 'linear-gradient(45deg, #ffffff, #ffd700, #ffffff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    backgroundSize: '200% 100%'
                  }}>
                    Calcular & Visualizar
                  </span>
                  <i className="bi bi-stars sparkle-icon ms-3" style={{ 
                    fontSize: '1.3rem',
                    filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.4))',
                  }}></i>
                </span>
              </button>
                </div>
              </div>
            </div>            <div className="col-lg-8 col-md-7 animate__animated animate__slideInRight">
              <div className="card card-modern card-scrollable p-4 d-flex flex-column glass-card" style={{ 
                background: isDark ? 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.98) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)', 
                borderRadius: '28px', 
                border: `3px solid ${isDark ? 'rgba(26, 26, 46, 0.4)' : 'rgba(183, 28, 28, 0.3)'}`,
                height: '80vh',
                maxHeight: '800px',
                boxShadow: isDark ? 
                  '0 25px 70px rgba(26, 26, 46, 0.25), 0 10px 30px rgba(22, 33, 62, 0.35), inset 0 1px 0 rgba(255,255,255,0.1)' : 
                  '0 25px 70px rgba(183, 28, 28, 0.2), 0 10px 30px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
                position: 'relative'
              }}><h5 className="card-title fw-bold mb-3 text-gradient" style={{ 
                background: isDark ? 'linear-gradient(135deg, #16213e, #ffd600)' : 'linear-gradient(135deg, #b71c1c, #2d3748)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '1.3rem',
                letterSpacing: '0.5px'
              }}>
                <i className="bi bi-graph-up-arrow me-2" style={{ color: isDark ? '#16213e' : '#b71c1c' }}></i>
                Visualización
              </h5>
                <div className="flex-fill d-flex flex-column" style={{ 
                minHeight: 0,
                overflowY: 'auto',
                overflowX: 'hidden',
                paddingRight: '8px',
                scrollbarWidth: 'thin',
                scrollbarColor: isDark ? '#16213e rgba(26, 26, 46, 0.3)' : '#b71c1c rgba(248, 250, 252, 0.3)'
              }}>
                {plotData ? (
                  <>                    <div className="mb-3 plot-container" style={{ height: '300px', minHeight: '280px', maxHeight: '350px' }}>
                      <Plot 
                        data={[{
                          x: plotData.x,
                          y: plotData.y,
                          type: 'scatter',
                          mode: 'lines+markers',
                          line: { 
                            color: isDark ? '#1a1a2e' : '#b71c1c', 
                            width: 3,
                            shape: 'spline'
                          },
                          marker: { 
                            color: isDark ? '#1a1a2e' : '#b71c1c', 
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
                              color: isDark ? '#1a1a2e' : '#b71c1c', 
                              size: 16,
                              family: 'Inter, sans-serif'
                            },
                            x: 0.5,
                            y: 0.95
                          },
                          paper_bgcolor: 'rgba(0,0,0,0)',
                          plot_bgcolor: isDark ? 'rgba(26, 32, 44, 0.3)' : 'rgba(248, 250, 252, 0.8)',
                          font: { 
                            color: isDark ? '#fff' : '#2d3748',
                            family: 'Inter, sans-serif',
                            size: 12
                          },
                          margin: { t: 60, l: 60, r: 40, b: 50 },
                          xaxis: { 
                            title: {
                              text: '<b>x</b>',
                              font: { color: isDark ? '#1a1a2e' : '#b71c1c', size: 14 }
                            },
                            gridcolor: isDark ? 'rgba(0, 223, 216, 0.2)' : 'rgba(183, 28, 28, 0.2)',
                            linecolor: isDark ? '#1a1a2e' : '#b71c1c',
                            tickcolor: isDark ? '#1a1a2e' : '#b71c1c',
                            tickfont: { color: isDark ? '#a0aec0' : '#4a5568' },
                            zerolinecolor: isDark ? 'rgba(0, 223, 216, 0.5)' : 'rgba(183, 28, 28, 0.5)'
                          },
                          yaxis: { 
                            title: {
                              text: method === 'simpson' ? '<b>f(x)</b>' : '<b>y</b>',
                              font: { color: isDark ? '#1a1a2e' : '#b71c1c', size: 14 }
                            },
                            gridcolor: isDark ? 'rgba(0, 223, 216, 0.2)' : 'rgba(183, 28, 28, 0.2)',
                            linecolor: isDark ? '#1a1a2e' : '#b71c1c',
                            tickcolor: isDark ? '#1a1a2e' : '#b71c1c',
                            tickfont: { color: isDark ? '#a0aec0' : '#4a5568' },
                            zerolinecolor: isDark ? 'rgba(0, 223, 216, 0.5)' : 'rgba(183, 28, 28, 0.5)'
                          },
                          showlegend: true,
                          legend: {
                            x: 0.02,
                            y: 0.98,
                            bgcolor: isDark ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                            bordercolor: isDark ? '#1a1a2e' : '#b71c1c',
                            borderwidth: 1,
                            font: { 
                              color: isDark ? '#fff' : '#2d3748',
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
                      <div className="mt-3 p-3 rounded" style={{ background: isDark ? 'rgba(26, 26, 46, 0.2)' : 'rgba(183, 28, 28, 0.1)' }}>
                        <h6 className="fw-bold" style={{ color: isDark ? '#1a1a2e' : '#b71c1c' }}>
                          <i className="bi bi-calculator me-2"></i>
                          Área: {area.toFixed(6)} unidades²
                        </h6>
                      </div>
                    )}
                    
                    <div className="mt-3">
                      <h6 className="fw-bold mb-2" style={{ color: isDark ? '#1a1a2e' : '#b71c1c' }}>
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
                ) : (                  <div className="d-flex align-items-center justify-content-center h-100">
                    <div className="text-center animate__animated animate__fadeIn">
                      <div className="mb-4" style={{ 
                        background: isDark ? 'linear-gradient(135deg, #1a1a2e, #667eea)' : 'linear-gradient(135deg, #b71c1c, #667eea)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        <i className="bi bi-graph-up display-1 mb-3 animate__animated animate__pulse animate__infinite" style={{ 
                          fontSize: '6rem',
                          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))'
                        }}></i>
                      </div>
                      <h4 className="mb-3 fw-bold" style={{ 
                        background: isDark ? 'linear-gradient(135deg, #1a1a2e, #667eea)' : 'linear-gradient(135deg, #b71c1c, #667eea)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontSize: '1.8rem',
                        letterSpacing: '1px'
                      }}>
                        ✨ ¡Comienza tu Análisis! ✨
                      </h4>
                      <p style={{ 
                        color: isDark ? '#a0aec0' : '#4a5568',
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        opacity: 0.8
                      }}>
                        🚀 Selecciona un método y presiona "Visualizar"
                      </p>                      <div className="mt-4" style={{
                        padding: '20px',
                        background: isDark ? 'rgba(26, 26, 46, 0.15)' : 'rgba(183, 28, 28, 0.05)',
                        borderRadius: '16px',
                        border: `1px solid ${isDark ? 'rgba(26, 26, 46, 0.3)' : 'rgba(183, 28, 28, 0.2)'}`
                      }}>
                        <p style={{ 
                          color: isDark ? '#e2e8f0' : '#2d3748',
                          margin: 0,
                          fontStyle: 'italic'
                        }}>
                          💡 Explora los métodos numéricos más poderosos
                        </p>
                      </div>
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
