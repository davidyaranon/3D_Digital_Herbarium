import { IonContent, IonPage, IonText, IonTitle } from "@ionic/react"


const NotFound = () => {
  return (
    <IonPage>
      <IonContent>
        <IonTitle><IonText color={'primary'}>404 NOT <br />FOUND!</IonText></IonTitle>
      </IonContent>
    </IonPage>
  );
}

export default NotFound;