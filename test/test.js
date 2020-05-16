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
 * @description:  Contiene el desarrollo de los tests de la aplicación. Contiene las pruebas de los
                  distintos métodos de las clases Point y Chess.
                  
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

//const ASSERT = chai.assert;
//const EXPECT = chai.expect;
const ASSERT = require('chai').assert;
const EXPECT = require('chai').expect;

const Point = require('../src/point.js').Point;
const Line = require('../src/line.js').Line;
const Text = require('../src/text.js').Text;
const Square = require('../src/square.js').Square;
const ChessBoard = require('../src/chessboard.js').ChessBoard;
const EightQueens = require('../src/8queens.js').EightQueens;

// Tests de la clase Point
describe('Tests de la clase Point', () => {
  const POINT = new Point(23, 42);
  //const CANVAS = document.getElementById('canvas');
  //const CONTEXT = CANVAS.getContext('2d');

  // Getters
  it('Getter de la coordenada X', function () {
    ASSERT.equal(POINT.xCoor, 23);
  });

  it('Getter de la coordenada Y', function () {
    ASSERT.equal(POINT.yCoor, 42);
  });

  // Setters
  it('Setter de la coordenada X', function () {
    POINT.xCoor = 10; 
    ASSERT.equal(POINT.xCoor, 10);
  });

  it('Setter de la coordenada Y', function () {
    POINT.yCoor = 50;
    ASSERT.equal(POINT.yCoor, 50);
  });

  /*it('drawPoint dibuja un punto en el Canvas', function () {
    POINT.drawPoint(CONTEXT, 5, "blue");
    ASSERT.equal(CONTEXT.strokeStyle, '#0000ff'); 
  });*/

  it('random crea un número aleatorio', function () {
    let number = POINT.random(10, 20);
    ASSERT.isNumber(number); 
  });
});

// Tests de la clase Line
describe('Tests de la clase Line', () => {  
  const LINE = new Line(-2, 10);

  it('Constructor por defecto', function () {
    const defaultLine = new Line();
    ASSERT.equal(defaultLine.slope, 0);
    ASSERT.equal(defaultLine.intercept, 0);
  });

  // Getters
  it('Getter de la pendiente de la recta', function () {
    ASSERT.equal(LINE.lineSlope, -2);
  });

  it('Getter de la ordenada de la recta', function () {
    ASSERT.equal(LINE.lineIntercept, 10);
  });

  // Setters
  it('Setter de la pendiente de la recta', function () {
    LINE.lineSlope = 3;
    ASSERT.equal(LINE.lineSlope, 3);
  });

  it('Setter de la ordenada de la recta', function () {
    LINE.lineIntercept = 7;
    ASSERT.equal(LINE.lineIntercept, 7);
  });

  it('Método lineFromTo: calcula la recta entre dos puntos', function () {
    let firstPoint = new Point(40, 30);
    let secondPoint = new Point(35, 20);
    let newLine = LINE.lineFromTo(firstPoint, secondPoint);
    EXPECT(firstPoint).to.be.an.instanceof(Point);
    ASSERT.equal(newLine.lineSlope, 2);
    ASSERT.equal(newLine.lineIntercept, -50);
  });

  it('Método isPointInLine: true si el punto pertenece a la recta', function () {
    let pointFalse = new Point(5, 6);
    let pointTrue = new Point(10, 37);
    let line = LINE.isPointInLine(pointFalse);
    ASSERT.equal(line, false);
    line = LINE.isPointInLine(pointTrue);
    ASSERT.equal(line, true);
  });
});

// Tests de la clase Square
describe('Tests de la clase Square', () => {
  //const CANVAS = document.getElementById('canvas');
  //const CONTEXT = CANVAS.getContext('2d');
  let square = new Square(0, new Point(5, 10));

  // Getters
  it('Getter del tamaño de la casilla', function () {
    ASSERT.equal(square.squareSize, 0);
  });

  it('Getter de la coordenada X inicial', function () {
    ASSERT.equal(square.squareXCoor, 6);
  });

  it('Getter de la coordenada Y inicial', function () {
    ASSERT.equal(square.squareYCoor, 10);
  });

  it('Getter de la etiqueta de la casilla', function () {
    ASSERT.equal(square.squareLabel, '');
  });

  // Setters
  it('Setter del tamaño de la casilla', function () {
    square.squareSize = 10;
    ASSERT.equal(square.squareSize, 10);
  });

  it('Setter de la coordenada X inicial', function () {
    square.squareXCoor = 14;
    ASSERT.equal(square.squareXCoor, 14);
  });

  it('Setter de la coordenada Y inicial', function () {
    square.squareYCoor = 16;
    ASSERT.equal(square.squareYCoor, 16);
  });

  it('Getter de la etiqueta de la casilla', function () {
    square.squareLabel = 'king';
    ASSERT.equal(square.squareLabel, 'king');
  });

  /*it('Método createSquare: pinta la casilla en el Canvas', function () {
    square.createSquare(CONTEXT, new Point(0, 0), "black");
    ASSERT.equal(CONTEXT.strokeStyle, '#000000'); // Código del color negro
  });

  it('Método drawPiece: dibuja en la casilla una pieza de ajedrez', function () {
    square.squareLabel = 'king';
    ASSERT.equal(square.squareLabel, 'king');
    let source = 'img/peon-negras.png';
    let point = new Point(10, 15);
    square.drawPiece(CONTEXT, source, point.xCoor, point.yCoor);
    EXPECT(source).to.be.a('string');
  });*/
});

// Tests de la clase ChessBoard
describe('Tests de la clase ChessBoard', () => {
  //const CANVAS = document.getElementById('canvas');
  //const CONTEXT = CANVAS.getContext('2d');
  let board = new ChessBoard(10);

  // Getters
  it('Getter del tamaño del tablero', function () {
    ASSERT.equal(board.boardSize, 10);
  });

  it('Getter del conjunto de casillas del tablero', function () {
    ASSERT.equal(board.boardSquares, '');
  });

  // Setters
  it('Setter del tamaño del tablero', function () {
    board.boardSize = 8;
    ASSERT.equal(board.boardSize, 8);
  });

  it('Setter del conjunto de casillas del tablero', function () {
    let squares = [];
    squares.push(new Square(10, new Point(5, 10)));
    board.boardSquares = squares;
    EXPECT(board.boardSquares[0]).to.be.an('object');
  });

  /*it('Método createBoard: crea el tablero y lo pinta en el Canvas', function () {
    board.createBoard(CONTEXT, CANVAS);
    ASSERT.equal(board.squares.length, 1);
  });

  it('Método newGame: dibuja las fichas del comienzo del juego en el tablero', function () {
    board.newGame(CONTEXT);
    ASSERT.equal(board.squares[0].label, 'rook'); // Hay una torre en el tablero
  });*/
});

// Tests de la clase EightQueens
describe('Tests de la clase EightQueens', () => {
  let queens = new EightQueens(10, false); // Problema no generalizado

  // Getters
  it('Getter del tamaño del problema', function () {
    ASSERT.equal(queens.problemSize, 10);
  });

  it('Getter del tipo del problema', function () {
    ASSERT.equal(queens.problemType, false);
  });

  it('Getter del conjunto de reinas', function () {
    ASSERT.equal(queens.arrayQueens.length, 10);
  });

  // Setters
  it('Setter del tamaño del problema', function () {
    queens.problemSize = 8;
    ASSERT.equal(queens.problemSize, 8);
  });

  it('Setter del tipo del problema', function () {
    queens.problemType = true;
    ASSERT.equal(queens.problemType, true);
  });

  it('Setter del tipo del conjunto de reinas', function () {
    queens.arrayQueens = [];
    ASSERT.equal(queens.arrayQueens.length, 0);
  });

  it('Método comprobarReina: true si se puede introducir una reina', function () {
    let problem = new EightQueens(8);
    let queen = problem.comprobarReina(5);
    ASSERT.equal(queen, false);
  });

  it('Método colocarReina: coloca las reinas en el tablero', function () {
    let problem = new EightQueens(8, false);
    problem.colocarReina(0);
    ASSERT.equal(problem.arraySolutions.length, 92);
    let secondProblem = new EightQueens(8, true);
    secondProblem.colocarReina(0);
    ASSERT.equal(secondProblem.arraySolutions.length, 8);
  });

  it('Método visualizarTablero: visualiza en notación algebraica las soluciones', function () {
    let problem = new EightQueens(8, false);
    problem.colocarReina(0);
    problem.visualizarTablero();
    ASSERT.equal(problem.arraySolutions[0][0], '#-------h 1'); // Notación algebraica
  });
});

// Tests de la clase Text
describe('Tests de la clase Text', () => {
  let point = new Point(10, 20);
  let font = "30px Arial";
  let content = "Texto de prueba";
  let text = new Text(point.xCoor, point.yCoor, font, content);

  // Getters
  it('Getter de la coordenada X de destino', function () {
    ASSERT.equal(text.textCoorX, 10);
  });

  it('Getter de la coordenada Y de destino', function () {
    ASSERT.equal(text.textCoorY, 20);
  });

  it('Getter de la fuente y tamaño del texto', function () {
    ASSERT.equal(text.textFont, "30px Arial");
  });

  it('Getter del contenido del texto', function () {
    ASSERT.equal(text.textContent, "Texto de prueba");
  });

  // Setters
  it('Setter de la coordenada X de destino', function () {
    text.textCoorX = 15;
    ASSERT.equal(text.textCoorX, 15);
  });

  it('Setter de la coordenada Y de destino', function () {
    text.textCoorY = 3;
    ASSERT.equal(text.textCoorY, 3);
  });

  it('Setter de la fuente y tamaño del texto', function () {
    text.textFont = "25px Comic Sans MS"
    ASSERT.equal(text.textFont, "25px Comic Sans MS");
  });

  it('Setter del contenido del texto', function () {
    text.textContent = "Cambiando el contenido";
    ASSERT.equal(text.textContent, "Cambiando el contenido");
  });
});