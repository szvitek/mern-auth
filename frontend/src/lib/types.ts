export type TUser = {
  _id: string;
  email: string;
  verified: boolean;
  createdAt: Date;
};

export type TSession = {
  _id: string;
  userAgent: string;
  createdAt: Date;
  isCurrent?: boolean;
};
