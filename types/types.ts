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
};

export type Day = {
  id: string;
  clients: Client[];
};

export type Statistic = {
  year: string;
  months: Day[][];
};

export type BalanceDay = {
  clients: Client[];
  id: string;
};
