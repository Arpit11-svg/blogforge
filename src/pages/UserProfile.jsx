import React from "react";
import { useSelector } from "react-redux";
import { Container } from "../components";
import { selectMyPosts } from "../store/postsSelectors";

function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const myPosts = useSelector((state) =>
    userData ? selectMyPosts(state, userData.$id) : [],
  );

  const totalPosts = myPosts.length;
  return (
    <div className="py-8">
      <Container>
        <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
              {userData?.name?.charAt(0).toUpperCase()}
            </div>

            <h1 className="mt-4 text-2xl font-bold">{userData?.name}</h1>

            <p className="text-gray-500">{userData?.email}</p>

            <div className="mt-6 border-t pt-4">
              <p>Total Posts: {totalPosts}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Profile;
