import { NextFunction, Request, Response } from "express";
import { z } from "zod"

class ProductsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      // throw new AppError("Erro de teste")
      return response.json({ message: "Ok" })
    } catch (error) {
      next(error)
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      // const { name, price } = request.body
      const bodySchema = z.object({
        name: z.string({ required_error: "name is required!" }).trim().min(3),
        price: z.number({ required_error: "price is required!"}).gt(0) // gt(0, { message: "value must be greater than 0"})-alternativa, pois retorna mensagem similar
      })

      const { name, price } = bodySchema.parse(request.body)

      return response.status(201).json({ name, price })
    } catch (error) {
      next(error)
    }
  }
}

export { ProductsController }