import React from "react";
import { IonContent, IonPage, IonText } from "@ionic/react";
import InatHeader from "../components/Inat/InatHeader";

const Inat = () => {

  return (
    <IonPage>

      <InatHeader />

      <IonContent id='inat-page-content'>
        <p className='ion-padding'><IonText color='primary'>iNat (work in progress)</IonText></p>
      </IonContent>

    </IonPage>
  );

}

export default React.memo(Inat);