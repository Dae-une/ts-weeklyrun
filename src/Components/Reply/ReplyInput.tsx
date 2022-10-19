import React, { useRef, useLayoutEffect, useCallback, FormEvent } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { isAndroid } from "react-device-detect";

import useInput from "../../Hooks/useInput";
import { replyState } from "../../Recoil/Atoms/ReplyAtoms";
import { addReply } from "../../Hooks/useReply";
import { editReply } from "../../Hooks/useReply";
import { addRecomment } from "../../Hooks/useRecomment";
import { editRecomment } from "../../Hooks/useRecomment";

const ReplyInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [replyValue, onChangeReplyValue, setReplyValue] = useInput("");
  const [inputState, setInputState] = useRecoilState(replyState);
  const { showInput, postId, recommentId } = inputState;

  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  });

  //댓글 작성
  const addReplyData = useMutation(() => addReply({ replyValue, postId }), {
    onSuccess: data => {
      queryClient.invalidateQueries("GET_REPLY");
      queryClient.invalidateQueries("posts");
      setInputState(prev => ({
        ...prev,
        showInput: ""
      }));
    },
    onError: error => {
      console.error(error);
    }
  });
  //댓글 수정
  const editReplyData = useMutation(() => editReply({ replyValue, postId }), {
    onSuccess: data => {
      queryClient.invalidateQueries("GET_REPLY");
      setInputState(prev => ({
        ...prev,
        showInput: ""
      }));
    },
    onError: error => {
      console.error(error);
    }
  });

  //대댓글 작성
  const addRecommnetData = useMutation(
    () =>
      addRecomment({
        commentId: postId,
        comment: replyValue
      }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries("GET_REPLY");
        queryClient.invalidateQueries("GET_RECOMMENT");
        setInputState(prev => ({
          ...prev,
          showInput: ""
        }));
      },
      onError: error => {
        console.error(error);
      }
    }
  );

  //대댓글 수정
  const editRecommentData = useMutation(
    () => editRecomment({ comment: replyValue, commentId: postId, recommentId: recommentId }),
    {
      onSuccess: data => {
        queryClient.invalidateQueries("GET_RECOMMENT");
        setInputState(prev => ({
          ...prev,
          showInput: ""
        }));
      },
      onError: error => {
        console.error(error);
      }
    }
  );

  const handleAddreply = (e: React.MouseEvent<HTMLSpanElement> | FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (showInput) {
      case "댓글작성":
        addReplyData.mutate();
        break;
      case "댓글수정":
        editReplyData.mutate();
        break;
      case "대댓글작성":
        addRecommnetData.mutate();
        break;
      case "대댓글수정":
        editRecommentData.mutate();
        break;
    }
    setReplyValue("");
  };

  const onCloseInput = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    setInputState(prev => ({
      ...prev,
      showInput: ""
    }));
  }, []);

  if (!showInput) {
    return null;
  }

  return (
    <>
      <form onSubmit={handleAddreply}>
        <InputWrap isAndroid={isAndroid}>
          <div>
            <input ref={inputRef} value={replyValue} onChange={onChangeReplyValue} />
            <span onClick={onCloseInput}>&times;</span>
            <span onClick={handleAddreply}>완료</span>
          </div>
        </InputWrap>
      </form>
    </>
  );
};

export default ReplyInput;

const InputWrap = styled.div<{ isAndroid: boolean }>`
  position: fixed;
  bottom: ${({ isAndroid }) => (isAndroid ? "44%" : "7rem")};
  background: #353434;
  width: 100%;
  height: 5.4rem;
  & div {
    display: flex;
    padding: 0.7rem 1.6rem;
  }
  & input {
    width: 80%;
    height: 4rem;
    border-radius: 0.8rem;
    background-color: #d9d9d9;
    padding: 0 1rem;
    border: none;
    &:focus {
      outline: none;
    }
  }
  & span {
    width: 20%;
    color: white;
    text-align: center;
    font-size: 2.6rem;
    line-height: 2.9rem;
  }
  & span:last-child {
    line-height: 3.3rem;
    font-size: 2rem;
  }
  @media only screen and (min-width: 880px) {
    max-width: 40rem;
  }
`;
