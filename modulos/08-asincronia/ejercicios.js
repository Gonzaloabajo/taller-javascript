// =============================================================
//  MÓDULO 08 · Asincronía
//  Comprueba tu trabajo con:  npm run test:08
// =============================================================
import { obtenerUsuario, obtenerPosts } from './api-falsa.js';

// Usuarios disponibles en la API falsa:
//   1 → 'Ada Lovelace' (2 posts) · 2 → 'Alan Turing' (1 post) · 3 → 'Grace Hopper' (3 posts)
// Cualquier otro id → la promesa se rechaza con un Error.

// -------------------------------------------------------------
// Ejercicio 1 · Nombre de usuario
// Usa obtenerUsuario(id) y devuelve SOLO el nombre.
//   await nombreDeUsuario(1) → 'Ada Lovelace'
// Pista: la función ya es async. Te falta un await.
// -------------------------------------------------------------
export async function nombreDeUsuario(id) {
  const usuario = await obtenerUsuario(id);
  return usuario.nombre;
}
// -------------------------------------------------------------
// Ejercicio 2 · Si falla, 'Anónimo'
// Igual que el anterior, pero si el usuario no existe devuelve 'Anónimo'.
//   await nombreOAnonimo(2)  → 'Alan Turing'
//   await nombreOAnonimo(99) → 'Anónimo'
// Pista: try / catch
// -------------------------------------------------------------
export async function nombreOAnonimo(id) {
  try {
    const usuario = await obtenerUsuario(id);
    return usuario.nombre;
  } catch (error) {
    return 'Anónimo';
  }
}

// -------------------------------------------------------------
// Ejercicio 3 · Contar posts
// Devuelve cuántos posts ha escrito un usuario.
//   await contarPosts(3) → 3
// -------------------------------------------------------------
export async function contarPosts(usuarioId) {
  const posts = await obtenerPosts(usuarioId);
  return posts.length;
}

// -------------------------------------------------------------
// Ejercicio 4 · Esperar (extra)
// Devuelve una PROMESA que se resuelva pasados `ms` milisegundos.
//   await esperar(1000);  // espera un segundo
// Pista: new Promise((resolve) => setTimeout(…))
// -------------------------------------------------------------
export function esperar(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

// -------------------------------------------------------------
// Ejercicio 5 · Todos a la vez (extra)
// Recibes un array de ids. Devuelve un array con sus nombres.
// Tiene que hacer las peticiones EN PARALELO (el test mide cuánto tarda).
//   await nombresEnParalelo([1, 3]) → ['Ada Lovelace', 'Grace Hopper']
// Pista: Promise.all + map
// -------------------------------------------------------------
export async function nombresEnParalelo(ids) {
  const nombres = await Promise.all(
    ids.map(async id => {
      const usuario = await obtenerUsuario(id);
      return usuario.nombre;
    })
  );

  return nombres;
}

// -------------------------------------------------------------
// Ejercicio 6 · Ficha de usuario (extra)
// Devuelve un objeto con el nombre del usuario y su número de posts.
//   await resumenUsuario(1) → { nombre: 'Ada Lovelace', totalPosts: 2 }
// Reto: lanza las dos peticiones en paralelo.
// -------------------------------------------------------------
export async function resumenUsuario(id) {
  const [usuario, posts] = await Promise.all([
    obtenerUsuario(id),
    obtenerPosts(id)
  ]);

  return {
    nombre: usuario.nombre,
    totalPosts: posts.length
  };
}

// -------------------------------------------------------------
// Ejercicio 7 · A la antigua: .then() (extra)
// Devuelve (una promesa con) el título del PRIMER post del usuario.
// Esta vez SIN async/await: usa .then()
//   await primerTitulo(2) → '¿Pueden pensar las máquinas?'
// Ojo: para que el test reciba el valor, tienes que hacer return de la cadena de .then()
// -------------------------------------------------------------
export function primerTitulo(usuarioId) {
  return obtenerPosts(usuarioId).then(posts => {
    return posts[0]?.titulo;
  });
}

// -------------------------------------------------------------
// Ejercicio 8 · Tiempo límite (extra)
// Devuelve una promesa que:
//   - se resuelve con el valor de `promesa` si esta termina antes de `ms`
//   - se RECHAZA con new Error('Tiempo agotado') si tarda más
//   await conTiempoLimite(obtenerUsuario(1), 500) → { id: 1, nombre: 'Ada Lovelace' }
//   await conTiempoLimite(obtenerUsuario(1), 10)  → se rechaza con Error: Tiempo agotado
// Pista: Promise.race (busca en MDN qué hace)
// -------------------------------------------------------------
export function conTiempoLimite(promesa, ms) {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Tiempo agotado'));
    }, ms);
  });

  return Promise.race([promesa, timeout]);
}
// =============================================================
// Zona de pruebas: node modulos/08-asincronia/ejercicios.js
// (en los módulos puedes usar await fuera de una función)
// =============================================================
// console.log(await nombreDeUsuario(1));
