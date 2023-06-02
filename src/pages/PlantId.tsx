import { IonContent, IonPage, IonText } from "@ionic/react"

const PlantId = () => {
  console.log("Plant ID page");
  return (
    <IonPage>
      <IonContent>
        <p><IonText color='primary'>Plant ID</IonText></p>
      </IonContent>
    </IonPage>
  )
}

export default PlantId;