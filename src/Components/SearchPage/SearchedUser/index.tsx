import React from "react";
import { instance } from "../../../Utils/Instance";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Profile from "../../../Static/Icons/myPageProfile.svg";
import useQueryDebounce from "../../../Hooks/useQueryDebounce";

interface SearchUser {
  profile: string;
  nickname: string;
  userId: number;
  image: string;
}

const SearchedUser = ({ searchTag }) => {
  const navigate = useNavigate();

  const debounceSearch = useQueryDebounce(searchTag, 500);

  const getSearchUser = async () => {
    const { data } = await instance.get<SearchUser[]>(`/api/user/search?nickname=${debounceSearch}`);
    return data;
  };

  const { data } = useQuery(["searchUser", debounceSearch], getSearchUser, {
    enabled: !!debounceSearch
  });

  const navUserPage = (nickname: string, userId: number) => {
    navigate(`/user/${nickname}`, {
      state: { userId: userId }
    });
  };

  return (
    <>
      {data?.map(user => {
        return (
          <SearchUserWrap key={user.nickname} onClick={() => navUserPage(user.nickname, user.userId)}>
            {user.image ? <img src={user.image} /> : <img src={Profile} />}
            <div>{user.nickname}</div>
          </SearchUserWrap>
        );
      })}
    </>
  );
};

export default SearchedUser;

const SearchUserWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 1.2rem 1.6rem;
  width: 100%;
  height: 8.437rem;
  & img {
    width: 6rem;
    height: 6rem;
    border-radius: 10rem;
    transform: rotate(-0.36deg);
  }
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0rem;
    margin-left: 1.85rem;
    height: 2.2rem;
  }
`;
