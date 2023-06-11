/**
 * @file MobileCollectionsHeader.tsx
 * @fileoverview This file exports the MobileCollectionsHeader component which is used to display the header of the Collections page on mobile.
 */

{/* Ionic / React */ }
import React from "react";
import { IonTitle, IonText, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { searchOutline, informationCircleOutline, mapOutline } from "ionicons/icons";
import '../../../App.css';

interface CollectionsMobileHeaderProps {
  handleClickOnSearchIcon: () => void;
}

const MobileCollectionsHeader = React.memo((props: CollectionsMobileHeaderProps) => {
  
  const handleClickOnSearchIcon = props.handleClickOnSearchIcon;

  return (
    <div className="search-icon">
      <IonTitle><IonText color='primary'>Collections</IonText></IonTitle>
      <IonButtons slot='end'>
        <IonButton onClick={handleClickOnSearchIcon} fill='clear' size='large'>
          <IonIcon icon={searchOutline}></IonIcon>
        </IonButton>
        <IonButton fill='clear' size='large'>
          <IonIcon icon={mapOutline}></IonIcon>
        </IonButton>
      </IonButtons>
    </div>

  );
});

export default MobileCollectionsHeader;