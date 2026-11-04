// =============================================================
//  MÓDULO 01 · Variables, tipos y operadores
//  Comprueba tu trabajo con:  npm run test:01
// =============================================================

// -------------------------------------------------------------
// Ejercicio 1 · Tus primeras variables
// Arregla estas tres constantes para que cada una tenga el tipo correcto:
//   - nombre:        un texto con tu nombre (no puede estar vacío)
//   - edad:          un NÚMERO con tu edad
//   - esEstudiante:  un BOOLEANO (true o false)
// Ojo: ahora mismo alguna tiene trampa.
// -------------------------------------------------------------
export const nombre = 'Gonzalo';
export const edad = 26;
export const esEstudiante = true;

// -------------------------------------------------------------
// Ejercicio 2 · ¿De qué tipo es?
// Devuelve el tipo del valor que recibes, como texto.
//   tipoDe('hola') → 'string'
//   tipoDe(42)     → 'number'
// Pista: typeof
// -------------------------------------------------------------
export function tipoDe(valor) {
  return typeof valor;
}

// -------------------------------------------------------------
// Ejercicio 3 · Preséntate
// Devuelve una frase usando una plantilla (template literal, con comillas invertidas ``).
//   saludar('Ada', 'Londres') → 'Hola, soy Ada y vivo en Londres.'
// -------------------------------------------------------------
export function saludar(nombre, ciudad) {
return `Hola, soy ${nombre} y vivo en ${ciudad}.`
}

// -------------------------------------------------------------
// Ejercicio 4 · Precio con IVA
// Devuelve el precio con un 21 % de IVA, redondeado a 2 decimales.
//   precioConIva(100)   → 121
//   precioConIva(19.99) → 24.19
// Pista: mira cómo redondear a 2 decimales en el README.
// -------------------------------------------------------------
export function precioConIva(precio) {
  return Math.round(precio * 1.21 * 100) / 100;
}

// -------------------------------------------------------------
// Ejercicio 5 · ¿Es par?
// Devuelve true si el número es par y false si es impar.
// Reto: hazlo en una sola línea, sin if.
//   esPar(4) → true
//   esPar(7) → false
// Pista: el operador % (resto).
// -------------------------------------------------------------
export function esPar(numero) {
  return numero % 2 === 0;
}

// -------------------------------------------------------------
// Ejercicio 6 · Minutos y segundos
// Convierte una cantidad de segundos al formato 'X min Y s'.
//   formatearDuracion(125) → '2 min 5 s'
//   formatearDuracion(60)  → '1 min 0 s'
// Pista: Math.floor para los minutos y % para los segundos que sobran.
// -------------------------------------------------------------
export function formatearDuracion(segundos) {
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;
  return `${minutos} min ${resto} s`;
}

// -------------------------------------------------------------
// Ejercicio 7 · Sumar textos (extra)
// Recibes dos números escritos como texto. Devuelve su SUMA (un número).
//   sumarTextos('5', '10') → 15   (¡no '510'!)
// -------------------------------------------------------------
export function sumarTextos(a, b) {
  return Number(a) + Number(b);
}

// -------------------------------------------------------------
// Ejercicio 8 · Limpiar un email (extra)
// Los usuarios escriben su email de cualquier manera. Devuélvelo
// sin espacios a los lados y todo en minúsculas.
//   normalizarEmail('  Ada@Ejemplo.COM ') → 'ada@ejemplo.com'
// -------------------------------------------------------------
export function normalizarEmail(email) {
  return email.trim().toLowerCase();
}

// =============================================================
// Zona de pruebas: escribe aquí tus console.log y ejecuta
//    node modulos/01-variables-y-tipos/ejercicios.js
// =============================================================
// console.log(saludar('Ada', 'Londres'));
