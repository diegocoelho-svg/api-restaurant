import { Router } from "express";
import { productsRoutes } from "./products-routes";
import { tablesRoutes } from "./dining_tables-routes";

const routes = Router()
routes.use("/products", productsRoutes)
routes.use("/tables", tablesRoutes)

export { routes }