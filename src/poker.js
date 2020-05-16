/** 
 * Universidad de La Laguna
 * Facultad: Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 11. Ajedrez. Programación Gráfica y Orientada a Objetos en JS.
 * @author David Hernández Suárez
 * Correo: alu0101048239@ull.edu.es
 * @since 30/04/2020
 * @description:  Contiene el desarrollo de un programa que visualiza en un Canvas dos manos de Póker, 
                  indicando cuál de ellas es la mano ganadora.

 * Referencias:   Enunciado de la práctica:
                  https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
                  Repositorio con el código:
                  https://github.com/ULL-ESIT-INF-PAI-2019-2020/pai-p11-chess-alu0101048239
                  Patrón arquitectónico MVC: 
                  https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller
                  Interfaz gráfica de ejemplo:
                  https://lichess.org/MgfoDUSW/black
                  Notación algebraica:
                  https://en.wikipedia.org/wiki/Algebraic_notation_(chess)
                  Test Driven Development (TDD):
                  https://en.wikipedia.org/wiki/Test-driven_development
                                        
 *  Historial de revisiones:
                  30/04/2020 - Creación del código (primera versión)
                  05/04/2020 - Versión para evaluación
 */                                    

'use strict';


/**
 * @desc Crea una mano de cartas del Póquer y las visualiza gráficamente
 * en un Canvas.
 * @param {number} numberCards - Número de cartas de la mano.
 */
function pokerHand(numberCards, CANVAS) {
  const CONTEXT = CANVAS.getContext("2d");
  let deck = new Deck();
  deck.shuffle();
  let coorX = 0;
  let coorY = 0;
  let pokerHand = new PokerHand();
  for (let index = 0; index < numberCards; index++) {
    let card = deck.popCard();
    card.drawCard(CONTEXT, selectSource(card), coorX, coorY);
    pokerHand.arrayCards.push(card);
    coorX += 200;
  }
  return pokerHand;
}

/**
 * @desc Indica la ruta de la imagen a cargar, obteniendo el nombre de 
 * la imagen a partir del nombre de la carta.
 * @param {Card} card - Carta en concreto.
 */
function selectSource(card) {
  let rank = card.cardRank;
  let suit = card.cardSuit;
  suit = suit.toUpperCase();
  let source = "../img/";
  if (typeof(rank) === "number") {
    source += rank;
  } else {
    rank = rank.toUpperCase();
    source += rank[0];
  }
  source += suit[0] + ".png";
  console.log(source);
  return source;
}

/**
 * @desc Función llamada al presionar el botón "Repartir mano".
 */
function printCards() {
  const FIRST = document.getElementById("firstHand");
  const SECOND = document.getElementById("secondHand");
  let numberCards = 5;
  let player1 = pokerHand(numberCards, FIRST);  
  let player2 = pokerHand(numberCards, SECOND);
  let winner = player1.selectWinner(player2);
  setTimeout(function() { 
    alert(winner); 
  }, 1000);
}