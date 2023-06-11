import React from "react";
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonSpinner, IonText, IonTitle, IonToolbar } from "@ionic/react";
import '../../App.css';
import { closeOutline } from "ionicons/icons";
import { Keyboard } from "@capacitor/keyboard";
import { inModelList } from "../../herbarium";

interface ModelInfoModalProps {
  model: string;
  infoLoading: boolean;
  showInfoModal: boolean;
  wikiInfo : any;
  profileInfo : any;
  classificationInfo : any;
  imageInfo : any;
  setShowInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModelInfoModal = (props: ModelInfoModalProps) => {

  const { model, infoLoading, showInfoModal, setShowInfoModal, wikiInfo, classificationInfo, profileInfo, imageInfo } = props;

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

        {infoLoading ?
          <IonSpinner color="primary" className='full-center' />
          :
          <IonCard className="ion-no-padding">
            <IonCardHeader>
              <IonCardTitle>Profile</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList lines="full" text-center>
                {profileInfo &&
                  Object.keys(profileInfo).map((keyName: string, i: number) => {
                    if (!profileInfo[keyName as keyof typeof profileInfo]) {
                      return null;
                    }
                    return (
                      <IonItem key={keyName + i.toString()} className="ion-text-wrap">
                        <IonLabel style={{ textAlign: "left" }} className="ion-text-wrap">
                          {keyName} : {profileInfo[keyName as keyof typeof profileInfo]}
                        </IonLabel>
                      </IonItem>
                    );
                  })}
              </IonList>
            </IonCardContent>
            <IonCardHeader>
              <IonCardTitle>Classification</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList lines="full" text-center>
                {classificationInfo &&
                  Object.keys(classificationInfo).map((keyName: string, i: number) => {
                    if (keyName === "UsageKey") {
                      return null;
                    }
                    return (
                      <IonItem key={keyName + i.toString()} className="ion-text-wrap">
                        <IonLabel style={{ textAlign: "left" }} className="ion-text-wrap">
                          {keyName} : {classificationInfo[keyName as keyof typeof classificationInfo]}
                        </IonLabel>
                      </IonItem>
                    );
                  })}
              </IonList>
            </IonCardContent>
            <IonCardHeader>
              <IonCardTitle>Description</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList lines="full" text-center>
                {wikiInfo &&
                  Object.keys(wikiInfo).map((keyName: string, i: number) => {
                    if (keyName === 'wikiLink') {
                      return (
                        <IonLabel key={keyName + i.toString()} style={{ textAlign: "left" }} className="ion-text-wrap">
                          <a href={wikiInfo[keyName as keyof typeof wikiInfo]}>{wikiInfo[keyName as keyof typeof wikiInfo]}</a>
                        </IonLabel>
                      )
                    }
                    return (
                      <IonItem key={keyName + i.toString()} className="ion-text-wrap">
                        <IonLabel style={{ textAlign: "left" }} className="ion-text-wrap">
                          {wikiInfo[keyName as keyof typeof wikiInfo]}
                        </IonLabel>
                      </IonItem>
                    );
                  })}
              </IonList>
            </IonCardContent>
          </IonCard>
        }

      </IonContent>
    </IonModal>
  )
};

export default ModelInfoModal;