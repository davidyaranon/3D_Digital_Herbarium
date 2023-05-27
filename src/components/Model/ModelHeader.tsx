/**
 * @fileoverview This file contains the ModelHeader component, which is the header for the 3D Models page.
 * It contains the search bar and the buttons for the map and more.
 * It handles the search bar and the search results.
 */

{/* Ionic / React */}
import React from 'react';
import {
  IonHeader, IonToolbar, IonButtons, IonMenuButton,
  IonSearchbar, IonIcon, IonButton, IonTitle, IonText, IonItem
} from '@ionic/react';
import { mapOutline, searchOutline } from 'ionicons/icons';

{/* Capacitor */}
import { Preferences } from '@capacitor/preferences';

{/* Helpers */}
import { listOfModels } from '../../assets/data/ListOfModels';
import { useContext } from '../../my-context';

{/* Styles */}
import './ModelHeader.css';

{/* Props definition */}
interface ModelHeaderProps {
  loading: boolean;
  setModelLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModelHeader = (props: ModelHeaderProps) => {

  // Props
  const setModelLoading = props.setModelLoading;

  // Hooks
  const context = useContext();

  // State Variables
  const searchRef = React.useRef<HTMLIonSearchbarElement>(null);
  const [showSearchResults, setShowSearchResults] = React.useState<boolean>(false);
  const [filteredModels, setFilteredModels] = React.useState<string[]>(listOfModels);

  /**
   * @description This function is called when the user clicks on the searchbar.
   */
  const handleClickOnSearchbar = (): void => {
    if(searchRef && searchRef.current && searchRef.current.value !== '')
      setShowSearchResults(true);
  };

  /**
   * @description This function is called when the user clicks off the searchbar. 
   * It should hide the search results.
   */
  const handleClickOffSearchbar = (): void => {
    setShowSearchResults(false);
  };

  /**
   * @description This function is called when the user clicks on a model in the search results.
   * It should set the model to the model that the user clicked on.
   * 
   * @param model the model that the user wants to view.
   */
  const handleModelListButtonPress = async (model: string): Promise<void> => {
    setShowSearchResults(false);
    if (model !== context.model) {
      setModelLoading(true);
      context.setModel(model);
      await Preferences.set({ key: 'model', value: model });
    };
  };

  /**
  * @description This function is called when the user types into the searchbar.
  * It should list the models that match the search query.
  * 
  * @param {any} event the event that is triggered when the user types into the searchbar
  */
  const handleSearch = (event: any): void => {
    if (event && event.target && event.target.value) {
      setShowSearchResults(true);
      const searchValue = event.target.value.toLowerCase();
      const filtered = listOfModels.filter((model) => {
        return model.toLowerCase().includes(searchValue);
      });
      setFilteredModels(filtered);
    } else {
      setShowSearchResults(false);
      setFilteredModels(listOfModels);
    };
  };

  return (
    <>
      <IonHeader className='ion-no-border' style={{ padding: "5px" }} translucent>
        <IonToolbar style={{ display: 'flex', alignItems: 'center' }}>

          {/* Hamburger button that appears when the screen width is smaller than 768px */}
          <IonButtons slot="start">
            <IonMenuButton style={{ marginTop: "40%" }}></IonMenuButton>
          </IonButtons>

          {/* Only display the search bar when the screen width is greater than or equal to 768px */}
          <div className="search-bar" >
            <IonSearchbar animated color='light' ref={searchRef} onIonInput={handleSearch} onIonFocus={handleClickOnSearchbar} onIonBlur={handleClickOffSearchbar} placeholder='Search 3D Models...' enterkeyhint='search' style={{ width: "50%", padding: '10px' }} />
            <IonButton fill='clear' size='default'>
              <IonIcon icon={mapOutline}></IonIcon>
            </IonButton>
          </div>

          {/* Hide search bar and only display the icons when the screen width is less than 768px */}
          <div className="search-icon">
            <IonTitle><IonText color='primary'>3D Models</IonText></IonTitle>
            <IonButton fill='clear' size='default'>
              <IonIcon icon={searchOutline}></IonIcon>
            </IonButton>
            <IonButton fill='clear' size='default'>
              <IonIcon icon={mapOutline}></IonIcon>
            </IonButton>
          </div>

        </IonToolbar>
      </IonHeader>

      {/* Display the search results when the user types into the searchbar */}
      <div className={`item-list ${showSearchResults ? 'overlay' : ''}`}>
        {showSearchResults && filteredModels.slice(0, 4).map((model: string, index: number) => {
          return (
            <IonItem key={index} onClick={() => handleModelListButtonPress(model)} button detail={false} lines='full' color='light'><IonText color='primary'>{model}</IonText></IonItem>
          );
        })}
      </div>

    </>
  )
};

export default ModelHeader;