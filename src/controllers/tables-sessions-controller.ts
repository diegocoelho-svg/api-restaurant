import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { knex } from "@/database/knex";
import { z } from "zod"
import { appendFile } from "fs";

class TablesSessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      })

      const { table_id } = bodySchema.parse(request.body)

      const session = await knex<TablesSessionsRepository>("tables_sessions")
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first()

      if (session && !session.closed_at) {
        throw new AppError("this table is already open")
      }

      await knex<TablesSessionsRepository>("tables_sessions").insert({
        table_id,
        opened_at: knex.fn.now(),
      })

      return response.status(201).json()
    } catch (error) {
      next(error)
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const sessions = await knex<TablesSessionsRepository>("tables_sessions")
        .orderBy("closed_at")

      return response.json(sessions)
    } catch (error) {
      next(error)
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const table_id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(request.params.table_id)

      const session = await knex<TablesSessionsRepository>("tables_sessions")
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first()

      if (!session) {
        throw new AppError("session table not found")
      }

      if (session.closed_at) {
        throw new AppError("this session is already closed")
      }

      await knex<TablesSessionsRepository>("tables_sessions")
        .update({
          closed_at: knex.fn.now()
        })
        .where({ id: session.id })

      return response.json()
    } catch (error) {
      next(error)
    }
  }
}

export { TablesSessionsController }