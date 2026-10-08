import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../../utils/sound';

const ROWS = 9;
const COLS = 9;
const MINES = 10;

export default function MinesweeperApp() {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [face, setFace] = useState('🙂');
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [flagCount, setFlagCount] = useState(MINES);

  // Initialize board
  const initBoard = useCallback(() => {
    const newBoard = Array(ROWS).fill(null).map((_, r) =>
      Array(COLS).fill(null).map((_, c) => ({
        row: r,
        col: c,
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0
      }))
    );

    // Place mines randomly
    let placedMines = 0;
    while (placedMines < MINES) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (!newBoard[r][c].isMine) {
        newBoard[r][c].isMine = true;
        placedMines++;
      }
    }

    // Calculate neighbors
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!newBoard[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                if (newBoard[nr][nc].isMine) count++;
              }
            }
          }
          newBoard[r][c].neighborMines = count;
        }
      }
    }

    setBoard(newBoard);
    setGameOver(false);
    setGameWon(false);
    setFace('🙂');
    setTimer(0);
    setTimerActive(false);
    setFlagCount(MINES);
  }, []);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  // Timer
  useEffect(() => {
    let interval = null;
    if (timerActive && !gameOver && !gameWon) {
      interval = setInterval(() => {
        setTimer(t => Math.min(999, t + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, gameOver, gameWon]);

  const revealCell = (r, c) => {
    if (gameOver || gameWon) return;
    const cell = board[r][c];
    if (cell.isRevealed || cell.isFlagged) return;

    if (!timerActive) setTimerActive(true);

    const newBoard = board.map(row => row.map(cell => ({ ...cell })));

    if (cell.isMine) {
      // Game over
      playSound('error');
      setGameOver(true);
      setFace('😵');
      setTimerActive(false);
      // Reveal all mines
      newBoard.forEach(row => row.forEach(c => {
        if (c.isMine) c.isRevealed = true;
      }));
      setBoard(newBoard);
      return;
    }

    playSound('click');

    // Flood fill
    const stack = [[r, c]];
    while (stack.length > 0) {
      const [currR, currC] = stack.pop();
      const curr = newBoard[currR][currC];
      if (curr.isRevealed || curr.isFlagged) continue;

      curr.isRevealed = true;

      if (curr.neighborMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = currR + dr;
            const nc = currC + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
              if (!newBoard[nr][nc].isRevealed && !newBoard[nr][nc].isMine) {
                stack.push([nr, nc]);
              }
            }
          }
        }
      }
    }

    // Check win condition
    let unrevealedSafeCells = 0;
    newBoard.forEach(row => row.forEach(c => {
      if (!c.isMine && !c.isRevealed) unrevealedSafeCells++;
    }));

    if (unrevealedSafeCells === 0) {
      playSound('success');
      setGameWon(true);
      setFace('😎');
      setTimerActive(false);
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {}
    }

    setBoard(newBoard);
  };

  const toggleFlag = (e, r, c) => {
    e.preventDefault();
    if (gameOver || gameWon) return;
    const cell = board[r][c];
    if (cell.isRevealed) return;

    playSound('click');
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    const target = newBoard[r][c];

    if (!target.isFlagged && flagCount > 0) {
      target.isFlagged = true;
      setFlagCount(f => f - 1);
    } else if (target.isFlagged) {
      target.isFlagged = false;
      setFlagCount(f => f + 1);
    }

    setBoard(newBoard);
  };

  const getNumberColor = (num) => {
    switch (num) {
      case 1: return 'text-blue-500';
      case 2: return 'text-emerald-500';
      case 3: return 'text-rose-500';
      case 4: return 'text-purple-600';
      case 5: return 'text-amber-600';
      case 6: return 'text-cyan-600';
      default: return 'text-slate-200';
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 bg-[#c0c0c0] text-black select-none">
      <div className="p-3 bg-[#c0c0c0] border-4 border-t-white border-l-white border-b-[#808080] border-r-[#808080] shadow-md">
        {/* Header Display */}
        <div className="flex items-center justify-between p-2 mb-3 bg-[#c0c0c0] border-3 border-t-[#808080] border-l-[#808080] border-b-white border-r-white">
          {/* Mine counter */}
          <div className="bg-black text-rose-500 font-mono text-xl font-bold px-2 py-0.5 border border-[#808080]">
            {String(flagCount).padStart(3, '0')}
          </div>

          {/* Face button */}
          <button
            onClick={() => { playSound('click'); initBoard(); }}
            onMouseDown={() => !gameOver && !gameWon && setFace('😮')}
            onMouseUp={() => !gameOver && !gameWon && setFace('🙂')}
            className="w-9 h-9 text-lg flex items-center justify-center bg-[#c0c0c0] border-3 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white cursor-pointer"
          >
            {face}
          </button>

          {/* Timer */}
          <div className="bg-black text-rose-500 font-mono text-xl font-bold px-2 py-0.5 border border-[#808080]">
            {String(timer).padStart(3, '0')}
          </div>
        </div>

        {/* Board Grid */}
        <div className="grid grid-cols-9 gap-0 border-3 border-t-[#808080] border-l-[#808080] border-b-white border-r-white bg-[#808080]">
          {board.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => revealCell(r, c)}
                onContextMenu={(e) => toggleFlag(e, r, c)}
                className={`w-7 h-7 sm:w-8 sm:h-8 font-bold text-sm flex items-center justify-center cursor-pointer transition-none ${
                  cell.isRevealed
                    ? cell.isMine
                      ? 'bg-rose-500 text-black border border-[#808080]'
                      : 'bg-[#bdbdbd] border border-[#808080]'
                    : 'bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:border-[#808080]'
                }`}
              >
                {cell.isRevealed ? (
                  cell.isMine ? '💣' : cell.neighborMines > 0 ? (
                    <span className={getNumberColor(cell.neighborMines)}>
                      {cell.neighborMines}
                    </span>
                  ) : null
                ) : cell.isFlagged ? (
                  '🚩'
                ) : null}
              </button>
            ))
          )}
        </div>
      </div>
      <p className="text-[11px] text-slate-600 mt-2">
        Klik Kiri: Buka Kotak | Klik Kanan: Pasang Bendera (🚩)
      </p>
    </div>
  );
}
