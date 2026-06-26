import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts } from "../store/postsSelectors";
import { fetchAllPosts } from "../store/postsThunk";

function AllPosts() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const isFetched = useSelector((state) => state.posts.isFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchAllPosts());
    }
  }, [dispatch, isFetched]);

  return (
    <div className="w-full, py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
