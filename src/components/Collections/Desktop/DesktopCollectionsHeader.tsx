/**
 * @file DesktopCollectionsHeader.tsx
 * @fileoverview This file exports the DesktopCollectionsHeader component which is used to display the header of the Collections page on desktop.
 */

{/* Ionic/React */ }
import React from "react";
import { IonSearchbar, IonButton, IonIcon, IonButtons } from "@ionic/react";
import { mapOutline } from "ionicons/icons";
import '../../../App.css';

interface DesktopCollectionsHeaderProps {
  searchRef: React.RefObject<HTMLIonSearchbarElement>;
  handleSearch: (event: CustomEvent) => void;
  handleSearchKeyPress: (event: React.KeyboardEvent<HTMLIonSearchbarElement>) => void;
  setShowSearchResults: React.Dispatch<React.SetStateAction<boolean>>;
  localSearchEnabled : boolean;
}

const DesktopCollectionsHeader = React.memo((props: DesktopCollectionsHeaderProps) => {

  const { searchRef, handleSearch, handleSearchKeyPress, setShowSearchResults, localSearchEnabled } = props;

  /**
   * @description This function is called when the user clicks on the searchbar.
   * It should show the search results if the searchbar is not empty.
   */
  const handleClickOnSearchbar = (): void => {
    if (searchRef && searchRef.current && searchRef.current.value !== '')
      setShowSearchResults(true);
  };

  return (
    <div className="search-bar-container" >
      <IonSearchbar animated color='light' ref={searchRef} onKeyPress={handleSearchKeyPress}
        onIonInput={handleSearch} onIonFocus={handleClickOnSearchbar} placeholder={localSearchEnabled ? 'Search Local Flora...' : 'Search Flora...'}
        enterkeyhint='search' style={{ paddingTop : "10px", width : "50%" }}
      />
      <IonButtons slot='end' className='desktop-header-buttons'>
        <IonButton fill='clear' size='large'>
          <IonIcon icon={mapOutline}></IonIcon>
        </IonButton>
      </IonButtons>
    </div>
  );
});

export default DesktopCollectionsHeader;