import express from "express"
import "reflect-metadata"
import "./database"
import { router } from "./routes"

const app = express()

app.use(router)

app.listen(3333, () => console.log("Server running at port: 3333"))
