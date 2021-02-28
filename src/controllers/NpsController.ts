import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { SurveysUsersRepository } from "../repositories/SurveyUsersRepository"

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveyUsers = await surveysUsersRepository.find({ survey_id })

    const detractors = surveyUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length

    const promoters = surveyUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length

    const passives = surveyUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length

    const totalAnswers = surveyUsers.length

    const nps = (promoters - detractors) / totalAnswers

    return response.json({
      detractors,
      promoters,
      passives,
      totalAnswers,
      nps,
    })
  }
}

export { NpsController }
