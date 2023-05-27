import { IonContent, IonHeader, IonPage, IonText } from '@ionic/react';
import React from 'react';

const Home: React.FC = () => {

  React.useEffect(() => {
    console.log("Home.tsx: useEffect")
  }, [])

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <h1><IonText color='primary'>Home</IonText></h1>
      </IonHeader>
      <IonContent>
        <p><IonText color='primary'>Welcome to the Cal Poly Humboldt 3D Digital Herbarium Project</IonText></p>
        <p><IonText color='primary'>Alpha release: Summer 2023</IonText></p>
        <p><IonText color='primary'>Contact us here</IonText></p>
      </IonContent>
    </IonPage>
  )
};


// Site Notes
// Browse by 3D Model HERE
// Please contact us above to report any bugs.

export default Home;