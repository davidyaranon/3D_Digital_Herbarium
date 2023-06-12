/**
 * @file CollectionsImages.tsx
 * @fileoverview Images used on collections page, handles any array of image url strings.
 */

import { IonCardTitle, IonText } from "@ionic/react";
import FadeIn from "react-fade-in/lib/FadeIn";


interface CollectionsImagesProps {
  images: string[];
  errorMessage: string;
  headerMessage: string;
  handleClickOnImage: (index: number) => void;
}

const CollectionsImages = (props: CollectionsImagesProps) => {
  const { images, errorMessage, headerMessage, handleClickOnImage } = props;

  return (
    <FadeIn>
      <br />
      {images.length <= 0 ?
        <IonCardTitle><IonText color='primary'>{errorMessage}</IonText></IonCardTitle>
        :
        <>
          <IonCardTitle><IonText color='primary'>{headerMessage}</IonText></IonCardTitle>
          <br />
          <div style={{ height: "50vh", display: "flex", flexDirection: "row", borderRadius: "10px", overflowX: "auto" }}>
            {images.map((src: string, index: number) => {
              return (
                <img
                  className='species-image'
                  loading="lazy"
                  role="button" 
                  aria-label="Open image in modal"
                  key={index}
                  src={src}
                  alt={"Specimen image " + index}
                  tabIndex={0}
                  onClick={() => handleClickOnImage(index)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) { // Check for the Enter key
                      handleClickOnImage(index);
                    }
                  }}
                />
              );
            })}
          </div>
        </>
      }
      <br />
    </FadeIn>
  );
};

export default CollectionsImages;