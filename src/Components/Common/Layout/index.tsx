import React, { ReactNode } from "react";
import Header from "../Header";
import Nav from "../Nav";
import { StyleLayout } from "./style";
import { useRecoilState } from "recoil";
import { NavState } from "../../../Recoil/Atoms/OptionAtoms";

interface Props {
  children: ReactNode;
  show?: boolean;
}

const Layout = ({ children, show }: Props) => {
  const [isShow, setIsShow] = useRecoilState(NavState);
  const showOutImg = () => {
    if (isShow) {
      setIsShow(0);
    }
  };
  return (
    <StyleLayout onClick={showOutImg}>
      {!show ? null : <Header></Header>}

      {children}
      <Nav></Nav>
    </StyleLayout>
  );
};
export default Layout;
