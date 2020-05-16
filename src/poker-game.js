/** 
 * Universidad de La Laguna
 * Facultad: Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Asignatura: Programación de Aplicaciones Interactivas
 * Curso: 3º
 * Práctica 8. Poker. Programación Orientada a Objetos en JavaScript.
 * @author David Hernández Suárez
 * Correo: alu0101048239@ull.edu.es
 * @since 07/04/2020
 * @description:  Contiene la implementación del ejercicio 2.1, en el que se utilizan métodos
                  de la clase PokerHand para crear 7 manos de 7 cartas cada una. El objetivo
                  del programa es comprobar si alguna de esas manos contiene una escalera. 
                  
 * Referencias:   Enunciado de la práctica:
                  https://github.com/fsande/PAI-P08-Poker/blob/master/2019-2020_p08_Poker.md
                  Repositorio con el código:
                  https://github.com/ULL-ESIT-INF-PAI-2019-2020/practica-8-poker-alu0101048239
                  Cartas de la baraja francesa:
                  https://en.wikipedia.org/wiki/Standard_52-card_deck
                  Poker:
                  https://en.wikipedia.org/wiki/Poker
                  Desarrollo basado en pruebas (TDD):
                  https://en.wikipedia.org/wiki/Test-driven_development
                  Póquer de 7 cartas:
                  https://en.wikipedia.org/wiki/Seven-card_stud
                  http://people.math.sfu.ca/~alspach/comp20/
                      
 *  Historial de revisiones:
                  07/04/2020 - Creación del código (primera versión)
                  14/04/2020 - Versión para evaluación
 */

'use strict';

/**
 * @desc Reparte varias manos de 7 cartas cada una.
   Busca en cada mano si hay alguna escalera.
 * @param {number} numberHands - Número de manos a repartir.
 * @return {boolean} True si hay una escalera en alguna mano. 
 */
function sevenCardPoker(numberHands) {
  let deck = new Deck();
  deck.shuffle(); /* Barajamos el mazo */
  let playersHands = deck.dealHands(numberHands, 7);

  for (let hand = 0; hand < numberHands; hand++) {
    let pokerHand = new PokerHand();
    pokerHand.cards = playersHands[hand].cards;
    if (pokerHand.hasStraight()) {
      console.log('Escalera: ' + pokerHand.cards.toString());
      return true;
    }
  }   
  return false;
}
console.log(sevenCardPoker(7));