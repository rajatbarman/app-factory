type Response = {
  error: boolean;
  message: string;
  data?: object;
  statusCode?: number,
}

export default function(response: Response) {
  return {
    headers: { "Content-Type": "application/json" },
    statusCode: response.error ? response.statusCode || 500 : 200,
    body: JSON.stringify(response)
  }
}
