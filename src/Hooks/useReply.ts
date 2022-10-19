import { instance } from "../Utils/Instance";

interface AddReply {
  replyValue: string;
  postId: string | undefined;
}

//댓글 부분
export const addReply = async ({ replyValue, postId }: AddReply) => {
  try {
    const response = await instance.post(`/api/comment/${postId}`, {
      comment: replyValue
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const delReply = async (id: string) => {
  try {
    const response = await instance.delete(`/api/comment/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editReply = async ({ replyValue, postId }: AddReply) => {
  try {
    const response = await instance.put(`/api/comment/${postId}`, { comment: replyValue });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
