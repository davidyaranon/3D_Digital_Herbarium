/**
 * @fileoverview This file contains the ModelHeader component, which is the header for the 3D Models page.
 * It contains the search bar and the buttons for the map and more.
 * It handles the search bar and the search results.
 */

{/* Ionic / React */ }
import React from 'react';
import {
  IonHeader, IonToolbar, IonButtons, IonMenuButton,
  IonSearchbar, IonIcon, IonButton, IonTitle, IonText,
  IonItem, IonContent, IonList, IonModal
} from '@ionic/react';
import { closeOutline, informationCircleOutline, mapOutline, searchOutline } from 'ionicons/icons';

{/* Capacitor */ }
import { Preferences } from '@capacitor/preferences';

{/* Helpers */ }
import { listOfModels } from '../../assets/data/ListOfModels';
import { useContext } from '../../my-context';

{/* Styles */ }
import './ModelHeader.css';
import { timeout } from '../../herbarium';
import { useHistory } from 'react-router';
import { Keyboard } from '@capacitor/keyboard';

{/* Props definition */ }
interface ModelHeaderProps {
  loading: boolean;
  setModelLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModelHeader = (props: ModelHeaderProps) => {

  // Props
  const setModelLoading = props.setModelLoading;

  // Hooks
  const context = useContext();
  const history = useHistory();

  // State Variables
  const searchRef = React.useRef<HTMLIonSearchbarElement>(null);
  const [showSearchResults, setShowSearchResults] = React.useState<boolean>(false);
  const [filteredModels, setFilteredModels] = React.useState<string[]>(listOfModels);
  const [showSearchModal, setShowSearchModal] = React.useState<boolean>(false);

  /**
   * @description This function is called when the user clicks on the searchbar.
   * It should show the search results if the searchbar is not empty.
   */
  const handleClickOnSearchbar = (): void => {
    if (searchRef && searchRef.current && searchRef.current.value !== '')
      setShowSearchResults(true);
  };

  /**
   * @description This function is called when the user clicks on the search icon.
   */
  const handleClickOnSearchIcon = (): void => {
    setShowSearchModal(true);
  }

  /**
   * @description This function is called when the user presses a key on the searchbar.
   * 
   * @param {React.KeyboardEvent<HTMLIonSearchbarElement>} event the event that is triggered when the user presses a key on the searchbar
   */
  const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLIonSearchbarElement>) => {
    if (event.key === 'Enter') {
      const searchTerm = (event.target as HTMLIonSearchbarElement).value || '';
      handleModelListButtonPress(searchTerm);
    }
  };

  /**
  * @description: This function ensures the modal cannot be dismissed by swiping down.
  * 
  * @param {any} data the data that is being passed to the modal
  * @param {string} role the kind of dismissal that is being attempted
  * @returns {boolean} whether the modal can be dismissed
  */
  async function canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  /**
   * @description: This function is called when the user presses the close button on the search modal.
   * It hides the keyboard and closes the modal entirely.
   */
  const closeModal = (): void => {
    Keyboard.hide().then(() => {
      setTimeout(() => setShowSearchModal(false), 100);
      // modal.current?.dismiss();
    }).catch((err) => {
      setTimeout(() => setShowSearchModal(false), 100);
      // modal.current?.dismiss();
    });
    timeout(250).then(() => {
      setFilteredModels(listOfModels);
    });
  };

  /**
   * @description This function is called when the user clicks on a model in the search results.
   * It should set the model to the model that the user clicked on.
   * 
   * @param {string} model the model that the user wants to view.
   */
  const handleModelListButtonPress = async (model: string): Promise<void> => {
    setShowSearchResults(false);
    if (model !== context.model) {
      console.log('setting context.model to ' + model)
      setModelLoading(true);
      context.setModel(model);
      await Preferences.set({ key: 'model', value: model });
      history.push('/pages/models/' + model)
    }
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
            <IonMenuButton style={{ marginTop: "15%" }}></IonMenuButton>
          </IonButtons>

          {/* Only display the search bar when the screen width is greater than or equal to 768px */}
          <div className="search-bar" >
            <IonSearchbar animated color='light' ref={searchRef} onKeyPress={handleSearchKeyPress}
              onIonInput={handleSearch} onIonFocus={handleClickOnSearchbar} placeholder='Search 3D Models...'
              enterkeyhint='search' style={{ width: "50%", padding: '10px' }}
            />
            <div style={{ display: 'flex', paddingLeft: '35%' }}>
              <IonButton fill='clear' size='default'>
                <IonIcon icon={informationCircleOutline} />
              </IonButton>
              <IonButton fill='clear' size='default'>
                <IonIcon icon={mapOutline}></IonIcon>
              </IonButton>
            </div>
          </div>

          {/* Hide search bar and only display the icons when the screen width is less than 768px */}
          <div className="search-icon">
            <IonTitle><IonText color='primary'>3D Models</IonText></IonTitle>
            <IonButtons slot='end'>
              <IonButton onClick={handleClickOnSearchIcon} fill='clear' size='default'>
                <IonIcon icon={searchOutline}></IonIcon>
              </IonButton>
              <IonButton fill='clear' size='default'>
                <IonIcon icon={informationCircleOutline} />
              </IonButton>
              <IonButton fill='clear' size='default'>
                <IonIcon icon={mapOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          </div>

        </IonToolbar>
      </IonHeader >

      {/* Display the search results when the user types into the searchbar */}
      <div className={`item-list ${showSearchResults ? 'overlay' : ''}`}>
        {showSearchResults && filteredModels.slice(0, 4).map((model: string, index: number) => {
          return (
            <IonItem type='submit' key={index} onClick={() => handleModelListButtonPress(model)}
              button detail={false} lines='full'
              color='light'><IonText color='primary'>{model}</IonText>
            </IonItem>
          );
        })}
      </div>

      { /* Slide up modal that displays the search results when the user clicks on the search icon */}
      <IonModal className='mobile-search-modal' backdropDismiss={false} animated
        canDismiss={canDismiss} isOpen={showSearchModal} handle={false}
        breakpoints={[0, 1]} initialBreakpoint={1}
      >

        { /* Header with title, searchbar and close button */}
        <div style={{ width: "100%" }}>
          <IonHeader>
            <IonToolbar>
              <IonTitle><IonText color='primary'>3D Model Search</IonText></IonTitle>
              <IonButtons style={{ marginLeft: "-2.5%" }}>
                <IonButton onClick={() => { closeModal() }}>
                  <IonIcon color='primary' icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonToolbar>
              <IonSearchbar color='light' animated onKeyPress={handleSearchKeyPress}
                onIonInput={handleSearch} ref={searchRef} placeholder='Search...'
                enterkeyhint='search' class="overlay"
              />
            </IonToolbar>
          </IonHeader>
        </div>

        { /* List of models that are filtered by the searchbar */}
        <IonContent style={{ "--background": "white" }}>
          <IonList>
            {filteredModels.map((model, index) => (
              <IonItem type='submit' key={index} onClick={() => handleModelListButtonPress(model)}
                button detail={false} lines='full'
                color='light'><IonText color='primary'>{model}</IonText>
              </IonItem>
            ))}
          </IonList>
        </IonContent>

      </IonModal>

    </>
  )
};

export default ModelHeader;