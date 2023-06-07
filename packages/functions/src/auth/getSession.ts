import { ApiHandler, useHeader, useHeaders } from "sst/node/api";
import { createAPIResponse } from "@core/utils";
import { getSession } from "@core/auth";

export const handler = ApiHandler(async () => {
  const authHeader = useHeader("authorization");
  if (!authHeader) {
    return createAPIResponse({
      error: true,
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  const session = getSession({ authorizationValue: authHeader });

  if (session.isAuthorized) {
    return createAPIResponse({
      error: false,
      message: "Valid session",
      data: session.data,
    });
  }

  return createAPIResponse({
    error: true,
    message: "Invalid session",
    statusCode: 401,
  });
});
