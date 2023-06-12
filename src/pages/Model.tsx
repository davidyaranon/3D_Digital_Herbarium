/**
 * @file Model.tsx
 * @fileoverview This file contains the 3D Model page. It contains the header and the model iframe.
 */

{/* Ionic / React */ }
import React from 'react';
import { IonContent, IonPage, IonText } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';

{/* Helpers */ }
import { adjustString, getSearchTermClassification, getSpeciesImages, getSpeciesProfile, getWikiInfo, inModelList, modelSpeciesName } from '../herbarium';
import ModelIframes from '../components/Model/ModelIframes';
import ModelHeader from '../components/Model/ModelHeader';

{/* Styles */ }
import '../App.css';
import { Preferences } from '@capacitor/preferences';
import { useContext } from '../my-context';

interface ModelSelectPostParams {
  model: string;
}

const Model = ({ match }: RouteComponentProps<ModelSelectPostParams>) => {

  const model = match.params.model;

  const context = useContext();

  // State Variables
  const [loading, setModelLoading] = React.useState<boolean>(true);
  const [infoLoading, setInfoLoading] = React.useState<boolean>(false);
  const [classificationInfo, setClassificationInfo] = React.useState<any>(null);
  const [profileInfo, setProfileInfo] = React.useState<any>(null);
  const [imageInfo, setImageInfo] = React.useState<any>(null);
  const [wikiInfo, setWikiInfo] = React.useState<any>(null);

  const handleLoadModelSpeciesInfo = React.useCallback(async (): Promise<void> => {
    const specimen: string | undefined | null = modelSpeciesName[adjustString(model) as keyof typeof modelSpeciesName];
    if (!specimen || model === 'select') return;
    setInfoLoading(true);
    const classificationRes = await getSearchTermClassification(specimen, context.localSearchChecked, true);
    setClassificationInfo(classificationRes);
    console.log("classificationRes", classificationRes);
    if (classificationRes.UsageKey) {
      const profileRes = await getSpeciesProfile(classificationRes.UsageKey.toString());
      setProfileInfo(profileRes);
      console.log("profileRes", profileRes)
      const {globalImages} = await getSpeciesImages(classificationRes.UsageKey.toString(),  classificationRes.name);
      setImageInfo(globalImages);
    }
    const wikiName = "wikiName" in classificationRes && classificationRes.wikiName ? classificationRes.wikiName : undefined;
    const wikiInfo = await getWikiInfo(classificationRes.name || specimen, wikiName);
    setWikiInfo(wikiInfo);
    console.log("wikiInfo", wikiInfo)
    setInfoLoading(false);
  }, [model]);

  const handleSetModelLoading = (loading: boolean): void => {
    setModelLoading(loading);
  };

  React.useEffect(() => {
    handleLoadModelSpeciesInfo();
  }, [model]);

  return (
    <IonPage>

      {/* Header */}
      <ModelHeader
        infoLoading={infoLoading} handleSetModelLoading={setModelLoading} model={model}
        wikiInfo={wikiInfo} classificationInfo={classificationInfo}
        imageInfo={imageInfo} profileInfo={profileInfo}
      />

      <IonContent id='model-page-content'>

        {/* Model */}
        {model === 'select' ?
          (
            <>
              <div className="select-model">
                <IonText color='primary'><p className="model-message-text">Select a model to display</p></IonText>
              </div>
            </>
          ) :
          (!inModelList(model)) ?
            (
              <>
                <div className="select-model">
                  <IonText color='primary'><p className="model-message-text">No matching model</p></IonText>
                </div>
              </>
            ) :
            (
              <div className="model">
                <ModelIframes loading={loading} handleSetModelLoading={handleSetModelLoading} model={modelSpeciesName[adjustString(model) as keyof typeof modelSpeciesName]} />
              </div>
            )
        }

      </IonContent>

    </IonPage >
  )
};

export default React.memo(Model);