export type Client = {
  id: string;
  _id: string;
  name: string;
  surname: string;
  chats: number;
  dating: number;
  letters: number;
  penalties: number;
  phoneCalls: number;
  photoAttachments: number;
  virtualGiftsDating: number;
  virtualGiftsSvadba: number;
  image: string;
  suspended: boolean;
};

export type Day = {
  id: string;
  clients: Client[];
};

export type Statistic = {
  year: string;
  months: Day[][];
};

export type NewStatistic = {
  chats: number;
  dating: number;
  letters: number;
  penalties: number;
  phoneCalls: number;
  photoAttachments: number;
  virtualGiftsDating: number;
  virtualGiftsSvadba: number;
  voiceMessages: number;
};

export type DayForChart = {
  date: string;
  sum: string;
};

export type DayWithSums = {
  id: string;
  allClientsSum: string | number | boolean;
};

export type ClientBalanceDay = {
  client: string;
  dateTimeId: string;
  statistics: NewStatistic;
  translator: string;
  __v: number;
  _id: string;
};

export type TotalSums = {
  totalSum: number;
  totalSumPerCategory: Record<string, number>;
};
