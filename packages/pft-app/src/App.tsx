import { Component, createEffect, createSignal} from 'solid-js';
import SittingPose from './components/SittingPose';
import { HeadKeys, FaceKeys, AccessoriesKeys, FacialHairKeys, PoseKeys } from './interface';
import { PoseSittingImages, HeadImages, FaceImages, AccessoriesImages, FacialHairImages } from '@solid-pft/core';
import store from './store';
import { SelectionGroup } from './components/SelectionGroup';

const App: Component = () => {
  const [state, setState] = store;
  const [selectedPose, setSelectedPose] = createSignal(state.pose);
  const [selectedHead, setSelectedHead] = createSignal(state.head);
  const [selectedFace, setSelectedFace] = createSignal(state.face);
  const [selectedAccessories, setSelectedAccessories] = createSignal(state.accessories);
  const [selectedFacialHair, setSelectedFacialHair] = createSignal(state.facialHair);
  createEffect(() => {
    setSelectedPose(state.pose);
    setSelectedHead(state.head);
    setSelectedFace(state.face);
    setSelectedAccessories(state.accessories);
    setSelectedFacialHair(state.facialHair);
  });
  return (
    <div class="flex flex-row grow">
      <aside class='flex flex-col w-96 h-full bg-base-100 overflow-y-auto drop-shadow-lg px-2'>
        <SelectionGroup label="Select Pose:" items={PoseSittingImages} onClick={(v) => setState({ pose: v as PoseKeys })} selectedKey={selectedPose}/>
        <SelectionGroup label="Select Head:" items={HeadImages} onClick={(v) => setState({ head: v as HeadKeys })} selectedKey={selectedHead}/>
        <SelectionGroup label="Select Face:" items={FaceImages} onClick={(v) => setState({ face: v as FaceKeys })} selectedKey={selectedFace}/>
        <SelectionGroup label="Select Accessories:" items={AccessoriesImages} onClick={(v) => setState({ accessories: v as AccessoriesKeys })} selectedKey={selectedAccessories}/>
        <SelectionGroup label="Select Facical Hair:" items={FacialHairImages} onClick={(v) => setState({ facialHair: v as FacialHairKeys })} selectedKey={selectedFacialHair}/>
      </aside>
      <div class='flex flex-grow justify-center items-center'>
        <div class="w-80">
          <SittingPose />
        </div>
      </div>
    </div>
  );
};

export default App;
