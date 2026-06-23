import React from "react";
import { Link } from "react-router-dom";

function CategoryCard({ value, label, image, count }) {
  return (
    <>

      <Link to={`/category/${value}`}>
        <div className="w-full bg-gray-100 rounded-xl p-3 sm:p-4 flex flex-col h-full">
          <div className="h-30 sm:h-52 w-full mb-1 overflow-hidden rounded-xl">
            <img
              src={image}
              alt={label}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-xs sm:text-xl text-blue-600 font-medium mb-1">
            Category: {label}
          </p>
          <p className="text-xs sm:text-sm  text-blue-600 font-medium mb-1">
            Total posts: {count}
          </p>
        </div>
      </Link>
    </>
  );
}
export default CategoryCard;
