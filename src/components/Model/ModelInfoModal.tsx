import React from "react";
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonText, IonTitle, IonToolbar } from "@ionic/react";
import '../../App.css';
import { closeOutline } from "ionicons/icons";
import { Keyboard } from "@capacitor/keyboard";
import { inModelList } from "../../herbarium";

interface ModelInfoModalProps {
  model: string;
  showInfoModal: boolean;
  setShowInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModelInfoModal = (props: ModelInfoModalProps) => {

  const { model, showInfoModal, setShowInfoModal } = props;

  /**
   * @description: This function is called when the user presses the close button on the search modal.
   * It hides the keyboard and closes the modal entirely.
   */
  const closeModal = (): void => {
    Keyboard.hide().then(() => {
      setTimeout(() => setShowInfoModal(false), 100);
    }).catch((err) => {
      setTimeout(() => setShowInfoModal(false), 100);
    });
  };

  /**
   * @description: This function ensures the modal cannot be dismissed by swiping down.
   * 
   * @param {any} data the data that is being passed to the modal
   * @param {string} role the kind of dismissal that is being attempted
   * @returns {boolean} whether the modal can be dismissed
   */
  async function canDismiss(data?: any, role?: string): Promise<boolean> {
    return role !== 'gesture';
  }

  return (
    <IonModal style={{ '--width': '95vw', '--background': 'var(--ion-color-light)' }} animated isOpen={showInfoModal} canDismiss={canDismiss} backdropDismiss={false} handle={false} breakpoints={[0, 1]} initialBreakpoint={1}>
      { /* Header with title, searchbar and close button */}
      <div style={{ width: "100%" }}>
        <IonHeader>
          <IonToolbar>
            <IonTitle color='primary'>{!inModelList(model) ? `No matching model for ${model}!` : model}</IonTitle>
            <IonButtons style={{ marginLeft: "-0.5%" }}>
              <IonButton onClick={closeModal}>
                <IonIcon color='primary' icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      </div>
      <IonContent style={{ '--background': 'white' }}>
        <p style={{ padding: "10px" }}><IonText color='primary'>HI MODAL</IonText></p>
      </IonContent>
    </IonModal>
  )
};

export default ModelInfoModal;