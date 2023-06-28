
//! Patron modulo
//? Permite encapsular nuetro código, y asi podemos proteger nnuestro código.
//? Ingresamos nuestro código dentro de una función anónima, y dentro de la 
//? función agregamos tambien 'use strict'.


//* Función anonima autoinvocada '()'.
(() => {
    'use strict'

    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador     = 0,
        puntosComputadora = 0;

    //* Referencias del HTML
    const btnPedir   = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo   = document.querySelector('#btnNuevo');
    const divCartasJugador     = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');
    const puntosHTML = document.querySelectorAll('small');

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
        deck = _.shuffle( deck );
        return deck;
    }
    crearDeck();

    const pedirCarta = () => {
        if ( deck.length === 0) {
            throw 'No hay cartas en el deck';  
        } 
        const carta = deck.pop();
        return carta;
    }

    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);   
        return ( isNaN( valor ) ) ? 
                ( valor === 'A' ) ? 11 : 10 
                : valor * 1;
    }

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

            if ( puntosMinimos >= 21 ) {
                break;                               
            }

        } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );
        
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


    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        puntosJugador = puntosJugador + valorCarta( carta );
        puntosHTML[0].innerText = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append( imgCarta );

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

        divCartasJugador.innerHTML = '';
        divCartasComputadora.innerHTML = '';

        btnPedir.disabled   = false;
        btnDetener.disabled = false;
    });

})();