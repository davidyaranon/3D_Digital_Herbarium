/**
 * @fileoverview This file contains the header for the collections page.
 * It contains the search bar and the buttons for the map and more.
 * It handles the search bar and the search results.
 */

{/* Ionic / React */ }
import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonItem, IonText, IonSkeletonText } from '@ionic/react';
import { useHistory } from 'react-router';

{/* Capacitor */ }
import { Preferences } from '@capacitor/preferences';

{/* Helpers */ }
import { useContext } from '../../my-context';
import { autocompleteSearch, timeout } from '../../herbarium';
import MobileCollectionsHeader from './Mobile/MobileCollectionsHeader';
import MobileCollectionsSearchModal from './Mobile/MobileCollectionsSearchModal';
import DesktopCollectionsHeader from './Desktop/DesktopCollectionsHeader';

{/* Styles */ }
import '../../App.css';

const loadingSearchItems = ['', '', '', '', ''];

{/* Props definition */ }
interface CollectionsHeaderProps {
  specimenLoading: boolean;
  setSpecimenLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const CollectionsHeader = React.memo((props: CollectionsHeaderProps) => {
  // Props
  const specimenLoading = props.specimenLoading;
  const setSpecimenLoading = props.setSpecimenLoading;

  // Hooks
  const context = useContext();
  const history = useHistory();

  // State Variables
  const searchRef = React.useRef<HTMLIonSearchbarElement>(null);
  const [showSearchResults, setShowSearchResults] = React.useState<boolean>(false);
  const [showSearchResultsLoading, setShowSearchResultsLoading] = React.useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = React.useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = React.useState<boolean>(false);
  const [filteredSpecimen, setFilteredSpecimen] = React.useState<string[]>([]);

  /**
   * @description This function is called when the user clicks on the search icon.
   */
  const handleClickOnSearchIcon = React.useCallback((): void => {
    setShowSearchModal(true);
  }, []);

  /**
   * @description This function is called when the user clicks on the info icon.
   */
  const handleClickOnInfoIcon = (): void => {
    setShowInfoModal(true);
  };

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
      const autocompleteResults = await autocompleteSearch(searchValue, context.localSearchChecked);
      await timeout(500);
      setFilteredSpecimen(autocompleteResults);
      setShowSearchResultsLoading(false);
    } else {
      setFilteredSpecimen([]);
      setShowSearchResults(false);
      setShowSearchResultsLoading(false);
    }
  };

  /**
   * @description This function is called when the user clicks on a specimen in the search results.
   * It should set the speicmen to the specimen that the user clicked on.
   * 
   * @param {string} specimen the specimen that the user wants to view.
   */
  const handleSpecimenListButtonPress = React.useCallback(async (specimen: string): Promise<void> => {
    setShowSearchResults(false);
    const path = window.location.pathname;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];
    if (specimen.toLocaleLowerCase() !== context.specimen.toLocaleLowerCase() || lastPart.toLocaleLowerCase() !== specimen.toLocaleLowerCase()) {
      console.log('setting context.specimen to ' + specimen)
      setSpecimenLoading(true);
      context.setSpecimen(specimen);
      await Preferences.set({ key: 'specimen', value: specimen });
      history.push('/pages/collections/' + specimen)
    }
  }, [context.specimen, context.setSpecimen, setSpecimenLoading, history]);


  /**
   * @description This function is called when the user presses a key on the searchbar.
   * 
   * @param {React.KeyboardEvent<HTMLIonSearchbarElement>} event the event that is triggered when the user presses a key on the searchbar
   */
  const handleSearchKeyPress = React.useCallback((event: React.KeyboardEvent<HTMLIonSearchbarElement>): void => {
    if (event.key === 'Enter') {
      const searchTerm = (event.target as HTMLIonSearchbarElement).value || '';
      handleSpecimenListButtonPress(searchTerm);
    }
  }, [handleSpecimenListButtonPress]);

  return (
    <>
      <IonHeader className='ion-no-border' style={{ padding: "5px" }} translucent>
        <IonToolbar style={{ display: 'flex', alignItems: 'center' }}>

          {/* Hamburger button that appears when the screen width is smaller than 768px */}
          <IonButtons slot="start">
            <IonMenuButton style={{ marginTop: "15%" }}></IonMenuButton>
          </IonButtons>

          {/* Only display the search bar when the screen width is greater than or equal to 768px */}
          <DesktopCollectionsHeader localSearchEnabled={context.localSearchChecked} searchRef={searchRef} handleSearch={handleSearch} handleSearchKeyPress={handleSearchKeyPress} setShowSearchResults={setShowSearchResults} />

          {/* Hide search bar and only display the icons when the screen width is less than 768px */}
          <MobileCollectionsHeader handleClickOnSearchIcon={handleClickOnSearchIcon} />

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
            <IonItem type='submit' key={index} onClick={() => handleSpecimenListButtonPress(specimen)}
              button detail={false} lines='full'
              color='light'>
              <IonText color='primary'>{specimen}</IonText>
            </IonItem>
          );
        })}
      </div>

      { /* Slide up modal that displays the search results when the user clicks on the search icon */}
      <MobileCollectionsSearchModal
        showSearchModal={showSearchModal} setShowSearchModal={setShowSearchModal}
        filteredSpecimen={filteredSpecimen} setFilteredSpecimen={setFilteredSpecimen}
        handleSpecimenListButtonPress={handleSpecimenListButtonPress}
        handleSearchKeyPress={handleSearchKeyPress} handleSearch={handleSearch}
        searchRef={searchRef} localSearchEnabled={context.localSearchChecked}
        showSearchResultsLoading={showSearchResultsLoading}
      />

    </>
  )
});

export default CollectionsHeader;