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
 * @description:  Contiene la implementación de la clase PokerHand, que hereda de la clase Hand.
                  Representa una mano de Póquer, e incluye métodos que comprueban si la mano 
                  contiene una escalera, una pareja, un trío, etc. Asimismo, el método classify 
                  clasifica las manos, de modo que si hay más de una posible mano ganadora de 
                  póquer, prevalezca la de mayor valor. Por último, se incluye una función que
                  calcula las probabilidades que hay de obtener las distintas manos ganadoras.
                  
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
                  Probabilidades del Póquer:
                  https://en.wikipedia.org/wiki/Poker_probability
                      
 *  Historial de revisiones:
                  07/04/2020 - Creación del código (primera versión)
                  14/04/2020 - Versión para evaluación
 */

'use strict';

/** Clase que representa una mano de Póquer. Hereda de la clase Hand. */
class PokerHand extends Hand {

  /**
   * @desc Crea un objeto de tipo PokerHand. Llama al constructor
     de la clase padre.
   * @constructor
   * @param {string} label - Nombre identificador de la mano.
   */
  constructor(label) {
    super(label);
  }

  /**
   * @desc Comprueba si hay una pareja en la mano de póquer.
   * @constructor
   * @return {boolean} True si hay alguna pareja.
   */
  hasPair() {
    for (let card = 0; card < this.cards.length; card++) {
      let rank = this.cards[card].rank;
      let suit = this.cards[card].suit;
      for (let index = 0; index < this.cards.length; index++) {
        let playerCard = this.cards[index];
        if ((playerCard.rank === rank) && (playerCard.suit !== suit)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * @desc Comprueba si hay una doble pareja en la mano de póquer.
   * @constructor
   * @return {boolean} True si hay alguna doble pareja.
   */
  hasTwoPair() {
    let counter = 0;
    let arrayCards = this.cards.slice(); /* Copia el array para ir borrando parejas ya cogidas */

    for (let card = 0; card < arrayCards.length; card++) {
      let rank = arrayCards[card].rank;
      let suit = arrayCards[card].suit;
      for (let index = 0; index < arrayCards.length; index++) {
        let playerCard = arrayCards[index];
        if ((playerCard.rank === rank) && (playerCard.suit !== suit)) {
          counter++;          
          /* Eliminamos la pareja de la mano para evitar repeticiones */
          let firstCard = arrayCards.indexOf(arrayCards[card]);
          arrayCards.splice(firstCard, 1);
          let secondCard = arrayCards.indexOf(playerCard);
          arrayCards.splice(secondCard, 1);            
        }
      }
      if (counter === 2) { /* Si hay dos parejas devuelve true */
        return true;
      }
    }
    return false;
  }

  /**
   * @desc Comprueba si hay un trío en la mano de póquer.
   * @constructor
   * @return {boolean} True si hay algún trío.
   */
  hasThreeOfaKind() {
    let arrayCards = this.cards.slice();
    for (let card = 0; card < arrayCards.length; card++) {
      let rank = arrayCards[card].rank;
      let suit = arrayCards[card].suit;
      for (let index = 0; index < arrayCards.length; index++) {
        let playerCard = arrayCards[index];
        if ((playerCard.rank === rank) && (playerCard.suit !== suit)) {
          let firstCard = arrayCards.indexOf(arrayCards[card]);
          arrayCards.splice(firstCard, 1);
          let secondCard = arrayCards.indexOf(playerCard);
          arrayCards.splice(secondCard, 1);
          for (let index2 = 0; index2 < arrayCards.length; index2++) {
            if (arrayCards[index2].rank === playerCard.rank) {
              return true;
            }
          }          
        }
      }
    }
    return false;
  }

  /**
   * @desc Comprueba si hay una escalera en la mano de póquer.
   * @constructor
   * @return {boolean} True si hay alguna escalera.
   */
  hasStraight() {
    let ranks = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
    let solution = [];
    let playerHand = this.cards.slice();
    playerHand.sort(function (cardA, cardB) { /* Ordena las cartas solo por número */
      return(ranks.indexOf(cardA.rank) - ranks.indexOf(cardB.rank));
    });
    /* Comprobamos que haya escalera en la mano */
    for (let card = 0; card < playerHand.length; card++) {
      if (solution.length === 5) {
        if (ranks.indexOf(solution[0].rank) <= 9) { /* Si empieza en jack ya no es escalera */          
          return true;
        } else {
          solution = [];
        }
      } else if (this.search(ranks, playerHand, playerHand[card]) !== -1 ) {
        if (solution.length === 0) {
          solution.push(playerHand[card]);
        }
        if (!this.findCard(solution, this.search(ranks, playerHand, playerHand[card]))) {
          solution.push(this.search(ranks, playerHand, playerHand[card]));
        }        
      } else {
        solution = [];
      }
    }
    return false;
  }


  /**
   * @desc Comprueba si existe la siguiente carta de la escalera en la mano.
   * @param {object} ranks - Array con los rangos posibles de cartas.
   * @param {object} arrayCards - Mano del jugador.
   * @param {Card} card - Última carta de nuestra solución hasta ahora.
   * Si es un 'ace', se comprueba si existe un 2 en la mano.
   * @return {Card} Carta que vamos a añadir a la solución.
   */
  search(ranks, arrayCards, card) {
    for (let playerCard = 0; playerCard < arrayCards.length; playerCard++) {
      let aux = arrayCards[playerCard];
      let index = ranks.indexOf(card.rank);
      /* Si es el rey, ponemos el índice a -1 para comparar 
        con la siguiente carta (ace), cuyo índice es 0 */
      if (ranks.indexOf(card.rank) === 12) {
        index = -1;
      }
      if (ranks.indexOf(aux.rank) - index === 1) {
        return arrayCards[playerCard];
      } 
    }
    return -1;
  }

  /**
   * @desc Comprueba si una carta ya está en el vector de soluciones
   * para evitar duplicarla.
   * @param {object} arrayCards - Vector de solución.
   * @param {Card} card - Carta que vamos a comprobar.
   * @return {boolean} True si la carta ya ha sido añadida antes.
   */
  findCard(arrayCards, card) {
    for (let playerCard = 0; playerCard < arrayCards.length; playerCard++) {
      let rank = arrayCards[playerCard].rank;
      let suit = arrayCards[playerCard].suit;
      if ((card.rank === rank) && (card.suit === suit)) {
        return true;
      }
    }
    return false;
  }

  /**
   * @desc Comprueba si hay color en la mano de póquer.
   * @constructor
   * @return {boolean} True si hay color.
   */
  hasFlush() {
    let solution = [];
    let counter = 1;
    for (let card = 0; card < this.cards.length; card++) {
      let firstCard = this.cards[card];
      if (!this.findCard(solution, firstCard)) {
        solution.push(firstCard);
      }
      for (let index = 0; index < this.cards.length; index++) {
        let currentCard = this.cards[index];
        if (currentCard.suit === firstCard.suit) {
          if (!this.findCard(solution, currentCard)) {
            counter++;
            solution.push(currentCard);
          }
        }
      }
      if (counter >= 5) {
        return true;
      } else {
        counter = 0;
        solution = [];
      }
    }
    return false;
  }

  /**
   * @desc Comprueba si hay una pareja y un trío.
   * @constructor
   * @return {boolean} True si hay una pareja y un trío.
   */
  hasFullHouse() {
    if ((this.hasTwoPair()) && (this.hasThreeOfaKind())) {
      return true;
    }
    return false;
  }

  /**
   * @desc Comprueba si hay póquer (4 cartas con igual valor).
   * @constructor
   * @return {boolean} True si hay póquer.
   */
  hasFourOfAKind() {
    let solution = [];
    for (let card = 0; card < this.cards.length; card++) {
      let firstCard = this.cards[card];
      if (!this.findCard(solution, firstCard)) {
        solution.push(firstCard);
      }
      for (let index = 0; index < this.cards.length; index++) {
        let currentCard = this.cards[index];
        if (currentCard.rank === firstCard.rank) {
          if (!this.findCard(solution, currentCard)) {
            solution.push(currentCard);
          }
        }
      }
      if (solution.length === 4) {
        return true;
      } else {
        solution = [];
      }
    }
    return false;
  }

  /**
   * @desc Comprueba si hay escalera de color.
   * @constructor
   * @return {boolean} True si hay escalera de color.
   */
  hasStraightFlush() {
    let hearts = new PokerHand();
    let diamonds = new PokerHand();
    let clubs = new PokerHand();
    let spades = new PokerHand();
    for (let card = 0; card < this.cards.length; card++) {
      if (this.cards[card].suit === 'hearts') {
        hearts.addCard(this.cards[card]);
      } else if (this.cards[card].suit === 'diamonds') {
        diamonds.addCard(this.cards[card]);
      } else if (this.cards[card].suit === 'clubs') {
        clubs.addCard(this.cards[card]);
      } else {
        spades.addCard(this.cards[card]);
      }
    }
    if ((hearts.hasStraight()) || (diamonds.hasStraight()) ||
      (clubs.hasStraight()) || (spades.hasStraight())) {
      return true;
    }
    return false;
  }

  /**
   * @desc Clasifica las manos según su valor.
   * @constructor
   */
  classify() {
    if (this.hasStraightFlush()) {
      this.handLabel = 'Straight Flush';
    } else if (this.hasFourOfAKind()) {
      this.handLabel = 'Four of a Kind';
    } else if (this.hasFullHouse()) {
      this.handLabel = 'Full House';
    } else if (this.hasFlush()) {
      this.handLabel = 'Flush';
    } else if (this.hasStraight()) {
      this.handLabel = 'Straight';
    } else if (this.hasThreeOfaKind()) {
      this.handLabel = 'Three of a Kind';
    } else if (this.hasTwoPair()) {
      this.handLabel = 'Two pair';
    } else if (this.hasPair()) {
      this.handLabel = 'Pair';
    } else {
      this.handLabel = '';
    }
  }

  /**
   * @desc Indica, entre dos manos de Póquer, cuál gana.
   * @constructor
   * @param {PokerHand} hand - Mano de póquer.
   */
  selectWinner(hand) {
    let posibilities = ['Pair', 'Two Pair', 'Three of a Kind', 'Straight', 
      'Flush', 'Full House', 'Four of a Kind', 'Straight Flush'];
    this.classify();
    hand.classify();
    if (posibilities.indexOf(this.classify) > posibilities.indexOf(hand.classify)) {
      return "Gana el jugador 1";
    } else {
      return "Gana el jugador 2";
    }
  }
}

/**
 * @desc Calcula las probabilidades de cada mano ganadora en Póquer.
 * @param {number} numberIterations - Número de iteraciones.
 * @param {number} numberHands - Número de manos a generar.
 * @param {number} numberCards - Número de cartas por mano.
 * @constructor
 */
function probabilities(numberIterations, numberHands, numberCards) {
  let pair = 0, twoPair = 0, threeOfaKind = 0, straight = 0,
    flush = 0, fullHouse = 0, fourOfAKind = 0, straightFlush = 0;
  for (let index = 0; index < numberIterations; index++) {    
    for (let hand = 0; hand < numberHands; hand++) {
      let deck = new Deck();
      deck.shuffle();
      let pokerHand = new PokerHand();
      for (let card = 0; card < numberCards; card++) {
        pokerHand.addCard(deck.popCard());
      }
      pokerHand.classify();
      if (pokerHand.handLabel === 'Pair') {
        pair++;
      } else if (pokerHand.handLabel === 'Two pair') {
        twoPair++;
      } else if (pokerHand.handLabel === 'Three of a Kind') {
        threeOfaKind++;
      } else if (pokerHand.handLabel === 'Straight') {
        straight++;
      } else if (pokerHand.handLabel === 'Flush') {
        flush++;
      } else if (pokerHand.handLabel === 'Full House') {
        fullHouse++;
      } else if (pokerHand.handLabel === 'Four of a Kind') {
        fourOfAKind++;
      } else if (pokerHand.handLabel === 'Straight Flush') {
        straightFlush++;
      }
    }
  }
  let arraySolutions = [];
  let statistics = {};
  arraySolutions.push(statistics = {
    hand: 'Pair',
    probability: ((pair / (numberIterations * numberHands)) * 100).toFixed(2)
  });
  arraySolutions.push(statistics = {
    hand: 'Two pair',
    probability: ((twoPair / (numberIterations * numberHands)) * 100).toFixed(2)
  });
  arraySolutions.push(statistics = {
    hand: 'Three of a Kind',
    probability: ((threeOfaKind / (numberIterations * numberHands)) * 100).toFixed(2)
  });
  arraySolutions.push(statistics = {
    hand: 'Straight',
    probability: ((straight / (numberIterations * numberHands)) * 100).toFixed(2)
  });
  arraySolutions.push(statistics = {
    hand: 'Flush',
    probability: ((flush / (numberIterations * numberHands)) * 100).toFixed(2)
  });
  arraySolutions.push(statistics = {
    hand: 'Full House',
    probability: ((fullHouse / (numberIterations * numberHands)) * 100).toFixed(2)
  });
  arraySolutions.push(statistics = {
    hand: 'Four of a Kind',
    probability: ((fourOfAKind / (numberIterations * numberHands)) * 100).toFixed(3)
  });
  arraySolutions.push(statistics = {
    hand: 'Straight Flush',
    probability: ((straightFlush / (numberIterations * numberHands)) * 100).toFixed(3)
  });

  return arraySolutions;
}
