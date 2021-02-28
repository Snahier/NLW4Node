import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { AppError } from "../errors/AppError"
import { SurveysUsersRepository } from "../repositories/SurveyUsersRepository"

class AnswerController {
  async execute(request: Request, response: Response) {
    const { score } = request.params
    const { id } = request.query

    const surveyUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveyUser = await surveyUsersRepository.findOne({
      id: String(id),
    })

    if (!surveyUser) {
      throw new AppError("Survey User does not exists")
    }

    surveyUser.value = Number(score)

    await surveyUsersRepository.save(surveyUser)

    return response.json(surveyUser)
  }
}

export { AnswerController }
