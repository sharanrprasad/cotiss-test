import {
  ConfigClient,
  ConfigKeys,
} from '../../src/modules/shared/config.client';

export class MockConfigClient extends ConfigClient {
  async init() {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get(key: ConfigKeys) {
    return '';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getNumber(key: ConfigKeys): number {
    return 0;
  }
}
