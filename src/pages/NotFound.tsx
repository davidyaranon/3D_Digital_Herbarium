import { IonContent, IonPage, IonText, IonTitle } from "@ionic/react"
import AboutHeader from "../components/About/AboutHeader";


const NotFound = () => {
  return (
    <IonPage>

      <AboutHeader />

      <IonContent>
        <IonTitle><IonText color={'primary'}>404 NOT <br />FOUND!</IonText></IonTitle>
      </IonContent>
    </IonPage>
  );
}

export default NotFound;