import { StackContext, NextjsSite, use } from 'sst/constructs';
import { API } from './API';

export function Frontend({ stack }: StackContext) {
  const { api, protectedApi } = use(API);
  const site = new NextjsSite(stack, 'NextFrontend', {
    path: 'packages/frontend',
    environment: {
      NEXT_PUBLIC_API_HOST: api.url,
      NEXT_PUBLIC_PROTECTED_API_HOST: protectedApi.url,
    },
  });

  // Add the site's URL to stack output (in console)
  stack.addOutputs({
    URL: site.url || 'localhost:3000',
  });
}
