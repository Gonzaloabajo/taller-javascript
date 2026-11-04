// =============================================================
//  MÓDULO 04 · Funciones
//  Comprueba tu trabajo con:  npm run test:04
// =============================================================

// -------------------------------------------------------------
// Ejercicio 1 · Tu primera función flecha
// Sustituye el null por una FUNCIÓN FLECHA que reciba un número
// y devuelva su triple.
//   triple(4) → 12
// -------------------------------------------------------------
export const triple = (numero) => numero * 3;

// -------------------------------------------------------------
// Ejercicio 2 · Valor por defecto
// Devuelve 'Hola, <nombre>'. Si no te pasan nombre, usa 'invitado'.
//   saludo('Ada') → 'Hola, Ada'
//   saludo()      → 'Hola, invitado'
// Pista: puedes cambiar la línea de los parámetros.
// -------------------------------------------------------------
export function saludo(nombre = 'invitado') {
  return `Hola, ${nombre}`;
}

// -------------------------------------------------------------
// Ejercicio 3 · Callbacks
// Recibes una función (fn) y un valor. Devuelve el resultado de
// llamar a fn con ese valor.
//   aplicar((x) => x * 2, 5)               → 10
//   aplicar((t) => t.toUpperCase(), 'hola') → 'HOLA'
// -------------------------------------------------------------
export function aplicar(fn, valor) {
  return fn(valor);
}

// -------------------------------------------------------------
// Ejercicio 4 · Aplicar n veces
// Aplica fn al valor n veces seguidas: fn(fn(fn(valor))) si n es 3.
//   aplicarNVeces((x) => x * 2, 3, 1)       → 8
//   aplicarNVeces((t) => t + '!', 2, 'hola') → 'hola!!'
//   aplicarNVeces((x) => x * 2, 0, 5)       → 5
// -------------------------------------------------------------
export function aplicarNVeces(fn, n, valor) {
  let resultado = valor;

  for (let i = 0; i < n; i++) {
    resultado = fn(resultado);
  }

  return resultado;
}

// -------------------------------------------------------------
// Ejercicio 5 · Fábrica de multiplicadores (extra)
// Devuelve una FUNCIÓN que multiplique por el factor recibido.
//   const doble = crearMultiplicador(2);
//   doble(5) → 10
//   const triple = crearMultiplicador(3);
//   triple(5) → 15
// -------------------------------------------------------------
export function crearMultiplicador(factor) {
  return (numero) => numero * factor;
}

// -------------------------------------------------------------
// Ejercicio 6 · Contador con memoria (closure) (extra)
// Devuelve una función que, cada vez que se llama, devuelve
// el siguiente número: 1, 2, 3…
// Cada contador nuevo empieza otra vez desde 1.
//   const contador = crearContador();
//   contador() → 1
//   contador() → 2
// -------------------------------------------------------------
export function crearContador() {
  let contador = 0;

  return function () {
    contador++;
    return contador;
  };
}

// -------------------------------------------------------------
// Ejercicio 7 · Componer funciones (extra)
// Devuelve una función que reciba x y devuelva f(g(x)).
//   const sumarUnoYDoblar = componer((x) => x * 2, (x) => x + 1);
//   sumarUnoYDoblar(3) → 8   (primero 3 + 1 = 4, después 4 * 2 = 8)
// -------------------------------------------------------------
export function componer(f, g) {
  return (x) => f(g(x));
}

// -------------------------------------------------------------
// Ejercicio 8 · Solo una vez (extra)
// Devuelve una versión de fn que solo se ejecuta la PRIMERA vez.
// Las siguientes llamadas no vuelven a ejecutar fn: devuelven el
// mismo resultado que la primera.
//   const iniciar = unaSolaVez(() => { console.log('¡Arrancando!'); return 'ok'; });
//   iniciar() → muestra '¡Arrancando!' y devuelve 'ok'
//   iniciar() → no muestra nada y devuelve 'ok'
// -------------------------------------------------------------
export function unaSolaVez(fn) {
  let ejecutada = false;
  let resultado;

  return function (...args) {
    if (!ejecutada) {
      resultado = fn.apply(this, args);
      ejecutada = true;
    }

    return resultado;
  };
}

// =============================================================
// Zona de pruebas: node modulos/04-funciones/ejercicios.js
// =============================================================
// const contador = crearContador();
// console.log(contador(), contador(), contador());
