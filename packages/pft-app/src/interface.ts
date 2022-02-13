import { PoseSittingComponents, PoseStandingComponents, HeadComponents, FaceComponents, FacialHairComponents, AccessoriesComponents, BodyComponents } from "@solid-pft/core";

export type PoseSittingKeys = keyof typeof PoseSittingComponents;
export type PoseStandingKeys = keyof typeof PoseStandingComponents;
export type HeadKeys = keyof typeof HeadComponents;
export type FaceKeys = keyof typeof FaceComponents;
export type FacialHairKeys = keyof typeof FacialHairComponents;
export type AccessoriesKeys = keyof typeof AccessoriesComponents;
export type BodyKeys = keyof typeof BodyComponents;
export type PoseKeys = PoseSittingKeys | PoseStandingKeys;