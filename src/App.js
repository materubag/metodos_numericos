import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';

// Componentes
import Header from './components/Header';
import Footer from './components/Footer';
import MethodForm from './components/MethodForm';
import Visualization from './components/Visualization';

// Utilidades
import { validateExpression, validateNumber } from './utils/validators';
import { runSimpson, runEuler, runRungeKutta } from './utils/numericalMethods';

export default function App() {
  // Estados para valores de entrada (como texto para evitar problemas de focus)
  const [expr, setExpr] = useState('x^2');
  const [aInput, setAInput] = useState('0');
  const [bInput, setBInput] = useState('2');
  const [hInput, setHInput] = useState('0.1');
  const [deltaInput, setDeltaInput] = useState('0.1');
  const [y0Input, setY0Input] = useState('1');
  const [method, setMethod] = useState('');
  const [theme, setTheme] = useState('light');
  
  // Estados para cálculos y visualización
  const [plotData, setPlotData] = useState(null);
  const [area, setArea] = useState(null);
  const [error, setError] = useState('');
  const [procedureData, setProcedureData] = useState(null);

  const isDark = theme === 'dark';
  
  // Convierte inputs a números solo cuando es necesario para cálculos
  const a = useMemo(() => parseFloat(aInput) || 0, [aInput]);
  const b = useMemo(() => parseFloat(bInput) || 0, [bInput]);
  const h = useMemo(() => parseFloat(hInput) || 0.1, [hInput]);
  const delta = useMemo(() => parseFloat(deltaInput) || 0.1, [deltaInput]);
  const y0 = useMemo(() => parseFloat(y0Input) || 0, [y0Input]);

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

  // Función principal para cálculos
  const handleRun = useCallback(() => {
    setError('');
    
    // Validación básica
    if (!method) {
      setError("Seleccione un método");
      return;
    }
    
    if (!validateExpression(expr, method, setError)) return;
    
    if (!validateNumber(a, "Límite inferior (a)", setError)) return;
    if (!validateNumber(b, "Límite superior (b)", setError)) return;
    if (a >= b) {
      setError("El límite inferior debe ser menor que el superior");
      return;
    }
    
    if (method === 'simpson') {
      if (!validateNumber(delta, "Paso (Δx)", setError)) return;
      runSimpson(expr, a, b, delta, setPlotData, setArea, setProcedureData, setError);
    } else {
      if (!validateNumber(h, "Paso (h)", setError)) return;
      if (!validateNumber(y0, "Valor inicial (y₀)", setError)) return;
      
      if (method === 'euler') {
        runEuler(expr, a, b, h, y0, setPlotData, setProcedureData, setError);
      } else if (method === 'rk2') {
        runRungeKutta(expr, a, b, h, y0, setPlotData, setProcedureData, setError);
      }
    }
  }, [method, expr, a, b, h, delta, y0]);

  // Manejadores de eventos memoizados
  const handleMethodChange = useCallback(value => setMethod(value), []);
  const handleExprChange = useCallback(value => setExpr(value), []);
  const handleAChange = useCallback(value => setAInput(value), []);
  const handleBChange = useCallback(value => setBInput(value), []);
  const handleHChange = useCallback(value => setHInput(value), []);
  const handleDeltaChange = useCallback(value => setDeltaInput(value), []);
  const handleY0Change = useCallback(value => setY0Input(value), []);
  const handleThemeToggle = useCallback(() => setTheme(t => t === 'light' ? 'dark' : 'light'), []);

  // Renderizado principal
  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <Header 
        theme={theme} 
        onThemeToggle={handleThemeToggle} 
      />
      
      <main className="app-content">
        <div className="panel-left fade-in-animation">
          <MethodForm 
            method={method}
            expr={expr}
            a={aInput}
            b={bInput}
            h={hInput}
            delta={deltaInput}
            y0={y0Input}
            isDark={isDark}
            onMethodChange={handleMethodChange}
            onExprChange={handleExprChange}
            onAChange={handleAChange}
            onBChange={handleBChange}
            onHChange={handleHChange}
            onDeltaChange={handleDeltaChange}
            onY0Change={handleY0Change}
            onCalculate={handleRun}
          />
        </div>
        
        <div className="panel-right fade-in-animation">
          <Visualization 
            method={method}
            plotData={plotData}
            area={area}
            procedureData={procedureData}
            error={error}
            isDark={isDark}
            a={a}
            b={b}
          />
        </div>
      </main>
      
      <Footer isDark={isDark} />
    </div>
  );
}