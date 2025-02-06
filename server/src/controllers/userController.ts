import { Request, Response } from "express";
import { signup, login } from "../services/userService";
import { signupSchema, loginSchema } from "../validations/userValidation";

export const registerUser = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { error } = signupSchema.validate(req.body);

    if (error) {
       res.status(400).json({ message: error.details[0].message });
       return;
    }

    const { name, address, phone, email, password } = req.body;
    const user = await signup(name, address, phone, email, password);
    res.status(201).json({success:true, user});
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ success: false, message: err.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
       res.status(400).json({ message: error.details[0].message });
       return;
    }
    const { email, password } = req.body;
    const result = await login(email, password);
    res.status(200).json({success:true, result});
  } catch (error) {
    const err = error as Error;
    res.status(401).json({ message: err.message });
  }
};

