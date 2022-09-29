import { atom } from "recoil";

export const runData = atom({
  key: "runData",
  default: {
    path: [],
    distance: 0,
    time: "",
    pace: "",
    isFinish: false
  }
});
