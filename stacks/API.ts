import { StackContext, Api } from 'sst/constructs';

const envVariables = {
  DATABASE_URL: String(process.env.DATABASE_URL),
};

const protectedEnvVariables = {
  ...envVariables,
  JWT_SIGNATURE: String(process.env.JWT_SIGNATURE),
};

export function API({ stack }: StackContext) {
  const protectedApi = new Api(stack, 'protectedApi', {
    defaults: {
      function: {
        environment: protectedEnvVariables,
      },
    },
    routes: {
      'GET /auth/get-session': {
        function: {
          handler: 'packages/functions/src/auth/getSession.handler',
        },
      },
      'GET /auth/create-token': {
        function: {
          handler: 'packages/functions/src/auth/createToken.handler',
        },
      },
      'POST /users': 'packages/functions/src/users/insertUser.handler',
      'GET /users': 'packages/functions/src/users/getUsers.handler',
    },
  });

  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        environment: envVariables,
      },
    },
    routes: {
      'GET /auth/send-otp': {
        function: {
          handler: 'packages/functions/src/auth/sendOTP.handler',
          permissions: ['ses'],
        },
      },
      'GET /auth/verify-otp': {
        function: {
          handler: 'packages/functions/src/auth/verifyOTP.handler',
          environment: {
            ...envVariables,
            JWT_SIGNATURE: String(process.env.JWT_SIGNATURE),
          },
        },
      },
    },
  });

  protectedApi.setCors({
    allowOrigins: ['*'],
  });

  api.setCors({
    allowOrigins: ['*'],
  });

  // Add the function's URL (API endpoint) to stack output (in console)
  stack.addOutputs({
    ApiEndpoint: api.url,
    ProtectedApiEndpoint: protectedApi.url,
  });

  return {
    api,
    protectedApi,
  };
}
