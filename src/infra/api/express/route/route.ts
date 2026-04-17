import { Request, Response } from "express"

export type HttpMethod = "post" | "delete" | "get"

export const HttpMethod = {
  POST: "post" as HttpMethod,
  DELETE: "delete" as HttpMethod,
  GET: "get" as HttpMethod
} as const

export interface Route {
  getHandler(): (req: Request, res: Response) => Promise<void>
  getPath(): string
  getMethod(): HttpMethod
}