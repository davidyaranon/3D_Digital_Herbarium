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
  handleSetModelLoading: (loading: boolean) => void;
}

const ModelIframes = React.memo((props: ModelIframesProps) => {

  const { model, loading, handleSetModelLoading } = props;

  /**
   * @description This function is called when the iframe loads.
   */
  const handleIframeLoad = () : void => {
    handleSetModelLoading(false);
  };

  return (
    <>

      {loading &&
        <div className='loading-center'>
          <IonSpinner color='primary' />
        </div>
      }

      <div className='iframe-wrapper'>
        <iframe title={model + " Model (Sketchfab)"} frameBorder="0" height='100%' width='100%' allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking" id="model-viewer"
          src={sketchFabLinks[model as keyof typeof sketchFabLinks]}
          onLoad={handleIframeLoad}
        />
      </div>

    </>
  );
});

export default React.memo(ModelIframes);