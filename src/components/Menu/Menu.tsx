/**
 * @file Menu.tsx
 * @fileoverview Menu component. This component is used to display the menu on the left hand side of the app.
 * It contains the links to the different pages of the app, as well as other labels
 */

{ /* Ionic / React */ }
import {
  IonContent, IonIcon, IonItem,
  IonLabel, IonList, IonListHeader,
  IonMenu, IonMenuToggle, IonNote, IonText,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { bookmarkOutline } from 'ionicons/icons';

{ /* Helpers */ }
import { AppPage, appPages, labels } from './MenuFunctions';

{ /* Styles */ }
import './Menu.css';
import { useContext } from '../../my-context';

const Menu: React.FC = () => {

  // Hooks
  const location = useLocation();
  const context = useContext();

  /**
   * @description This function returns the router link of the app page.
   * 
   * @param {AppPage} appPage the app page to get the router link of
   * @returns {string} the router link of the app page
   */
  const getRouterLinkOfMenuItem = (appPage : AppPage) : string => {
    if(appPage.title === '3D Models') {
      if(context.model.length <= 0 || !context.model) {
        return appPage.url + 'select';
      }
      return appPage.url + context.model;
    } else {
      return appPage.url;
    }
  }

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
                  <IonIcon color={location.pathname === appPage.url ? 'selected' : 'light'} aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}

        </IonList>

        {/* Labels */}
        <IonList id="labels-list">
          <IonListHeader>Parameters</IonListHeader>
          {labels.map((label: string, index: number) => (
            <IonItem lines="none" key={index}>
              <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonMenu>
  );
};

export default Menu;
