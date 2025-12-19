import User from "../models/User";

export const UserRepository = {
  findByEmail: (email: string) => User.findOne({ email }),
  create: (data: any) => User.create(data),
};
