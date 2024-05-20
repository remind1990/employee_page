import moment from 'moment';

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

export const TODAY = moment();
export const YESTERDAY = TODAY.clone().subtract(1, 'day');

export const CURRENT_MONTH_NAME = moment().format('MMMM');
export const DAYS_IN_CURRENT_MONTH = moment().daysInMonth();

export const ALL_DAYS_IN_MONTH = Array.from(
  { length: DAYS_IN_CURRENT_MONTH },
  (_, i) =>
    moment()
      .date(i + 1)
      .format('DD')
);

export const DAYS_TILL_TODAY = Array.from({ length: TODAY.date() }, (_, i) =>
  moment().date(i + 1)
);

export const ORDER_KEYS = [
  'chats',
  'dating',
  'letters',
  'photoAttachments',
  'virtualGiftsSvadba',
  'virtualGiftsDating',
  'voiceMessages',
] as const;
