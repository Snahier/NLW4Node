import { Request, Response } from "express"

class UserController {
  async create(request: Request, response: Response) {
    const body = request.body

    return response.send(console.log(body))
  }
}

export { UserController }
