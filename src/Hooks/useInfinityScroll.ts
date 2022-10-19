import { useInfiniteQuery } from "react-query";

const useInfinityScroll = (QueryKey: string | string[], QueryFnc) => {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    QueryKey,
    ({ pageParam = 1 }) => QueryFnc(pageParam),
    {
      getNextPageParam: lastPage => (!lastPage.isLast ? lastPage.nextPage : undefined),
      refetchOnWindowFocus: false
    }
  );
  return { data, status, fetchNextPage, isFetchingNextPage, hasNextPage };
};

export default useInfinityScroll;
