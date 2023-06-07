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
import { getSearchTermClassification, getSpeciesImages, getSpeciesProfile, getWikiInfo } from "../herbarium";
import CollectionsHeader from "../components/Collections/CollectionsHeader";
import CollectionsInfo from "../components/Collections/CollectionsInfo";

/* Styles */
import '../App.css';

interface CollectionsPostParams {
  specimen: string;
};

type SpecimenClassificationInfo = {
  message: string | undefined;
  name: string | undefined;
  rank: string | undefined;
  Kingdom: string | undefined;
  Phylum: string | undefined;
  Class: string | undefined;
  Order: string | undefined;
  Family: string | undefined;
  UsageKey: string | undefined;
  speciesList?: string[] | undefined;
  listOfCommonNameSpecies?: string[] | undefined;
};

const Collections = ({ match }: RouteComponentProps<CollectionsPostParams>) => {

  const specimen = match.params.specimen;

  /* Hooks */
  const Toast = useToast();
  const context = useContext();

  /* State Variables */

  // Whether loading spinner for info modal is active or not, default is true
  const [specimenLoading, setSpecimenLoading] = React.useState<boolean>(true);

  // The profile information for the species, default is empty object
  const [classificationInfo, setClassificationInfo] = React.useState<SpecimenClassificationInfo>();

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
   */
  const handlePageLoad = React.useCallback(async () => {
    if (!specimen) return;
    setSpecimenLoading(true);
    const classificationRes: SpecimenClassificationInfo = await getSearchTermClassification(specimen, context.localSearchChecked);
    setClassificationInfo(classificationRes);
    console.log("classificationRes", classificationRes);
    if (classificationRes.UsageKey) {
      const profileRes = await getSpeciesProfile(classificationRes.UsageKey.toString());
      setProfileInfo(profileRes);
      console.log("profileRes", profileRes)
      const imageRes = await getSpeciesImages(classificationRes.UsageKey.toString());
      setImageInfo(imageRes);
      console.log("imageRes", imageRes)
    }
    const wikiInfo = await getWikiInfo(classificationRes.name || specimen);
    setWikiInfo(wikiInfo);
    console.log("wikiInfo", wikiInfo)
    setSpecimenLoading(false);
  }, [context.specimen, specimen]);

  /**
   * @description: This function is called when the page is loaded.
   */
  React.useEffect(() => {
    handlePageLoad();
  }, [context.specimen, specimen]);

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

export default React.memo(Collections);