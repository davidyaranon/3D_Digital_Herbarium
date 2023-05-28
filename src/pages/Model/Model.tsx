/**
 * @file Model.tsx
 * @fileoverview This file contains the 3D Model page. It contains the header and the model iframe.
 */

{/* Ionic / React */ }
import React from 'react';
import { IonContent, IonModal, IonPage, IonText, useIonRouter } from '@ionic/react';
import { RouteComponentProps, useHistory } from 'react-router-dom';

{/* Helpers */ }
import { listOfModels, speciesName } from '../../assets/data/ListOfModels';
import { useContext } from '../../my-context';
import ModelIframes from '../../components/Model/ModelIframes';
import ModelHeader from '../../components/Model/ModelHeader';

{/* Styles */ }
import './model.css';
import { Preferences } from '@capacitor/preferences';

interface ModelSelectPostParams {
  model: string;
}

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
 * @param {string} model the name of the selected model (or of the last path param of the URL)
 * @returns {boolean} true if the model is in the list of models, false otherwise
 */
const modelInList = (model: string): boolean => {
  const adjustedModelString = adjustString(model);
  return listOfModels.includes(adjustedModelString);
}

const Model = ({ match }: RouteComponentProps<ModelSelectPostParams>) => {

  const model = match.params.model;

  // Hooks
  const context = useContext();
  const history = useHistory();

  // State Variables
  const [loading, setModelLoading] = React.useState<boolean>(true);
  const [showSearchModel, setShowSearchModel] = React.useState<boolean>(false);

  const handleClickOnSearchIcon = () => {
    setShowSearchModel(true);
  };

  return (
    <IonPage>

      {/* Header */}
      <ModelHeader loading={loading} setModelLoading={setModelLoading} />

      <IonContent>

        {/* Model */}
        {model === 'select' ?
          (
            <>
              <div className="select-model">
                <IonText color='primary'><p>Select a model to display</p></IonText>
              </div>
            </>
          ) :
          (!modelInList(model)) ?
            (
              <>
                <div className="select-model">
                  <IonText color='primary'><p>No matching model</p></IonText>
                </div>
              </>
            ) :
            (
              <div className="model">
                <ModelIframes loading={loading} setModelLoading={setModelLoading} model={speciesName[adjustString(model)]} />
              </div>
            )
        }

      </IonContent>

    </IonPage >
  )
};

export default Model;