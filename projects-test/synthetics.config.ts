import type { SyntheticsConfig } from '@elastic/synthetics';

export default env => {
  const config: SyntheticsConfig = {
    params: {
      url: 'https://demo-store-ivory.vercel.app/',
    },
    playwrightOptions: {
      ignoreHTTPSErrors: false,
    },
    /**
     * Configure global monitor settings
     */
    monitor: {
      schedule: 10,
      locations: ['us_east'],
      privateLocations: [],
    },
    /**
     * Project monitors settings
     */
    project: {
      id: 'projects-test',
      url: 'https://239b09d47e334af58a8179f048fb7361.us-east4.gcp.elastic-cloud.com:443',
      space: 'default',
    },
  };
  if (env !== 'development') {
    /**
     * Override configuration specific to environment
     * Ex: config.params.url = ""
     */
  }
  return config;
};
