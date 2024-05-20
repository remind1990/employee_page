import moment from 'moment';

export function getStartOfPreviousDayInUTC() {
  return moment().utc().subtract(1, 'day').startOf('day');
}

export function getCurrentMonthStartDayInUTC() {
  return moment().utc().startOf('month').startOf('day').toISOString();
}

export function getCurrentMonthEndDayInUTC() {
  return moment().utc().endOf('month').endOf('day').toISOString();
}

export function convertDateToISOStringInUTC(date: Date): string {
  return moment(date).utc().toISOString();
}
