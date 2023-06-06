import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonText, IonTitle } from "@ionic/react";


const PlantIdHeader = () => {
  return (
    <>
      <IonHeader className='ion-no-border' style={{ padding: "5px" }} translucent>
        <IonToolbar style={{ display: 'flex', alignItems: 'center' }}>

          {/* Hamburger button that appears when the screen width is smaller than 768px */}
          <IonButtons slot="start">
            <IonMenuButton style={{ marginTop: "15%" }}></IonMenuButton>
          </IonButtons>

          <IonTitle><IonText color='primary'>Plant ID (JPEGs and PNGs ONLY!)</IonText></IonTitle>

        </IonToolbar>
      </IonHeader>
    </>
  )
};

export default PlantIdHeader;