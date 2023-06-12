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
  handleClickOnInfoIcon: () => void;
}

const MobileModelHeader = React.memo((props: ModelDesktopHeaderProps) => {

  const handleClickOnSearchIcon = props.handleClickOnSearchIcon;
  const handleClickOnInfoIcon = props.handleClickOnInfoIcon;
  
  return (
    <div className="search-icon">
      <IonTitle role="heading" aria-level={1}><IonText color='primary'>3D Models</IonText></IonTitle>
      <IonButtons slot='end'>
        <IonButton onClick={handleClickOnSearchIcon} fill='clear' size='large'>
          <IonIcon aria-hidden="true" icon={searchOutline}></IonIcon>
        </IonButton>
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

export default MobileModelHeader;