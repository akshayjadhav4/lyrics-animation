# Music Lyrics Animation

This project demonstrates lyrics animation using [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) and [@shopify/react-native-skia](https://shopify.github.io/react-native-skia/) for Enhanced LRC (ELRC). The ELRC files provide word-level timestamps for accurate synchronization with the music. Used [clrc](https://www.npmjs.com/package/clrc) for parsing ELRC content.

## Features

- **Word-level synchronization:** Animated with accurate timing for each word in the lyrics.
- **Auto-scroll:** Animated transitions between lyrics line.

## Usage

### Installation and Setting Up the Project

```bash
git clone https://github.com/akshayjadhav4/lyrics-animation.git
cd lyrics-animation
npm install
```

### Adding ELRC

Put your ELRC content into **constants/lrcString.ts**. Ensure your ELRC files follow the correct format.

e.g.

```plaintext
[ti: Lorem ipsum]
[ar: Artist performing the song]
[al: Album the song is from]
[lr: Author of the song]
[00:00.00] <00:00.04> Lorem <00:00.16> ipsum <00:00.82> dolor <00:01.29> sit <00:01.63> amet, <00:03.09> consectetur <00:03.37> adipiscing <00:05.92> elit. 
[00:06.47] <00:07.67> Sed <00:07.94> do <00:08.36> eiusmod <00:08.63> tempor <00:10.28> incididunt <00:10.53> ut <00:13.09> labore 
[00:13.34] <00:14.32> et <00:14.73> dolore <00:15.14> magna <00:15.57> aliqua. <00:16.09> Ut <00:16.46> enim
[00:17.44] 
[00:23.00] <00:24.40> orci. <00:24.70> Mauris <00:25.14> eu <00:25.30> dui 
```

### Run App

```bash
npm run android   # For Android
npm run ios       # For iOS
```