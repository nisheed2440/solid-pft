import { createStore } from 'solid-js/store';
import { AccessoriesImages, BodyImages, FaceImages, FacialHairImages, HeadImages, PoseSittingImages } from "@solid-pft/core";
import { PoseKeys, HeadKeys, BodyKeys, FaceKeys, FacialHairKeys, AccessoriesKeys } from './interface';

const [state, setState] =  createStore<{
    pose: PoseKeys,
    body: BodyKeys,
    head: HeadKeys,
    face: FaceKeys,
    facialHair: FacialHairKeys,
    accessories: AccessoriesKeys,
}>({
    pose: PoseSittingImages[0].key as PoseKeys,
    body: BodyImages[0].key as BodyKeys,
    head: HeadImages[0].key as HeadKeys,
    face: FaceImages[0].key as FaceKeys,
    facialHair: FacialHairImages[0].key as FacialHairKeys,
    accessories: AccessoriesImages[0].key as AccessoriesKeys,
});


export default {
    state,
    setState
}


