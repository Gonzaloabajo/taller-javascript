// =============================================================
//  MÓDULO 06 · Objetos y JSON
//  Comprueba tu trabajo con:  npm run test:06
// =============================================================

// Datos de ejemplo para que pruebes con console.log (los tests usan otros parecidos)
export const proyectosDeEjemplo = [
  { id: 1, titulo: 'Calculadora', tecnologias: ['HTML', 'CSS', 'JavaScript'], destacado: true },
  { id: 2, titulo: 'Blog personal', tecnologias: ['HTML', 'CSS'], destacado: false },
  { id: 3, titulo: 'Lista de tareas', tecnologias: ['JavaScript', 'HTML'], destacado: true },
];

// -------------------------------------------------------------
// Ejercicio 1 · Crear un objeto
// Devuelve un objeto con las propiedades nombre y edad.
//   crearPersona('Ada', 36) → { nombre: 'Ada', edad: 36 }
// -------------------------------------------------------------
export function crearPersona(nombre, edad) {
  return { nombre, edad };
}

// -------------------------------------------------------------
// Ejercicio 2 · Presentarse
// Recibes un objeto persona. Devuelve la frase:
//   presentar({ nombre: 'Ada', edad: 36 }) → 'Me llamo Ada y tengo 36 años.'
// Reto: usa desestructuración.
// -------------------------------------------------------------
export function presentar(persona) {
  const { nombre, edad } = persona;
  return `Me llamo ${nombre} y tengo ${edad} años.`;
}

// -------------------------------------------------------------
// Ejercicio 3 · Contar propiedades
// Devuelve cuántas propiedades tiene el objeto.
//   contarPropiedades({ a: 1, b: 2, c: 3 }) → 3
// -------------------------------------------------------------
export function contarPropiedades(objeto) {
  return Object.keys(objeto).length;
}

// -------------------------------------------------------------
// Ejercicio 4 · Solo los títulos
// Recibes un array de proyectos. Devuelve un array con sus títulos.
//   titulos(proyectosDeEjemplo) → ['Calculadora', 'Blog personal', 'Lista de tareas']
// -------------------------------------------------------------
export function titulos(proyectos) {
  return proyectos.map(proyecto => proyecto.titulo);
}

// -------------------------------------------------------------
// Ejercicio 5 · Filtrar por tecnología
// Devuelve los proyectos que usan la tecnología indicada.
//   filtrarPorTecnologia(proyectosDeEjemplo, 'CSS') → [ {Calculadora…}, {Blog personal…} ]
// -------------------------------------------------------------
export function filtrarPorTecnologia(proyectos, tecnologia) {
  return proyectos.filter(proyecto =>
    proyecto.tecnologias.includes(tecnologia)
  );
}

// -------------------------------------------------------------
// Ejercicio 6 · Buscar por id
// Devuelve el proyecto con ese id, o null si no existe.
//   buscarPorId(proyectosDeEjemplo, 2)  → { id: 2, titulo: 'Blog personal', … }
//   buscarPorId(proyectosDeEjemplo, 99) → null
// Pista: find devuelve undefined si no encuentra nada… y tú tienes que devolver null.
// -------------------------------------------------------------
export function buscarPorId(proyectos, id) {
  return proyectos.find(proyecto => proyecto.id === id) ?? null;
}

// -------------------------------------------------------------
// Ejercicio 7 · Todas las tecnologías
// Devuelve la lista de tecnologías usadas en los proyectos,
// sin repetir y ordenadas alfabéticamente.
//   tecnologiasUnicas(proyectosDeEjemplo) → ['CSS', 'HTML', 'JavaScript']
// Pista: flatMap + new Set + sort
// -------------------------------------------------------------
export function tecnologiasUnicas(proyectos) {
  return [...new Set(proyectos.flatMap(proyecto => proyecto.tecnologias))].sort();
}

// -------------------------------------------------------------
// Ejercicio 8 · Cumplir años (extra)
// Devuelve un objeto NUEVO igual que la persona, pero con un año más.
// ¡No modifiques el objeto original!
//   cumplirAnios({ nombre: 'Ada', edad: 36 }) → { nombre: 'Ada', edad: 37 }
// Pista: spread { ...persona }
// -------------------------------------------------------------
export function cumplirAnios(persona) {
  return { ...persona, edad: persona.edad + 1 };
}

// -------------------------------------------------------------
// Ejercicio 9 · ¿Cuántas veces se usa cada tecnología? (extra)
// Devuelve un objeto con cada tecnología y el número de proyectos que la usan.
//   contarPorTecnologia(proyectosDeEjemplo) → { HTML: 3, CSS: 2, JavaScript: 2 }
// Pista: empieza con un objeto vacío {} y ve sumando. objeto[clave] te será útil.
// -------------------------------------------------------------
export function contarPorTecnologia(proyectos) {
  const contador = {};

  for (const proyecto of proyectos) {
    for (const tecnologia of proyecto.tecnologias) {
      contador[tecnologia] = (contador[tecnologia] || 0) + 1;
    }
  }

  return contador;
}
// -------------------------------------------------------------
// Ejercicio 10 · Clonar con JSON (extra)
// Devuelve una copia PROFUNDA del objeto: si después cambias algo
// de la copia (aunque esté anidado), el original no se entera.
// Pista: convierte a texto JSON y vuelve a convertirlo en objeto.
// -------------------------------------------------------------
export function clonarConJSON(objeto) {
  return JSON.parse(JSON.stringify(objeto));
}

// =============================================================
// Zona de pruebas: node modulos/06-objetos/ejercicios.js
// =============================================================
// console.log(titulos(proyectosDeEjemplo));
