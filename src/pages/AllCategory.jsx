import React, { useState, useEffect } from "react";
import { CategoryCard, Container, Input, Logo } from "../components";
import { categories } from "../components/constants/allcategories";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts } from "../store/postsSelectors";
import { fetchAllPosts } from "../store/postsThunk";
import { Link } from "react-router-dom";

function AllCategory() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const { status } = useSelector((state) => state.auth);
  const isFetched = useSelector((state) => state.posts.isFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchAllPosts());
    }
  }, [dispatch, isFetched]);

  const counts = {};
  posts.forEach((post) => {
    counts[post.category] = (counts[post.category] || 0) + 1;
  });

  const sortedCategories = [...categories].sort(
    (a, b) => (counts[b.value] || 0) - (counts[a.value] || 0),
  );

  const [search, setSearch] = useState("");
  const filteredCategories = sortedCategories.filter((category) =>
    category.label.toLowerCase().includes(search.toLowerCase()),
  );

  if (!status) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-10 text-center">
          <div className="flex justify-center">
            <div className="p-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
              <Logo width="90px" />
            </div>
          </div>

          <div className="mt-6 text-6xl">🔒</div>

          <h2 className="mt-5 text-3xl font-bold text-gray-900">
            Login Required
          </h2>

          <p className="mt-3 text-gray-600 leading-7">
            Please sign in to access all categories, discover blogs, and enjoy
            the complete BlogForge experience.
          </p>

          <Link
            to="/login"
            className="mt-8 inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            Login to Continue →
          </Link>

          <p className="mt-6 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full py-8">
        <Container>
          <div className="flex justify-center mb-6">
            <Input
              type="text"
              placeholder="🔍 Search categories..."
              className="w-full max-w-lg "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap">
            {filteredCategories.map((category) => (
              <div
                key={category.value}
                className="p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
              >
                <CategoryCard
                  {...category}
                  count={counts[category.value] || 0}
                />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
export default AllCategory;
