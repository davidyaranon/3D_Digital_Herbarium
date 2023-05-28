/**
 * @file MobileModelHeader.tsx
 * @fileoverview This file exports the MobileModelHeader component which is used to display the header of the 3D model page on mobile.
 */

{/* Ionic / React */ }
import { IonTitle, IonText, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { searchOutline, informationCircleOutline, mapOutline } from "ionicons/icons";

interface ModelHeaderProps {
  handleClickOnSearchIcon: () => void;
}

const MobileModelHeader = (props: ModelHeaderProps) => {

  const handleClickOnSearchIcon = props.handleClickOnSearchIcon;

  return (
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

  );
}

export default MobileModelHeader;