import { perfil, habilidades } from './datos.js';
const $ = (selector) => document.querySelector(selector);
const estado = {
  proyectos: [],
  filtro: 'Todos',
  busqueda: '',
};
function pintarAnio() {
  $('#anio').textContent = new Date().getFullYear();
}
function pintarPerfil() {
  $('#perfil-nombre').textContent = perfil.nombre;
  $('#pie-nombre').textContent = perfil.nombre;
  $('#perfil-rol').textContent = perfil.rol;
  $('#perfil-intro').textContent = perfil.intro;

  const iniciales = perfil.nombre.trim().split(/\s+/).slice(0, 2)
    .map(palabra => palabra[0]?.toUpperCase() ?? '').join('');
  $('#logo').textContent = iniciales;
  document.title = `${perfil.nombre} · Portfolio`;
}
function pintarSobreMi() {
  const contenido = $('#perfil-sobre-mi');
  contenido.replaceChildren();
  for (const texto of perfil.sobreMi) {
    const parrafo = document.createElement('p');
    parrafo.textContent = texto;
    contenido.append(parrafo);
  }

  const contacto = $('#perfil-email');
  if (perfil.email) {
    contacto.textContent = perfil.email;
    contacto.href = `mailto:${perfil.email}`;
  } else {
    contacto.textContent = 'GitHub';
    contacto.href = 'https://github.com/Gonzaloabajo';
    contacto.target = '_blank';
    contacto.rel = 'noopener noreferrer';
  }

  const listaRedes = $('#perfil-redes');
  listaRedes.replaceChildren();
  for (const red of perfil.redes) {
    const li = document.createElement('li');
    const enlace = document.createElement('a');
    enlace.href = red.url;
    enlace.textContent = red.nombre;
    enlace.target = '_blank';
    enlace.rel = 'noopener noreferrer';
    li.append(enlace);
    listaRedes.append(li);
  }
}
function pintarHabilidades() {
  const lista = $('#habilidades');
  lista.replaceChildren();
  for (const habilidad of habilidades) {
    const li = document.createElement('li');
    li.className = 'habilidad';
    const nombre = document.createElement('span');
    nombre.textContent = habilidad.nombre;
    const barra = document.createElement('span');
    barra.className = 'nivel';
    barra.style.setProperty('--nivel', Math.max(1, Math.min(5, habilidad.nivel)));
    barra.setAttribute('aria-label', `Nivel ${habilidad.nivel} de 5`);
    li.append(nombre, barra);
    lista.append(li);
  }
}
async function cargarProyectos() {
  try {
    const respuesta = await fetch('data/proyectos.json');
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    const datos = await respuesta.json();
    if (!Array.isArray(datos)) throw new Error('El JSON no contiene una lista de proyectos');
    return datos;
  } catch (error) {
    console.error('No se han podido cargar los proyectos:', error);
    return [];
  }
}
function crearTarjetaProyecto(proyecto) {
  const tarjeta = document.createElement('article');
  tarjeta.className = 'tarjeta';
  if (proyecto.destacado) tarjeta.classList.add('destacada');

  const cuerpo = document.createElement('div');
  cuerpo.className = 'tarjeta-cuerpo';
  if (proyecto.destacado) {
    const insignia = document.createElement('span');
    insignia.className = 'insignia';
    insignia.textContent = 'Destacado';
    cuerpo.append(insignia);
  }
  const titulo = document.createElement('h3');
  titulo.textContent = proyecto.titulo;
  const descripcion = document.createElement('p');
  descripcion.textContent = proyecto.descripcion;
  cuerpo.append(titulo, descripcion);

  const etiquetas = document.createElement('ul');
  etiquetas.className = 'etiquetas';
  for (const tecnologia of proyecto.tecnologias) {
    const etiqueta = document.createElement('li');
    etiqueta.textContent = tecnologia;
    etiquetas.append(etiqueta);
  }
  cuerpo.append(etiquetas);

  const enlaces = document.createElement('div');
  enlaces.className = 'tarjeta-enlaces';
  for (const [url, texto] of [[proyecto.demo, 'Ver demo'], [proyecto.codigo, 'Código']]) {
    if (!url) continue;
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.textContent = texto;
    enlace.target = '_blank';
    enlace.rel = 'noopener noreferrer';
    enlaces.append(enlace);
  }
  const verMas = document.createElement('button');
  verMas.type = 'button';
  verMas.className = 'enlace-boton';
  verMas.textContent = 'Ver más';
  verMas.addEventListener('click', () => abrirDetalle(proyecto));
  enlaces.append(verMas);
  cuerpo.append(enlaces);
  tarjeta.append(cuerpo);
  return tarjeta;
}
function pintarProyectos(lista) {
  const rejilla = $('#rejilla-proyectos');
  rejilla.replaceChildren();
  if (lista.length === 0) {
    const aviso = document.createElement('p');
    aviso.className = 'aviso';
    aviso.textContent = 'No hay proyectos que coincidan.';
    rejilla.append(aviso);
    return;
  }
  for (const proyecto of lista) rejilla.append(crearTarjetaProyecto(proyecto));
}
function actualizarProyectos() {
  const visibles = filtrarProyectos(estado.proyectos) ?? estado.proyectos;
  pintarProyectos(visibles);
  pintarContador(visibles.length, estado.proyectos.length);
}
function obtenerTecnologias(proyectos) {
  return [...new Set(proyectos.flatMap(proyecto => proyecto.tecnologias))]
    .sort((a, b) => a.localeCompare(b, 'es'));
}
function filtrarProyectos(proyectos) {
  const texto = estado.busqueda.trim().toLocaleLowerCase('es');
  return proyectos.filter(proyecto => {
    const coincideTecnologia = estado.filtro === 'Todos' || proyecto.tecnologias.includes(estado.filtro);
    const coincideTexto = !texto || `${proyecto.titulo} ${proyecto.descripcion}`
      .toLocaleLowerCase('es').includes(texto);
    return coincideTecnologia && coincideTexto;
  });
}
function pintarFiltros() {
  const contenedor = $('#filtros');
  contenedor.replaceChildren();
  for (const tecnologia of ['Todos', ...obtenerTecnologias(estado.proyectos)]) {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'filtro';
    boton.textContent = tecnologia;
    boton.classList.toggle('activo', estado.filtro === tecnologia);
    boton.setAttribute('aria-pressed', String(estado.filtro === tecnologia));
    boton.addEventListener('click', () => {
      estado.filtro = tecnologia;
      for (const b of contenedor.querySelectorAll('button')) {
        const activo = b === boton;
        b.classList.toggle('activo', activo);
        b.setAttribute('aria-pressed', String(activo));
      }
      actualizarProyectos();
    });
    contenedor.append(boton);
  }
}
function activarBuscador() {
  $('#buscador').addEventListener('input', evento => {
    estado.busqueda = evento.target.value;
    actualizarProyectos();
  });
}
function pintarContador(visibles, total) {
  $('#contador-proyectos').textContent = `Mostrando ${visibles} de ${total} proyectos`;
}
function validarContacto({ nombre, email, mensaje }) {
  const errores = {};
  if (nombre.trim().length < 2) errores.nombre = 'Escribe tu nombre (mínimo 2 caracteres).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errores.email = 'Introduce un email válido.';
  if (mensaje.trim().length < 10) errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
  return errores;
}
function activarFormulario() {
  const formulario = $('#form-contacto');
  formulario.addEventListener('submit', evento => {
    evento.preventDefault();
    const datos = Object.fromEntries(new FormData(formulario));
    const errores = validarContacto(datos);
    for (const campo of ['nombre', 'email', 'mensaje']) {
      $(`#error-${campo}`).textContent = errores[campo] ?? '';
      $(`#campo-${campo}`).classList.toggle('invalido', Boolean(errores[campo]));
      $(`#campo-${campo}`).setAttribute('aria-invalid', String(Boolean(errores[campo])));
    }
    const valido = Object.keys(errores).length === 0;
    $('#form-exito').hidden = !valido;
    if (valido) formulario.reset();
  });
}
function iniciarTema() {
  let guardado = null;
  try { guardado = localStorage.getItem('tema'); } catch (error) {  }
  const usaOscuro = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const tema = ['claro', 'oscuro'].includes(guardado) ? guardado : (usaOscuro ? 'oscuro' : 'claro');
  document.documentElement.dataset.tema = tema;
  const boton = $('#btn-tema');
  boton.setAttribute('aria-pressed', String(tema === 'oscuro'));
  boton.addEventListener('click', () => {
    const siguiente = document.documentElement.dataset.tema === 'oscuro' ? 'claro' : 'oscuro';
    document.documentElement.dataset.tema = siguiente;
    boton.setAttribute('aria-pressed', String(siguiente === 'oscuro'));
    try { localStorage.setItem('tema', siguiente); } catch (error) {  }
  });
}
function iniciarAnimaciones() {
  if (!('IntersectionObserver' in window) ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('animaciones');
  const observador = new IntersectionObserver((entradas) => {
    for (const entrada of entradas) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    }
  }, { threshold: 0.08 });
  document.querySelectorAll('.revelar').forEach(elemento => observador.observe(elemento));
}
function abrirDetalle(proyecto) {
  const contenido = $('#modal-contenido');
  contenido.replaceChildren();
  const titulo = document.createElement('h3');
  titulo.textContent = proyecto.titulo;
  const detalle = document.createElement('p');
  detalle.textContent = proyecto.detalle || proyecto.descripcion;
  const etiquetas = document.createElement('ul');
  etiquetas.className = 'etiquetas';
  for (const tecnologia of proyecto.tecnologias) {
    const li = document.createElement('li');
    li.textContent = tecnologia;
    etiquetas.append(li);
  }
  contenido.append(titulo, detalle, etiquetas);
  $('#modal-proyecto').showModal();
}

function activarModal() {
  const modal = $('#modal-proyecto');
  $('#modal-cerrar').addEventListener('click', () => modal.close());
  modal.addEventListener('click', evento => {
    if (evento.target === modal) modal.close();
  });
}
async function iniciar() {
  pintarAnio();
  pintarPerfil();
  pintarSobreMi();
  pintarHabilidades();
  estado.proyectos = (await cargarProyectos()) ?? [];
  actualizarProyectos();
  pintarFiltros();
  activarBuscador();
  activarFormulario();
  iniciarTema();
  iniciarAnimaciones();
  activarModal();
}

iniciar();
