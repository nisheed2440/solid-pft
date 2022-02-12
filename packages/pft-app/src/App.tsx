import type { Component } from 'solid-js';
import SittingPose from './components/SittingPose';
import { PoseSittingImages, HeadImages, FaceImages, AccessoriesImages, FacialHairImages } from '@solid-pft/core';
import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <SittingPose head={HeadImages[0].key as any} face={FaceImages[0].key as any} pose={PoseSittingImages[0].key as any} facialHair={FacialHairImages[0].key as any} accessories={AccessoriesImages[0].key as any} />
    </div>
  );
};

export default App;
