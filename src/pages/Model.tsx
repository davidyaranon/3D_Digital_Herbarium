/**
 * @file Model.tsx
 * @fileoverview This file contains the 3D Model page. It contains the header and the model iframe.
 */

{/* Ionic / React */ }
import React from 'react';
import { IonContent, IonPage, IonText } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';

{/* Helpers */ }
import { adjustString, inModelList, speciesName } from '../herbarium';
import ModelIframes from '../components/Model/ModelIframes';
import ModelHeader from '../components/Model/ModelHeader';

{/* Styles */ }
import '../App.css';
import { Preferences } from '@capacitor/preferences';

interface ModelSelectPostParams {
  model: string;
}

const Model = ({ match }: RouteComponentProps<ModelSelectPostParams>) => {
  
  const model = match.params.model;

  // State Variables
  const [loading, setModelLoading] = React.useState<boolean>(true);

  const handleNewModelSelected = React.useCallback( async () => {
    await Preferences.set({ key: 'model', value: model });
  }, [])

  const handleSetModelLoading = (loading : boolean) : void => {
    setModelLoading(loading);
  };

  React.useEffect(() => {
    handleNewModelSelected();
  }, [model]);

  return (
    <IonPage>

      {/* Header */}
      <ModelHeader handleSetModelLoading={setModelLoading} model={model} />

      <IonContent>

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
                <ModelIframes loading={loading} handleSetModelLoading={handleSetModelLoading} model={speciesName[adjustString(model) as keyof typeof speciesName]} />
              </div>
            )
        }

      </IonContent>

    </IonPage >
  )
};

export default React.memo(Model);