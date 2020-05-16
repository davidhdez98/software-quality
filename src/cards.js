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
 * @description:  Contiene la implementación de la clase Card, que crea un objeto que queda
                  definido por dos propiedades, su número y su palo. Asimismo, se implementan
                  los getters y setters de cada propiedad, así como un método toString() para
                  la visualización de la carta y un método compareCards que compara dos cartas
                  y devuelve la mayor de ellas.
                  
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

/** Clase que representa una carta de la baraja francesa. */
class Card {

  /**
   * @desc Crea un objeto de tipo Card.
   * @constructor
   * @param {number} rank - Número de la carta.
   * @param {number} suit - Palo de la carta.
   */
  constructor(rank, suit) {
    if ((rank !== undefined) && (suit !== undefined)) {
      this.rank = rank;
      this.suit = suit;
    } else {
      this.rank = 2;
      this.suit = 'Clubs';
    }
  }

  /**
   * @desc Obtiene el número de la carta.
   * @return {number} Número de la carta.
   */
  get cardRank() {
    return this.rank;
  }

  /**
   * @desc Obtiene el palo de la carta.
   * @return {number} Palo de la carta.
   */
  get cardSuit() {
    return this.suit;
  }

  /**
   * @desc Modifica el número de la carta.
   * @param {object} cardRank - Número de la carta.
   */
  set cardRank(rank) {
    this.rank = rank;
  }

  /**
   * @desc Modifica el palo de la carta.
   * @param {object} cardSuit - Palo de la carta.
   */
  set cardSuit(suit) {
    this.suit = suit;
  }

  /**
   * @desc Imprime un objeto Card.
   * @return {object} Objeto Card.
   */
  toString() {
    return this.rank + ' of ' + this.suit;
  }

  /**
   * @desc Compara dos objetos Card.
   * @param {object} card - Segunda carta.
   * @return {object} Objeto Card mayor.
   */
  compareCards(card) {
    if (this.suit !== card.suit) {
      let vector = ['Clubs', 'Diamonds', 'Dearts', 'Spades'];
      let card1Suit, card2Suit;
      /* Asigna un número a cada palo para poderlo ordenar más fácilmente */
      for (let index = 0; index < vector.length; index++) {
        if (this.suit === vector[index]) {
          card1Suit = index;
        }
        if (card.suit === vector[index]) {
          card2Suit = index;
        }
      }
      return Math.max(card1Suit, card2Suit) === card1Suit ? this : card;
      
    } else {
      let vector = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
      let card1Rank, card2Rank;
      /* Asigna un número a cada rango */
      for (let index = 0; index < vector.length; index++) {
        if (this.rank === vector[index]) {
          card1Rank = index;
        }
        if (card.rank === vector[index]) {
          card2Rank = index;
        }
      }
      return Math.max(card1Rank, card2Rank) === card1Rank ? this : card;
    }
  }

  /**
   * @desc Dibuja en el Canvas la imagen de la carta de la mano.
   * @param {object} CONTEXT - Context del Canvas.
   * @param {string} source - Ruta de la imagen de la pieza.
   * @param {number} coorX - Coordenada 'X' donde se dibuja la pieza.
   * @param {number} coorY - Coordenada 'Y' donde se dibuja la pieza.
   */
  drawCard(CONTEXT, source, coorX, coorY) {
    let image = new Image();
    image.onload = function () {
      CONTEXT.drawImage(image, coorX, coorY, 140, 170);
    }
    image.src = source;
  }
}

let c = new Card(6);
console.log(c.toString());