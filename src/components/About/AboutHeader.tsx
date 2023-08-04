import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from "@ionic/react";

const AboutHeader = () => {
  return (
    <>
      <IonHeader className='ion-no-border' style={{ padding: "5px" }} translucent>
        <IonToolbar style={{ display: 'flex', alignItems: 'center' }}>
          <IonTitle color='dark'>About</IonTitle>
          {/* Hamburger button that appears when the screen width is smaller than 768px */}
          <IonButtons slot="start">
            <IonMenuButton style={{ marginTop: "15%" }}></IonMenuButton>
          </IonButtons>

        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default AboutHeader;