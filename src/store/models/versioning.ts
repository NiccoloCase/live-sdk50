import { Action, action } from "easy-peasy";

interface INextMajorVersion {
  majorVersion: number;
  releaseDate: Date;
}

export interface VersioningModel {
  isVersionValid: boolean | null;
  setIsVersionValid: Action<VersioningModel, boolean | null>;

  nextMajorVersion?: INextMajorVersion;
  setNextMajorVersion: Action<VersioningModel, INextMajorVersion | undefined>;

  isUpdating?: boolean;
  setIsUpdating: Action<VersioningModel, boolean | undefined>;
}

const versioningModel: VersioningModel = {
  isVersionValid: null,
  setIsVersionValid: action((state, isValid) => {
    state.isVersionValid = isValid;
  }),
  setNextMajorVersion: action((state, info) => {
    state.nextMajorVersion = info;
  }),
  setIsUpdating: action((state, isUpdating) => {
    state.isUpdating = isUpdating;
  }),
};

export default versioningModel;
