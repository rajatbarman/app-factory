import sendEmail, {SendEmailFunctionParams} from '@core/emails/sendEmail'

export const handler = async (jsonBody: SendEmailFunctionParams) => {
  let resp:any = {};

  try {
    resp = await sendEmail({
      subject: jsonBody.subject,
      email: jsonBody.email,
      content: jsonBody.content
    })
  } catch (e: any) {
    resp = {
      error: e.message,
    }
  }
  return {
    headers: { "Content-Type": "application/json" },
    statusCode: resp.error ? 500 : 200,
    body: JSON.stringify(resp)
  };
}
