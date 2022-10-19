import { atom } from "recoil";

export interface RunData {
  path: {
    lat: number;
    lng: number;
  }[];
  distance: number;
  time: { hour: number; minute: number; second: number };
  pace: { min: string; sec: string };
  isFinish?: boolean;
}

export const runData = atom<RunData>({
  key: "runData",
  default: {
    path: [],
    distance: 0,
    time: { hour: 0, minute: 0, second: 0 },
    pace: { min: "", sec: "" },
    isFinish: false
  }
});
