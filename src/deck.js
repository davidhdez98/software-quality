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
 * @description:  Contiene la implementación de la clase Deck, que crea un array de objetos
                  Card, es decir, un conjunto de cartas, formado por las 52 cartas de la 
                  baraja francesa. Incluye métodos nuevos para barajar el mazo y para repartir
                  cartas. Por último, se incluye un método que imprime el mazo de cartas.
                  
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
                      
 *  Historial de revisiones:
                  07/04/2020 - Creación del código (primera versión)
                  14/04/2020 - Versión para evaluación
 */

'use strict';

/** Clase que representa un mazo de cartas. */
class Deck extends GlobalHand {

  /**
   * @desc Crea un objeto de tipo Mazo.
   * @constructor
   * @param {object} cards - Array de cartas.
   */
  constructor() {
    super();
    const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'];
    const RANKS = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
    for (let suitPos = 0; suitPos < SUITS.length; suitPos++) {
      for (let rankPos = 0; rankPos < RANKS.length; rankPos++) {
        let card = new Card(RANKS[rankPos], SUITS[suitPos]);
        this.cards.push(card);
      }
    }
  }

  /**
   * @desc Imprime el mazo de cartas.
   * @return {object} Array de cartas.
   */
  printDeck() {
    for (let index = 0; index < this.cards.length; index++) {
      console.log(this.cards[index] + "");
    }
    return this.cards.toString();
  }

  /**
   * @desc Desordena el mazo de cartas(barajar).
   * @return {object} Array de cartas.
   */
  shuffle() {
    this.cards = this.cards.sort(function() { return Math.random() - 0.5});
    return this.cards;
  }

  /**
   * @desc Ejercicio 01. Crea n manos de cartas de
     x cartas cada una.
   * @param {number} numberHands - Número de manos.
   * @param {number} numberCards - Número de cartas por mano.
   * @return {object} Lista de manos.
   */
  dealHands(numberHands, numberCards) {
    let listHands = [];
    for (let hand = 0; hand < numberHands; hand++) {
      let newHand = new Hand();
      for (let card = 0; card < numberCards; card++) {
        let newCard = this.popCard();
        newHand.addCard(newCard);
      }
      listHands.push(newHand);
    }
    return listHands;
  }
}