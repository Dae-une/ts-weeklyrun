import React, { useRef, useCallback, useState } from "react";
import { StyleNav, StyleShow, StyleButton, StyleShowBackgroud, EditNickInput } from "./style";
import { NavState, PreviewImg, NavStates, NavPostData, INavPostData } from "../../../Recoil/Atoms/OptionAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { ReactComponent as Home } from "../../../Static/Icons/home.svg";
import { ReactComponent as Search } from "../../../Static/Icons/search.svg";
import { ReactComponent as Run } from "../../../Static/Icons/run.svg";
import { ReactComponent as Mypage } from "../../../Static/Icons/mypage.svg";

import { useUserProfileMutation } from "../../../Hooks/useProfile";
import { EditNicknameMutation } from "../../../Hooks/useProfile";
import { instance } from "../../../Utils/Instance";
import { useNavigate, useLocation } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { useDeletePost } from "../../../Hooks/useDeletePost";
import Modal from "../Modal";

const Nav = () => {
  const { state } = useLocation();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: postProfile } = useUserProfileMutation();
  const { mutate: editNickname } = EditNicknameMutation();
  const navigate = useNavigate();
  const [show, setShow] = useRecoilState<number>(NavState);
  const navEvent = useRecoilValue<string>(NavStates);
  const postData = useRecoilValue<INavPostData>(NavPostData);
  const imgVal = useRef<HTMLInputElement>(null);
  const [showEditNickname, SetShowEditNickname] = useState(false);
  const [nicknameInput, setNicknameInput] = useState("");

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 720,
    useWebWorker: true
  };
  const accessToken = localStorage.getItem("userData");
  if (!accessToken) {
    navigate("/");
    return null;
  }
  const parseData = JSON.parse(accessToken);
  const nickname = parseData.nickname;
  const provider = parseData.provider;

  const submitImg = async () => {
    if (imgVal.current?.files) {
      let file = imgVal.current.files[0];
      const formData = new FormData();
      const compressedFile = await imageCompression(file, options);
      formData.append("image", compressedFile);
      formData.append("basicImage", "false");
      postProfile(formData);
    }
  };

  const kakaoLogout = async () => {
    const { data } = await instance.get("/api/kakao/logout");
    return data;
  };

  const naverLogout = async () => {
    window.location.href = "http://nid.naver.com/nidlogin.logout";
    window.location.href = "https://weeklyrun.com";
  };

  const logoutConfirm = () => {
    if (confirm("로그아웃하시겠습니까")) {
      if (provider === "kakao") {
        kakaoLogout();
      } else if (provider === "naver") {
        naverLogout();
      }
      localStorage.clear();
      navigate("/");
    } else {
      return;
    }
  };

  const userDelete = async () => {
    const res = await instance.delete("/api/user").then(() => {
      localStorage.clear();
    });
    return res;
  };

  const outConfirm = () => {
    if (confirm("회원탈퇴하시겠습니까")) {
      userDelete();
      alert("회원탈퇴되었습니다");
      navigate("/");
    } else {
      return;
    }
  };
  const DeleteConfirm = () => {
    if (confirm("정말삭제하시겠습니까?")) {
      return deletePost(postData.postId);
    } else {
      return;
    }
  };

  const editNicknameModal = useCallback(() => {
    SetShowEditNickname(prev => !prev);
    setNicknameInput("");
  }, []);

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const onlyHangul = value.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, "");
    setNicknameInput(onlyHangul);
  };

  const onEditNickname = () => {
    const getData = JSON.parse(localStorage.getItem("userData")!);
    getData.nickname = nicknameInput;
    editNickname(nicknameInput);
    setNicknameInput("");
    localStorage.setItem("userData", JSON.stringify(getData));
    SetShowEditNickname(prev => !prev);
  };

  if (!localStorage.getItem("userData")) {
    navigate("/");
  }

  return (
    <>
      <StyleNav>
        <StyleShowBackgroud Show={show}></StyleShowBackgroud>
        {
          {
            option: (
              <StyleShow Show={show}>
                <p
                  onClick={() => {
                    navigate("/bugreport");
                  }}
                >
                  문제 신고하기
                </p>
                <p onClick={editNicknameModal}>닉네임 변경하기</p>
                <p
                  onClick={() => {
                    logoutConfirm();
                  }}
                >
                  로그아웃
                </p>
                <p
                  style={{ color: "red" }}
                  onClick={() => {
                    outConfirm();
                  }}
                >
                  회원탈퇴
                </p>
              </StyleShow>
            ),
            img: (
              <StyleShow Show={show}>
                <p
                  onClick={() => {
                    postProfile({ basicImage: true });
                  }}
                >
                  기본이미지로변경하기
                </p>
                <div>
                  <label htmlFor="inputFile">앨범에서 사진선택하기</label>
                  <input
                    style={{ display: "none" }}
                    onChange={submitImg}
                    name="image"
                    id="inputFile"
                    type="file"
                    accept="image/*"
                    ref={imgVal}
                  ></input>
                </div>
              </StyleShow>
            ),
            put: (
              <StyleShow Show={show}>
                <p
                  onClick={() => {
                    navigate(`/post/${postData.postId}`, {
                      state: { runLog: postData }
                    });
                  }}
                >
                  수정하기
                </p>
                <p
                  onClick={() => {
                    DeleteConfirm();
                  }}
                >
                  삭제하기
                </p>
              </StyleShow>
            ),
            report: (
              <StyleShow Show={show}>
                <p
                  onClick={() => {
                    navigate("/postreport", {
                      state: { postId: postData }
                    });
                  }}
                  style={{ color: "red" }}
                >
                  신고하기
                </p>
              </StyleShow>
            )
          }[navEvent]
        }

        <StyleButton>
          <div>
            {state === "feed" ? (
              <div>
                <Home
                  stroke="white"
                  onClick={() => {
                    navigate("/feed", { state: "feed" });
                  }}
                />
              </div>
            ) : (
              <div>
                <Home
                  onClick={() => {
                    navigate("/feed", { state: "feed" });
                  }}
                  stroke="#808080"
                />
              </div>
            )}
            {state === "search" ? (
              <div>
                <Search
                  onClick={() => {
                    navigate("/search", { state: "search" });
                  }}
                  stroke="white"
                />
              </div>
            ) : (
              <div>
                <Search
                  onClick={() => {
                    navigate("/search", { state: "search" });
                  }}
                  stroke="#808080"
                />
              </div>
            )}
            <div>
              <Run
                onClick={() => {
                  navigate("/record");
                }}
              />
            </div>
            {state === "user" ? (
              <div>
                <Mypage
                  stroke="#D9D9D9"
                  onClick={() => {
                    navigate(`/user/${nickname}`, { state: "user" });
                  }}
                />
              </div>
            ) : (
              <div>
                <Mypage
                  stroke="#808080"
                  onClick={() => {
                    navigate(`/user/${nickname}`, { state: "user" });
                  }}
                />
              </div>
            )}
          </div>
        </StyleButton>
      </StyleNav>
      {showEditNickname && (
        <Modal onClickNo={editNicknameModal} onClickYes={onEditNickname}>
          <EditNickInput
            value={nicknameInput}
            onChange={onChangeNickname}
            placeholder="닉네임을 입력해 주세요."
            maxLength={5}
          ></EditNickInput>
          <p>닉네임을 수정하시겠어요?</p>
        </Modal>
      )}
    </>
  );
};

export default Nav;
