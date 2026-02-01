import type { BingoCard as BingoCardType } from '../utils/bingoLogic';
import type { CardTheme } from '../App';
import './BingoCard.css';

interface BingoCardProps {
    card: BingoCardType;
    cardTheme: CardTheme;
}

const BingoCard = ({ card, cardTheme }: BingoCardProps) => {
    const headers: ('S' | 'H' | 'E' | 'A' | 'V')[] = ['S', 'H', 'E', 'A', 'V'];

    const getThemeColor = (): string => {
        switch (cardTheme) {
            case 'yellow': return '#FFD700';
            case 'blue': return '#0000FF';
            case 'red': return '#FF0000';
            case 'green': return '#008000';
            case 'pink': return '#FFC0CB';
            case 'orange': return '#FF8800';
            default: return '#FFD700';
        }
    };

    return (
        <div className={`bingo-card theme-${cardTheme}`}>
            <div className="card-theme-indicator" style={{ backgroundColor: getThemeColor() }}>
                <span className="theme-text">{cardTheme.toUpperCase()} CARD</span>
            </div>

            <div className="bingo-header" style={{ backgroundColor: getThemeColor() }}>
                {headers.map((letter) => (
                    <div
                        key={letter}
                        className="header-cell"
                        style={{ backgroundColor: getThemeColor() }}
                    >
                        {letter}
                    </div>
                ))}
            </div>

            <div className="bingo-body">
                {card.map((row, rowIndex) => (
                    <div key={rowIndex} className="bingo-row">
                        {row.map((cell, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`bingo-cell ${cell.value === 'FREE' ? 'free-cell' : ''}`}
                            >
                                {cell.value}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BingoCard;
