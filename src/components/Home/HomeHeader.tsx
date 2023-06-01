import { IonHeader, IonToolbar, IonButtons, IonMenuButton } from "@ionic/react";

const HomeHeader = () => {

  return (
    <IonHeader className='ion-no-border' style={{ padding: "5px" }} translucent>
      <IonToolbar style={{ display: 'flex', alignItems: 'center' }}>

        {/* Hamburger button that appears when the screen width is smaller than 768px */}
        <IonButtons slot="start">
          <IonMenuButton style={{ marginTop: "15%" }}></IonMenuButton>
        </IonButtons>

      </IonToolbar>
    </IonHeader>
  );
};

export default HomeHeader;