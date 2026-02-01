export interface BingoCell {
    value: number | 'FREE';
    column: 'S' | 'H' | 'E' | 'A' | 'V';
}

export type BingoCard = BingoCell[][];

/**
 * Generates random unique numbers for a specific range
 */
function getRandomNumbers(min: number, max: number, count: number): number[] {
    const numbers: number[] = [];
    const available = Array.from({ length: max - min + 1 }, (_, i) => min + i);

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * available.length);
        numbers.push(available[randomIndex]);
        available.splice(randomIndex, 1);
    }

    return numbers;
}

/**
 * Generates a complete SHEAV bingo card
 * S: 1-15, H: 16-30, E: 31-45, A: 46-60, V: 61-75
 * Center cell (E column, middle row) is FREE
 */
export function generateBingoCard(): BingoCard {
    const columns: ('S' | 'H' | 'E' | 'A' | 'V')[] = ['S', 'H', 'E', 'A', 'V'];
    const card: BingoCard = [];

    columns.forEach((column, colIndex) => {
        const min = colIndex * 15 + 1;
        const max = (colIndex + 1) * 15;
        const numbers = getRandomNumbers(min, max, 5);

        for (let row = 0; row < 5; row++) {
            if (!card[row]) {
                card[row] = [];
            }

            // Center cell (row 2, column 2 which is 'E') is FREE
            if (row === 2 && colIndex === 2) {
                card[row][colIndex] = { value: 'FREE', column };
            } else {
                card[row][colIndex] = { value: numbers[row], column };
            }
        }
    });

    return card;
}
