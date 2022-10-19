import React, { useCallback } from "react";
import styled from "styled-components";
import { ReactComponent as Profile } from "../../../Static/Icons/myPageProfile.svg";
import { useNavigate } from "react-router-dom";

interface Ranking {
  distance: number;
  time: number;
  userId: number;
  nickname: string;
  profile: string;
}

interface MyRanking {
  myRanking: number;
  nickname: string;
  image: string;
  distance: number;
  time: number;
  userId: number;
}
type RankData = {
  rankData: Ranking[];
  userRank: MyRanking;
};

const RankBody = ({ rankData, userRank }: RankData) => {
  const navigate = useNavigate();

  const divideTime = useCallback((time: number) => {
    let seconds = Math.floor(time % 60);
    let minute = Math.floor((time / 60) % 60);
    let hours = Math.floor((time / (60 * 60)) % 24);

    let newHours = hours < 10 ? "0" + hours : hours;
    let newMinute = minute < 10 ? "0" + minute : minute;
    let newSeconds = seconds < 10 ? "0" + seconds : seconds;

    return newHours + ":" + newMinute + ":" + newSeconds;
  }, []);

  const goToUser = (nickname: string, userId: number) => {
    navigate(`/user/${nickname}`, {
      state: { userId: userId }
    });
  };

  return (
    <RankListWrap>
      <UserRank>
        <RankList onClick={() => goToUser(userRank.nickname, userRank?.userId)}>
          <tr>
            <td>
              <div>{userRank?.myRanking}</div>
            </td>
            <td>{userRank?.image ? <img src={userRank?.image} /> : <Profile />}</td>
            <td>{userRank?.nickname}</td>
            <td>
              <div>{userRank?.distance}Km</div>
              <div>{divideTime(userRank?.time)}</div>
            </td>
          </tr>
        </RankList>
      </UserRank>
      {rankData?.map((ranking, idx: number) => {
        return (
          <RankList key={idx} onClick={() => goToUser(ranking.nickname, ranking.userId)}>
            <tr>
              <td>
                <div>{idx + 1}</div>
              </td>
              <td>{ranking.profile ? <img src={ranking.profile} /> : <Profile />}</td>
              <td>{ranking.nickname}</td>
              <td>
                <div>{ranking.distance}Km</div>
                <div>{divideTime(ranking.time)}</div>
              </td>
            </tr>
          </RankList>
        );
      })}
    </RankListWrap>
  );
};

export default RankBody;

const RankListWrap = styled.div`
  padding: 0 1.6rem;
`;

const UserRank = styled.div`
  background-color: #e6e6e6;
`;
const RankList = styled.table`
  padding: 0 2rem;
  display: flex;
  border-bottom: 0.1rem solid #e6e6e6;
  text-align: center;

  & td {
    text-align: center;
    height: 10rem;
    justify-content: center;
  }

  & tr {
    width: 100%;
  }
  & td:first-child {
    width: 5rem;
  }
  & td:nth-child(2) {
    width: 10rem;
  }
  & td:nth-child(3) {
    width: 15rem;
  }
  & td:last-child {
    width: 10rem;
  }

  & img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
