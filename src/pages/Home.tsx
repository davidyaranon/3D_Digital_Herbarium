import { IonContent, IonHeader, IonPage, IonText } from '@ionic/react';
import React from 'react';
import HomeHeader from '../components/Home/HomeHeader';

const Home: React.FC = () => {
  console.log("Home Page");

  return (
    <IonPage>

      <HomeHeader />

      <IonContent>
        <div style={{ padding: "10px" }}>
          <p><IonText color='primary'>Welcome to the Cal Poly Humboldt 3D Digital Herbarium Project</IonText></p>
          <p><IonText color='primary'>Alpha release: Summer 2023</IonText></p>
          <p><IonText color='primary'>Contact us here</IonText></p>
        </div>
      </IonContent>
    </IonPage >
  )
};


// Site Notes
// Browse by 3D Model HERE
// Please contact us above to report any bugs.

export default Home;