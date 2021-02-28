import fs from "fs"
import handlebars from "handlebars"
import nodemailer, { Transporter } from "nodemailer"
import path from "path"

class SendMailService {
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      })

      this.client = transporter
    })
  }

  async execute(to: string, subject: string, body: string) {
    const npsPath = path.resolve(
      __dirname,
      "..",
      "views",
      "emails",
      "npsMail.hbs"
    )
    const templateFileContent = fs.readFileSync(npsPath).toString("utf-8")

    const mailTemplateParse = handlebars.compile(templateFileContent)
    const html = mailTemplateParse({
      name: to,
      title: subject,
      description: body,
    })

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: "NPS <noreply@nps.com>",
    })

    console.log(`Message sent: ${message.messageId}`)
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`)
  }
}

export default new SendMailService()
