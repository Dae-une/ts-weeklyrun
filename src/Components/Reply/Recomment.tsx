import React, { useEffect } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

import useInfinityScroll from "../../Hooks/useInfinityScroll";
import RecommentItem from "./recommentItem";
import { instance } from "../../Utils/Instance";

interface ReplyData {
  image: string;
  nickname: string;
  commnet: string;
  createdAt: number;
  recommentId: number;
}
function Recomment({ id }) {
  const [ref, inView] = useInView();

  const getRecomment = async (pageParam: number) => {
    const response = await instance.get(`/api/comment/recomment/${id}/${pageParam}`);
    const { Recomment, isLast } = response.data;
    return { Recomment, nextPage: pageParam + 1, isLast };
  };

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfinityScroll("GET_RECOMMENT", getRecomment);
  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage]);

  return (
    <ReplyBox>
      {data?.pages.map((page, i) => {
        return (
          <React.Fragment key={i}>
            {page?.Recomment.map((reply: ReplyData) => {
              return (
                <div key={reply.recommentId}>
                  <RecommentItem data={reply} />
                </div>
              );
            })}
          </React.Fragment>
        );
      })}
      {isFetchingNextPage ? <>로딩중</> : <div ref={ref}></div>}
    </ReplyBox>
  );
}

export default Recomment;

const ReplyBox = styled.div``;
