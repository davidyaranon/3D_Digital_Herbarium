/**
 * @file PlantId.tsx
 * @fileoverview PlantID page where people can upload an image and identify what kind of plant it is.
 */

/* Ionic/React */
import React from "react";
import { useHistory } from "react-router";
import { IonButton, IonContent, IonIcon, IonItem, IonList, IonPage, IonRow, IonSpinner, IonText } from "@ionic/react";
import { cameraSharp } from "ionicons/icons";

/* Capacitor */
import { Preferences } from "@capacitor/preferences";
import { Camera, GalleryPhoto, GalleryPhotos } from "@capacitor/camera";

/* Other Imports */
import { useContext } from "../my-context";
import { handlePlantIdSubmit } from "../herbarium";
import FadeIn from "react-fade-in/lib/FadeIn";
import PlantIdHeader from "../components/PlantId/PlantIdHeader";

/* Styles */
import '../App.css';


const trimString = (string: string, length: number): string => {
  return string.length > length ? string.substring(0, length - 3) + "..." : string;
};

const PLANT_ID_IMAGE_LIMIT: number = 1;

const PlantId = () => {

  const context = useContext();
  const history = useHistory();

  const [plantIdResults, setPlantIdResults] = React.useState<any>();
  const [selectedPhoto, setSelectedPhoto] = React.useState<GalleryPhoto>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showError, setShowError] = React.useState<boolean>(false);

  /**
   * @description handles redirest to the Collections page setting the specimen accordingly.
   * Run when the user clicks on the "3D Model Available" message.
   * 
   * @param {React.MouseEvent<HTMLAnchorElement, MouseEvent>} e The click event.
   * @param {string} speciesName The name of the plant species.
   */
  const handleCollectionsPageRedirect = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, speciesName: string): Promise<void> => {
    e.preventDefault();
    await Preferences.set({ key: 'specimen', value: speciesName });
    context.setSpecimen(speciesName);
    history.push("/pages/collections/" + speciesName);
  };

  /**
   * @description Handles the plantID API
   * 
   * @param {string[]} base64Strings 
   */
  const handlePlantIdSubmitWithTimeout = async (base64Strings: string[]): Promise<void> => {
    try {
      const plantIdPromise = handlePlantIdSubmit(base64Strings);
      const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 15000));

      const result = await Promise.race([plantIdPromise, timeoutPromise]);

      if (result === timeoutPromise) {
        // Timeout occurred
        console.error("handlePlantIdSubmit timed out");
      } else {
        // Plant identification completed successfully
        setPlantIdResults(result); // Update the state variable with the result
      }
    } catch (error) {
      console.error("Error occurred during plant identification", error);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @description Allows user to pick an image to upload to run the plantID API.
   */
  const takePicture = async (): Promise<void> => {
    try {
      const images: GalleryPhotos = await Camera.pickImages({
        quality: 50,
        limit: PLANT_ID_IMAGE_LIMIT,
      });

      const blobsArr: Blob[] = [];
      const photoArr: GalleryPhoto[] = [];

      for (let i = 0; i < images.photos.length; ++i) {
        const photo = images.photos[i];
        const blobRes = await fetch(photo.webPath).then((response) => response.blob());
        blobsArr.push(blobRes);
        photoArr.push(photo);
      }

      setSelectedPhoto(photoArr[0]);
      setLoading(true);

      const base64Strings = await Promise.all(
        blobsArr.map((blob) => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64String = reader.result as string;
              resolve(base64String.split(",")[1]);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        })
      );

      await handlePlantIdSubmitWithTimeout(base64Strings);
    } catch (error) {
      console.error("Error picking images", error);
    }
  };


  return (
    <IonPage>

      <PlantIdHeader />

      <IonContent id='plantid-page-content' style={{ '--background': '' }}>

        {loading &&
          <div className='loading-center'>
            <IonSpinner color='primary' />
          </div>
        }

        {!loading && plantIdResults ?
          <div className='loaded-image-square' style={{ backgroundImage: `url(${selectedPhoto?.webPath})` }}>
            <IonButton onClick={takePicture} fill="clear" id="hoverText" className="hover-text">Identify another image</IonButton>
          </div>
          :
          <div className='init-image-square'>
            <div className='camera-button-container'>
              <IonButton onClick={takePicture} size='large' style={{ width: "50%", height: "50%" }} fill="clear">
                <IonIcon aria-hidden="true" size='large' style={{ width: "100%", height: "100%" }} icon={cameraSharp} />
              </IonButton>
            </div>
          </div>
        }

        {!loading && !plantIdResults &&
          <div className='loading-center' style={{paddingBottom : "50%"}}>
            <IonText color='primary'>
              <p>JPEGs and PNGs only!</p>
            </IonText>
          </div>
        }

        {showError &&
          <div className='loading-center'>
            <IonText color='primary'>
              <p>Error loading plantID API, try reloading the page and try again!</p>
            </IonText>
          </div>
        }

        <div style={{ height: "5%" }} />

        <IonList>
          {!loading && plantIdResults && plantIdResults.suggestions.map((suggestion: any, index: number) => {
            return (
              <FadeIn key={index}>
                <IonItem lines='full' style={{ '--background': 'white', }}>
                  <IonText color='dark'>
                    <div className="percentage-container">
                      <p>{(suggestion.probability * 100).toString().slice(0, 5)}%</p>
                    </div>
                    <div className="verticalLine"></div>
                    <IonRow>
                      <div className="square" style={{ backgroundImage: `url(${suggestion.similar_images[0].url})` }}></div>
                      <div style={{ width: "1vw" }} />
                      <div className="square" style={{ backgroundImage: `url(${suggestion.similar_images[1].url})` }}></div>
                    </IonRow>
                    <div>
                      <h3 className="plantIdSpecies">
                        <a
                          href="#"
                          onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                            handleCollectionsPageRedirect(e, suggestion.plant_details.scientific_name);
                          }}
                        >
                          {suggestion.plant_details.scientific_name}
                        </a>
                        {" "}
                        ({"species" in suggestion.plant_details.structured_name ? "Species" : "Genus"})
                      </h3>
                      <p className="plantIdCommonNames">{suggestion.plant_details.common_names ? suggestion.plant_details.common_names.join(", ") : ''}</p>
                      <p className="plantIdWikiDesc">{suggestion.plant_details.wiki_description && "value" in suggestion.plant_details.wiki_description ? trimString(suggestion.plant_details.wiki_description.value, 375) : ''}</p>
                      <p className="plantIdWikiUrl">
                        <a href={suggestion.plant_details.url} target="_blank" rel="noopener noreferrer">
                          Learn More
                        </a>
                      </p>
                    </div>
                  </IonText>
                </IonItem>
              </FadeIn>
            )
          })}
        </IonList>

      </IonContent>
    </IonPage>
  )
}

export default PlantId;