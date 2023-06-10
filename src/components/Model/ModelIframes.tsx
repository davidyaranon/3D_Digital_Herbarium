/**
 * @file ModelIframes.tsx
 * @fileoverview This file contains the ModelIframes component, which is the embedded model iframes.
 */

{/* Ionic / React */ }
import React from 'react';
import { annotations, sketchFabLinks } from '../../herbarium';
import { IonSpinner } from '@ionic/react';

import Sketchfab from '@sketchfab/viewer-api';

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

  const [showAnnotations, setShowAnnotations] = React.useState<boolean>(false);
  const [annotationInfo, setAnnotationInfo] = React.useState<string>();

  function handleShowAnnotationInfo(idx: number) {
    const annotation = annotations[model as keyof typeof annotations];
    setAnnotationInfo(annotation.images[idx] + annotation.text[idx]);
  }

  const sketchFabModelViewer = (model: string): void => {

    const sketchFabLink: string = sketchFabLinks[model as keyof typeof sketchFabLinks];

    const iframe = document.getElementById('model-viewer') as HTMLIFrameElement;
    if (iframe) { iframe.src = sketchFabLink; }
    const client = new Sketchfab(iframe);

    client.init(sketchFabLink, {
      success: function onSuccess(api: any) {
        api.start();
        api.addEventListener('viewerready', function () {
          api.addEventListener('annotationSelect', function (index: number) {
            console.log('annotationSelect', index);
            if (index === 0) {
              setShowAnnotations(true);
              handleShowAnnotationInfo(index);
            }
            else if (index === 1) {
              setShowAnnotations(false);
            }
            else if(index === -1) {
              return;
            }
            else {
              setShowAnnotations(true);
              handleShowAnnotationInfo(index - 1);
            };
          });
        });
      },
      error: function onError() {
        console.log('Viewer error');
      },
      ui_stop: 0,
      ui_infos: 0,
      ui_inspector: 0,
      ui_settings: 0,
      ui_watermark: 0,
    });
  }

  /**
   * @description This function is called when the iframe loads.
   */
  const handleIframeLoad = (): void => {
    handleSetModelLoading(false);
  };

  React.useEffect(() => {
    sketchFabModelViewer(model);
  }, [model])

  return (
    <>

      {loading &&
        <div className='loading-center'>
          <IonSpinner color='primary' />
        </div>
      }

      <div className='iframe-wrapper'>
        {showAnnotations &&
          <div className="overlay-annotations"></div>
        }
        <iframe src="" frameBorder="0" height='100%' width='100%' id="model-viewer"
          allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking="true"
          execution-while-out-of-viewport="true" execution-while-not-rendered="true" web-share="true"
          allowFullScreen onLoad={handleIframeLoad}
        />
      </div>

    </>
  );
});

export default React.memo(ModelIframes);