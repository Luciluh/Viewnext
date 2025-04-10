
// 1. Imprime por consola tu nombre si una variable toma su valor

let aux = 2

if (aux==2) {
    console.log("Lucia")    
}

// 2. Imprime por consola un mensaje si el usuario y contraseña concide con unos establecidos

let usuario = "Lucia"
let pass = 12345

if (usuario=="Lucia"&&pass==12345) {
    console.log("Bienvenida")
}

// 3. Verifica si un número es positivo, negativo o cero e imprime un mensaje

let num = -3

if (num < 0) {
    console.log("El numero es negativo")
} else if (num>0){
    console.log("El numero es positivo")
} else {
    console.log("El numero es 0")
}

// 4. Verifica si una persona puede votar o no (mayor o igual a 18) e indica cuántos años le faltan

let edad = 15
let diferencia = 18 - edad

if (edad>=18) {
    console.log("Puedes votar") 
} else {
    console.log(`Aun no puedes votar, te quedan ${diferencia} años`)
}

// 5. Usa el operador ternario para asignar el valor "adulto" o "menor" a una variable
//    dependiendo de la edad 

let edad2 = 20
let tipoPersona = (edad >= 18) ? "adulto" : "menor"

console.log(tipoPersona)


// 6. Muestra en que estación del año nos encontramos dependiendo del valor de una variable "mes"

let mes = "Junio"

switch (mes) {
    case"Diciembre":
    case"Enero":
    case"Febrero":
        console.log("Estamos en invierno")
        break;

    case"Marzo":
    case"Abril":
    case"Mayo":
        console.log("Estamos en primavera")
        break;

    case"Junio":
    case"Julio":
    case"Agosto":
        console.log("Estamos en verano")
        break;

    case"Septiembre":
    case"Octubre":
    case"Noviembre":
        console.log("Estamos en otoño")
        break;

    default:
        break;
}

// 7. Muestra el número de días que tiene un mes dependiendo de la variable del ejercicio anterior
switch (mes) {
    case"Diciembre":
    case"Enero":
    case"Junio":
    case"Julio":

        console.log("Tiene 31 dias")
        break;

    case"Marzo":
    case"Abril":
    case"Mayo":
    case "Agosto":
        console.log("Tiene 30 dias")
        break;

    case"Febrero":
        console.log("Tiene 28 dias")
        break;

    default:
        break;
}

// 8. Usa un switch para imprimir un mensaje de saludo diferente dependiendo del idioma

// 9. Usa un switch para hacer de nuevo el ejercicio 6

// 10. Usa un switch para hacer de nuevo el ejercicio 7