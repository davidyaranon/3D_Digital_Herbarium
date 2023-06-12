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
}

const CollectionsImages = (props: CollectionsImagesProps) => {
  const { images, errorMessage, headerMessage } = props;

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
                  loading="lazy"
                  key={index}
                  style={{ flex: 1, objectFit: "cover", marginRight: "5px" }}
                  src={src}
                />
              );
            })}
          </div>
        </>
      }
    </FadeIn>
  );
};

export default CollectionsImages;