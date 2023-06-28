/** 
 * 2C = Two of Clubs    (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts   (Corazaones)
 * 2S = Two of Swords   (Espadas)
*/

/** 
 * ! Color de los valores en la consola:
 * TODO: Puede variar dependiendo del tema de chrome o navegador web.
 * * Gris  : cadema de texto ( string ).
 * * Morado: número.
 * ? Recordad: '5' + 5 = '55'
 * TODO: TIP: Es buena práctica acostumbrarse que cuando copiamos y pegamos
 * TODO: bloques grandes de código ( 2 o más líneas ), es conveniente 
 * TODO: ponerlo en una función.
*/ 


let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador     = 0,
    puntosComputadora = 0;

//* Referencias del HTML
//? Si vamos a trabajar con un elemento HTML más de una vez, es conveniente poner
//? ese elemento en una variable.
const btnPedir   = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo   = document.querySelector('#btnNuevo');

const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

//? querySelectorAll selecciona todas los tags, clases o id iguales
//? y lo guarda en un arreglo.
const puntosHTML = document.querySelectorAll('small');



//* Esta función crear un nuevo deck.
const crearDeck = () => {
    for ( let i = 2; i <= 10; i++ ) {
        for (const tipo of tipos) {
            deck.push( i + tipo );
        }
    }

    for (const tipo of tipos) {
        for (const especial of especiales) {
            deck.push( especial + tipo );
        }
    }

    // console.log( deck );
    deck = _.shuffle( deck ); //* _.shuffle mezcla las cartas del arreglo, gracias a underscore.js
    console.log( deck );

    return deck;
}

crearDeck();

// const copiaDeck = [ ...deck ];


//* Esta función me permite tomar una carta.
const pedirCarta = () => {
    
    //* Remover carta aleatoria del deck
    // const cartaRandom = Math.floor(Math.random() * deck.length);
    // console.log(cartaRandom, deck[cartaRandom]);
    // deck.splice(cartaRandom, 1);

    if ( deck.length === 0) {
      throw 'No hay cartas en el deck';     //? Muestra un mensaje de error en consola.
    } 

    //* Removar la ultima carta de la baraja.
    const carta = deck.pop();
    // console.log( deck );
    // console.log( carta );

    return carta;
}

// pedirCarta();

const valorCarta = ( carta ) => {
    // const valor = carta[0];         //? Los strings pueden ser trabajados como arreglos.
    // console.log({ valor });         //? '2'

    //! Primera manera
    // //* substring retorna un string cortado en base a la posición inicial y un final.
    // const valor = carta.substring(0, carta.length - 1);   
    // let puntos  = 0;

    // //* isNaN - 'is not a number'  es una función que evalua si el valor entre ( ) 
    // //* es un número o no, regresara 'true' si no es un número y 'false' si es un número.
    // if ( isNaN( valor ) ) {
    //     puntos = ( valor === 'A' ) ? 11 : 10;
    // } else {
    //     //* Si multiplicamos por 1, 'valor' se volvera un número.
    //     puntos = valor * 1;       
    // }   

    // console.log( puntos );       
    
    //! Segunda manera - resumido
    const valor = carta.substring(0, carta.length - 1);   
    //* Usando el operador condicional ternario
    return ( isNaN( valor ) ) ? 
            ( valor === 'A' ) ? 11 : 10 
            : valor * 1;
}


//* TURNO DE LA COMPUTADORA
const turnoComputadora = ( puntosMinimos ) => {
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHTML[1].innerText = puntosComputadora;
    
        // <img class="carta" src="./assets/cartas/2C.png" alt=""></img>
        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );

        //* Los puntosMinimos representa el puntaje del jugador. y si es mayor
        //* o igual a 21 no hay razon para que la pc siga jugando.
        if ( puntosMinimos >= 21 ) {
            break;                                //? Rompe el ciclo while, se sale de él.
        }

    } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );
    

    //* JavaScript no es multihilo, el proceso while se esta haciendo simultaneamente
    //* inclusive las cartas no aparecen hasta que termine de ejecutar el proceso.
    //* Por eso las el mensaje de alerta aparece antes de que se muestren las cartas.
    //? para solucionar esto podemos usar setTimeout.
    //? Esta función de javascript me permite ejecturar un callback(función mandada como argumento)
    //? en una cierta cantidad de milisegundos, en este caso usaremos '10'.
    //? Tiempo suficiente para que la instrucción del do while termine y pueda ejecutar
    //? el contenido del la función setTimeout.
    setTimeout(() => {
        if ( puntosComputadora === puntosMinimos) {
            alert('Nadie ganó :(');
        } else if ( puntosMinimos > 21 ) {
            alert('Ganó la computadora');
        } else if ( puntosComputadora > 21) {
            alert('Ganaste');
        } else {
            alert('Ganó la computadora');
        }
    }, 60 );
}


//* EVENTOS 
//? La función que se coloca como argumento a otra función es conocida
//? como 'callback', es decir es una función que se esta mandando como
//? argumento. Puede ser una función tradicional o flecha.
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;

    //*Construyendo la carta
    // <img class="carta" src="./assets/cartas/2C.png" alt=""></img>
    //* Crea la etiqueta img pero está en memoria.
    const imgCarta = document.createElement('img');

    //? Se añade el atributo 'src' y le asigno un valor ( path )
    imgCarta.src = `./assets/cartas/${ carta }.png`;

    //? Se añade el atributo 'class' y le asigno un calor
    imgCarta.classList.add('carta');

    //? Se añade la carta al div contenedor
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ) {
        console.warn( 'Lo siento mucho, perdiste' );
        //? '.disabled = true' deshabilita el boton
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        //? Es el turno de la pc
        //? No hace falta mandar como agumento puntosJugador, pues esa variable es global.
        turnoComputadora( puntosJugador );

    } else if ( puntosJugador === 21 ) {
        console.warn( '21, genial!' );
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora( puntosJugador );
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled   = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );
});


btnNuevo.addEventListener('click', () => {
    
    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador     = 0,
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    //* Removiendo cartas
    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';

    //*OTRA FORMA DE REMOVER LAS CARTAS
    // const cartas = document.querySelectorAll('.carta');
    // for (const carta of cartas) {
    //     carta.remove();
    // }

    btnPedir.disabled   = false;
    btnDetener.disabled = false;
});



