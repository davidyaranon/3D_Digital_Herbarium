import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonText, IonTitle } from "@ionic/react";

const HomeHeader = () => {

  return (
    <IonHeader className='ion-no-border' style={{ padding: "5px" }} translucent>
      <IonToolbar style={{ display: 'flex', alignItems: 'center' }}>

        {/* Hamburger button that appears when the screen width is smaller than 768px */}
        <IonButtons slot="start">
          <IonMenuButton style={{ marginTop: "15%" }}></IonMenuButton>
        </IonButtons>

        { /* Only show the title if the screen width is greater than 768px */}
        <div className="search-icon">
          <IonTitle><IonText color='primary'>Home</IonText></IonTitle>
        </div>

      </IonToolbar>
    </IonHeader>
  );
};

export default HomeHeader;