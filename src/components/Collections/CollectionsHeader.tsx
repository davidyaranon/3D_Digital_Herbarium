/**
 * @fileoverview This file contains the header for the collections page.
 * It contains the search bar and the buttons for the map and more.
 * It handles the search bar and the search results.
 */

{/* Ionic / React */}
import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonSearchbar, IonIcon, IonButton } from '@ionic/react';
import { mapOutline, notificationsCircleOutline, searchOutline } from 'ionicons/icons';

{/* Styles */}
import './CollectionsHeader.css';

const CollectionsHeader = () => {

  const searchRef = React.useRef<HTMLIonSearchbarElement>(null);
  const [filteredSpecimen, setFilteredSpecimen] = React.useState<string[]>([]);

  /**
  * @description This function is called when the user types into the searchbar.
  * It should list the specimen that match the search query.
  * 
  * @param {any} event the event that is triggered when the user types into the searchbar
  */
  const handleSearch = (event: any): void => {
    if (event && event.target && event.target.value) {
      const searchValue = event.target.value.toLowerCase();
      // TODO: filter the list of species based on the search value

      // setFilteredModels(filtered);
    } else {
      
    }
  };

  return (
    <IonHeader className='ion-no-border' style={{ padding: "5px" }} translucent>
      <IonToolbar style={{ display: 'flex', alignItems: 'center' }}>

        <IonButtons slot="start">
          <IonMenuButton style={{ marginTop: "40%" }}></IonMenuButton>
        </IonButtons>

        {/* Only display the search bar when the screen width is greater than or equal to 768px */}
        <div className="search-bar" >
          <IonSearchbar color='light' animated onIonInput={handleSearch} ref={searchRef} placeholder='Search Flora...' enterkeyhint='search' style={{ width: "50%", padding: '10px' }}></IonSearchbar>
        </div>

        {/* Only display the search icon when the screen width is less than 768px */}
        <div className="search-icon">
          <IonButton fill='clear' size='default'>
            <IonIcon icon={searchOutline}></IonIcon>
          </IonButton>
          <IonButton fill='clear' size='default'>
            <IonIcon icon={notificationsCircleOutline}></IonIcon>
          </IonButton>
          <IonButton fill='clear' size='default'>
            <IonIcon icon={mapOutline}></IonIcon>
          </IonButton>
        </div>
      </IonToolbar>
    </IonHeader>
  )
};

export default CollectionsHeader;