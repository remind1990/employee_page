import { UpdateTranslatorBalanceDay } from './enums';

export default async function updateTranslatorStatistic(
  id: string,
  dates: string[]
) {
  const bodyDates = {
    startDate: dates[0],
    endDate: dates[1],
  };
  try {
    const res = await fetch(`api/translators/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyDates),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error(UpdateTranslatorBalanceDay.Error);
    }
  } catch (err: any) {
    if (err instanceof Error) {
      throw new Error(UpdateTranslatorBalanceDay.UnknownError, err);
    } else {
      throw new Error(UpdateTranslatorBalanceDay.UnknownError);
    }
  }
}
