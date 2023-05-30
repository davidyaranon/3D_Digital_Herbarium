/**
 * @file DesktopModelHeader.tsx
 * @fileoverview This file exports the DesktopModelHeader component which is used to display the header of the 3D model page on desktop.
 */

{/* Ionic/React */ }
import React from "react";
import { IonSearchbar, IonButton, IonIcon, IonButtons } from "@ionic/react";
import { desktopOutline, informationCircleOutline, mapOutline } from "ionicons/icons";
import '../../../App.css';

interface DesktopModelHeaderProps {
  searchRef: React.RefObject<HTMLIonSearchbarElement>;
  handleSearch: (event: CustomEvent) => void;
  handleSearchKeyPress: (event: React.KeyboardEvent<HTMLIonSearchbarElement>) => void;
  setShowSearchResults: React.Dispatch<React.SetStateAction<boolean>>;
}

const DesktopModelHeader = React.memo((props: DesktopModelHeaderProps) => {

  const searchRef = props.searchRef;
  const handleSearch = props.handleSearch;
  const handleSearchKeyPress = props.handleSearchKeyPress;
  const setShowSearchResults = props.setShowSearchResults;

  /**
   * @description This function is called when the user clicks on the searchbar.
   * It should show the search results if the searchbar is not empty.
   */
  const handleClickOnSearchbar = (): void => {
    if (searchRef && searchRef.current && searchRef.current.value !== '')
      setShowSearchResults(true);
  };

  return (
    <div className="search-bar" >
      <IonSearchbar animated color='light' ref={searchRef} onKeyPress={handleSearchKeyPress}
        onIonInput={handleSearch} onIonFocus={handleClickOnSearchbar} placeholder='Search 3D Models...'
        enterkeyhint='search' style={{ width: "50%", padding: '10px', marginRight : "40%" }}
      />
      <IonButtons slot='end' style={{ }}>
        <IonButton fill='clear' size='large'>
          <IonIcon icon={informationCircleOutline} />
        </IonButton>
        <IonButton fill='clear' size='large'>
          <IonIcon icon={mapOutline}></IonIcon>
        </IonButton>
        <IonButton fill='clear' size='large'>
          <IonIcon icon={desktopOutline}></IonIcon>
        </IonButton>
      </IonButtons>
    </div>
  );
});

export default DesktopModelHeader;