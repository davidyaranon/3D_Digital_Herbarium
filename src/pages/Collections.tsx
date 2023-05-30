/**
 * @file CollectionsPage.tsx
 * @fileoverview This file contains the CollectionsPage component, which is the page that 
 * displays the collections. 
 */


/* React / Ionic */
import React from "react";
import {
  IonPage, IonContent, IonCardTitle, IonSpinner,
  IonCardHeader, IonText
} from "@ionic/react"

/* Helpers */
import { getSpeciesClassification, getSpeciesImages, getSpeciesProfile, getWikiInfo } from "../herbarium";
import { speciesName } from "../assets/data/ListOfModels";
import { useContext } from "../my-context";
import { useToast } from "@agney/ir-toast";

import CollectionsHeader from "../components/Collections/CollectionsHeader";

/* Styles */
import '../App.css';

const Collections: React.FC = () => {

  /* Hooks */
  const Toast = useToast();
  const context = useContext();

  /* State Variables */

  // Whether loading spinner for info modal is active or not, default is true
  const [infoLoading, setInfoLoading] = React.useState<boolean>(true);

  // The profile information for the species, default is empty object
  const [classificationInfo, setClassificationInfo] = React.useState<any>({});

  // The classification information for the species, default is empty object
  const [profileInfo, setProfileInfo] = React.useState<any>({});

  // The image information for the species, default is empty array
  const [imageInfo, setImageInfo] = React.useState<string[]>([]);

  // The wikipedia information for the species, default is empty object
  const [wikiInfo, setWikiInfo] = React.useState<any>({});


  /**
   * @description: This function is called when the page is loaded.
   * It gets the classification and profile information for the species.
   * It also gets the wikipedia information for the species.
   * It then sets the state variables to the information.
   * If there is an error, it displays a toast message.
   */
  const handlePageLoad = React.useCallback(async () => {
    if (!context.model) return;
    setInfoLoading(true);
    if (context.model in speciesName) {
      const species: string = speciesName[context.model]
      console.log(species);
      const classificationRes = await getSpeciesClassification(species);
      setClassificationInfo(classificationRes || {});
      if ("UsageKey" in classificationRes && classificationRes.UsageKey) {
        const profileRes = await getSpeciesProfile(classificationRes.UsageKey.toString());
        setProfileInfo(profileRes || {});
        const imageRes = await getSpeciesImages(classificationRes.UsageKey.toString());
        setImageInfo(imageRes || []);
      } else {
        const toast = Toast.create({ message: "Unable to get profile for " + species, duration: 2500, color: 'danger' });
        toast.present();
      }
      const wikiInfo = await getWikiInfo(species);
      setWikiInfo(wikiInfo || {});
    } else {
      const toast = Toast.create({ message: "Unable to get information for this species", duration: 2500, color: 'danger' });
      toast.present();
    }
    setInfoLoading(false);
  }, [context.model]);

  /**
   * @description: This function is called when the page is loaded.
   */
  React.useEffect(() => {
    handlePageLoad();
  }, [context.model]);

  return (
    <IonPage>

      {/* Collections Header */}
      <CollectionsHeader />

      {/* Collections Main Content */}
      <IonContent style={{"--background" : "#FFFFFF"}}>

        <IonCardHeader>
          <IonCardTitle style={{ color: "black" }}>Collections</IonCardTitle>
        </IonCardHeader>

        {infoLoading ?
          <IonSpinner class='full-center'/>
          :
          <>
            <p><IonText color='dark'>{context.model}</IonText></p>

          </>
        }


      </IonContent>

    </IonPage>
  );
};

export default Collections;