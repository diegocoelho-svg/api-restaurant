import { Router } from "express"
import { TablesController } from "@/controllers/dining_tables-controller"

const tablesRoutes = Router()
const tablesController = new TablesController()

tablesRoutes.get("/", tablesController.index)

export { tablesRoutes }