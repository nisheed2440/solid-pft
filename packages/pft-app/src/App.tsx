import { Component, For } from 'solid-js';
import SittingPose from './components/SittingPose';
import { HeadKeys,  FaceKeys, AccessoriesKeys, FacialHairKeys, PoseKeys} from './interface';
import { PoseSittingImages, HeadImages, FaceImages, AccessoriesImages, FacialHairImages } from '@solid-pft/core';
import store from './store';

const App: Component = () => {
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
                  store.setState({pose: poseImage.key as PoseKeys});
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
                 store.setState({face: faceImage.key as FaceKeys});
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
                  store.setState({head: headImage.key as HeadKeys});
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
                  store.setState({accessories: accessoriesImage.key as AccessoriesKeys});
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
                  store.setState({facialHair: facialHairImage.key as FacialHairKeys});
                }}>{facialHairImage.key}</a>
              </li>}
            </For>
          </ul>
        </div>
      </div>
      <div class='flex flex-grow justify-center items-center'>
        <div class="w-80">
          <SittingPose />
        </div>
      </div>
    </div>
  );
};

export default App;
