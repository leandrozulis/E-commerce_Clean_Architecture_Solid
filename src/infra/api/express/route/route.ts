import { Request, Response } from "express"

export type HttpMethod = "post"

export const HttpMethod = {
  POST: "post" as HttpMethod
} as const

export interface Route {
  getHandler(): (req: Request, res: Response) => Promise<void>
  getPath(): string
  getMethod(): HttpMethod
}