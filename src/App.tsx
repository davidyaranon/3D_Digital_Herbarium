/**
 * @file: App.tsx
 * @fileoverview This file contains the main App component, which is the root component of the app.
 * It contains the routing for the app, and the side menu bar.
 * 
 * @see https://react.dev/ to read more about the React JavaScript framework.
 * @see https://ionicframework.com/docs to read more about the Ionic React components used in this project.
 * @see https://capacitorjs.com/ to read more about the Capacitor framework used to turn the webapp into a native iOS app.
 */

import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Pages */
import Home from './pages/Home';
import Collections from './pages/Collections';
import Model from './pages/Model';
import Inat from './pages/Inat';
import PlantId from './pages/PlantId';

/* Other */
import Menu from './components/Menu/Menu';
import { useContext } from './my-context';
import { Preferences } from '@capacitor/preferences';

setupIonicReact({
  mode: 'ios'
});

const App: React.FC = () => {

  // Hooks
  const context = useContext();

  /**
   * @description Runs on app load.
   * Gets the info from the preferences and sets the context to it.
   * 
   * @note Comment out this useffect for your selected model to NOT persist across app re-loads.
   * 
   */
  React.useEffect(() => {
    const getPreferences = async () => {
      const modelPreferences = await Preferences.get({ key: 'model' });
      const specimenPreferences = await Preferences.get({ key: 'specimen' });
      if (modelPreferences.value) {
        console.log('setting model context to ' + modelPreferences.value)
        context.setModel(modelPreferences.value);
      }
      if(specimenPreferences.value) {
        console.log('setting specimen context to ' + specimenPreferences.value)
        context.setSpecimen(specimenPreferences.value);
      }
    }
    getPreferences();
    console.log('App.tsx useEffect');
  }, []);

  return (
    <IonApp>
      <IonReactRouter>

        <IonSplitPane contentId="main">

          <Menu />

          <IonRouterOutlet id="main" animated={false}>

            <Route path="/" exact={true}>
              <Redirect to="/pages/home" />
            </Route>

            <Route path="/pages/home" exact={true}>
              <Home />
            </Route>

            <Route path="/pages/models/:model" exact={true} component={Model} key={context.model} />
            <Route path="/pages/models" exact={true}>
              <Redirect to="/pages/models/select" />
            </Route>

            <Route path="/pages/collections/:specimen" exact={true} component={Collections} key={context.specimen}/>
            <Route path="/pages/collections" exact={true}>
              <Redirect to="/pages/collections/select" />
            </Route>

            <Route path="/pages/inat" exact={true}>
              <Inat />
            </Route>

            <Route path="/pages/plantid" exact={true}>
              <PlantId />
            </Route>

          </IonRouterOutlet>

        </IonSplitPane>

      </IonReactRouter>
    </IonApp>
  );
};

export default App;
