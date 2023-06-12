import React from "react";
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonSpinner, IonText, IonTitle, IonToolbar } from "@ionic/react";
import '../../App.css';
import { closeOutline } from "ionicons/icons";
import { Keyboard } from "@capacitor/keyboard";
import { adjustString, inModelList } from "../../herbarium";
import FadeIn from "react-fade-in";

interface ModelInfoModalProps {
  model: string;
  infoLoading: boolean;
  showInfoModal: boolean;
  wikiInfo: any;
  profileInfo: any;
  classificationInfo: any;
  imageInfo: any;
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
            <IonTitle color='primary'>
              {!inModelList(model) ?
                `No matching model for ${model}!`
                :
                (
                  <>
                    {adjustString(model)}
                  </>
                )
              }
            </IonTitle>
            <IonButtons style={{ marginLeft: "-0.5%" }}>
              <IonButton onClick={closeModal}>
                <IonIcon aria-hidden="true" color='primary' icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      </div>
      <IonContent style={{ '--background': 'white' }}>

        {infoLoading ?
          <IonSpinner color="primary" className='full-center' />
          :
          <IonCard className="ion-no-padding" color='light'>

            {classificationInfo && "name" in classificationInfo && (
              <IonCardTitle style={{ textAlign: "center" }}><u>{"" + classificationInfo.name + ""}</u></IonCardTitle>
            )}

            {imageInfo && (classificationInfo && (!("listOfCommonNameSpecies" in classificationInfo) || !classificationInfo.listOfCommonNameSpecies)) &&
              <FadeIn delay={125}>
                <br />
                {imageInfo.length <= 0 ?
                  <IonCardHeader>
                    <IonCardTitle> No Images Available for {adjustString(model)} </IonCardTitle>
                  </IonCardHeader>
                  :
                  <>
                    <IonCardHeader>
                      <IonCardTitle> Images </IonCardTitle>
                    </IonCardHeader>
                    <div style={{ marginLeft: "20px", marginRight: "20px", height: "50vh", display: "flex", flexDirection: "row", borderRadius: "10px", overflowX: "auto" }}>

                      {imageInfo.map((src: string, index: number) => {
                        return (
                          <img
                            loading="lazy"
                            key={index}
                            style={{ flex: 1, objectFit: "cover", marginRight: "5px" }}
                            src={src}
                          />
                        );
                      })}
                    </div>
                  </>
                }
                <br />
              </FadeIn>
            }

            <FadeIn>
              <IonCardHeader>
                <IonCardTitle>Classification</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList lines="full" text-center style={{ borderRadius: "10px" }}>
                  {classificationInfo &&
                    Object.keys(classificationInfo).map((keyName: string, i: number) => {
                      if (keyName === "UsageKey" || keyName === "message" || keyName === "rank" || keyName === "name") {
                        return null;
                      }
                      return (
                        <IonItem key={keyName + i.toString()} className="ion-text-wrap">
                          <IonLabel style={{ textAlign: "left", fontSize: "1.1em" }} className="ion-text-wrap">
                            {keyName} : {classificationInfo[keyName as keyof typeof classificationInfo]}
                          </IonLabel>
                        </IonItem>
                      );
                    })}
                </IonList>
              </IonCardContent>
            </FadeIn>

            <FadeIn delay={500}>
              <IonCardHeader>
                <IonCardTitle>Profile</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList lines="full" text-center style={{ borderRadius: "10px" }}>
                  {profileInfo &&
                    Object.keys(profileInfo).map((keyName: string, i: number) => {
                      if (!profileInfo[keyName as keyof typeof profileInfo]) {
                        return null;
                      }
                      return (
                        <IonItem key={keyName + i.toString()} className="ion-text-wrap">
                          <IonLabel style={{ textAlign: "left", fontSize: "1.1em" }} className="ion-text-wrap">
                            {keyName} : {profileInfo[keyName as keyof typeof profileInfo]}
                          </IonLabel>
                        </IonItem>
                      );
                    })}
                </IonList>
              </IonCardContent>
            </FadeIn>

            <FadeIn delay={1000}>
              <IonCardHeader>
                <IonCardTitle>Description</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList lines="full" text-center style={{ borderRadius: "10px" }}>
                  {wikiInfo &&
                    Object.keys(wikiInfo).map((keyName: string, i: number) => {
                      if (keyName === 'wikiLink') {
                        return (
                          <IonItem color='light' key={keyName + i.toString()} style={{ textAlign: "left" }} className="ion-text-wrap">
                            <a target="_blank" style={{ color: 'var(--ion-color-dark)' }} href={wikiInfo[keyName as keyof typeof wikiInfo]}>{wikiInfo[keyName as keyof typeof wikiInfo]}</a>
                          </IonItem>
                        )
                      }
                      return (
                        <IonItem key={keyName + i.toString()} className="ion-text-wrap">
                          <IonLabel style={{ textAlign: "left", fontSize: "1.1em" }} className="ion-text-wrap">
                            {wikiInfo[keyName as keyof typeof wikiInfo]}
                          </IonLabel>
                        </IonItem>
                      );
                    })}
                </IonList>
              </IonCardContent>
            </FadeIn>

          </IonCard>
        }

      </IonContent>
    </IonModal>
  )
};

export default ModelInfoModal;