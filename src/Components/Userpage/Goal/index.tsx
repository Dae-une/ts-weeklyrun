import React, { FC, useState } from "react";
import { useGoal } from "../../../Hooks/useGoal";
import { StyleGoal, StyleGoalButton, StyleModalBox, StyleModal, StyleInput, StyleButton } from "./style";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ModalState } from "../../../Recoil/Atoms/OptionAtoms";
import Modal from "../Modal";

interface Props {
  userNickname: string;
  done: boolean;
}
const Goal: FC<Props> = ({ userNickname, done }) => {
  const [modal, setModal] = useRecoilState(ModalState);
  const { nickname } = useParams();

  return (
    <>
      {nickname === userNickname ? (
        <div style={{ height: "23rem" }}>
          {modal ? <Modal done={done} /> : null}
          <StyleGoal>
            <StyleGoalButton
              onClick={() => {
                setModal(true);
              }}
            >
              목표설정하기
            </StyleGoalButton>
            <div>이번주 목표를 입력하세요</div>
          </StyleGoal>
        </div>
      ) : (
        <StyleGoal>
          <div>아직 목표를 설정하지 않았어요</div>
        </StyleGoal>
      )}
    </>
  );
};
export default Goal;
