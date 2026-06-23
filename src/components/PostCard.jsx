import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage, category }) {
  const categoryMap = {
    technology: "Technology",
    programming: "Programming",
    "artificial-intelligence": "Artificial Intelligence",
    "business-finance": "Business & Finance",
    education: "Education",
    "health-fitness": "Health & Fitness",
    lifestyle: "Lifestyle",
    science: "Science",
    entertainment: "Entertainment",
    sports: "Sports",
  };
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

        <p className="text-xs sm:text-sm text-blue-600 font-medium mb-1">
          Category: {categoryMap[category]}
        </p>

        <h2 className="text-lg sm:text-xl font-bold leading-6 sm:leading-7 line-clamp-2 min-h-[48px] sm:min-h-[60px]">
          {title}
        </h2>
      </div>
    </Link>
  );
}
export default PostCard;
