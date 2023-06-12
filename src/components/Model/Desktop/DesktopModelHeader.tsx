/**
 * @file DesktopModelHeader.tsx
 * @fileoverview This file exports the DesktopModelHeader component which is used to display the header of the 3D model page on desktop.
 */

{/* Ionic/React */ }
import React from "react";
import { IonSearchbar, IonButton, IonIcon, IonButtons } from "@ionic/react";
import { desktopOutline, informationCircleOutline, mapOutline } from "ionicons/icons";
import '../../../App.css';

interface ModelDesktopHeaderProps {
  searchRef: React.RefObject<HTMLIonSearchbarElement>;
  handleSearch: (event: CustomEvent) => void;
  handleSearchKeyPress: (event: React.KeyboardEvent<HTMLIonSearchbarElement>) => void;
  handleClickOnInfoIcon: () => void;
  setShowSearchResults: React.Dispatch<React.SetStateAction<boolean>>;
}

const DesktopModelHeader = React.memo((props: ModelDesktopHeaderProps) => {

  const { searchRef, handleSearch, handleSearchKeyPress, setShowSearchResults, handleClickOnInfoIcon } = props;

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
        onIonInput={handleSearch} onIonFocus={handleClickOnSearchbar} placeholder='Search 3D Models...'
        enterkeyhint='search' style={{ paddingTop : "10px", width : "50%" }}
      />
      <IonButtons slot='end' className='desktop-header-buttons'>
        <IonButton onClick={handleClickOnInfoIcon} fill='clear' size='large'>
          <IonIcon aria-hidden="true" icon={informationCircleOutline} />
        </IonButton>
        <IonButton fill='clear' size='large'>
          <IonIcon aria-hidden="true" icon={mapOutline}></IonIcon>
        </IonButton>
      </IonButtons>
    </div>
  );
});

export default DesktopModelHeader;