/**
 * @file ModelIframes.tsx
 * @fileoverview This file contains the ModelIframes component, which is the embedded model iframes.
 */

{/* Ionic / React */ }
import React from 'react';
import { annotations, sketchFabLinks } from '../../herbarium';
import { IonButton, IonButtons, IonIcon, IonSpinner } from '@ionic/react';

import Sketchfab from '@sketchfab/viewer-api';

{/* Styles */ }
import '../../App.css';
import { arrowBack, arrowForward, closeOutline } from 'ionicons/icons';

{/* Props definition */ }
interface ModelIframesProps {
  model: string;
  loading: boolean;
  handleSetModelLoading: (loading: boolean) => void;
};

const ModelIframes = React.memo((props: ModelIframesProps) => {

  // Props
  const { model, loading, handleSetModelLoading } = props;

  // State variables
  const [api, setApi] = React.useState<any | null>(null);
  const [showAnnotations, setShowAnnotations] = React.useState<boolean>(false);
  const [annotationsInfo, setAnnotationsInfo] = React.useState<any>(null);
  const [currAnnotation, setCurrAnnotation] = React.useState<number>(0);

  /**
   * @description This function is called when the user clicks on the arrow buttons
   * in the sketchfab annotation overlay. It should show the annotation info based on the
   * selected annotation index.
   * 
   * @param {number} increment either 1 or -1 depending on the direction of the arrow
   */
  const handleClickOnAnnotationArrow = (increment: number): void => {
    if (!api || !annotationsInfo || currAnnotation < 0) return;
    const length = annotationsInfo.annotationsLength;
    api.gotoAnnotation((((currAnnotation + increment) % length) + length) % length, { preventCameraAnimation: false, preventCameraMove: false }, function (err: any, index: number) {
      if (!err) {
        window.console.log('Going to annotation', (((currAnnotation + increment) % length) + length) % length);
      }
    });
  };

  /**
   * @description sets the annotation info based on the selected model.
   */
  const handleSetAnnotationInfo = (): void => {
    const annotation = annotations[model as keyof typeof annotations];
    if (!annotation) return;
    setAnnotationsInfo(annotation);
  };

  /**
   * @description This function runs on load.
   * It should handle the SketchFab API calls and annotation info.
   * 
   * @param {string} model the currently selected model
   */
  const sketchFabModelViewer = (model: string): void => {
    const sketchFabLink: string = sketchFabLinks[model as keyof typeof sketchFabLinks];
    const iframe = document.getElementById('model-viewer') as HTMLIFrameElement;
    if (iframe) { iframe.src = sketchFabLink; }
    const client = new Sketchfab(iframe);

    client.init(sketchFabLink, {
      success: function onSuccess(api: any) {
        setApi(api);
        api.start();
        api.addEventListener('viewerready', function () {
          handleSetAnnotationInfo();
          api.addEventListener('annotationSelect', function (index: number) {
            setCurrAnnotation(index);
            if (index === -1) {
              setShowAnnotations(false);
              return;
            }
            setShowAnnotations(true);

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

  };

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
        {annotationsInfo && showAnnotations &&
          <div className="overlay-annotations">
            <IonButtons style={{ padding: "10px" }}>
              <IonButton color='selected' onClick={() => { setShowAnnotations(false) }}>
                <IonIcon size='large' icon={closeOutline} />
              </IonButton>
              <div style={{ width: "85vw" }} />
              <IonButton color='selected' onClick={() => { handleClickOnAnnotationArrow(-1) }}>
                <IonIcon size='large' icon={arrowBack} />
              </IonButton>
              <IonButton color='selected' onClick={() => { handleClickOnAnnotationArrow(1) }}>
                <IonIcon size='large' icon={arrowForward} />
              </IonButton>
            </IonButtons>
            <div className="annotations-info">
              {annotationsInfo && "text" in annotationsInfo && "images" in annotationsInfo &&
                <>
                  <p dangerouslySetInnerHTML={{ __html: annotationsInfo.text[currAnnotation] }}></p>
                  <p dangerouslySetInnerHTML={{ __html: annotationsInfo.images[currAnnotation] }}></p>
                </>
              }
            </div>
          </div>
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