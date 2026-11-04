// =============================================================
//  MÓDULO 03 · Bucles
//  Comprueba tu trabajo con:  npm run test:03
//  Si un test se queda colgado, probablemente tienes un bucle infinito.
// =============================================================

// -------------------------------------------------------------
// Ejercicio 1 · Sumar hasta n
// Devuelve la suma de todos los números desde 1 hasta n.
//   sumarHasta(5) → 15   (1 + 2 + 3 + 4 + 5)
//   sumarHasta(0) → 0
// -------------------------------------------------------------
export function sumarHasta(n) {
  let suma = 0;

  for (let i = 1; i <= n; i++) {
    suma += i;
  }

  return suma;
}

// -------------------------------------------------------------
// Ejercicio 2 · Factorial
// El factorial de n es n × (n-1) × … × 1. El factorial de 0 es 1.
//   factorial(5) → 120
// Pista: como el acumulador de la suma, pero… ¿en qué valor debe empezar?
// -------------------------------------------------------------
export function factorial(n) {
  let resultado = 1;

  for (let i = 1; i <= n; i++) {
    resultado *= i;
  }

  return resultado;
}

// -------------------------------------------------------------
// Ejercicio 3 · Contar vocales
// Devuelve cuántas vocales (a, e, i, o, u, mayúsculas o minúsculas) tiene el texto.
// No hace falta que tengas en cuenta las tildes.
//   contarVocales('JavaScript') → 3
// Pista: for...of y 'aeiou'.includes(...)
// -------------------------------------------------------------
export function contarVocales(texto) {
  let contador = 0;

  for (const letra of texto.toLowerCase()) {
    if ('aeiou'.includes(letra)) {
      contador++;
    }
  }

  return contador;
}

// -------------------------------------------------------------
// Ejercicio 4 · Darle la vuelta a un texto
// Devuelve el texto al revés usando un bucle.
//   invertirTexto('hola') → 'aloh'
// -------------------------------------------------------------
export function invertirTexto(texto) {
   let resultado = '';

  for (let i = texto.length - 1; i >= 0; i--) {
    resultado += texto[i];
  }

  return resultado;
}

// -------------------------------------------------------------
// Ejercicio 5 · ¿Es primo? (extra)
// Un número primo es mayor que 1 y solo es divisible entre 1 y entre sí mismo.
//   esPrimo(7) → true
//   esPrimo(8) → false
//   esPrimo(1) → false
// Pista: prueba a dividir entre todos los números desde 2 hasta n - 1.
//        En cuanto uno divida exacto, ya sabes la respuesta.
// -------------------------------------------------------------
export function esPrimo(n) {
  if (n <= 1) {
    return false;
  }

  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

// -------------------------------------------------------------
// Ejercicio 6 · Contar dígitos (extra)
// Devuelve cuántas cifras tiene un número entero positivo. Usa while.
//   contarDigitos(12345) → 5
//   contarDigitos(0)     → 1
// Pista: Math.floor(n / 10) le quita la última cifra a n.
// -------------------------------------------------------------
export function contarDigitos(n) {
  let contador = 1;

  while (n >= 10) {
    n = Math.floor(n / 10);
    contador++;
  }

  return contador;
}

// -------------------------------------------------------------
// Ejercicio 7 · Cuenta atrás (extra)
//   cuentaAtras(3) → '3, 2, 1, ¡despegue!'
//   cuentaAtras(0) → '¡despegue!'
// -------------------------------------------------------------
export function cuentaAtras(n) {
  let resultado = '';

  for (let i = n; i > 0; i--) {
    resultado += `${i}, `;
  }

  return resultado + '¡despegue!';
}

// -------------------------------------------------------------
// Ejercicio 8 · Escalera (extra)
// Dibuja una escalera de n peldaños con el carácter #.
// Cada peldaño va en una línea (separadas con '\n').
//   dibujarEscalera(3) → '#\n##\n###'
// Prueba con console.log(dibujarEscalera(5)) para verla.
// Reto: hazlo con dos bucles, uno dentro de otro.
// -------------------------------------------------------------
export function dibujarEscalera(n) {
  let resultado = '';

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      resultado += '#';
    }

    if (i < n) {
      resultado += '\n';
    }
  }

  return resultado;
}

// =============================================================
// Zona de pruebas: node modulos/03-bucles/ejercicios.js
// =============================================================
// console.log(dibujarEscalera(5));
