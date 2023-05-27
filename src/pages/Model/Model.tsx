/**
 * @file Model.tsx
 * @fileoverview This file contains the 3D Model page. It contains the header and the model iframe.
 */

{/* Ionic / React */ }
import React from 'react';
import { IonContent, IonPage } from '@ionic/react';

{/* Helpers */ }
import { speciesName } from '../../assets/data/ListOfModels';
import { useContext } from '../../my-context';
import ModelIframes from '../../components/Model/ModelIframes';
import ModelHeader from '../../components/Model/ModelHeader';

{/* Styles */ }
import './model.css';

const Model = () => {

  // Hooks
  const context = useContext();

  // State Variables
  const [loading, setModelLoading] = React.useState<boolean>(true);

  return (
    <IonPage>

      {/* Header */}
      <ModelHeader loading={loading} setModelLoading={setModelLoading}/>

      <IonContent>

        {/* Model */}
        <div className="model">
          <ModelIframes loading={loading} setModelLoading={setModelLoading} model={speciesName[context.model]} />
        </div>

      </IonContent>

    </IonPage>
  )
};

export default Model;