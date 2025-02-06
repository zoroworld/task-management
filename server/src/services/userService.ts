import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (name: string, address: string , phone : string ,email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, address, phone, email, password: hashedPassword });
  return user;
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "1h",
  });

  const { password: userPassword, ...userWithoutPassword } = user.toObject();
  return { token, user: userWithoutPassword };
};
