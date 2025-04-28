/*
  Autor: Lucia Villena Martin (1ºDAW) Alan Turing
  Fecha: 24/04/2025

--- CONFIGURACIÓN DEL AHORCADO PARA NODE.JS O NAVEGADOR ---
LAS PALABRAS QUE OBTENEMOS PARA EL JUEGO ESTÁN EN INGLES. EN EL CASO DE QUE SE JUEGUE EN EL CMD LAS PALABRAS 
VIENEN DE UNA LIBRERIA "random-words". En el caso de que e juegue en el navegador las palabras vienen de una API online. 
*/

// esta variable mira si estamos en navegador o no
const esNavegador = typeof window !== 'undefined';

// esta la usamos para coger palabras (solo hace fetch si es navegador)
let fetchPalabras;

// si NO estamos en navegador (osea, en Node.js), cargamos lo necesario
if (!esNavegador) {
  global.fetch = require("node-fetch"); // activamos fetch en Node
  var { generate } = require("random-words"); // palabras random para Node
  var readline = require("readline"); // para leer cosas en consola
}

// --- hacemos diccionario con 100 palabras ---
async function generarDiccionario() {
  if (esNavegador) {
    // si estamos en navegador usamos palabras de la API
    const res = await fetch('https://random-word-api.herokuapp.com/word?number=100');
    const palabras = await res.json();
    return palabras.map(p => p.toLowerCase()); // pasamos todo a minus
  } else {
    // si estamos en Node usamos el paquete 
    return generate(100).map(p => p.toLowerCase());
  }
}

// --- funcion para ocultar letras q aun no se han acertado ---
function ocultarPalabra(palabra, letrasAdivinadas) {
  return palabra.split("").map(letra => letrasAdivinadas.includes(letra) ? letra : "_").join(" ");
}

// --- funcion principal del juego ---
async function jugarAhorcado() {
  const diccionario = await generarDiccionario(); // sacamos las 100 palabras
  const palabraSecreta = diccionario[Math.floor(Math.random() * diccionario.length)]; // cogemos una random
  const intentosMax = Math.ceil(palabraSecreta.length * 1.5); // un poco mas del largo de la palabra
  let intentos = 0;
  let letrasAdivinadas = [];
  let puntos = 0;

  // si estamos en Node, montamos el readline para leer letras
  const prompt = !esNavegador ? readline.createInterface({
    input: process.stdin,
    output: process.stdout
  }) : null;

  // preguntamos letra al jugador (con prompt normal o por consola)
  function preguntar(mensaje) {
    if (esNavegador) {
      return new Promise(resolve => {
        const letra = window.prompt(mensaje); // en navegador
        resolve(letra);
      });
    } else {
      return new Promise(resolve => {
        prompt.question(mensaje, letra => resolve(letra)); // en consola
      });
    }
  }

  // el bucle del juego
  while (intentos < intentosMax && ocultarPalabra(palabraSecreta, letrasAdivinadas).includes("_")) {
    const estado = ocultarPalabra(palabraSecreta, letrasAdivinadas);
    console.log(`\nPalabra: ${estado}`);
    console.log(`Intento ${intentos + 1}/${intentosMax} - Puntos: ${puntos}`);
    
    const letra = (await preguntar("Introduce una letra: ")).toLowerCase();

    // si no pone una letra valida
    if (!letra || letra.length !== 1 || !/[a-zñ]/i.test(letra)) {
      console.log("Introduce una única letra valida");
      continue;
    }

    // si ya la habia usado
    if (letrasAdivinadas.includes(letra)) {
      console.log("Ya has usado esa letra");
      continue;
    }

    letrasAdivinadas.push(letra); // metemos la letra en la lista

    // si acierta
    if (palabraSecreta.includes(letra)) {
      console.log("✅ Letra correcta!");
      puntos++;
    } else {
      console.log("❌ Fallaste");
      puntos = Math.max(0, puntos - 1); // que no baje de 0
    }

    intentos++;
  }

  // cuando se termina el juego
  console.log(`\n🎉 Fin del juego. Palabra: ${palabraSecreta}`);
  console.log(`Resultado final: ${ocultarPalabra(palabraSecreta, letrasAdivinadas)}`);
  console.log(`Puntos totales: ${puntos}`);

  // cerramos el prompt si estamos en consola
  if (prompt) {
    prompt.close();
  }
}

// --- si estamos en Node lo ejecutamos directamente ---
if (!esNavegador) {
  jugarAhorcado();
}

