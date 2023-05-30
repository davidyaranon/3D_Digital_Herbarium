/**
 * 
 *
 */

import { IonText } from "@ionic/react";

interface CollectionsInfoProps {
  specimen : string;
  classificationInfo : any;
  profileInfo : any;
  imageInfo : string[];
  wikiInfo : any;
}


const CollectionsInfo = (props : CollectionsInfoProps) => {

  const specimen = props.specimen;
  const classificationInfo = props.classificationInfo;
  const profileInfo = props.profileInfo;
  const imageInfo = props.imageInfo;
  const wikiInfo = props.wikiInfo;

  return (
    <>
      <p><IonText color='primary'>{specimen}</IonText></p>
    </>
  )
};

export default CollectionsInfo;