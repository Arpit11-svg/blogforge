import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../store/postsThunk";
import { selectAllPosts } from "../store/postsSelectors";

function Home() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const posts = useSelector(selectAllPosts);

  const loading = useSelector((state) => state.posts.loading);
  const isFetched = useSelector((state) => state.posts.isFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchAllPosts());
    }
  }, [dispatch, isFetched]);

  // Pagination
  const POSTS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!status || posts.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 px-4">
        <Link to="/login">
          <div className="max-w-3xl mx-auto text-center bg-white rounded-2xl shadow-lg p-10">
            <h1 className="text-5xl font-extrabold mb-6">
              Welcome to <span className="text-blue-600">BlogForge 🚀</span>
            </h1>

            <p className="text-xl text-gray-700 mb-4">
              Discover, learn, and share through meaningful stories and
              insightful articles.
            </p>

            <p className="text-lg text-gray-600">
              Login to read posts and become part of our growing community.
            </p>
          </div>
        </Link>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {currentPosts.map((post) => (
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50 "
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
