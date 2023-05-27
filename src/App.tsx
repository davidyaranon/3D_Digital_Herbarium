/**
 * @fileoverview App.tsx is the main file for the app. It contains the routes for the pages and the menu.
 */

import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import Menu from './components/Menu/Menu';

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
import Home from './pages/Home/Home';
import Collections from './pages/Collections/Collections';
import Model from './pages/Model/Model';
import GlobalCollections from './pages/GlobalCollections/GlobalCollections';
import Inat from './pages/Inat/Inat';
import PlantId from './pages/PlantId/PlantId';

/* Other */
import { useContext } from './my-context';
import { Preferences } from '@capacitor/preferences';

setupIonicReact({
  mode: 'ios'
});

const App: React.FC = () => {

  /* Hooks */
  const context = useContext();

  /**
   * @description callback function that sets the model name to Redwood if not already set.
   */
  const setModelName = React.useCallback(async () => {
    if (!context.model) {
      const modelName = await Preferences.get({ key: 'model' });
      if (modelName.value) {
        context.setModel(modelName.value);
      } else {
        context.setModel('Redwood');
        await Preferences.set({ key: "model", value: "Redwood" });
      }
    }
  }, []);

  /**
   * @description: This function is called when the app is loaded.
   * Put any code that needs to be run one-time when the app is loaded here that deals with context
   * 
   * Currently, it sets the model name to Redwood if not already set. (using Context API as global variable)
   */
  React.useEffect(() => {
    if (context) {
      setModelName();
    }
  }, [context]);

  return (
    <IonApp>
      <IonReactRouter>

        <IonSplitPane contentId="main">

          <Menu />

          <IonRouterOutlet id="main">

            <Route path="/" exact={true}>
              <Redirect to="/pages/home" />
            </Route>

            <Route path="/pages/home" exact={true}>
              <Home />
            </Route>

            <Route path="/pages/models" exact={true}>
              <Model />
            </Route>

            <Route path="/pages/collections" exact={true}>
              <Collections />
            </Route>

            <Route path="/pages/globalCollections" exact={true}>
              <GlobalCollections />
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