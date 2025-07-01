import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppError";

class ProductsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      throw new AppError("Erro de teste")

      return response.json({ message: "Ok" })
    } catch (error) {
      next(error)
    }
  }
}

export { ProductsController }