/**
 * @file MobileCollectionsSearchModal.tsx
 * @fileoverview This file exports the MobileCollectionsSearchModal component.
 * This component is the search modal that is displayed on mobile devices after clicking the search icon on the Collections page.
 */

{/* Ionic/React */}
import React from "react";
import { IonModal, IonHeader, IonToolbar, IonTitle, IonText, IonButtons, IonButton, IonIcon, IonSearchbar, IonContent, IonList, IonItem } from "@ionic/react";
import { closeOutline } from "ionicons/icons";

{/* Capacitor */}
import { Keyboard } from "@capacitor/keyboard";

{/* Helpers */}
import { timeout } from "../../../herbarium";

{/* Styles */}
import '../../../App.css'

interface MobileCollectionsSearchModalProps {
  showSearchModal: boolean;
  setShowSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
  filteredSpecimen: string[];
  setFilteredSpecimen: React.Dispatch<React.SetStateAction<string[]>>;
  searchRef: React.RefObject<HTMLIonSearchbarElement>;
  handleSearch: (event: CustomEvent) => void;
  handleSearchKeyPress: (event: React.KeyboardEvent<HTMLIonSearchbarElement>) => void;
  handleSpecimenListButtonPress: (specimen : string) => void;
  localSearchEnabled : boolean;
}

const MobileCollectionsSearchModal = React.memo((props: MobileCollectionsSearchModalProps) => {
  console.log("MobileCollectionsSearchModal");
  const setShowSearchModal = props.setShowSearchModal;
  const showSearchModal = props.showSearchModal;
  const filteredSpecimen = props.filteredSpecimen;
  const setFilteredSpecimen = props.setFilteredSpecimen;
  const searchRef = props.searchRef;
  const handleSearch = props.handleSearch;
  const handleSearchKeyPress = props.handleSearchKeyPress;
  const handleSpecimenListButtonPress = props.handleSpecimenListButtonPress;
  const localSearchEnabled = props.localSearchEnabled;

  /**
   * @description: This function ensures the modal cannot be dismissed by swiping down.
   * 
   * @param {any} data the data that is being passed to the modal
   * @param {string} role the kind of dismissal that is being attempted
   * @returns {boolean} whether the modal can be dismissed
   */
  async function canDismiss(data?: any, role?: string) {
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
      setFilteredSpecimen([]);
    });
  };

  return (
    <IonModal className='mobile-search-modal' backdropDismiss={false} animated
      canDismiss={canDismiss} isOpen={showSearchModal} handle={false}
      breakpoints={[0, 1]} initialBreakpoint={1}
    >

      { /* Header with title, searchbar and close button */}
      <div style={{ width: "100%" }}>
        <IonHeader>
          <IonToolbar>
            <IonTitle><IonText color='primary'>Collections Search</IonText></IonTitle>
            <IonButtons style={{ marginLeft: "-2.5%" }}>
              <IonButton onClick={() => { closeModal() }}>
                <IonIcon color='primary' icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar color='light' animated onKeyPress={handleSearchKeyPress}
              onIonInput={handleSearch} ref={searchRef} placeholder={localSearchEnabled ? 'Search Local Flora...' : 'Search Flora...'}
              enterkeyhint='search' class="overlay"
            />
          </IonToolbar>
        </IonHeader>
      </div>

      { /* List of specimen that are filtered by the searchbar */}
      <IonContent style={{ "--background": "white" }}>
        <IonList>
          {filteredSpecimen.map((specimen : string, index : number) => (
            <IonItem type='submit' key={index} onClick={() => handleSpecimenListButtonPress(specimen)}
              button detail={false} lines='full'
              color='light'><IonText color='primary'>{specimen}</IonText>
            </IonItem>
          ))}
        </IonList>
      </IonContent>

    </IonModal>
  );
});

export default MobileCollectionsSearchModal;