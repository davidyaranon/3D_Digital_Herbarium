import React from "react";
import { IonContent, IonPage, IonText } from "@ionic/react";

const Inat = () => {
  console.log("Inat page");
  return (
    <IonPage>
      <IonContent>
        <p><IonText color='primary'>iNat (work in progress)</IonText></p>
      </IonContent>
    </IonPage>
  );

}

export default React.memo(Inat);