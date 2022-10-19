import { atom } from "recoil";

interface PostData {
  content: string;
  path: string[];
  distance: number;
  image: File[];
  hashtag: string[];
  time: number;
  prevImage: string[];
  pace: { min: string; sec: string };
  isLoading: boolean;
}

export const postData = atom<PostData>({
  key: "postData",
  default: {
    content: "",
    path: [],
    distance: 0,
    image: [],
    hashtag: [],
    time: 0,
    prevImage: [],
    pace: { min: "", sec: "" },
    isLoading: false
  }
});
