import { parse } from 'mathjs';

export const validateExpression = (expression, methodType, setError) => {
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

export const validateNumber = (value, name, setError) => {
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