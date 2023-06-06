import React from "react";
import { IonContent, IonModal, IonText } from "@ionic/react";

import '../../App.css';

interface CollectionsInfoModalProps {
  showInfoModal: boolean;
  setShowInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CollectionsInfoModal = (props : CollectionsInfoModalProps) => {

  const showInfoModal = props.showInfoModal;
  const setShowInfoModal = props.setShowInfoModal;

  return (
    <IonModal isOpen={showInfoModal}>
      <IonContent>
        <p><IonText color='primary'>HI MODAL</IonText></p>
      </IonContent>
    </IonModal>
  )
};

export default CollectionsInfoModal;