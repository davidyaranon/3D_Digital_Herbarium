import { IonButton, IonContent, IonIcon, IonItem, IonList, IonPage, IonRow, IonSpinner, IonText } from "@ionic/react";
import '../App.css';
import React from "react";
import { handlePlantIdSubmit } from "../herbarium";
import { Camera, GalleryPhoto, GalleryPhotos } from "@capacitor/camera";
import { cameraSharp } from "ionicons/icons";
import PlantIdHeader from "../components/PlantId/PlantIdHeader";

const trimString = (string: string, length: number): string => {
  return string.length > length ? string.substring(0, length - 3) + "..." : string;
};

const PLANT_ID_IMAGE_LIMIT: number = 1;

const PlantId = () => {

  const [plantIdResults, setPlantIdResults] = React.useState<any>();
  const [selectedPhoto, setSelectedPhoto] = React.useState<GalleryPhoto>();
  const [loading, setLoading] = React.useState<boolean>(false);

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
    } finally {
      setLoading(false);
    }
  };

  const takePicture = async () : Promise<void> => {
    try {
      const images: GalleryPhotos = await Camera.pickImages({
        quality: 50,
        limit: 1,
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

      <IonContent style={{ '--background': '' }}>

        {loading &&
          <div className='loading-center'>
            <IonSpinner color='primary' />
          </div>
        }

        {plantIdResults ?
          <div className='loaded-image-square' onClick={takePicture} style={{ backgroundImage: `url(${selectedPhoto?.webPath})` }}>
            <div id="hoverText" className="hover-text">Identify another image</div>
          </div>
          :
          <div className='init-image-square'>
            <div className='camera-button-container'>
              <IonButton onClick={takePicture} size='large' style={{ width: "50%", height: "50%" }} fill="clear">
                <IonIcon size='large' style={{ width: "100%", height: "100%" }} icon={cameraSharp} />
              </IonButton>
            </div>
          </div>
        }

        <div style={{ height: "5%" }} />

        <IonList>
          {plantIdResults && plantIdResults.suggestions.map((suggestion: any, index: number) => {
            return (
              <IonItem key={index} lines='full'>
                <IonText color='light'>
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
                    <h3
                      className="plantIdSpecies"
                      onClick={() => { }}
                    >
                      {suggestion.plant_details.scientific_name} ({"species" in suggestion.plant_details.structured_name ? "Species" : "Genus"})
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
            )
          })}
        </IonList>

      </IonContent>
    </IonPage>
  )
}

export default PlantId;