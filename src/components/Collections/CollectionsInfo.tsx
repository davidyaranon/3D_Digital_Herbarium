/**
 * @file CollectionsInfo.tsx
 * @fileoverview This file contains the CollectionsInfo component, which is the component that
 * displays the information for the selected species in the collections page.
 */

import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem, IonLabel, IonList, IonSpinner, IonText } from "@ionic/react";
import { listOfModels, sketchFabLinks, modelSpeciesName } from "../../herbarium";
import { useHistory } from "react-router";
import { Preferences } from "@capacitor/preferences";
import { useContext } from "../../my-context";
import FadeIn from "react-fade-in/lib/FadeIn";

interface CollectionsInfoProps {
  infoLoading: boolean;
  specimen: string;
  classificationInfo: any;
  profileInfo: any;
  imageInfo: string[];
  wikiInfo: any;
};

/**
 * @description Ensures each word in the string starts with a capital letter.
 * 
 * @param {string} modelName the name of the selected model (or of the last path param of the URL)
 * @returns {string} the adjusted string
 */
const adjustString = (modelName: string): string => {
  let newString = modelName.toLowerCase();
  newString = newString.replace(/(^|\s)\S/g, function (letter) {
    return letter.toUpperCase();
  }
  );
  return newString;
}

/**
 * @description Checks if the model is in the list of models.
 * 
 * @param {string} specimen the last path param of the URL
 * @returns {boolean} true if the model is in the list of models, false otherwise
 */
const inModelList = (specimen: string): boolean => {
  const adjustedModelString = adjustString(specimen);
  if (listOfModels.includes(adjustedModelString) || adjustedModelString.toLocaleLowerCase() in sketchFabLinks) {
    return true;
  }
  return false;
}


const CollectionsInfo = (props: CollectionsInfoProps) => {

  const { specimen, infoLoading, classificationInfo, profileInfo, imageInfo, wikiInfo } = props;

  // Hooks
  const history = useHistory();
  const context = useContext();

  /**
   * @description Redirects to the model page for the selected model.
   * This function checks whether the specimen is the common name or the species name and handles it accordingly.
   */
  const handleRedirectToModelFromCollections = async (): Promise<void> => {
    if (specimen.toLocaleLowerCase() in sketchFabLinks) {
      const key = Object.keys(modelSpeciesName).find((key) => modelSpeciesName[key as keyof typeof modelSpeciesName] === specimen.toLocaleLowerCase());
      if (!key) return;
      await Preferences.set({ key: 'model', value: key });
      context.setModel(key);
      history.push("/pages/models/" + key)
      return;
    } else {
      await Preferences.set({ key: 'model', value: specimen });
      context.setModel(specimen);
      history.push("/pages/models/" + specimen);
    }
  };

  const handleClickOnSpeciesFromGenus = async (species: string): Promise<void> => {
    await Preferences.set({ key: 'specimen', value: species });
    context.setSpecimen(species);
    history.push("/pages/collections/" + species);
  };

  const handleClickOnSpeciesFromCommonName = async (species: string): Promise<void> => {
    await Preferences.set({ key: 'specimen', value: species });
    context.setSpecimen(species);
    history.push("/pages/collections/" + species);
  };

  return (
    <>
      <div>

        <FadeIn>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontSize: "1.25em" }}><IonText color='primary'>{adjustString(specimen)}</IonText></p>
          </div>
        </FadeIn>

        <FadeIn>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {inModelList(adjustString(specimen)) &&
              <a style={{ cursor: 'pointer' }} onClick={handleRedirectToModelFromCollections}><IonText color='primary'>3D Model available for {specimen}</IonText></a>
            }
          </div>
        </FadeIn>

        {classificationInfo && classificationInfo.name === undefined &&
          <FadeIn className='full-center'>
            <p><IonText color='primary'>{classificationInfo.message}</IonText></p>
          </FadeIn>
        }

        {infoLoading ?
          <IonSpinner color="primary" className='full-center' />
          :
          classificationInfo && classificationInfo.name !== undefined ?
            <>
              <IonCardContent>

                {/* List of species is listed if search term is a genus */}
                {classificationInfo && "speciesList" in classificationInfo && classificationInfo.speciesList &&
                  <>
                    <IonCardTitle><IonText color='primary'>List of species associated with genus</IonText></IonCardTitle>
                    <br />
                    <IonList lines="full" text-center style={{ borderRadius: "10px" }}>
                      {classificationInfo.speciesList.map((species: string, index: number) => {
                        return (
                          <IonItem button key={index.toString()} className="ion-text-wrap" onClick={() => handleClickOnSpeciesFromGenus(species)}>
                            <IonLabel style={{ textAlign: "left", fontSize: "1.1em" }} className="ion-text-wrap">
                              {species}
                            </IonLabel>
                          </IonItem>
                        );
                      })}
                    </IonList>
                    <br />
                  </>
                }

                {/* List of species/genera is listed if search term is a common name, otherwise Classification info */}
                {classificationInfo && "listOfCommonNameSpecies" in classificationInfo && classificationInfo.listOfCommonNameSpecies ?
                  <>
                    <IonCardTitle><IonText color='primary'>Did you mean...?</IonText></IonCardTitle>
                    <br />
                    <IonList lines="full" text-center style={{ borderRadius: "10px" }}>
                      {classificationInfo.listOfCommonNameSpecies.map((info: any, index: number) => {
                        return (
                          <IonItem button key={index} onClick={() => handleClickOnSpeciesFromCommonName(info.name)}>
                            <IonLabel>{info.name} ({info.rank})</IonLabel>
                          </IonItem>
                        );
                      })}
                    </IonList>
                    <br />
                  </>
                  :
                  <>
                    <IonCardTitle><IonText color='primary'>Classification</IonText></IonCardTitle>
                    <br />
                    <IonList lines="full" text-center style={{ borderRadius: "10px" }}>
                      {Object.keys(classificationInfo).map((keyName: string, i: number) => {
                        if (keyName === "UsageKey" || keyName === "message" || keyName === "rank" || keyName === "name" || keyName === "speciesList" || keyName === "wikiName") {
                          return null;
                        }
                        console.log(keyName, classificationInfo[keyName]);
                        return (
                          <IonItem key={keyName + i.toString()} className="ion-text-wrap">
                            <IonLabel style={{ textAlign: "left", fontSize: "1.1em" }} className="ion-text-wrap">
                              {keyName} : {classificationInfo[keyName as keyof typeof classificationInfo]}
                            </IonLabel>
                          </IonItem>
                        );
                      })}
                    </IonList>
                  </>
                }

                <br />

                {!("listOfCommonNameSpecies" in classificationInfo) &&
                  <>
                    <IonCardTitle><IonText color='primary'>Profile</IonText></IonCardTitle>
                    <br />
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

                    <br />

                    <IonCardTitle><IonText color='primary'>Description</IonText></IonCardTitle>
                    <br />
                    <IonList lines="full" text-center style={{ borderRadius: "10px" }}>
                      {wikiInfo &&
                        Object.keys(wikiInfo).map((keyName: string, i: number) => {
                          if (keyName === 'wikiLink') {
                            return (
                              <IonLabel key={keyName + i.toString()} style={{ textAlign: "left" }} className="ion-text-wrap">
                                <a style={{ color: 'var(--ion-color-light)', padding: '15px' }} href={wikiInfo[keyName as keyof typeof wikiInfo]}>{wikiInfo[keyName as keyof typeof wikiInfo]}</a>
                              </IonLabel>
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
                  </>
                }
              </IonCardContent>
            </>
            :
            <></>
        }

      </div >
    </>
  )
};

export default CollectionsInfo;