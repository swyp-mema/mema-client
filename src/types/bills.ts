export type Bills = {
  charges: {
    chargeId: number;
    content: string;
    totalPrice: number;
    peopleNumber: number;
    payeeNickname: string;
    payers: {
      payerId: number;
      payerNickname: string;
    }[];
  }[];
};

export type Bill = {
  chargeId: number;
  content: string;
  totalPrice: number;
  peopleNumber: number;
  payeeNickname: string;
  members: {
    userId: number;
    nickname: string;
    isMe: boolean;
  }[];
};
