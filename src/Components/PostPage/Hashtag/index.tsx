import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import useInput from "../../../Hooks/useInput";
import styled from "styled-components";
import { isAndroid } from "react-device-detect";

import { useRecoilState } from "recoil";
import { postData } from "../../../Recoil/Atoms/PostData";
import CancelIcon from "../../../Static/Icons/cancel_Icon.svg";

const Hashtag = ({ merge, prevHashtag }) => {
  const [hashtag, onChangeHashtag, setHashtag] = useInput("");
  const [hashArr, setHashArr] = useState(prevHashtag || []);
  const [stop, setStop] = useState(false);
  const [post, setPost] = useRecoilState(postData);
  const textRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const detecMobileKeyboard = () => {
      if (isAndroid && textRef.current) {
        textRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      }
    };
    window.addEventListener("resize", detecMobileKeyboard);

    return () => window.removeEventListener("resize", detecMobileKeyboard);
  });

  useEffect(() => {
    hashArr.length >= 5 ? setStop(true) : setStop(false);
  }, [hashArr]);

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.target as HTMLInputElement).value.length !== 0 && e.key === "Enter") {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    let updatedTagList = [...hashArr];
    updatedTagList.push(hashtag);
    setHashArr(updatedTagList);
    setHashtag("");
  };

  const deleteTagItem = (e: React.MouseEvent<HTMLDivElement>) => {
    const deleteTagItem = (e.target as HTMLDivElement).innerText;
    const filteredTagList = hashArr.filter((tagItem: string) => "#" + tagItem !== deleteTagItem);
    setHashArr(filteredTagList);
  };

  useEffect(() => {
    if (merge) {
      setPost(prev => ({
        ...prev,
        hashtag: hashArr
      }));
    }
  }, [merge]);

  return (
    <HashTagWrap>
      <InputWrap>
        <HashTagInput
          type="text"
          value={hashtag}
          onChange={onChangeHashtag}
          onKeyUp={onKeyPress}
          maxLength={10}
          placeholder="#태그 입력 ( 최대10글자, 5개 )"
          ref={textRef}
        />
        <button onClick={submitTagItem} disabled={stop}>
          + 추가
        </button>
      </InputWrap>
      <TagBox>
        {hashArr.map((hash: string, idx: number) => {
          return (
            <div key={idx} onClick={deleteTagItem}>
              <span>{"#" + hash}</span>
              <img src={CancelIcon} onClick={deleteTagItem} />
            </div>
          );
        })}
      </TagBox>
    </HashTagWrap>
  );
};

export default Hashtag;

const HashTagWrap = styled.div`
  width: 100%;
`;

const InputWrap = styled.div`
  letter-spacing: 8rem;
  border-bottom: 1px solid #e6e6e6;
  border-top: 1px solid #e6e6e6;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;

  & button {
    border: none;
    background-color: inherit;
    font-size: 1.6rem;
    opacity: 0.4;
    width: 30%;
  }
`;

const HashTagInput = styled.input`
  font-size: 1.6rem;
  border: none;

  width: 70%;
  &:focus {
    outline: none;
  }
`;

const TagBox = styled.div`
  padding: 1.3rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 10rem;
  & div {
    display: flex;
    padding: 0.5rem 1.2rem;
    background-color: #e6e6e6;
    border-radius: 10px;
    align-items: center;
  }
  & span {
    margin-right: 1rem;
  }
`;
