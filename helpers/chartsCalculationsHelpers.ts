import { ColorEnum } from '@/app/enums/enums';
import {
  ClientBalanceDay,
  Day,
  DayForChart,
  NewStatistic,
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

// export const calculateTotalSumForEachCategory = (
//   statistics: NewStatistic
// ): Category[] => {
//   return (
//     statistics &&
//     statistics?.reduce<Category[]>((totalSumArray, day) => {
//       if (day.clients && day.clients[0]) {
//         Object.entries(day.clients[0]).forEach(([field, value]) => {
//           if (typeof value === 'number') {
//             const categoryObject = totalSumArray.find(
//               (obj) => obj.name === field
//             );
//             if (categoryObject) {
//               categoryObject.value += value;
//               categoryObject.value =
//                 Math.floor(categoryObject.value * 100) / 100;
//             } else {
//               const colorIndex = totalSumArray.length % COLORS.length;
//               totalSumArray.push({
//                 name: field,
//                 value,
//                 color: COLORS[colorIndex],
//               });
//             }
//           }
//         });
//       }
//       return totalSumArray;
//     }, [])
//   );
// };

export const calculateTotalSumForEachCategory = (
  balanceDay: ClientBalanceDay[]
): Category[] => {
  const totalSumMap: { [key: string]: number } = {};

  // Calculate total sum for each category
  balanceDay.forEach((day) => {
    Object.entries(day.statistics).forEach(([category, value]) => {
      totalSumMap[category] = (totalSumMap[category] || 0) + value;
    });
  });

  // Convert total sum map to array of objects
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
