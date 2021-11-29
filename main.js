const botonEmpezar = document.querySelector("button[type=button]");
const cuadros = document.querySelectorAll(".cuadro");
const barraTurnos = document.querySelector("#turnos");
const ronda = document.querySelector("#ronda");
let numRonda = 0;
let cuadrosMaquina = [];
let cuadrosJugador = [];


botonEmpezar.onclick = empezarJuego;


function empezarJuego(){
    resetearTodo();
    jugar();
}

function resetearTodo (){
    cuadrosMaquina = [];
    //cuadrosUsuario = [];
    numRonda = 0;
    actualizarBarra (`Tocá "Empezar" para comenzar el juego!`);
}

function jugar (){
    
    actualizarRonda();

    //Turno compu
    actualizarBarra (`Turno de la compu`);
    bloquearJugador();
    const nuevoCuadroAleatorio = obtenerCuadroAleatorio();
    cuadrosMaquina.push(nuevoCuadroAleatorio); 
    cuadrosMaquina.forEach(function (cuadro,indice){
        const retrasoMaqResaltar = (indice + 1) * 1000;     
        setTimeout(function(){
            resaltarCuadro(cuadro);
        },retrasoMaqResaltar);            
    });

    //Turno jugador

    const retrasoTurnoJugador = (cuadrosMaquina.length + 1) * 1000;
    setTimeout(function(){
        actualizarBarra(`Turno del jugador`);
        desbloquearJugador();
    },retrasoTurnoJugador);

    cuadrosJugador = [];
    numRonda++;
    actualizarRonda(numRonda);
}


function obtenerCuadroAleatorio(){
    const randomNum = Math.floor(Math.random()*cuadros.length);    
    return cuadros[randomNum];
}


function resaltarCuadro (cuadro){
    cuadro.style.opacity = 1;
    setTimeout(function(){
        cuadro.style.opacity = 0.5;
    },500);
}

function actualizarRonda(){
    ronda.innerText = numRonda;
}

function actualizarBarra(texto, error = false){
    barraTurnos.innerText = texto;

    if (error){
        barraTurnos.classList.remove("alert-dark");
        barraTurnos.classList.add("alert-danger");
    }
    else {
        barraTurnos.classList.remove("alert-danger");
        barraTurnos.classList.add("alert-dark");
    }
}

function bloquearJugador (){    
    cuadros.forEach(function (cuadro){
        cuadro.style.cursor = "default";
        cuadro.onclick = function (){
        };
    });
}

function desbloquearJugador (){
    //aca quede. aca esta la magia del jugador.
    cuadros.forEach (function (cuadro){
        cuadro.style.cursor = "pointer";
        cuadro.onclick = manejarSeleccionUsuario;
    });
}

function manejarSeleccionUsuario (e) {
    const cuadro = e.target;
    resaltarCuadro(cuadro);
    cuadrosJugador.push(cuadro);

    if (cuadro !== cuadrosMaquina[cuadrosJugador.length-1]){
        perder();
        return;
    }

    if (cuadrosJugador.length === cuadrosMaquina.length){
        bloquearJugador();
        setTimeout(jugar,1000);
    }
}

function perder (){
    bloquearJugador();
    actualizarBarra (`Ups! Perdiste. Tocá "Empezar" para comenzar a jugar de nuevo.`,true);    
}