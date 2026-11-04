// =============================================================
//  MÓDULO 07 · DOM y eventos
//  1. npm start
//  2. Abre http://localhost:3000/modulos/07-dom-y-eventos/
//  3. Guarda, recarga (F5) y pulsa "Comprobar"
//  Mira index.html para ver los id de cada elemento.
// =============================================================

// -------------------------------------------------------------
// Ejercicio 1 · Cambiar el título
// Cambia el texto del elemento #titulo por: ¡Hola, DOM!
// -------------------------------------------------------------
document.querySelector('#titulo').textContent = '¡Hola, DOM!';

// -------------------------------------------------------------
// Ejercicio 2 · Destacar un párrafo
// Añade la clase "destacado" al párrafo #intro.
// -------------------------------------------------------------
document.querySelector('#intro').classList.add('destacado');

// -------------------------------------------------------------
// Ejercicio 3 · Pintar una lista
// Crea un <li> por cada fruta del array y mételo en #lista-frutas.
// -------------------------------------------------------------
const frutas = ['Manzana', 'Plátano', 'Uvas', 'Naranja'];
const listaFrutas = document.querySelector('#lista-frutas');

frutas.forEach(fruta => {
  const li = document.createElement('li');
  li.textContent = fruta;
  listaFrutas.appendChild(li);
});

// -------------------------------------------------------------
// Ejercicio 4 · Contador
// - Al hacer clic en #btn-sumar, el número de #contador sube 1.
// - Al hacer clic en #btn-reiniciar, vuelve a 0.
// Pista: guarda la cuenta en una variable con let.
// -------------------------------------------------------------
let cuenta = 0;
const contador = document.querySelector('#contador');

document.querySelector('#btn-sumar').addEventListener('click', () => {
  cuenta++;
  contador.textContent = cuenta;
});

document.querySelector('#btn-reiniciar').addEventListener('click', () => {
  cuenta = 0;
  contador.textContent = cuenta;
});

// -------------------------------------------------------------
// Ejercicio 5 · Saludo en directo
// Mientras el usuario escribe en #input-nombre, #saludo debe mostrar:
//   'Hola, <lo que haya escrito>'
// Si el input está vacío (o solo tiene espacios): 'Hola, desconocido'
// Pista: evento 'input' y .trim()
// -------------------------------------------------------------
const inputNombre = document.querySelector('#input-nombre');
const saludo = document.querySelector('#saludo');

inputNombre.addEventListener('input', () => {
  const nombre = inputNombre.value.trim();
  saludo.textContent = `Hola, ${nombre || 'desconocido'}`;
});

// -------------------------------------------------------------
// Ejercicio 6 · Modo oscuro
// Al hacer clic en #btn-tema, pon o quita la clase "oscuro" del <body>.
// Pista: document.body y classList.toggle
// -------------------------------------------------------------
document.querySelector('#btn-tema').addEventListener('click', () => {
  document.body.classList.toggle('oscuro');
});

// -------------------------------------------------------------
// Ejercicio 7 · Lista de tareas
// Al enviar el formulario #form-tarea:
//   1. Evita que la página se recargue.
//   2. Si el texto de #input-tarea (sin espacios a los lados) NO está vacío,
//      crea un <li> con ese texto y añádelo a #lista-tareas.
//   3. Vacía el input.
// -------------------------------------------------------------
const formulario = document.querySelector('#form-tarea');
const inputTarea = document.querySelector('#input-tarea');
const listaTareas = document.querySelector('#lista-tareas');

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const texto = inputTarea.value.trim();

  if (texto !== '') {
    const li = document.createElement('li');
    li.textContent = texto;
    listaTareas.appendChild(li);
  }

  inputTarea.value = '';
});

// -------------------------------------------------------------
// Ejercicio 8 · Tachar tareas (extra)
// Al hacer clic en cualquier tarea de #lista-tareas, pon o quita la
// clase "completada" en ESE <li>. Tiene que funcionar también con
// las tareas nuevas.
// Pista: delegación de eventos (mira el README).
// -------------------------------------------------------------
listaTareas.addEventListener('click', (evento) => {
  const tarea = evento.target.closest('li');

  if (tarea && listaTareas.contains(tarea)) {
    tarea.classList.toggle('completada');
  }
});
