/**
 * @file Menu.tsx
 * @fileoverview Menu component. This component is used to display the menu on the left hand side of the app.
 * It contains the links to the different pages of the app, as well as other labels
 */

{ /* Ionic / React */ }
import React from 'react';
import {
  IonContent, IonIcon, IonItem,
  IonLabel, IonList, IonListHeader,
  IonMenu, IonMenuToggle, IonNote, IonPopover, IonText, IonToggle,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';

{ /* Helpers */ }
import { AppPage, appPages, labels } from './MenuFunctions';

{ /* Styles */ }
import '../../App.css';
import { useContext } from '../../my-context';
import { Preferences } from '@capacitor/preferences';

const Menu: React.FC = () => {
  console.log("Menu")
  // Hooks
  const location = useLocation();
  const context = useContext();

  // State Variables
  const [isLocalSearchChecked, setIsLocalSearchChecked] = React.useState<boolean>(false);
  const [showLocalSearchPopover, setShowLocalSearchPopover] = React.useState<boolean>(true);

  /**
   * @description This function is called when the user clicks on the toggle for enabling local search.
   */
  const handleEnableLocalSearch = async (event: CustomEvent): Promise<void> => {
    const isChecked = event.detail.checked;
    setIsLocalSearchChecked(isChecked);
    context.setLocalSearchChecked(isChecked);
    await Preferences.set({ key: 'localSearchChecked', value: isChecked });
  };

  /**
   * @description This function returns the router link of the app page.
   * 
   * @param {AppPage} appPage the app page to get the router link of
   * @returns {string} the router link of the app page
   */
  const getRouterLinkOfMenuItem = (appPage: AppPage): string => {
    if (appPage.title === '3D Models') {
      if (context.model.length <= 0 || !context.model) {
        return appPage.url + 'select';
      }
      return appPage.url + context.model;
    }
    else if (appPage.title === "Collections") {
      if (context.specimen.length <= 0 || !context.specimen) {
        return appPage.url + 'select';
      }
      return appPage.url + context.specimen;
    }
    else {
      return appPage.url;
    }
  }

  /**
   * @description This function checks if the local search toggle is checked or not.
   * If it is checked, it sets the state variable to true.
   * If it is not checked, it sets the state variable to false.
   * It also sets the context variable to the state variable.
   */
  const handleCheckLocalSearch = React.useCallback(async () => {
    const isChecked = await Preferences.get({ key: 'localSearchChecked' });
    if (isChecked.value === 'true') {
      setIsLocalSearchChecked(true);
      context.setLocalSearchChecked(true);
    } else {
      setIsLocalSearchChecked(false);
      context.setLocalSearchChecked(false);
    }
  }, []);

  /**
   * @description This function is called when the page is loaded.
   * It checks if the local search toggle is checked or not.
   */
  React.useEffect(() => {
    handleCheckLocalSearch();
  }, [])

  return (
    <IonMenu contentId="main" type="overlay" swipeGesture>
      <IonContent>

        {/* Page nav links */}
        <IonList id="routing-list">

          <IonListHeader>CPH 3D Digital Herbarium</IonListHeader>
          <div style={{ height: "1vh" }} />
          <IonNote><IonText color='medium'>ab632@humboldt.edu</IonText></IonNote>

          {appPages.map((appPage: AppPage, index: number) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname.includes(appPage.url) ? 'selected' : ''} routerLink={getRouterLinkOfMenuItem(appPage)} routerDirection="none" lines="none" detail={false}>
                  <IonIcon color={location.pathname.includes(appPage.url) ? 'selected' : 'light'} aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}

        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Parameters</IonListHeader>
          <IonItem lines="none" id={isLocalSearchChecked ? '' : 'hover-local-search-trigger'}>
            <IonToggle checked={isLocalSearchChecked} color='selected' labelPlacement="start" onIonChange={handleEnableLocalSearch}>Local Search</IonToggle>
          </IonItem>
        </IonList>

        {/* Popover for local search toggle */}
        {showLocalSearchPopover &&
          <IonPopover onIonPopoverDidDismiss={() => setShowLocalSearchPopover(false)} showBackdrop={false} trigger="hover-local-search-trigger" triggerAction="hover">
            <IonContent class="ion-padding">
              <IonText color='primary'>Enable this to limit search queries to local specimen only! To view global data, disable this toggle.</IonText>
            </IonContent>
          </IonPopover>
        }

      </IonContent>
    </IonMenu>
  );
};

export default Menu;
