# CPHHA React Web App 
Built by Aj Bealum, David Y, and Naotoshi Yoshida of Cal Poly Humboldt.

Uses Ionic / ReactJS frontend and Capacitor to build as a native mobile iOS app (if desired).
Edit ionic.config.json and capacitor.config.ts to change app ID and app name

Ionic - https://ionicframework.com/
React - https://react.dev/
Capacitor - https://capacitorjs.com/


├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── fonts
│   │       ├── RobotoSlab-Black.ttf
│   │       ├── RobotoSlab-Bold.ttf
│   │       ├── RobotoSlab-ExtraBold.ttf
│   │       ├── RobotoSlab-ExtraLight.ttf
│   │       ├── RobotoSlab-Light.ttf
│   │       ├── RobotoSlab-Medium.ttf
│   │       ├── RobotoSlab-Regular.ttf
│   │       ├── RobotoSlab-SemiBold.ttf
│   │       └── RobotoSlab-Thin.ttf
│   ├── components
│   │   ├── Collections
│   │   │   ├── CollectionsHeader.tsx
│   │   │   ├── CollectionsInfo.tsx
│   │   │   ├── CollectionsInfoModal.tsx
│   │   │   ├── Desktop
│   │   │   │   └── DesktopCollectionsHeader.tsx
│   │   │   └── Mobile
│   │   │       ├── MobileCollectionsHeader.tsx
│   │   │       └── MobileCollectionsSearchModal.tsx
│   │   ├── Home
│   │   │   ├── Desktop
│   │   │   └── HomeHeader.tsx
│   │   ├── Inat
│   │   ├── Menu
│   │   │   ├── Menu.tsx
│   │   │   └── MenuFunctions.tsx
│   │   ├── Model
│   │   │   ├── Desktop
│   │   │   │   └── DesktopModelHeader.tsx
│   │   │   ├── Mobile
│   │   │   │   ├── MobileModelHeader.tsx
│   │   │   │   └── MobileModelSearchModal.tsx
│   │   │   ├── ModelHeader.tsx
│   │   │   ├── ModelIframes.tsx
│   │   │   └── ModelInfoModal.tsx
│   │   └── PlantId
│   │       └── PlantIdHeader.tsx
│   ├── herbarium.js
│   ├── main.tsx
│   ├── my-context.tsx
│   ├── pages
│   │   ├── Collections.tsx
│   │   ├── Home.tsx
│   │   ├── Inat.tsx
│   │   ├── Model.tsx
│   │   └── PlantId.tsx
│   ├── theme
│   │   └── variables.css
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts