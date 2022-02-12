import type { Component } from 'solid-js';
import SittingPose from './components/SittingPose';
import { PoseSittingImages, HeadImages, FaceImages, AccessoriesImages, FacialHairImages } from '@solid-pft/core';

const App: Component = () => {
  return (
    <div class="flex flex-row grow">
      <div class='flex flex-col w-96 h-full drop-shadow-xl bg-black text-white'>
        Sidebar goes here
      </div>
      <div class='flex flex-grow justify-center items-center'>
        <div class="w-80">
          <SittingPose head={HeadImages[0].key as any} face={FaceImages[10].key as any} pose={PoseSittingImages[10].key as any} facialHair={FacialHairImages[0].key as any} accessories={AccessoriesImages[0].key as any} />
        </div>
      </div>
    </div>
  );
};

export default App;
