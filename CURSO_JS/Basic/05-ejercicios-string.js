 
// 1. Concatena dos cadenas de texto

let nombre = "Lucia"
let ape = "Villena"

// 2. Muestra la longitud de una cadena de texto

console.log(nombre.length)

// 3. Muestra el primer y último carácter de un string

console.log(nombre[0])
console.log(nombre[4])

// 4. Convierte a mayúsculas y minúsculas un string
console.log(nombre.toLowerCase())
console.log(nombre.toUpperCase())

// 5. Crea una cadena de texto en varias líneas
let texto = `era 
una niña
muy 
buena`

console.log(texto)

// 6. Interpola el valor de una variable en un string

console.log(nombre.replace("Lucia","Marta"))

// 7. Reemplaza todos los espacios en blanco de un string por guiones
let pruebaTexto = "Esto es una prueba para ver los espacios";

console.log(pruebaTexto.split(" ").join("-"));

// 8. Comprueba si una cadena de texto contiene una palabra concreta

console.log(texto.includes("niña"))

// 9. Comprueba si dos strings son iguales

console.log(texto==nombre)

// 10. Comprueba si dos strings tienen la misma longitud

console.log(texto.length==nombre.length)