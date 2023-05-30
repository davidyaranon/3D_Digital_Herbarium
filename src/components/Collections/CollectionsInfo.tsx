/**
 * @file CollectionsInfo.tsx
 * @fileoverview This file contains the CollectionsInfo component, which is the component that
 * displays the information for the selected species in the collections page.
 */

import { IonText } from "@ionic/react";
import { listOfModels, sketchFabLinks, speciesName } from "../../assets/data/ListOfModels";
import { useHistory } from "react-router";
import { Preferences } from "@capacitor/preferences";
import { useContext } from "../../my-context";

interface CollectionsInfoProps {
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

  // Props
  const specimen = props.specimen;
  const classificationInfo = props.classificationInfo;
  const profileInfo = props.profileInfo;
  const imageInfo = props.imageInfo;
  const wikiInfo = props.wikiInfo;

  // Hooks
  const history = useHistory();
  const context = useContext();

  /**
   * @description Redirects to the model page for the selected model.
   * This function checks whether the specimen is the common name or the species name and handles it accordingly.
   */
  const handleRedirectToModelFromCollections = async (): Promise<void> => {
    if (specimen.toLocaleLowerCase() in sketchFabLinks) {
      console.log(specimen.toLocaleLowerCase() + " in sketchFabLinks")
      const key = Object.keys(speciesName).find((key) => speciesName[key] === specimen.toLocaleLowerCase());
      console.log({ key })
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

  return (
    <>
      <p><IonText color='primary'>{specimen}</IonText></p>
      {inModelList(adjustString(specimen)) &&
        <a style={{ cursor: 'pointer' }} onClick={handleRedirectToModelFromCollections}><IonText color='primary'>3D Model available for {specimen}</IonText></a>
      }
    </>
  )
};

export default CollectionsInfo;