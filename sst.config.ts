import { SSTConfig } from 'sst';
import { API } from './stacks/API';
import { Frontend } from './stacks/Frontend';

export default {
  config(_input) {
    return {
      name: 'app-factory',
      region: 'ap-south-1',
    };
  },
  stacks(app) {
    app.stack(API).stack(Frontend);
  },
} satisfies SSTConfig;
