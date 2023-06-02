/**
 * @file ModelIframes.tsx
 * @fileoverview This file contains the ModelIframes component, which is the embedded model iframes.
 */

{/* Ionic / React */ }
import React from 'react';
import { sketchFabLinks } from '../../herbarium';
import { IonSpinner } from '@ionic/react';

{/* Styles */ }
import '../../App.css';

{/* Props definition */ }
interface ModelIframesProps {
  model: string;
  loading: boolean;
  setModelLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModelIframes = React.memo((props: ModelIframesProps) => {
  console.log("ModelIframes");
  // Props
  const model = props.model;
  const loading = props.loading;
  const setModelLoading = props.setModelLoading;

  /**
   * @description This function is called when the iframe loads.
   */
  const handleIframeLoad = () => {
    setModelLoading(false);
  };

  return (
    <>

      {loading &&
        <div className='loading-center'>
          <IonSpinner color='primary' />
        </div>
      }

      <iframe title={model + " Model (Sketchfab)"} frameBorder="0" height='99%' width='100%' allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking" id="model-viewer"
        src={sketchFabLinks[model as keyof typeof sketchFabLinks]}
        onLoad={handleIframeLoad}
      />
      
    </>
  );
});

export default React.memo(ModelIframes);