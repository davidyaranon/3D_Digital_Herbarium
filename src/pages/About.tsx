import { IonContent, IonPage, IonCardTitle, IonImg } from "@ionic/react";

import AboutHeader from "../components/About/AboutHeader";

import appGif from '../assets/images/app.gif';

const About = () => {
  return (
    <IonPage>
      <AboutHeader />

      <IonContent>
        <p className='ion-padding' style={{ color: "var(--ion-color-dark)" }}>
          This website was built as an alpha for the Cal Poly Humboldt 3D Digital herbarium project. It allows users to view models of local
          plants and information about them. The models were built using photogrammetry techniques and Metashape/Blender. The website was built using Ionic/React.
          <br /> <br />
          While this site is responsive and well suited for mobile, an iOS app was built along side it as a test. Here is a GIF showing its capabilities.
          <br /> <br />
          <IonImg style={{ height: "75vh", border: "2px solid black" }} src={appGif} />
        </p>

      </IonContent>
    </IonPage>
  );
};

export default About;