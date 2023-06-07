import AWS from 'aws-sdk'
import {z} from 'zod';

const ses = new AWS.SES({
  region: 'ap-south-1'
});

export const sendEmailFunctionParamsSchema = z.object({
  subject: z.string(),
  email: z.string(),
  content: z.string().optional().default('Hello World')
})

export type SendEmailFunctionParams = z.infer<typeof sendEmailFunctionParamsSchema>

export default function sendEmail({
  email, content, subject
}: SendEmailFunctionParams) {
  sendEmailFunctionParamsSchema.parse({email,content,subject})
  let params = {
    Source: 'admin@bakchod.company',
    Destination: {
      ToAddresses: [
        email
      ],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: content,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      }
    },
  };

  return ses.sendEmail(params).promise()
}
