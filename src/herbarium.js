/**
 * @file herbarium.js
 * @fileoverview This file contains JavaScript helper functions
 * for the CPH Herbarium application. The functions are typically
 * used to fetch data from external APIs or from a backend server.
 */


/**
 * @function getSpeciesClassification
 * @author Adapted from code written by Aj Bealum for CPHHA project. Adapted by David Y.
 * 
 * @description This function gets the species information from the GBIF API.
 * @see https://www.gbif.org/developer/species
 * 
 * @param {string} species - The species name.
 * @returns {[object]} - The species information.
 * 
 * @example
 * getSpeciesClassification("nymphaea lotus");
 * returns { 
 * "Kingdom": "Plantae", "Phylum": "Tracheophyta", "Class": "Magnoliopsida", 
 * "Order": "Nymphaeales", "Family": "Nymphaeaceae", "UsageKey": `${key}` 
 * }
*/
export const getSpeciesClassification = async (species) => {
  let results = {
    "Kingdom": "",
    "Phylum": "",
    "Class": "",
    "Order": "",
    "Family": "",
    "UsageKey": ""
  };
  try {
    const response = await fetch("https://api.gbif.org/v1/species/match?name=" + species);
    const data = await response.json();
    results.Kingdom = data.kingdom;
    results.Phylum = data.phylum;
    results.Class = data.class;
    results.Order = data.order;
    results.Family = data.family;
    results.UsageKey = data.usageKey;

    return results;

  } catch (error) {
    console.error(error);
  }
  return results;
};


/**
 * @function getSpeciesProfile
 * @author Adapted from code written by Aj Bealum for CPHHA project. Adapted by David Y.
 * 
 * @description This function gets the species profile information from the GBIF API. 
 * It also pulls the common names from the vernacularNames endpoint.
 * @see https://www.gbif.org/developer/species
 * 
 * @param {string} usageKey - The usage key for the species returned from the GBIF match endpoint.
 * @returns {[object]} - The species profile information.
 * 
 * @example
 * getSpeciesProfile('2882429');
 * returns { 
 * "Common Names" : "Egyptian lotus, Egyptian water-lily, White egyptian lotus", 
 * "Extinct": "No", "Terrestrial": "", "Marine": "No", "Freshwater": "Yes"
 * }
 */
export const getSpeciesProfile = async (usageKey) => {
  try {
    let results = {
      "Common Names": "",
      "Extinct": "",
      "Terrestrial": "",
      "Marine": "",
      "Freshwater": ""
    };
    const speciesProfilesResponse = await fetch("https://api.gbif.org/v1/species/" + usageKey + "/speciesProfiles");
    const speciesProfilesData = await speciesProfilesResponse.json();

    if (speciesProfilesData.results.length > 0) {
      for (let result of speciesProfilesData.results) {
        if (result.extinct === undefined) { }
        else {
          if (result.extinct) {
            results.Extinct = "Yes"; break;
          }
          else {
            results.Extinct = "No"; break;
          }
        }
      }

      for (let result of speciesProfilesData.results) {
        if (result.terrestrial === undefined) { }
        else {
          if (result.terrestrial) {
            results.Terrestrial = "Yes"; break;
          }
          else {
            results.Terrestrial = "No"; break;
          }
        }
      }

      for (let result of speciesProfilesData.results) {
        if (result.marine === undefined) { }
        else {
          if (result.marine) {
            results.Marine = "Yes"; break;
          }
          else {
            results.Marine = "No"; break;
          }
        }
      }

      for (let result of speciesProfilesData.results) {
        if (result.freshwater === undefined) { }
        else {
          if (result.freshwater) {
            results.Freshwater = "Yes"; break;
          }
          else {
            results.Freshwater = "No"; break;
          }
        }
      }
    }

    const speciesResponse = await fetch("https://api.gbif.org/v1/species/" + usageKey + "/vernacularNames");
    const speciesData = await speciesResponse.json();
    let cnt = 0;
    let arr = [];
    let arrLower = [];
    let names = "";
    for (let name of speciesData.results) {
      if (arrLower.includes(name.vernacularName.toLowerCase()) || !name.language) { }
      else {
        if (name.language == "eng") {
          arrLower.push(name.vernacularName.toLowerCase());
          arr.push(name.vernacularName);
        }
      }
    }
    for (let name of arr) {
      cnt = cnt + 1;
      if (cnt < arr.length) {
        names = names + name + ", ";
      }
      else {
        names = names + name;
      }
    }

    results["Common Names"] = names;

    return results;

  } catch (err) {
    console.error(err);
  }
};

/**
 * @function getSpeciesImages
 * @author Adapted from code written by Aj Bealum for CPHHA project. Adapted by David Y.
 * 
 * @description This function gets the species images from the GBIF API.
 * @see https://www.gbif.org/developer/occurrence
 * 
 * @param {string} usageKey - The usage key for the species returned from the GBIF match endpoint.
 * @returns {[string]} - The species images.
 * 
 * @example
 * getSpeciesImages('2683909');
 * returns {
 * "https://inaturalist-open-data.s3.amazonaws.com/photos/250099851/original.jpg",
 * "https://inaturalist-open-data.s3.amazonaws.com/photos/250119291/original.jpg",
 * "https://inaturalist-open-data.s3.amazonaws.com/photos/250148503/original.jpg"
 * }
 */
export const getSpeciesImages = async (usageKey) => {
  try {
    // conxsole.log(usageKey)
    const res = await fetch("https://api.gbif.org/v1/occurrence/search?speciesKey=" + usageKey + "&mediaType=StillImage");
    const data = await res.json();
    let images = [];
    images.push(data.results[0].media[0].identifier);
    images.push(data.results[1].media[0].identifier);
    images.push(data.results[2].media[0].identifier);

    console.log(images);

    return images;

  } catch (err) {
    console.error(err);
  }
};

/**
 * @function getWikiInfo
 * @author Adapted from code written by Aj Bealum for CPHHA project. Adapted by David Y.
 * 
 * @description This function gets the species summary extract and wiki link from the Wikipedia API.
 * Adapted from code written by Aj Bealum for CPHHA project.
 * @see https://www.mediawiki.org/wiki/API:Main_page
 * 
 * @param {string} species - The species name.
 * @returns {object} - The species summary extract and wiki link.
 * 
 * @example
 * getWikiInfo("nymphaea lotus");
 * returns { 
 * summaryExtract: "Nymphaea lotus, the Egyptian lotus, is a species of aquatic plant in the family Nymphaeaceae. It is native to the Nile River and its tributaries in Egypt, Sudan, and Eritrea. 
 * It is a perennial plant growing to 1.5 m (5 ft) tall, with large, floating, heart-shaped leaves and large, white, fragrant flowers. 
 * The flowers are produced in clusters on a stalk rising above the leaves. The fruit is a capsule containing many seeds. 
 * The plant is cultivated in tropical and subtropical regions around the world for its large, showy flowers and its edible seeds. 
 * It is also used as a medicinal plant. The plant is also known as the white water lily, white lotus, sacred lotus, and Egyptian white water lily.", 
 * wikiLink: "https://en.wikipedia.org/wiki/Nymphaea_lotus" 
 * }
 * 
 */
export const getWikiInfo = async (species) => {
  try {
    const res = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + species);
    const data = await res.json();
    let summaryExtract = "";
    let wikiLink = "";
    if (data.title != "Not found.") {
      summaryExtract = data.extract;
      wikiLink = data.content_urls.desktop.page
    }
    else {
      summaryExtract = "";
    }

    return { summaryExtract, wikiLink };

  } catch (err) {
    console.error(err);
  }
};

/**
 * @description This function is used to delay the execution of a function.
 * 
 * @param {number} delay The amount of time to wait (in ms) before executing the function.
 * @returns {Promise} A promise that resolves after the specified delay.
 */
export function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}


/**
 * @description This function is used to get the species autocomplete information from the iNaturalist API
 * when searching through the iNAT / Collections pages.
 * 
 * @param {string} query The query string to search for.
 * @returns {Promise<string[]>} The species autocomplete information.
 */
export const autocompleteSearch = async (query) => {
  try {
    const response = await fetch("https://api.inaturalist.org/v1/taxa/autocomplete?rank=species&q=" + query);
    const data = await response.json();

    let arr = [];
    for (let i = 0; i < data.results.length; i++) {
      if (arr.length > 15) {
        break;
      }
      if (data.results[i] && "iconic_taxon_id" in data.results[i] && data.results[i].iconic_taxon_id == 47126 && "matched_term" in data.results[i]) {
        arr.push(data.results[i].matched_term);
      }
    }
    return arr;

  } catch (error) {
    console.log('Error:', error);
    throw error; // Rethrow the error to propagate it to the caller
  }
}
