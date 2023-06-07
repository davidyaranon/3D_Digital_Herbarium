/**
 * @file MenuFunctions.tsx
 * @fileoverview This file contains the menu items and their icons.
 */

import {
  homeOutline, homeSharp, leafOutline, leafSharp,
  fingerPrintOutline, fingerPrintSharp, imageOutline, 
  imageSharp, cubeOutline, cubeSharp
} from 'ionicons/icons';

export interface AppPage {
  title: string;
  url: string;
  iosIcon: string;
  mdIcon: string;
};

export const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/pages/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: '3D Models',
    url: '/pages/models/',
    iosIcon: cubeOutline,
    mdIcon: cubeSharp
  },
  {
    title: 'Collections',
    url: '/pages/collections/',
    iosIcon: imageOutline,
    mdIcon: imageSharp,
  },
  {
    title: 'iNaturalist',
    url: '/pages/inat/',
    iosIcon: leafOutline,
    mdIcon: leafSharp
  },
  {
    title: 'Plant ID',
    url: '/pages/plantid',
    iosIcon: fingerPrintOutline,
    mdIcon: fingerPrintSharp
  },
];

export const labels = ['Local Search'];