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
 * @description:  Contiene el desarrollo de la clase ChessBoard, que representa un tablero de 
                  ajedrez. Contiene las propiedades y los métodos necesarios para dibujar un
                  tablero de ajedrez en un Canvas.

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

const Square = require('./square.js').Square;
const Point = require('./point.js').Point;
const Text = require('./text.js').Text;

/** Clase que representa un tablero de ajedrez. Contiene las propiedades
 * y métodos necesarios para pintar un tablero de ajedrez en un Canvas.
 */
class ChessBoard {

  /**
   * @description Crea un objeto Point.
   * @param {number} size - Dimensiones del tablero.
   */
  constructor(size) {
    this.size = size;
    this.squares = []; // Conjunto de casillas del tablero
  }

  /**
   * @desc Obtiene el tamaño del tablero.
   * @return {number} Tamaño del tablero.
   */
  get boardSize() {
    return this.size;
  }

  /**
   * @desc Establece el tamaño del tablero.
   * @param {number} size - Tamaño del tablero.
   */
  set boardSize(size) {
    this.size = size;
  }

  /**
   * @desc Obtiene el conjunto de casillas del tablero.
   * @return {number} Conjunto de casillas.
   */
  get boardSquares() {
    return this.squares;
  }

  /**
   * @desc Establece el conjunto de casillas del tablero.
   * @param {number} size - Conjunto de casillas.
   */
  set boardSquares(squares) {
    this.squares = squares;
  }

  /* istanbul ignore next */
  /**
   * @desc Crea el tablero de ajedrez y lo pinta en un Canvas.
   * @param {object} CONTEXT - Context del Canvas.
   * @param {object} CANVAS - Canvas donde se dibuja el tablero.
   */
  createBoard(CONTEXT, CANVAS) {
    let height = 0;
    let color = 0;
    let number = 1;
    let letter = 'h';
    for (let width = 0; (width < CANVAS.width && height < CANVAS.height); width += CANVAS.width / this.size) {
      let start = new Point(width, height);
      let square = new Square(CANVAS.width / this.size, start);
      if (color === 0) {
        square.createSquare(CONTEXT, start, "#f0d9b5");
        color = 1;
      } else {
        square.createSquare(CONTEXT, start, "#b58863");
        color = 0;
      }
      this.squares.push(square);

      if (height + (CANVAS.height / this.size) >= CANVAS.height) {
        // Letras del tablero
        let text = new Text(start.xCoor + 5, start.yCoor + 50, "10px Arial", letter);
        text.createText(CONTEXT);
        text.fill(CONTEXT, "black");
        letter = letter.substring(0, letter.length - 1) + // Resta una letra, mediante su código ascii
          String.fromCharCode(letter.charCodeAt(letter.length - 1) - 1);
      }

      if (width + (CANVAS.width / this.size) >= CANVAS.width) {
        width = - CANVAS.width / this.size;
        height += CANVAS.height / this.size;
        // Numeración del tablero
        let text = new Text(start.xCoor + 45, start.yCoor + 10, "10px Arial", number);
        text.createText(CONTEXT);
        text.fill(CONTEXT, "black");
        number++;
        if (color === 0) {
          color = 1;
        } else {
          color = 0;
        }
      }
    }
  }

  /* istanbul ignore next */
  /**
   * @desc Dibuja en el tablero la disposición de las fichas para empezar una
   * nueva partida de ajedrez.
   * @param {object} CONTEXT - Context del Canvas.
   */
  newGame(CONTEXT) {
    for (let square = 0; square < this.squares.length; square++) {
      if (square < 16 || square > 47) {
        let source;
        let currentSquare = this.squares[square];
        if (square >= 8 && square <= 15) {
          source = "peon-blancas.png"; 
          currentSquare.squareLabel = "knight"; // Peón
        } else if (square >= 48 && square <= 55) {
          source = "peon-negras.png";         
          currentSquare.squareLabel = "knight";
        } else if (square === 0 || square === 7) {
          source = "torre-blancas.png";          
          currentSquare.squareLabel = "rook"; // Torre
        } else if (square === 56 || square === 63) {
          source = "torre-negras.png";           
          currentSquare.squareLabel = "rook";
        } else if (square === 1 || square === 6) {
          source = "caballo-blancas.png";           
          currentSquare.squareLabel = "bishop"; // Caballo
        } else if (square === 57 || square === 62) {
          source = "caballo-negras.png";           
          currentSquare.squareLabel = "bishop";
        } else if (square === 2 || square === 5) {
          source = "alfil-blancas.png";           
          currentSquare.squareLabel = "pawn"; // Alfil
        } else if (square === 58 || square === 61) {
          source = "alfil-negras.png";           
          currentSquare.squareLabel = "pawn";
        } else if (square === 3) {
          source = "rey-blancas.png";           
          currentSquare.squareLabel = "king"; // Rey
        } else if (square === 59) {
          source = "rey-negras.png";           
          currentSquare.squareLabel = "king";
        } else if (square === 4) {
          source = "reina-blancas.png";           
          currentSquare.squareLabel = "queen"; // Reina
        } else {
          source = "reina-negras.png";           
          currentSquare.squareLabel = "queen";
        }
        currentSquare.drawPiece(CONTEXT, source, currentSquare.squareXCoor, 
          currentSquare.squareYCoor);
      }
    }
  }
  
  /* istanbul ignore next */
  /**
   * @desc Dibuja en el tablero una solución al problema de las 8 reinas.
   * @param {object} CONTEXT - Context del Canvas.
   * @param {object} solution - Solución del problema de las 8 reinas.
   */
  solution8Queens(CONTEXT, solution) {
    let index = 0;
    for (let row = 0; row < solution.length; row++) {
      let currentRow = solution[row];
      for (let position = 0; position < currentRow.length; position++) {
        index++;
        if (currentRow[position] === '#') {
          index = (row * 8) + position;
          let square = this.squares[index];
          let source = "reina-negras.png";
          square.drawPiece(CONTEXT, source, square.squareXCoor, square.squareYCoor);
        }
      }
    }
  }

  /* istanbul ignore next */
  /**
   * @desc Dibuja en el Canvas la solución al problema de las 8 reinas
   * expresada en notación algebraica.
   * @param {object} CONTEXT - Context del Canvas.
   * @param {object} solution - Solución del problema de las 8 reinas.
   */
  algebraicNotation(CONTEXT, CANVAS, solution) {
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    let coorX = 20;
    let coorY = 50;
    let font = "15px Arial";
    let title = new Text(20, 15, font, "Notación algebraica: " );
    title.createText(CONTEXT);
    title.fill(CONTEXT, "black");
    for (let index = 0; index < solution.length; index++) {
      let word = '';      
      for (let symbol = 0; symbol < solution[index].length; symbol++) {
        if (solution[index][symbol] !== '-' && solution[index][symbol] !== '#') {
          word += solution[index][symbol];
        }
      }
      let text = new Text(coorX, coorY, font, word);
      text.createText(CONTEXT);
      text.fill(CONTEXT, "black");  
      coorY += 30;
    }
  }
}
exports.ChessBoard = ChessBoard;