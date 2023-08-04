import { IonContent, IonPage, IonCardTitle } from "@ionic/react";
import AboutHeader from "../components/About/AboutHeader";

const About = () => {
  return (
    <IonPage>
      <AboutHeader />

      <IonContent>
        <IonCardTitle className='ion-padding' color='dark'>About</IonCardTitle>
        <p className='ion-padding' style={{ color: "var(--ion-color-dark)" }}>
          This website was built as an alpha for the Cal Poly Humboldt 3D Digital herbarium project. It allows users to view models of local
          plants and information about them. The models were built using photogrammetry techniques and Metashape/Blender. The website was built using Ionic/React.
        </p>

      </IonContent>
    </IonPage>
  );
};

export default About;