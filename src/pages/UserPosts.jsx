import React from "react";
import { useSelector } from "react-redux";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";
import { selectMyPosts } from "../store/postsSelectors";

function UserPosts() {
  const userData = useSelector((state) => state.auth.userData);

  const myPosts = useSelector((state) => userData? selectMyPosts(state, userData.$id) : []);
  
  return (
    <div className="w-full py-8">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Welcome, {userData?.name} 👋
        </h2>
        <div className="mb-8">
          <p className="text-gray-300">
            {`You have total ${myPosts.length} post${myPosts.length !== 1 ? "s" : ""}`}
          </p>
        </div>
      </div>
      <Container>
        {myPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">📝</div>

            <h2 className="text-2xl font-bold text-gray-800">No Posts Yet</h2>

            <p className="text-gray-200 mt-2 max-w-md">
              You haven't published any posts yet. Start sharing your ideas and
              create your first blog post.
            </p>

            <Link
              to="/add-post"
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap">
            {myPosts.map((post) => (
              <div
                key={post.$id}
                className="p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default UserPosts;
