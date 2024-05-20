import { ColorEnum } from '@/app/enums/enums';
import {
  ClientBalanceDay,
  Day,
  DayForChart,
  NewStatistic,
  TotalSums,
} from '@/types/types';

const COLORS = Object.values(ColorEnum);

export const calculateSum = (data: NewStatistic) => {
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
  balanceDay: ClientBalanceDay[]
): Category[] => {
  const totalSumMap: { [key: string]: number } = {};
  balanceDay.forEach((day) => {
    Object.entries(day.statistics).forEach(([category, value]) => {
      totalSumMap[category] = (totalSumMap[category] || 0) + value;
    });
  });
  const totalSumArray: Category[] = [];
  let colorIndex = 0;
  Object.entries(totalSumMap).forEach(([category, value]) => {
    totalSumArray.push({
      name: category,
      value,
      color: Object.values(ColorEnum)[colorIndex],
    });
    colorIndex = (colorIndex + 1) % Object.keys(ColorEnum).length;
  });

  return totalSumArray;
};

export const calculateTotalSumForEachDayInMonth = (
  arrayOfDaysWithSum: DayForChart[]
) => {
  const totalSum = arrayOfDaysWithSum.reduce((accumulator, currentObject) => {
    const numericSum = parseFloat(currentObject.sum);

    if (!isNaN(numericSum)) {
      accumulator += numericSum;
    }

    return accumulator;
  }, 0);

  const formattedTotalSum = totalSum.toFixed(2);
  return formattedTotalSum;
};

export const calcTotalSumForEveryClient = (statistics: Day[]) => {
  const daysWidthTotalSum = statistics?.map((day) => {
    const calcSumsForEachClient = day.clients.map((client) => {
      const values = Object.values(client);
      const totalSumPerClient = values
        .filter((value): value is number => typeof value === 'number') // Type guard for numbers
        .reduce((sum: number, value: number) => sum + value, 0);

      return totalSumPerClient;
    });
    const newDay = {
      id: day.id,
      allClientsSum: calcSumsForEachClient.reduce(
        (sum: number, value: number) => sum + value,
        0
      ),
    };
    return newDay;
  });

  const totalSumForEveryClient = daysWidthTotalSum?.reduce(
    (sum: number, day) => sum + day.allClientsSum,
    0
  );

  return {
    totalSum: totalSumForEveryClient ?? 0,
    daysWithTotalSum: daysWidthTotalSum ?? [],
  };
};

export function convertVariableToTitle(variableName: string) {
  const words = variableName.split(/(?=[A-Z])/);
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  const result = capitalizedWords.join(' ');
  return String(result);
}

export function totalSumForSelectedDate(statistics: NewStatistic[]): TotalSums {
  let totalSumPerCategory: Record<string, number> = {};
  statistics.forEach((day) => {
    Object.entries(day).forEach(([key, value]) => {
      if (typeof value === 'number') {
        if (key === 'penalties') {
          totalSumPerCategory[key] =
            (totalSumPerCategory[key] || 0) - (value || 0);
        } else {
          if (totalSumPerCategory.hasOwnProperty(key)) {
            totalSumPerCategory[key] += value || 0;
          } else {
            totalSumPerCategory[key] = value || 0;
          }
        }
      }
    });
  });

  Object.keys(totalSumPerCategory).forEach((key) => {
    totalSumPerCategory[key] = parseFloat(totalSumPerCategory[key].toFixed(2));
  });

  const totalSum = parseFloat(
    Object.values(totalSumPerCategory)
      .reduce((acc: number, currentValue: number) => acc + currentValue, 0)
      .toFixed(2)
  );

  return { totalSumPerCategory, totalSum };
}
