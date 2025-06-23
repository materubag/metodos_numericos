```markdown name=README.md
# 🚀 Métodos Numéricos - Universidad Técnica de Ambato

<div align="center">

![Logo UTA](public/logo192.png)

**Aplicación Web Interactiva para Métodos Numéricos**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)](https://javascript.info/)
[![CSS3](https://img.shields.io/badge/CSS3-Advanced-1572B6?style=for-the-badge&logo=css3)](https://www.w3.org/Style/CSS/)
[![MathJS](https://img.shields.io/badge/MathJS-Latest-21BDAB?style=for-the-badge&logo=math)](https://mathjs.org/)

</div>

---

## 📋 Tabla de Contenidos

- [🎯 Descripción del Proyecto](#-descripción-del-proyecto)
- [✨ Características Principales](#-características-principales)
- [📊 Métodos Numéricos Implementados](#-métodos-numéricos-implementados)
- [🏗️ Arquitectura del Proyecto](#️-arquitectura-del-proyecto)
- [📁 Estructura de Carpetas](#-estructura-de-carpetas)
- [🎨 Clases CSS y Animaciones](#-clases-css-y-animaciones)
- [🔧 Instalación y Configuración](#-instalación-y-configuración)
- [🚀 Cómo Ejecutar el Proyecto](#-cómo-ejecutar-el-proyecto)
- [💻 Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [🎨 Características de Diseño](#-características-de-diseño)
- [📱 Responsive Design](#-responsive-design)
- [🔄 Changelog](#-changelog)
- [📄 Licencia](#-licencia)

---

## 🎯 Descripción del Proyecto

Esta aplicación web interactiva fue desarrollada para la **Universidad Técnica de Ambato** como una herramienta educativa para el aprendizaje y aplicación de métodos numéricos. La aplicación permite a los estudiantes calcular y visualizar gráficamente la solución de diversos problemas matemáticos utilizando métodos numéricos.

### 🎯 Objetivos

- **Educativo**: Facilitar el aprendizaje de métodos numéricos a través de visualizaciones y explicaciones paso a paso
- **Interactivo**: Proporcionar una experiencia dinámica y visual para entender mejor los conceptos
- **Profesional**: Ofrecer una interfaz moderna con los colores institucionales de la UTA (rojo, negro, gris, blanco)
- **Accesible**: Disponible en modo claro y oscuro para adaptarse a diferentes preferencias y condiciones de visualización

---

## ✨ Características Principales

### 🌟 Interfaz de Usuario
- ✅ **Diseño Moderno**: Interfaz elegante con efectos visuales y transiciones suaves
- ✅ **Modo Claro/Oscuro**: Cambio dinámico de tema con colores optimizados para cada modo
- ✅ **Animaciones**: Efectos de entrada, pulsación y transición
- ✅ **Responsive Design**: Adaptable a todos los dispositivos, desde móviles hasta pantallas grandes
- ✅ **Efectos Interactivos**: Retroalimentación visual en elementos interactivos

### 🧮 Funcionalidades Matemáticas
- ✅ **Cálculos Precisos**: Implementación robusta de algoritmos numéricos
- ✅ **Visualización Gráfica**: Gráficas interactivas con Plotly.js
- ✅ **Procedimientos Detallados**: Explicación paso a paso de cada método
- ✅ **Resultados Tabulados**: Presentación clara de cada iteración en tablas
- ✅ **Validación de Entradas**: Control de valores permitidos y manejo de errores

### 🎨 Experiencia Visual
- ✅ **Paleta Institucional**: Rojo, negro, gris y blanco, representando los colores de la UTA
- ✅ **Transiciones Suaves**: Efectos visuales que mejoran la experiencia sin afectar el rendimiento
- ✅ **Efectos de Foco**: Elementos que reaccionan al pasar el cursor o interactuar con ellos
- ✅ **Retroalimentación Visual**: Indicaciones claras del estado actual del sistema

---

## 📊 Métodos Numéricos Implementados

### 1. 📈 **Método de Simpson 1/3** (Integración Numérica)
- **Fórmula**: 
  ```
  ∫[a,b] f(x) dx ≈ (h/3) [f(x₀) + 4f(x₁) + 2f(x₂) + 4f(x₃) + ... + f(xₙ)]
  ```
- **Uso**: Cálculo de integrales definidas con alta precisión
- **Características**: 
  - Visualización del área bajo la curva
  - Tabla de coeficientes y puntos
  - Resultado numérico preciso

### 2. 📊 **Método de Euler** (Ecuaciones Diferenciales)
- **Fórmula**: 
  ```
  yᵢ₊₁ = yᵢ + h × f(xᵢ, yᵢ)
  ```
- **Uso**: Solución numérica de ecuaciones diferenciales ordinarias de primer orden
- **Características**:
  - Gráfica de la solución aproximada
  - Tabla de iteraciones con pendientes
  - Validación de condiciones iniciales

### 3. 🚀 **Método de Runge-Kutta 2° Orden** (Método de Heun)
- **Fórmulas**:
  ```
  k₁ = f(xᵢ, yᵢ)
  k₂ = f(xᵢ + h, yᵢ + h × k₁)
  yᵢ₊₁ = yᵢ + (h/2) × (k₁ + k₂)
  ```
- **Uso**: Solución mejorada de EDOs con mayor precisión que Euler
- **Características**:
  - Mayor precisión en la aproximación
  - Cálculo de pendientes intermedias
  - Tabla completa de iteraciones con k₁ y k₂

---

## 🏗️ Arquitectura del Proyecto

### 📦 Arquitectura Modular con Componentes React

El proyecto utiliza una arquitectura modular con componentes React claramente separados:

```javascript
// App.js - Componente principal que coordina el flujo de la aplicación
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MethodForm from './components/MethodForm';
import Visualization from './components/Visualization';
import { validateExpression, validateNumber } from './utils/validators';
import { runSimpson, runEuler, runRungeKutta } from './utils/numericalMethods';

export default function App() {
  // Estados centralizados
  const [expr, setExpr] = useState('x^2');
  const [method, setMethod] = useState('');
  
  // Lógica de la aplicación
  
  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <Header theme={theme} onThemeToggle={handleThemeToggle} />
      
      <main className="app-content">
        <MethodForm /* props */ />
        <Visualization /* props */ />
      </main>
      
      <Footer isDark={isDark} />
    </div>
  );
}
```

### 🧩 **Ventajas de la Arquitectura Modular**

- **Mantenibilidad**: Cada componente tiene una responsabilidad única y clara
- **Reusabilidad**: Componentes independientes que pueden reutilizarse
- **Testabilidad**: Facilita la escritura de pruebas unitarias
- **Escalabilidad**: Fácil agregar nuevos métodos o características
- **Optimización**: Componentes memoizados para evitar re-renderizados innecesarios
- **Separación de Responsabilidades**: Componentes UI separados de la lógica de negocio

---

## 📁 Estructura de Carpetas

```
metodos_numericos/
├── 📁 public/                    # Archivos públicos estáticos
│   ├── 🖼️ favicon.ico           # Icono de la aplicación
│   ├── 📄 index.html            # Template HTML principal
│   ├── 🖼️ logo192.png          # Logo UTA 192x192
│   └── 📄 manifest.json         # Configuración PWA
│
├── 📁 src/                       # Código fuente principal
│   ├── 📁 components/            # Componentes React
│   │   ├── 📄 ProcedureTable.js # Tabla de resultados
│   │   ├── 📄 MethodForm.js     # Formulario de configuración
│   │   ├── 📄 Visualization.js  # Visualización de resultados
│   │   ├── 📄 Header.js         # Cabecera de la aplicación
│   │   └── 📄 Footer.js         # Pie de página
│   │
│   ├── 📁 utils/                 # Utilidades y funciones
│   │   ├── 📄 validators.js     # Validación de entradas
│   │   └── 📄 numericalMethods.js # Implementación de métodos
│   │
│   ├── ⚛️ App.js                # Componente principal
│   ├── 🎨 App.css               # Estilos de la aplicación
│   ├── 🎨 index.css             # Estilos globales
│   └── ⚛️ index.js              # Punto de entrada
│
├── 📄 package.json              # Configuración del proyecto
├── 📄 README.md                 # Documentación (este archivo)
└── 📄 .gitignore                # Archivos ignorados por Git
```

### 🔄 **Mejoras en la Estructura**

La nueva estructura de carpetas ofrece varias ventajas:

- **Organización Clara**: Separación de componentes, utilidades y configuración
- **Encapsulamiento**: Cada componente tiene su propio archivo
- **Mantenimiento Simplificado**: Facilita encontrar y modificar código específico
- **Modularidad**: Componentes independientes con responsabilidades específicas
- **Colaboración**: Múltiples desarrolladores pueden trabajar en diferentes archivos

---

## 🎨 Clases CSS y Animaciones

### 📊 **Estadísticas Actualizadas**
```
📋 Total de Clases CSS: ~40
🎬 Total de Animaciones: 5
📏 Líneas de CSS: ~700
📏 Líneas de JavaScript: ~1000
```

### 🎭 **Categorías Principales de CSS**

#### 🏗️ **Layout y Estructura**
```css
.app                 /* Contenedor principal */
.app-header          /* Cabecera */
.app-content         /* Contenido principal */
.app-footer          /* Pie de página */
.panel-left          /* Panel de configuración */
.panel-right         /* Panel de visualización */
```

#### 🎨 **Temas y Modos**
```css
.light               /* Estilo para modo claro */
.dark                /* Estilo para modo oscuro */
.theme-toggle        /* Botón de cambio de tema */
```

#### 📝 **Formularios e Inputs**
```css
.method-form         /* Contenedor de formulario */
.form-group          /* Grupo de formulario */
.form-control        /* Inputs de formulario */
.form-row            /* Fila de formulario */
.calculate-btn       /* Botón principal */
```

#### 📊 **Visualización y Resultados**
```css
.visualization       /* Contenedor de visualización */
.plot-container      /* Contenedor de gráfica */
.area-result         /* Resultado de área (Simpson) */
.result-info         /* Información de resultado */
.procedure           /* Contenedor de procedimiento */
.procedure-formula   /* Fórmula matemática */
.procedure-table     /* Tabla de resultados */
```

### 🎬 **Animaciones Principales**

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

#### Clases con Animaciones
```css
.fade-in-animation   /* Animación de aparición suave */
.pulse-animation     /* Pulsación del logo */
.animate-title       /* Animación de títulos */
```

---

## 🔧 Instalación y Configuración

### ⚙️ **Requisitos Previos**

```bash
# Node.js (versión 14 o superior)
node --version  # v14.0.0+

# npm (incluido con Node.js)
npm --version   # v6.0.0+
```

### 📥 **Instalación**

```bash
# Clonar el proyecto
git clone https://github.com/materubag/metodos_numericos.git

# Navegar al directorio
cd metodos_numericos

# Instalar dependencias
npm install
```

### 🚨 **Notas Importantes**

- La aplicación ahora soporta valores de 0 y negativos en los límites.
- El rango válido para los valores numéricos es de -1000000 a 1000000.
- Se han implementado validaciones para evitar errores al cambiar entre métodos.
- El método Simpson no permite el uso de la variable 'y' en la función.
- Los componentes están memoizados para mantener el foco durante la entrada de datos.

---

## 🚀 Cómo Ejecutar el Proyecto

### 🟢 **Modo Desarrollo**

```bash
# Ejecutar servidor de desarrollo
npm start

# El navegador se abrirá automáticamente en:
# http://localhost:3000
```

### 📦 **Build para Producción**

```bash
# Generar build optimizado
npm run build

# Los archivos se generarán en la carpeta /build
```

### 🔍 **Funcionalidades Principales**

1. **Selección de Método**:
   - Simpson 1/3 (Integración Numérica)
   - Euler (EDO)
   - Runge-Kutta 2° orden (EDO)

2. **Configuración**:
   - Ingresar función f(x) o f(x,y) según el método
   - Definir límites de integración o intervalo
   - Establecer paso (Δx o h)
   - Para EDOs: establecer condición inicial y₀

3. **Visualización**:
   - Gráfica interactiva
   - Resultados numéricos
   - Procedimiento paso a paso
   - Tabla de valores

4. **Cambio de Tema**:
   - Alternar entre modo claro y oscuro

---

## 💻 Tecnologías Utilizadas

### 🎯 **Core**
```json
{
  "react": "^18.2.0",           // Framework principal
  "react-dom": "^18.2.0",       // DOM rendering
  "react-scripts": "5.0.1"      // Build tools
}
```

### 📊 **Visualización de Datos**
```json
{
  "plotly.js": "^2.27.0",       // Motor de gráficas
  "react-plotly.js": "^2.6.0",   // Wrapper React
}
```

### 🧮 **Matemáticas**
```json
{
  "mathjs": "^12.2.1"           // Parser matemático y cálculos
}
```

### 🔧 **Optimización**
```json
{
  "react-icons": "^4.10.1"      // Iconos para la interfaz
}
```

---

## 🎨 Características de Diseño

### 🎭 **Sistema de Temas**

#### 🌞 **Modo Claro**
- **Fondo**: Blanco y gris claro
- **Acentos**: Rojo UTA (#b71c1c, #d32f2f, #c62828)
- **Texto**: Negro y gris oscuro
- **Elementos UI**: Blanco con bordes sutiles

#### 🌙 **Modo Oscuro**
- **Fondo**: Negro y gris oscuro
- **Acentos**: Rojo claro (#ef5350, #e57373)
- **Texto**: Blanco y gris claro
- **Elementos UI**: Gris oscuro con bordes sutiles

### 🎨 **Paleta de Colores UTA**
```css
:root {
  --uta-rojo-principal: #b71c1c; /* Rojo institucional */
  --uta-rojo-claro: #ef5350;     /* Rojo claro */
  --uta-rojo-oscuro: #7f0000;    /* Rojo oscuro */
  --uta-negro: #1a1a1a;          /* Negro profundo */
  --uta-gris: #444444;           /* Gris medio */
  --uta-blanco: #ffffff;         /* Blanco puro */
}
```

### ✨ **Efectos Visuales Optimizados**
- **Transiciones Suaves**: Todas las transiciones utilizan curvas de aceleración naturales
- **Efectos de Hover**: Retroalimentación visual en botones e inputs
- **Animaciones de Entrada**: Aparición suave de elementos
- **Efectos de Sombra**: Profundidad sutil para tarjetas y botones

---

## 📱 Responsive Design

### 📐 **Breakpoints**
```css
/* Escritorio */
@media (min-width: 769px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Móvil */
@media (max-width: 576px) { }
```

### 📱 **Adaptaciones Específicas**
- **Móvil**: Layout de una columna, controles más grandes para entrada táctil
- **Tablet**: Layout flexible, optimizado para orientación vertical y horizontal
- **Escritorio**: Layout de dos columnas, aprovechamiento del espacio horizontal

---

## 🔄 Changelog

### v1.3.0 (2025-06-23)
- ✅ Reestructuración completa en componentes modulares
- ✅ Implementación de memoización para mejor rendimiento
- ✅ Corrección del problema de pérdida de foco en inputs
- ✅ Separación de lógica de negocio y componentes UI
- ✅ Mejora en validación de datos
- ✅ Optimización de renderizado
- ✅ Implementación de arquitectura basada en hooks

### v1.2.0 (2025-06-21)
- ✅ Rediseño con colores institucionales UTA (rojo, negro, gris, blanco)
- ✅ Corrección de errores al cambiar entre métodos
- ✅ Soporte para valores negativos y cero en límites
- ✅ Validación mejorada para entradas numéricas
- ✅ Animaciones optimizadas para mejor rendimiento
- ✅ Mejoras en la accesibilidad y contraste

### v1.0.0 (2025-6-19)
- ✅ Implementación del método de Runge-Kutta 2° Orden
- ✅ Mejoras en la visualización de gráficas
- ✅ Procedimiento paso a paso más detallado
- ✅ Corrección de errores menores

### v8.8.0 (2025-06-17)
- ✅ Lanzamiento inicial
- ✅ Implementación de Método de Simpson 1/3
- ✅ Implementación de Método de Euler
- ✅ Sistema de temas claro/oscuro
- ✅ Visualización de gráficas básica

---

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**.

```
MIT License

Copyright (c) 2025 Universidad Técnica de Ambato

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

**🚀 ¡Desarrollado con ❤️ para la Universidad Técnica de Ambato! 🚀**

---

![Footer](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react)
![Footer](https://img.shields.io/badge/Styled%20with-CSS3-1572B6?style=for-the-badge&logo=css3)
![Footer](https://img.shields.io/badge/Universidad-Técnica%20de%20Ambato-B71C1C?style=for-the-badge)

</div>

---

**Última actualización**: 2025-06-23 23:21:12 | **Usuario**: materubag
```

El README ha sido actualizado para reflejar la nueva estructura modular de componentes y las mejoras implementadas en la aplicación. Los cambios principales incluyen:

1. **Arquitectura del proyecto**: Ahora describe la arquitectura modular con componentes separados en lugar del enfoque monolítico anterior.

2. **Estructura de carpetas**: Se actualizó para mostrar la nueva organización con carpetas `/components` y `/utils`.

3. **Características**: Se agregó información sobre la memoización y la corrección del problema de pérdida de foco.

4. **Changelog**: Se añadió la versión 1.3.0 con las mejoras recientes de la estructura modular.

5. **Tecnologías**: Se añadió react-icons como una dependencia opcional para mejorar la interfaz.

6. **Fecha de actualización**: Se actualizó a la fecha y hora proporcionadas: 2025-06-23 23:21:12.

Esta documentación ahora refleja con precisión el estado actual del proyecto y proporciona una guía clara para cualquier desarrollador que quiera entender o contribuir al código.