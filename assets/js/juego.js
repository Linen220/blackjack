
//! Patrón módulo
//? Permite encapsular nuetro código, y asi podemos proteger nnuestro código.
//? Ingresamos nuestro código dentro de una función anónima, y dentro de la 
//? función agregamos tambien 'use strict'.




//* Al asignale un nombre a la función anonima, podremos llamarla desde afuera, desde
//* la consola por ejemplo.
//? Función anonima autoinvocada '()'.
const miModulo = (() => {
    'use strict';

    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    //* Referencias del HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML         = document.querySelectorAll('small');


    //* Esta función inicializa el juego
    //? Desde ES6 es posible usar parámetros por defecto 
    //? (siempre y cuando sean los últimos declarados en la función).
    const inicializarJuego = ( numJugadores = 2) => { 
        deck = crearDeck(); 
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach( e => e.innerText = 0);
        divCartasJugadores.forEach( e => e.innerHTML = '');

        btnPedir.disabled   = false;
        btnDetener.disabled = false;
    };

    //* Esta función crea un nuevo deck
    const crearDeck = () => {
        deck = [];
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
        return _.shuffle( deck );
    }

    //* Esta función me permite tomar uan carta
    const pedirCarta = () => {
        if ( deck.length === 0) {
            throw 'No hay cartas en el deck';  
        } 
        return deck.pop();
    }

    //* Esta función sirve para obtener el valor de la carta
    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);   
        return ( isNaN( valor ) ) ? 
                ( valor === 'A' ) ? 11 : 10 
                : valor * 1;
    }

    //* Turno: 0 = primer jugador y el útlimo será la computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText =puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    //* Crea una carta
    const crearCarta = ( carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
    }

    //* Determina el ganador
    const determinarGanador = () => {

        //? Desestructuración de arreglos
        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

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
        }, 100 );
    }

    //* Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {
        
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
            crearCarta( carta, puntosJugadores.length - 1 );

            if ( puntosMinimos >= 21 ) {
                break;                               
            }

        } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );
        
        determinarGanador();
    }

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 );

        crearCarta( carta, 0 );

        if ( puntosJugador > 21 ) {
            console.warn( 'Lo siento mucho, perdiste' );
            btnPedir.disabled = true;
            btnDetener.disabled = true;
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
        turnoComputadora( puntosJugadores[0] );
    });

    //* No es necesario sin en el index ya lo estamos ejecutando.
    // btnNuevo.addEventListener('click', () => {
    //     inicializarJuego();
    // });


    //* Unicamente lo que se retorne va ser público y visible afuera de este modulo
    //* y todo lo demas sera privado ( inaccesible ).
    //? En este caso solo sera accesible la función inicializarJuego, sin los ().
    return {
        nuevoJuego: inicializarJuego
    };
})();