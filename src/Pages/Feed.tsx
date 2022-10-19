import React from "react";
import Layout from "../Components/Common/Layout/index";
import UserfeedList from "../Components/Feed/FeedList";

const Feed = () => {
  return (
    <Layout show={true}>
      <UserfeedList></UserfeedList>
    </Layout>
  );
};

export default Feed;
