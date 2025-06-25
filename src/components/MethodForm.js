import React, { memo } from 'react';

const MethodForm = memo(({ 
  method, 
  expr, 
  a, 
  b, 
  h, 
  delta, 
  y0, 
  isDark,
  onMethodChange,
  onExprChange,
  onAChange,
  onBChange,
  onHChange,
  onDeltaChange,
  onY0Change,
  onCalculate
}) => (
  <div className={`method-form ${isDark ? 'dark' : 'light'}`}>
    <h2 className="animate-title">Configuración</h2>
    
    <div className="form-group">
      <label htmlFor="method">Método numérico</label>
      <select 
        id="method"
        value={method} 
        onChange={e => onMethodChange(e.target.value)}
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
            onChange={e => onExprChange(e.target.value)}
            className="form-control"
            placeholder={method === 'simpson' ? 'Ej: x^2' : 'Ej: x+y'}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="a">Límite inferior (a)</label>
            <input
              id="a"
              type="text"
              value={a}
              onChange={e => onAChange(e.target.value)}
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="b">Límite superior (b)</label>
            <input
              id="b"
              type="text"
              value={b}
              onChange={e => onBChange(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        
        {method === 'simpson' && (
          <div className="form-group">
            <label htmlFor="delta">Paso (Δx)</label>
            <input
              id="delta"
              type="text"
              value={delta}
              onChange={e => onDeltaChange(e.target.value)}
              className="form-control"
            />
          </div>
        )}
        
        {(method === 'euler' || method === 'rk2') && (
          <>
            <div className="form-group">
              <label htmlFor="y0">Valor inicial (y₀)</label>
              <input
                id="y0"
                type="text"
                value={y0}
                onChange={e => onY0Change(e.target.value)}
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="h">Paso (h)</label>
              <input
                id="h"
                type="text"
                value={h}
                onChange={e => onHChange(e.target.value)}
                className="form-control"
              />
            </div>
          </>
        )}
        
        <button 
          className="calculate-btn" 
          onClick={onCalculate}
        >
          <span>Calcular y Visualizar</span>
        </button>
      </>
    )}
  </div>
));

export default MethodForm;