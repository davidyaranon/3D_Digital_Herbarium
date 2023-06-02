/**
 * @file MobileModelHeader.tsx
 * @fileoverview This file exports the MobileModelHeader component which is used to display the header of the 3D model page on mobile.
 */

{/* Ionic / React */ }
import React from "react";
import { IonTitle, IonText, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { searchOutline, informationCircleOutline, mapOutline } from "ionicons/icons";
import '../../../App.css';

interface ModelDesktopHeaderProps {
  handleClickOnSearchIcon: () => void;
}

const MobileModelHeader = React.memo((props: ModelDesktopHeaderProps) => {
  console.log("MobileModelHeader");
  const handleClickOnSearchIcon = props.handleClickOnSearchIcon;

  return (
    <div className="search-icon">
      <IonTitle><IonText color='primary'>3D Models</IonText></IonTitle>
      <IonButtons slot='end'>
        <IonButton onClick={handleClickOnSearchIcon} fill='clear' size='large'>
          <IonIcon icon={searchOutline}></IonIcon>
        </IonButton>
        <IonButton fill='clear' size='large'>
          <IonIcon icon={informationCircleOutline} />
        </IonButton>
        <IonButton fill='clear' size='large'>
          <IonIcon icon={mapOutline}></IonIcon>
        </IonButton>
      </IonButtons>
    </div>

  );
});

export default MobileModelHeader;