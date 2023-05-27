import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'edu.humboldt.3dcphha',
  appName: 'CPHHA',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
