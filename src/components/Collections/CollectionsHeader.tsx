/**
 * @fileoverview This file contains the header for the collections page.
 * It contains the search bar and the buttons for the map and more.
 * It handles the search bar and the search results.
 */

{/* Ionic / React */ }
import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonSearchbar, IonIcon, IonButton, IonItem, IonText, IonSkeletonText } from '@ionic/react';
import { mapOutline, notificationsCircleOutline, searchOutline } from 'ionicons/icons';

{/* Styles */ }
import '../../App.css';
import { collectionsSearch, timeout } from '../../herbarium';

const loadingSearchItems = ['', '', '', '', ''];

const CollectionsHeader = () => {

  const searchRef = React.useRef<HTMLIonSearchbarElement>(null);
  const [showSearchResults, setShowSearchResults] = React.useState<boolean>(false);
  const [showSearchResultsLoading, setShowSearchResultsLoading] = React.useState<boolean>(false);
  const [filteredSpecimen, setFilteredSpecimen] = React.useState<string[]>([]);

  /**
  * @description This function is called when the user types into the searchbar.
  * It should list the specimen that match the search query.
  * 
  * @param {any} event the event that is triggered when the user types into the searchbar
  */
  const handleSearch = async (event: any): Promise<void> => {
    if (event && event.target && event.target.value) {
      setShowSearchResultsLoading(true);
      setShowSearchResults(true);
      const searchValue = event.target.value.toLowerCase();
      const autocompleteResults = await collectionsSearch(searchValue);
      await timeout(500);
      setFilteredSpecimen(autocompleteResults);
      setShowSearchResultsLoading(false);
    } else {
      setFilteredSpecimen([]);
      setShowSearchResults(false);
      setShowSearchResultsLoading(false);
    }
  };

  return (
    <>
      <IonHeader className='ion-no-border' style={{ padding: "5px" }} translucent>
        <IonToolbar style={{ display: 'flex', alignItems: 'center' }}>

          <IonButtons slot="start">
            <IonMenuButton style={{ marginTop: "40%" }}></IonMenuButton>
          </IonButtons>

          {/* Only display the search bar when the screen width is greater than or equal to 768px */}
          <div className="search-bar" >
            <IonSearchbar color='light' animated debounce={250} onIonInput={handleSearch} ref={searchRef} placeholder='Search Flora...' enterkeyhint='search' style={{ width: "50%", padding: '10px' }}></IonSearchbar>
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

      {/* Display the search results when the user types into the searchbar */}
      <div className={`item-list ${showSearchResults ? 'overlay' : ''}`}>
        {showSearchResultsLoading && loadingSearchItems.map((item: string, index: number) => {
          return (
            <IonItem key={index} type='submit' onClick={() => { }}
              button detail={false} lines='full'
              color='light'>
              <IonSkeletonText animated style={{ width: '100%', "--background-rgb": "103, 103, 103" }} />
            </IonItem>
          );
        })
        }
        {showSearchResults && !showSearchResultsLoading && filteredSpecimen.slice(0, 4).map((specimen: string, index: number) => {
          return (
            <IonItem type='submit' key={index} onClick={() => { }}
              button detail={false} lines='full'
              color='light'>
              <IonText color='primary'>{specimen}</IonText>
            </IonItem>
          );
        })}
      </div>

    </>
  )
};

export default CollectionsHeader;