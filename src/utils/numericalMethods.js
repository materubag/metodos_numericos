import { parse } from 'mathjs';

export const runSimpson = (expr, aNum, bNum, deltaNum, setPlotData, setArea, setProcedureData, setError) => {
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

export const runEuler = (expr, aNum, bNum, hNum, y0Num, setPlotData, setProcedureData, setError) => {
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

export const runRungeKutta = (expr, aNum, bNum, hNum, y0Num, setPlotData, setProcedureData, setError) => {
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