import { atom } from "recoil";

export interface INavPostData {
  postId: number;
}

export const NavState = atom<number>({
  key: "NavState",
  default: 0
});
export const PreviewImg = atom({
  key: "PreviewImg",
  default: null
});

export const NavStates = atom<string>({
  key: "NavStates",
  default: ""
});
export const NavPostData = atom<INavPostData>({
  key: "NavPostData",
  default: {
    postId: 0
  }
});
export const ModalState = atom({
  key: "ModalState",
  default: false
});
