/**
 * @file MobileModelSearchModal.tsx
 * @fileoverview This file exports the MobileModelSearchModal component.
 * This component is the search modal that is displayed on mobile devices after clicking the search icon on the 3D Models page.
 */

{/* Ionic/React */ }
import React from "react";
import { IonModal, IonHeader, IonToolbar, IonTitle, IonText, IonButtons, IonButton, IonIcon, IonSearchbar, IonContent, IonList, IonItem } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import FadeIn from "react-fade-in/lib/FadeIn";

{/* Capacitor */ }
import { Keyboard } from "@capacitor/keyboard";

{/* Helpers */ }
import { listOfModels } from "../../../herbarium";
import { timeout } from "../../../herbarium";

{/* Styles */ }
import '../../../App.css'

interface MobileModelSearchModalProps {
  showSearchModal: boolean;
  setShowSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
  filteredModels: string[];
  setFilteredModels: React.Dispatch<React.SetStateAction<string[]>>;
  searchRef: React.RefObject<HTMLIonSearchbarElement>;
  handleSearch: (event: CustomEvent) => void;
  handleSearchKeyPress: (event: React.KeyboardEvent<HTMLIonSearchbarElement>) => void;
  handleModelListButtonPress: (model: string) => void;
}

const MobileModelSearchModal = React.memo((props: MobileModelSearchModalProps) => {
  const setShowSearchModal = props.setShowSearchModal;
  const showSearchModal = props.showSearchModal;
  const filteredModels = props.filteredModels;
  const setFilteredModels = props.setFilteredModels;
  const searchRef = props.searchRef;
  const handleSearch = props.handleSearch;
  const handleSearchKeyPress = props.handleSearchKeyPress;
  const handleModelListButtonPress = props.handleModelListButtonPress;

  /**
   * @description: This function ensures the modal cannot be dismissed by swiping down.
   * 
   * @param {any} data the data that is being passed to the modal
   * @param {string} role the kind of dismissal that is being attempted
   * @returns {boolean} whether the modal can be dismissed
   */
  async function canDismiss(data?: any, role?: string): Promise<boolean> {
    return role !== 'gesture';
  }

  /**
   * @description: This function is called when the user presses the close button on the search modal.
   * It hides the keyboard and closes the modal entirely.
   */
  const closeModal = (): void => {
    Keyboard.hide().then(() => {
      setTimeout(() => setShowSearchModal(false), 100);
      // modal.current?.dismiss();
    }).catch((err) => {
      setTimeout(() => setShowSearchModal(false), 100);
      // modal.current?.dismiss();
    });
    timeout(250).then(() => {
      setFilteredModels(listOfModels);
    });
  };

  return (
    <IonModal className='mobile-search-modal' backdropDismiss={false} animated
      canDismiss={canDismiss} isOpen={showSearchModal} handle={false}
      breakpoints={[0, 1]} initialBreakpoint={1}
    >

      { /* Header with title, searchbar and close button */}
      <FadeIn delay={250}>
        <div style={{ width: "100%" }}>
          <IonHeader>
            <IonToolbar>
              <IonTitle><IonText color='primary'>3D Model Search</IonText></IonTitle>
              <IonButtons style={{ marginLeft: "-2.5%" }}>
                <IonButton onClick={() => { closeModal() }}>
                  <IonIcon color='primary' icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonToolbar>
              <IonSearchbar color='light' animated onKeyPress={handleSearchKeyPress}
                onIonInput={handleSearch} ref={searchRef} placeholder='Search...'
                enterkeyhint='search' class="overlay"
              />
            </IonToolbar>
          </IonHeader>
        </div>
      </FadeIn>

      { /* List of models that are filtered by the searchbar */}
      <IonContent style={{ "--background": "white" }}>
        <FadeIn delay={500}>
          <IonList>
            {filteredModels.map((model: string, index: number) => (
              <IonItem type='submit' key={index} onClick={() => handleModelListButtonPress(model)}
                button detail={false} lines='full'
                color='light'><IonText color='primary'>{model}</IonText>
              </IonItem>
            ))}
          </IonList>
        </FadeIn>
      </IonContent>

    </IonModal>
  );
});

export default MobileModelSearchModal;