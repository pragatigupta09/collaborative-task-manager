import { UserRepository } from "../repositories/user.repository";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import { signToken } from "../utils/jwt";

export const AuthService = {
  async register(data: any) {
    data.password = await hashPassword(data.password);
    return UserRepository.create(data);
  },

  async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("User not found");

    const match = await comparePassword(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const token = signToken({ id: user._id });
    return { user, token };
  },
};
