export const whiteCoverCSSClasses = `before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-main-background-gradient before:bg-opacity-20 before:backdrop-blur-1`;
export const currentDate = new Date();
export const currentDay = currentDate.getDate();
export const currentYear = currentDate.getFullYear();
export const currentMonth = currentDate.getMonth();
export const todayString = `${currentDay} ${currentMonth} ${currentYear}`;
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

// Format yesterday's string
export const yesterdayString = `${yesterday
  .getDate()
  .toString()
  .padStart(2, '0')} ${(yesterday.getMonth() + 1)
  .toString()
  .padStart(2, '0')} ${yesterday.getFullYear()}`;
