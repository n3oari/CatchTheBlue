let contador = 10;
let movimientoCirculosInterval;
const contadorElement = document.getElementById("contador");
const perdidoElement = document.getElementById("perdido");
const juego = document.getElementById("juego");
const velocidadPorNivelAr = [1300, 1100, 900, 800, 500];
const restaContadorPorNivelAr = [1, 2, 4, 5, 6, 8];
const niveles = [1, 2, 3, 4, 5, 6]
let nivel = niveles[0];
let resta = restaContadorPorNivelAr[0];
const trollFace = document.getElementById("troll");
let nivelAnterior = nivel;


//SONIDOS DE SUBIDA DE LVL :@
const soundNivl1 = new Audio("sound/MegaKill.mp3");
const soundNivl2 = new Audio("sound/Rampage.mp3");
const soundNivl3 = new Audio("sound/MonsterKill.mp3");
const soundNivl4 = new Audio("sound/Ownage.mp3");
const soundNivl5 = new Audio("sound/WhickedSick.mp3");
const soundLoose = new Audio("sound/BUTCHER.mp3");


function moverCirculos() {
  const circulos = document.querySelectorAll(".circulo");
  circulos.forEach((circulo) => {
    const nuevaX = Math.random() * (juego.offsetWidth - 60);
    const nuevaY = Math.random() * (juego.offsetHeight - 60);
    circulo.style.left = `${nuevaX}px`;
    circulo.style.top = `${nuevaY}px`;
  });
}


function iniciarMovimientoCirculos(intervalo) {
  clearInterval(movimientoCirculosInterval);
  movimientoCirculosInterval = setInterval(moverCirculos, intervalo);
  console.log(`[!] DEBUG: velocidad ${intervalo}`);
}




// AÑADIMOS EVENTOS A LOS CÍRCULOS Y MEDIANTE VERIFICACIONES IMPLEMENTAMOS MECÁNICAS
juego.addEventListener("click", (event) => {
  if (event.target.classList.contains("circulo")) {

    

    if (event.target.id === "circuloAzul") {
      contador++;

      //importante para evitar que el jugador no pueda hacer multiclicks
      event.target.id = "circuloDeshabilitado";
      event.target.style.backgroundColor = "grey";

      setTimeout(() => {
        event.target.id = "circuloAzul";
        event.target.style.backgroundColor = "blue";
      }, 800);

    } else if (event.target.id !== "circuloDeshabilitado") {
      
      //LOGICA DE PENALIZACION SEGUN NIVEL (CLICK BOLA NO AZUL)

      if (nivel === 2) { contador -= restaContadorPorNivelAr[1]; }
      else if (nivel === 3) { contador -= restaContadorPorNivelAr[2]; }
      else if (nivel === 4) { contador -= restaContadorPorNivelAr[3]; }
      else if (nivel === 5) { contador -= restaContadorPorNivelAr[4]; }
      else if (nivel === 6) { contador -= restaContadorPorNivelAr[5]; }
      else {
        contador--;
      }
    }
  } else {

    // CLICK EN EL FONDO

    if (nivel === 1) {
      contador -= restaContadorPorNivelAr[0];
    }
    else if
      (nivel === 2) {
      contador -= restaContadorPorNivelAr[1];
    } else if (nivel === 3) {
      contador -= restaContadorPorNivelAr[2];
    } else if (nivel === 4) {
      contador -= restaContadorPorNivelAr[3];
    } else if (nivel === 5) {
      contador -= restaContadorPorNivelAr[4];
    } else if (nivel === 6) {
      contador -= restaContadorPorNivelAr[5];
    } else {
      contador--; 
    }

  }

  if (contador === 0) {
    mostrarMensajePerdido();
  }

   //LOGICA DONDE SE IMPLEMENTA LA LOGICA DE LOS NIVELES:
   //DEPENDIENDO DEL NIVEL DONDE TE ENCUENTRES LA VELOCIDAD DE LAS BOLSAS SERA DIFERENTE
   //TAMBIEN CAMBIARA LAS PENALIZACIONES, SIENDO CADA VEZ MAS ESTRICTAS
   //SE IMPLEMENTA TAMBIEN UN SONIDO ESPECIFICO A CADA SUBIDA DE NIVEL
   
  else if (contador < 15) {
    iniciarMovimientoCirculos(velocidadPorNivelAr[0]);
    nivel = niveles[0]; //NIVEL 0
  } else if (contador >= 15 && contador < 20) {
    iniciarMovimientoCirculos(velocidadPorNivelAr[1]);
    nivel = niveles[1]; //NIVEL 1
    if (nivel > nivelAnterior) {
      soundNivl1.currentTime = 0;
      soundNivl1.play();
    }
  } else if (contador >= 20 && contador < 25) {
    iniciarMovimientoCirculos(velocidadPorNivelAr[2]);
    nivel = niveles[2]; //NIVEL 2
    if (nivel > nivelAnterior) {
      soundNivl2.currentTime = 0;
      soundNivl2.play();
    }
  } else if (contador >= 25 && contador < 30) {
    iniciarMovimientoCirculos(velocidadPorNivelAr[3]);
    nivel = niveles[3]; //NIVEL 3
    if (nivel > nivelAnterior) {
      soundNivl3.currentTime = 0;
      soundNivl3.play();
    }
  } else if (contador >= 30 && contador < 35) {
    iniciarMovimientoCirculos(velocidadPorNivelAr[4]);
    nivel = niveles[4]; //NIVEL 4
    if (nivel > nivelAnterior) {
      soundNivl4.currentTime = 0;
      soundNivl4.play();
    }
  } else if (contador >= 35) {
    iniciarMovimientoCirculos(velocidadPorNivelAr[5]);
    nivel = niveles[5]; //NIVEL 5
    if (nivel > nivelAnterior) {
      soundNivl5.currentTime = 0;
      soundNivl5.play();
    }

  }

  //actualizamos al final siempre la variable nivelanterior para 
  //poder hacer comparaciones
  nivelAnterior = nivel; 

  //después de un click siempre actualizaremos el contador
  actualizarContadorEnPantalla();
});




//ACTUALIZAR CONTADOR
function actualizarContadorEnPantalla() {
  contadorElement.textContent = `Contador: ${contador}`;
  console.log(`[!]DEBUG: nivel actual -> ${nivel}`)

}


// MOSTRAR IMAGEN AL PERDER
function mostrarMensajePerdido() {
  trollFace.style.display = "block";
  soundLoose.currentTime = 0;
  soundLoose.play();
  clearInterval(movimientoCirculosInterval);
  setTimeout(restablecerJuego, 3000);
}


//RESTART EL JUEGO
function restablecerJuego() {
  nivel = niveles[0];
  resta = restaContadorPorNivelAr[0];
  contador = 10;
  actualizarContadorEnPantalla();
  trollFace.style.display = "none";

  setTimeout(() => {

    iniciarMovimientoCirculos(velocidadPorNivelAr[0]);
  }, 3000);
  iniciarMovimientoCirculos(50);


}

//ASEGURAR QUE TODO CARGUE Y NO HAYA CONFLICTOS
document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorEnPantalla();
  setTimeout(() => {

    iniciarMovimientoCirculos(velocidadPorNivelAr[0]);
  }, 3000);
  iniciarMovimientoCirculos(50);

});