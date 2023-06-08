/**
 * @file ModelHeader.tsx
 * @fileoverview This file contains the ModelHeader component, which is the header for the 3D Models page.
 * It contains the search bar and the buttons for the map and more.
 * It handles the search bar and the search results.
 */

{/* Ionic / React */ }
import React from 'react';
import {
  IonHeader, IonToolbar, IonButtons, IonMenuButton,
  IonText, IonItem,
} from '@ionic/react';
import { useHistory } from 'react-router';

{/* Capacitor */ }
import { Preferences } from '@capacitor/preferences';

{/* Helpers */ }
import { listOfModels, modelSpeciesName } from '../../herbarium';
import { useContext } from '../../my-context';

{/* Components */ }
import MobileModelSearchModal from './Mobile/MobileModelSearchModal';
import MobileModelHeader from './Mobile/MobileModelHeader';
import DesktopModelHeader from './Desktop/DesktopModelHeader';

{/* Styles */ }
import '../../App.css';
import ModelInfoModal from './ModelInfoModal';

{/* Props definition */ }
interface ModelHeaderProps {
  model: string;
  infoLoading: boolean;
  handleSetModelLoading: (loading: boolean) => void;
};

const ModelHeader = React.memo((props: ModelHeaderProps) => {

  // Props
  const { model, infoLoading, handleSetModelLoading } = props;

  // Hooks
  const context = useContext();
  const history = useHistory();

  // State Variables
  const searchRef = React.useRef<HTMLIonSearchbarElement>(null);
  const [showSearchResults, setShowSearchResults] = React.useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = React.useState<boolean>(false);
  const [filteredModels, setFilteredModels] = React.useState<string[]>(listOfModels);
  const [showSearchModal, setShowSearchModal] = React.useState<boolean>(false);

  /**
   * @description This function is called when the user clicks on the search icon.
   */
  const handleClickOnSearchIcon = (): void => {
    setShowSearchModal(true);
  };

  /**
   * @description This function is called when the user clicks on the info icon.
   */
  const handleClickOnInfoIcon = (): void => {
    setShowInfoModal(true);
  };

  /**
   * @description This function is called when the user clicks on a model in the search results.
   * It should set the model to the model that the user clicked on.
   * 
   * @param {string} model the model that the user wants to view.
   */
  const handleModelListButtonPress = React.useCallback(async (model: string): Promise<void> => {
    setShowSearchResults(false);
    const url = window.location.pathname;
    const decodedUrl = decodeURIComponent(url);
    if (decodedUrl.toLocaleLowerCase().trim().includes(model.toLocaleLowerCase().trim())) return;
    // if (model.toLocaleLowerCase() !== context.model.toLocaleLowerCase()) {
    console.log('setting context.model to ' + model)
    handleSetModelLoading(true);
    context.setModel(model);
    await Preferences.set({ key: 'model', value: model });
    history.push('/pages/models/' + model)
    // }
  }, [context.model, context.setModel, handleSetModelLoading, history]);


  /**
   * @description This function is called when the user presses a key on the searchbar.
   * 
   * @param {React.KeyboardEvent<HTMLIonSearchbarElement>} event the event that is triggered when the user presses a key on the searchbar
   */
  const handleSearchKeyPress = React.useCallback((event: React.KeyboardEvent<HTMLIonSearchbarElement>) => {
    if (event.key === 'Enter') {
      const searchTerm = (event.target as HTMLIonSearchbarElement).value || '';
      handleModelListButtonPress(searchTerm);
    }
  }, [handleModelListButtonPress]);

  /**
   * @description This function is called when the user types into the searchbar.
   * It should list the models that match the search query.
   * 
   * @param {any} event the event that is triggered when the user types into the searchbar
   */
  const handleSearch = React.useCallback((event: any): void => {
    if (event && event.target && event.target.value) {
      setShowSearchResults(true);
      const searchValue = event.target.value.toLowerCase();
      const filtered = listOfModels.filter((model: string) => {
        return model.toLowerCase().includes(searchValue);
      });
      setFilteredModels(filtered);
    } else {
      setShowSearchResults(false);
      setFilteredModels(listOfModels);
    };
  }, [filteredModels]);

  return (
    <>
      <IonHeader className='ion-no-border' style={{ padding: "5px" }} translucent>
        <IonToolbar style={{ display: 'flex', alignItems: 'center' }}>

          {/* Hamburger button that appears when the screen width is smaller than 768px */}
          <IonButtons slot="start">
            <IonMenuButton style={{ marginTop: "15%" }}></IonMenuButton>
          </IonButtons>

          {/* Only display the search bar when the screen width is greater than or equal to 768px */}
          <DesktopModelHeader searchRef={searchRef} handleSearch={handleSearch} handleSearchKeyPress={handleSearchKeyPress} setShowSearchResults={setShowSearchResults} handleClickOnInfoIcon={handleClickOnInfoIcon} />

          {/* Hide search bar and only display the icons when the screen width is less than 768px */}
          <MobileModelHeader handleClickOnSearchIcon={handleClickOnSearchIcon} handleClickOnInfoIcon={handleClickOnInfoIcon} />

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
      <MobileModelSearchModal
        showSearchModal={showSearchModal} setShowSearchModal={setShowSearchModal}
        filteredModels={filteredModels} setFilteredModels={setFilteredModels}
        handleModelListButtonPress={handleModelListButtonPress}
        handleSearchKeyPress={handleSearchKeyPress}
        handleSearch={handleSearch}
        searchRef={searchRef}
      />

      { /* Slide up modal that displays the info of the current model species when the user clicks on the info icon */}
      <ModelInfoModal infoLoading={infoLoading} showInfoModal={showInfoModal} setShowInfoModal={setShowInfoModal} model={model} />

    </>
  )
});

export default ModelHeader;