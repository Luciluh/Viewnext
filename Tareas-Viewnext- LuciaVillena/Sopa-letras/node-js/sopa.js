/**
Autor: Lucia Villena Martin 1ºDAW Alan Turing
Fecha: 24/04/2025


---CODIGO SOPA DE LETRAS---
Este código implementa un juego de sopa de letras en la consola de Node.js.

Para jugar: 
Abrir la consola y ejecutar "node sopa.js"
Cuando quiera salir escribir "salir"
**/

// usamos readline para leer lo que el usuario escribe
const readline = require("readline");

// preparamos la consola para que lea y escriba
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// tamano de la sopa
const SIZE = 20;

// palabras que hay que encontrar
const WORDS = ["JAVASCRIPT", "NODE", "CODIGO", "VARIABLE", "FUNCION", "OBJETO", "BUCLE", "ARRAY", "SINTAXIS", "CONSOLA"];

// creamos la matriz 20x20 rellena de letras random
let sopa = Array.from({ length: SIZE }, () => 
  Array.from({ length: SIZE }, () => randomChar())
);

// puntos y lista de fallos
let marcador = 0;
let errores = [];

// genera una letra random (mayuscula)
function randomChar() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
}

// coloca las palabras en la sopa en horizontal o vertical
function colocarPalabras() {
  for (const word of WORDS) {
    let colocada = false;
    let intentos = 0;
    const maxIntentos = 100; // limite para que no se quede pillado

    while (!colocada && intentos < maxIntentos) {
      intentos++;
      const horizontal = Math.random() < 0.5; // elige direccion

      const row = Math.floor(Math.random() * (horizontal ? SIZE : SIZE - word.length));
      const col = Math.floor(Math.random() * (horizontal ? SIZE - word.length : SIZE));

      let puedeColocar = true;

      // comprobamos si la palabra cabe sin pisar otras letras
      for (let i = 0; i < word.length; i++) {
        const r = horizontal ? row : row + i;
        const c = horizontal ? col + i : col;
        if (sopa[r][c] !== word[i] && sopa[r][c] !== sopa[r][c].toLowerCase()) {
          puedeColocar = false;
          break;
        }
      }

      // si se puede, la colocamos letra a letra
      if (puedeColocar) {
        for (let i = 0; i < word.length; i++) {
          const r = horizontal ? row : row + i;
          const c = horizontal ? col + i : col;
          sopa[r][c] = word[i];
        }
        colocada = true;
      }
    }
  }
}

// muestra la sopa en consola
function mostrarSopa() {
  console.clear();
  console.log("=== SOPA DE LETRAS ===");
  console.log("\nPalabras a encontrar:", WORDS.join(", "), "\n");

  // numeros de columna
  process.stdout.write("   ");
  for(let i = 0; i < SIZE; i++) {
    process.stdout.write(` ${i.toString().padStart(2)} `);
  }
  console.log("\n");

  // cada fila con su numero
  for (let i = 0; i < SIZE; i++) {
    process.stdout.write(`${i.toString().padStart(2)} `);
    for (let j = 0; j < SIZE; j++) {
      process.stdout.write(` ${sopa[i][j]} `);
    }
    console.log();
  }

  console.log(`\nPuntos: ${marcador}`);
  if (errores.length > 0) {
    console.log("Fallos: " + errores.join(", "));
  }
}

// busca palabra en horizontal o vertical
function buscarPalabra(palabra) {
  palabra = palabra.toUpperCase();

  // horizontal
  for (let i = 0; i < SIZE; i++) {
    let fila = sopa[i].join("");
    if (fila.includes(palabra)) {
      let start = fila.indexOf(palabra);
      for (let j = 0; j < palabra.length; j++) {
        sopa[i][start + j] = sopa[i][start + j].toLowerCase();
      }
      return true;
    }
  }

  // vertical
  for (let j = 0; j < SIZE; j++) {
    let col = "";
    for (let i = 0; i < SIZE; i++) col += sopa[i][j];
    if (col.includes(palabra)) {
      let start = col.indexOf(palabra);
      for (let i = 0; i < palabra.length; i++) {
        sopa[start + i][j] = sopa[start + i][j].toLowerCase();
      }
      return true;
    }
  }

  return false; // no encontrada
}

// empieza el juego
function iniciarJuego() {
  try {
    console.log("Iniciando el juego...");
    colocarPalabras();
    mostrarSopa();
    console.log("\nEscribe una palabra para buscarla en la sopa de letras.");
    console.log("Para salir del juego escribe 'salir'");
    preguntar();
  } catch (error) {
    console.error("Error al iniciar el juego:", error);
    rl.close();
  }
}

// pide palabras al usuario
function preguntar() {
  rl.question("\nIntroduce una palabra (o 'salir'): ", (respuesta) => {
    const entrada = respuesta.trim().toUpperCase();

    if (entrada === "SALIR") {
      console.log("\nGracias por jugar.");
      rl.close();
      return;
    }

    // si acierta suma, si falla resta
    if (buscarPalabra(entrada)) {
      console.log("✅ ¡Correcto!");
      marcador++;
    } else {
      console.log("❌ Incorrecto.");
      if (!errores.includes(entrada)) errores.push(entrada);
      marcador = Math.max(0, marcador - 1);
    }

    mostrarSopa();
    preguntar();
  });
}

// arranca el juego
iniciarJuego();

// si hay error gordo, cerramos consola
process.on('uncaughtException', (error) => {
  console.error("Error inesperado:", error);
  rl.close();
});
