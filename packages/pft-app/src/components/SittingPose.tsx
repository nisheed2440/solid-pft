import type { Component } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { PoseSittingComponents, HeadComponents, FaceComponents, FacialHairComponents, AccessoriesComponents } from "@solid-pft/core";
import store from '../store';
import { PoseSittingKeys } from '../interface';


const SittingPose: Component<{}> = () => {
    const [state] = store;
    return (
        <svg viewBox="0 0 1647 2500" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>A mono/sitting</title>
            <desc>The sitting pose of the peeps</desc>
            <g id="a-mono/sitting" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="pose" transform="translate(-81.000000, 637.000000)">
                    <Dynamic component={PoseSittingComponents[state.pose as PoseSittingKeys]} style="overflow: visible" />
                </g>
                <g id="Head" transform="translate(345.000000, 180.000000)">
                    <g id="head">
                        <Dynamic component={HeadComponents[state.head]} style="overflow: visible" />
                    </g>
                    <g id="face" transform="translate(159.000000, 186.000000)" fill="#000000">
                        <Dynamic component={FaceComponents[state.face]} style="overflow: visible" />
                    </g>
                    <g id="facial-hair" transform="translate(123.000000, 338.000000)">
                        <Dynamic component={FacialHairComponents[state.facialHair]} style="overflow: visible" />
                    </g>
                    <g id="accessories" transform="translate(47.000000, 241.000000)">
                        <Dynamic component={AccessoriesComponents[state.accessories]} style="overflow: visible" />
                    </g>
                </g>
            </g>
        </svg>)
}

export default SittingPose;