import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full h-80 bg-gray-100 rounded-xl p-4 flex flex-col">
        <div className="h-52 w-full mb-4 overflow-hidden rounded-xl">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-xl font-bold line-clamp-2">{title}</h2>
      </div>
    </Link>
  );
}
export default PostCard;
