import { EntityRepository, Repository } from "typeorm"
import { SurveyUser } from "../models/SurveyUser"

@EntityRepository()
class SurveysUserRepository extends Repository<SurveyUser> {}

export { SurveysUserRepository }
