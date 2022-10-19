import { instance } from "../Utils/Instance";
import { useQuery } from "react-query";

const getUserData = async (userId: number) => {
  const { data } = await instance.get(`/api/user/info/${userId}`);
  return data;
};

export const useGetUserData = (userId: number) => {
  return useQuery(["userData", userId], () => getUserData(userId), {
    enabled: !!userId
  });
};
