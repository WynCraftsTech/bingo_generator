import { useState } from 'react';
import BingoCard from './components/BingoCard';
import { generateBingoCard, type BingoCard as BingoCardType } from './utils/bingoLogic';
import './App.css';

export type CardTheme = 'yellow' | 'blue' | 'red' | 'green' | 'pink' | 'orange';

function App() {
  const [card, setCard] = useState<BingoCardType>(generateBingoCard());
  const [isPunuanMode, setIsPunuanMode] = useState(false);
  const [cardTheme, setCardTheme] = useState<CardTheme>('yellow');
  const [printQuantity, setPrintQuantity] = useState<number>(1);
  const [cardsForPrint, setCardsForPrint] = useState<BingoCardType[]>([]);

  const handleGenerateNewCard = () => {
    setCard(generateBingoCard());
  };

  const handlePrint = () => {
    // Generate multiple unique cards for printing
    const cards: BingoCardType[] = [];
    for (let i = 0; i < printQuantity; i++) {
      cards.push(generateBingoCard());
    }
    setCardsForPrint(cards);

    // Small delay to ensure state updates before print dialog
    setTimeout(() => {
      window.print();
      // Clear cards after printing
      setTimeout(() => setCardsForPrint([]), 100);
    }, 100);
  };

  const handleThemeChange = (theme: CardTheme) => {
    setCardTheme(theme);
    setIsPunuanMode(theme === 'orange');
  };

  return (
    <div className="app">
      <header className="app-header no-print">
        <h1 className="app-title">
          {isPunuanMode ? 'PUNUAN GAME' : 'SHEAV BINGO GENERATOR'}
        </h1>
        <p className="app-subtitle">
          {isPunuanMode
            ? 'Fill all spaces to win!'
            : 'Generate your custom SHEAV bingo card'}
        </p>
      </header>

      <main className="app-main">
        <div className="preview-card no-print">
          <BingoCard card={card} cardTheme={cardTheme} />
        </div>

        <div className="theme-selector no-print">
          <p className="theme-label">Select Card Color:</p>
          <div className="theme-buttons">
            <button
              className={`theme-btn theme-yellow ${cardTheme === 'yellow' ? 'active' : ''}`}
              onClick={() => handleThemeChange('yellow')}
            >
              Yellow
            </button>
            <button
              className={`theme-btn theme-blue ${cardTheme === 'blue' ? 'active' : ''}`}
              onClick={() => handleThemeChange('blue')}
            >
              Blue
            </button>
            <button
              className={`theme-btn theme-red ${cardTheme === 'red' ? 'active' : ''}`}
              onClick={() => handleThemeChange('red')}
            >
              Red
            </button>
            <button
              className={`theme-btn theme-green ${cardTheme === 'green' ? 'active' : ''}`}
              onClick={() => handleThemeChange('green')}
            >
              Green
            </button>
            <button
              className={`theme-btn theme-pink ${cardTheme === 'pink' ? 'active' : ''}`}
              onClick={() => handleThemeChange('pink')}
            >
              Pink
            </button>
            <button
              className={`theme-btn theme-orange ${cardTheme === 'orange' ? 'active' : ''}`}
              onClick={() => handleThemeChange('orange')}
            >
              Punuan
            </button>
          </div>
        </div>

        <div className="print-quantity-selector no-print">
          <label htmlFor="quantity" className="quantity-label">
            📄 Number of Cards to Print:
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            max="100"
            value={printQuantity}
            onChange={(e) => setPrintQuantity(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
            className="quantity-input"
          />
          <span className="quantity-hint">
            {printQuantity} {printQuantity === 1 ? 'card' : 'cards'} will be printed
          </span>
        </div>

        <div className="controls no-print">
          <button
            className="btn btn-primary"
            onClick={handleGenerateNewCard}
          >
            Generate New Card
          </button>

          <button
            className="btn btn-print"
            onClick={handlePrint}
          >
            Print {printQuantity} {printQuantity === 1 ? 'Card' : 'Cards'}
          </button>
        </div>
      </main>

      {/* Print-only section with all cards */}
      <div className="print-only">
        {cardsForPrint.map((printCard, index) => (
          <div key={index} className="print-card-container">
            <BingoCard card={printCard} cardTheme={cardTheme} />
          </div>
        ))}
      </div>

      <footer className="app-footer no-print">
        <p>© 2026 SHEAV Bingo Generator</p>
      </footer>
    </div>
  );
}

export default App;
