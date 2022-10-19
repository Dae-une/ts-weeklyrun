import React from "react";

import { StyleUserWrap, StyleUser, StyleHeader, StyleUsrBox, RankLink, UserTitle } from "./style";

import { useRecoilState } from "recoil";
import { NavState, NavStates } from "../../../Recoil/Atoms/OptionAtoms";
import { useParams } from "react-router-dom";
import { ReactComponent as Option } from "../../../Static/Icons/option.svg";

import { ReactComponent as Profile } from "../../../Static/Icons/myPageProfile.svg";

import TrophyIcon from "../../../Static/Icons/trophy.png";

interface Props {
  userNickname: string;
  userData: { nickname: string; image: string };
  userProfile?: string;
}

const Userprofile = ({ userNickname, userData }: Props) => {
  const [show, setShow] = useRecoilState(NavState);
  const [navState, setNavState] = useRecoilState(NavStates);

  const [naveState, setNaveState] = useRecoilState(NavStates);

  return (
    <StyleUserWrap>
      <StyleUser>
        <StyleHeader>
          <div>
            <span>유저페이지</span>
            {userData?.nickname === userNickname && (
              <Option
                onClick={() => {
                  setShow(4);
                  setNaveState("option");
                }}
              />
            )}
          </div>
        </StyleHeader>
        {userData?.nickname === userNickname ? (
          <>
            <StyleUsrBox>
              <div>
                {userData?.image ? (
                  <img
                    onClick={() => {
                      setNavState("img");
                      setShow(2);
                    }}
                    style={{ width: "40px", height: "40px", borderRadius: "20px" }}
                    src={userData.image}
                  ></img>
                ) : (
                  <Profile
                    onClick={() => {
                      setNavState("img");
                      setShow(2);
                    }}
                  ></Profile>
                )}
              </div>

              <UserTitle>
                {userData?.nickname}님의 주간 목표
                <RankLink to="/rank">
                  <img src={TrophyIcon} />
                </RankLink>
              </UserTitle>
            </StyleUsrBox>
          </>
        ) : (
          <>
            <StyleUsrBox>
              <div>
                {userData?.image ? (
                  <img style={{ width: "40px", height: "40px", borderRadius: "20px" }} src={userData.image}></img>
                ) : (
                  <Profile></Profile>
                )}
              </div>

              <UserTitle>
                {userData?.nickname}님의 주간 목표
                <RankLink to="/rank">
                  <img src={TrophyIcon} />
                </RankLink>
              </UserTitle>
            </StyleUsrBox>
          </>
        )}
      </StyleUser>
    </StyleUserWrap>
  );
};
export default Userprofile;
