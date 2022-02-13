import { Component, createSignal, For } from 'solid-js';
import SittingPose from './components/SittingPose';
import { PoseSittingKeys, HeadKeys,  FaceKeys, AccessoriesKeys, FacialHairKeys} from './interface';
import { PoseSittingImages, HeadImages, FaceImages, AccessoriesImages, FacialHairImages } from '@solid-pft/core';
import store from './store';

const App: Component = () => {
  const [pose, setPose] = createSignal(PoseSittingImages[0].key as PoseSittingKeys);
  const [head, setHead] = createSignal(HeadImages[0].key as HeadKeys);
  const [face, setFace] = createSignal(FaceImages[0].key as FaceKeys);
  const [accessories, setAccessories] = createSignal(AccessoriesImages[0].key as AccessoriesKeys);
  const [facialHair, setFacialHair] = createSignal(FacialHairImages[0].key as FacialHairKeys);
  return (
    <div class="flex flex-row grow">
      <div class='flex flex-col w-96 h-full drop-shadow-xl bg-black text-white'>
        Sidebar goes here
        <button class="btn btn-sm">Small</button>
        <div class="dropdown">
          <div tabindex="0" class="m-1 btn btn-sm text-xs">Pose</div>
          <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
            <For each={PoseSittingImages}>
              {(poseImage) => <li>
                <a onClick={(e) => {
                  e.preventDefault();
                  setPose(poseImage.key as PoseSittingKeys);
                  store.setState({pose: poseImage.key as PoseSittingKeys});
                }}>{poseImage.key}</a>
              </li>}
            </For>
          </ul>
        </div>
        <div class="dropdown">
          <div tabindex="0" class="m-1 btn btn-sm text-xs">Face</div>
          <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
            <For each={FaceImages}>
              {(faceImage) => <li>
                <a onClick={(e) => {
                  e.preventDefault();
                  setFace(faceImage.key as FaceKeys)
                }}>{faceImage.key}</a>
              </li>}
            </For>
          </ul>
        </div>
        <div class="dropdown">
          <div tabindex="0" class="m-1 btn btn-sm text-xs">Head</div>
          <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
            <For each={HeadImages}>
              {(headImage) => <li>
                <a onClick={(e) => {
                  e.preventDefault();
                  setHead(headImage.key as HeadKeys)
                }}>{headImage.key}</a>
              </li>}
            </For>
          </ul>
        </div>
        <div class="dropdown">
          <div tabindex="0" class="m-1 btn btn-sm text-xs">Accessories</div>
          <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
            <For each={AccessoriesImages}>
              {(accessoriesImage) => <li>
                <a onClick={(e) => {
                  e.preventDefault();
                  setAccessories(accessoriesImage.key as AccessoriesKeys)
                }}>{accessoriesImage.key}</a>
              </li>}
            </For>
          </ul>
        </div>
        <div class="dropdown">
          <div tabindex="0" class="m-1 btn btn-sm text-xs">Facial Hair</div>
          <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
            <For each={FacialHairImages}>
              {(facialHairImage) => <li>
                <a onClick={(e) => {
                  e.preventDefault();
                  setFacialHair(facialHairImage.key as FacialHairKeys)
                }}>{facialHairImage.key}</a>
              </li>}
            </For>
          </ul>
        </div>
      </div>
      <div class='flex flex-grow justify-center items-center'>
        <div class="w-80">
          <SittingPose head={head} face={face} facialHair={facialHair} accessories={accessories} />
        </div>
      </div>
    </div>
  );
};

export default App;
