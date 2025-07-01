import express from "express"
import { routes } from "./routes"
import { errorHandling } from "./middlewares/error-handling"

const app = express()
const PORT = 3333

app.use(express.json())
app.use(routes)

app.use(errorHandling)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))