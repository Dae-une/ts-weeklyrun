import { atom } from "recoil";

export interface ReplyState {
  showInput: string;
  postId: string;
  recommentId: number;
  isLoading?: boolean;
}

export const replyState = atom<ReplyState>({
  key: "replyState",
  default: {
    showInput: "",
    postId: "",
    recommentId: 0,
    isLoading: false
  }
});
