/**
 * @file capactior.config.ts
 * @fileoverview This file is used by Capacitor to set up various settings
 * related to your app and build. It is used by the Capacitor CLI to build
 * your app, and by the Capacitor runtime to configure your app.
 */

import { CapacitorConfig } from '@capacitor/cli';


/**
 * Configures Capacitor with the app's information.
 * See the Capacitor documentation for more information:
 * @see https://capacitorjs.com/docs/config
 * @see https://capacitorjs.com/docs/basics/configuring-your-app
 * @see https://capacitorjs.com/docs/basics/workflow
 * 
 * Change the appId to match your app's id.
 * Change the appName to match your app's name.
 * In general, don't change the rest of the config (unless you know what you're doing ;])
 */
const config: CapacitorConfig = {
  appId: 'edu.humboldt.3dcphha',
  appName: 'CPHHA',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
