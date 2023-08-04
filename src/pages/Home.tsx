import { IonContent, IonPage, IonText, IonCardTitle } from '@ionic/react';
import React from 'react';
import HomeHeader from '../components/Home/HomeHeader';

const Home: React.FC = () => {

  return (
    <IonPage>

      <HomeHeader />

      <IonContent id='home-page-content'>
        <div style={{ padding: "10px" }}>
          <IonCardTitle role="heading" aria-level={1}><IonText color='primary'>Welcome to the Cal Poly Humboldt 3D Digital Herbarium Project</IonText></IonCardTitle>
          <h2><IonText color='primary'>Alpha release: Summer 2023</IonText></h2>
          <h3>
            <IonText color='primary'>Contact us&nbsp;
              <a href='mailto:dy45@humboldt.edu'>
                <span><u>here</u></span>
              </a>
            </IonText>
          </h3>
        </div>
      </IonContent>
    </IonPage >
  )
};


// Site Notes
// Browse by 3D Model HERE
// Please contact us above to report any bugs.

export default Home;