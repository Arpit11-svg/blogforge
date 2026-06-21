import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      setPosts(posts?.rows || []);
    });
  }, []);

  if (posts.length === 0) {
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
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
