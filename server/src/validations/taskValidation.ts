
import Joi from "joi";

export const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string().valid("pending", "completed").default("pending")
  });
  
export const updateTaskSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().valid("pending", "completed").optional()
});
  