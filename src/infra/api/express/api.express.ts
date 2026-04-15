import { Api } from "../api";
import express from "express"
import { Route } from "./route/route";

export class ApiExpress implements Api {

  private app: express.Express

  private constructor(
    routes: Route[]
  ) {
    this.app = express()
    this.app.use(express.json())
    this.addRoutes(routes)
  }

  public static create(routes: Route[]) {
    return new ApiExpress(routes)
  }

  public addRoutes(routes: Route[]) {
    routes.forEach((route) => {
      const method = route.getMethod()
      const path = route.getPath()
      const handler = route.getHandler()

      this.app[method](path, handler)
    })
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server Running in port: ${port}`)
    })
  }

}