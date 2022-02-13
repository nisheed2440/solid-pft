import { createStore } from 'solid-js/store';
import { PoseSittingImages } from "@solid-pft/core";
import { PoseSittingKeys} from './interface';

const [state, setState] =  createStore({
    pose: PoseSittingImages[0].key as PoseSittingKeys
});


export default {
    state,
    setState
}


