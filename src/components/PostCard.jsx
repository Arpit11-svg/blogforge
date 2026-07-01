import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import appwriteLikeService from "../appwrite/like.js";
import { categoryMap } from "./constants/allcategories";
import { useSelector } from "react-redux";

function PostCard({ $id, title, featuredImage, category }) {
  const [liked, setLiked] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const userData = useSelector((state) => state.auth.userData);
  // console.log(userData);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (loadingLike) return;
    setLoadingLike(true);

    try {
      const response = await appwriteLikeService.toggleLike($id, userData.$id);

      setLiked(response.liked);

      // Fetch the actual count from the database
      const count = await appwriteLikeService.getLikeCount($id);
      setLikeCount(count);
    } finally {
      setLoadingLike(false);
    }
  };

  const loadLikes = async () => {
    const count = await appwriteLikeService.getLikeCount($id);

    const existing = await appwriteLikeService.getUserLike($id, userData.$id);

    setLikeCount(count);
    setLiked(!!existing);
  };

  useEffect(() => {
    if (userData?.$id) {
      loadLikes();
    }
  }, [$id, userData?.$id]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-3 sm:p-4 flex flex-col h-full">
        <div className="h-40 sm:h-52 w-full mb-1 overflow-hidden rounded-xl">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <hr />

        <p className="text-xs sm:text-sm text-blue-600 font-medium mb-1">
          Category: {categoryMap[category]}
        </p>

        <h2 className="text-lg sm:text-xl font-bold leading-6 sm:leading-7 line-clamp-2 min-h-[48px] sm:min-h-[60px]">
          {title}
        </h2>
        <hr />
        <button
          onClick={handleLike}
          disabled={loadingLike}
          className="cursor-pointer"
        >
          {liked ? "❤️" : "🤍"} {likeCount}
        </button>
      </div>
    </Link>
  );
}
export default PostCard;
