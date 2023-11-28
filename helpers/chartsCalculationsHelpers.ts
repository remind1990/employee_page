import { BalanceDay, Client } from '@/types/types';

const COLORS = [
  '#FF5733',
  '#FFC300',
  '#33FF57',
  '#334CFF',
  '#FF33D1',
  '#33FFE7',
  '#8A2BE2',
  '#FF6667',
  '#336CFF',
];

export const calculateSum = (data: Client) => {
  const numericValues: number[] = Object.values(data).filter(
    (value): value is number => typeof value === 'number'
  ) as number[];
  const sum = numericValues.reduce((acc, value) => acc + value, 0);

  return sum;
};

export function getMonthNameFromId(id: number): string {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthNames[id - 1];
}

interface Category {
  name: string;
  value: number;
  color: string;
}

export const calculateTotalSumForEachCategory = (
  statistics: BalanceDay[]
): Category[] => {
  return (
    statistics &&
    statistics?.reduce<Category[]>((totalSumArray, day) => {
      if (day.clients && day.clients[0]) {
        Object.entries(day.clients[0]).forEach(([field, value]) => {
          if (typeof value === 'number') {
            const categoryObject = totalSumArray.find(
              (obj) => obj.name === field
            );
            if (categoryObject) {
              categoryObject.value += value;
              categoryObject.value =
                Math.floor(categoryObject.value * 100) / 100;
            } else {
              const colorIndex = totalSumArray.length % COLORS.length;
              totalSumArray.push({
                name: field,
                value,
                color: COLORS[colorIndex],
              });
            }
          }
        });
      }
      return totalSumArray;
    }, [])
  );
};
