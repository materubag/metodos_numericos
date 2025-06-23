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

### 📦 Enfoque Monolítico Optimizado
El proyecto utiliza un enfoque monolítico optimizado con React, manteniendo toda la lógica en componentes centralizados pero organizados por funcionalidad:

```javascript
// Organización del código
import React, { useState, useEffect, memo } from 'react';
import Plot from 'react-plotly.js';
import { parse } from 'mathjs';
import './App.css';

// Componentes Memoizados para optimizar rendimiento
const ProcedureTable = memo(({ data, method, isDark }) => {
  // Tabla de procedimientos según el método
});

// Componente principal
export default function App() {
  // Estados centralizados
  const [expr, setExpr] = useState('x^2');
  const [method, setMethod] = useState('');
  const [plotData, setPlotData] = useState(null);
  const [theme, setTheme] = useState('light');
  
  // Componentes Internos (funciones de renderizado)
  const MethodForm = () => (
    // Formulario de configuración
  );
  
  const Visualization = () => (
    // Visualización de resultados
  );
  
  // Funciones para cálculos numéricos
  const runSimpson = (aNum, bNum, deltaNum) => {
    // Implementación del método de Simpson
  };
  
  const runEuler = (aNum, bNum, hNum, y0Num) => {
    // Implementación del método de Euler
  };
  
  const runRungeKutta = (aNum, bNum, hNum, y0Num) => {
    // Implementación del método de Runge-Kutta
  };
  
  // Renderizado principal con estructura clara
  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <header className="app-header">
        {/* Header con logo y toggle de tema */}
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
        {/* Footer con información */}
      </footer>
    </div>
  );
}
```

### 🧩 **Ventajas del Enfoque Actual**

- **Simplicidad**: Fácil de entender y mantener
- **Rendimiento**: Memoización en componentes críticos
- **Encapsulamiento**: Toda la lógica relacionada está junta
- **Organización Funcional**: Separación clara por responsabilidades
- **Optimización**: Uso estratégico de hooks de React

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
│   ├── ⚛️ App.js                # Componente principal con toda la lógica
│   ├── 🎨 App.css               # Estilos completos de la aplicación
│   ├── 🎨 index.css             # Estilos globales mínimos
│   └── ⚛️ index.js              # Punto de entrada React
│
├── 📄 package.json              # Configuración del proyecto
├── 📄 README.md                 # Documentación (este archivo)
└── 📄 .gitignore               # Archivos ignorados por Git
```

### 🔄 **Enfoque Simplificado**

A diferencia de estructuras más complejas con múltiples componentes separados, el enfoque actual mantiene todo el código en pocos archivos principales, facilitando:

- **Mantenimiento**: Todo en un solo lugar para proyectos pequeños/medianos
- **Consistencia**: Estilo y comportamiento uniforme en toda la aplicación
- **Rendimiento**: Menos overhead de importaciones y módulos
- **Desarrollo**: Ciclo de edición-prueba más rápido

---

## 🎨 Clases CSS y Animaciones

### 📊 **Estadísticas Actualizadas**
```
📋 Total de Clases CSS: ~40
🎬 Total de Animaciones: 5
📏 Líneas de CSS: ~700
📏 Líneas de JavaScript: ~800
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
  "react-plotly.js": "^2.6.0"   // Wrapper React
}
```

### 🧮 **Matemáticas**
```json
{
  "mathjs": "^12.2.1"           // Parser matemático y cálculos
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

### v1.2.0 (2025-06-23)
- ✅ Rediseño con colores institucionales UTA (rojo, negro, gris, blanco)
- ✅ Corrección de errores al cambiar entre métodos
- ✅ Soporte para valores negativos y cero en límites
- ✅ Validación mejorada para entradas numéricas
- ✅ Animaciones optimizadas para mejor rendimiento
- ✅ Mejoras en la accesibilidad y contraste
- ✅ Adaptaciones responsive mejoradas
- ✅ Tablas de procedimiento completas para cada método

### v1.1.0 (2025-05-10)
- ✅ Implementación del método de Runge-Kutta 2° Orden
- ✅ Mejoras en la visualización de gráficas
- ✅ Procedimiento paso a paso más detallado
- ✅ Corrección de errores menores

### v1.0.0 (2025-04-15)
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

**Última actualización**: 2025-06-23 16:59:34 | **Usuario**: materubag