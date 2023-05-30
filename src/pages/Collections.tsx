/**
 * @file CollectionsPage.tsx
 * @fileoverview This file contains the CollectionsPage component, which is the page that 
 * displays the collections. 
 */


/* React / Ionic */
import React from "react";
import {
  IonPage, IonContent, IonText
} from "@ionic/react"
import { RouteComponentProps } from 'react-router-dom';

/* Helpers */
import { useContext } from "../my-context";
import { useToast } from "@agney/ir-toast";
import { getSpeciesClassification, getSpeciesImages, getSpeciesProfile, getWikiInfo } from "../herbarium";
import CollectionsHeader from "../components/Collections/CollectionsHeader";
import CollectionsInfo from "../components/Collections/CollectionsInfo";

/* Styles */
import '../App.css';

interface CollectionsPostParams {
  specimen: string;
}

const Collections = ({ match }: RouteComponentProps<CollectionsPostParams>) => {

  const specimen = match.params.specimen;

  /* Hooks */
  const Toast = useToast();
  const context = useContext();

  /* State Variables */

  // Whether loading spinner for info modal is active or not, default is true
  const [specimenLoading, setSpecimenLoading] = React.useState<boolean>(true);

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
    if (!context.specimen) return;
    setSpecimenLoading(true);
    const classificationRes = await getSpeciesClassification(specimen);
    setClassificationInfo(classificationRes || {});
    if ("UsageKey" in classificationRes && classificationRes.UsageKey) {
      const profileRes = await getSpeciesProfile(classificationRes.UsageKey.toString());
      setProfileInfo(profileRes || {});
      const imageRes = await getSpeciesImages(classificationRes.UsageKey.toString());
      setImageInfo(imageRes || []);
    }
    const wikiInfo = await getWikiInfo(specimen);
    setWikiInfo(wikiInfo || {});
    setSpecimenLoading(false);
  }, [context.specimen]);

  /**
   * @description: This function is called when the page is loaded.
   */
  React.useEffect(() => {
    handlePageLoad();
  }, [context.specimen]);

  return (
    <IonPage>

      {/* Collections Header */}
      <CollectionsHeader specimenLoading={specimenLoading} setSpecimenLoading={setSpecimenLoading} />

      {/* Collections Main Content */}
      <IonContent style={{ "--background": "#FFFFFF" }}>

        {specimen === 'select' ?
          <>
            <div className="select-collections">
              <IonText color='primary'><p className="collections-message-text">Search for a specimen to view its information</p></IonText>
            </div>
          </>
          :
          <CollectionsInfo
            classificationInfo={classificationInfo} profileInfo={profileInfo}
            imageInfo={imageInfo} wikiInfo={wikiInfo} specimen={specimen}
          />
        }

      </IonContent>

    </IonPage>
  );
};

export default Collections;