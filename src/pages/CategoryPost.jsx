import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { Container, PostCard } from "../components";
import { categoryMap } from "../components/constants/allcategories";
import { useDispatch, useSelector } from "react-redux";
import { selectPostsByCategory } from "../store/postsSelectors";
import { fetchAllPosts } from "../store/postsThunk";

function CategoryPost() {
  const { category } = useParams();
  const dispatch = useDispatch();

  const posts = useSelector((state) => selectPostsByCategory(state, category));
  const isFetched = useSelector((state) => state.posts.isFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchAllPosts());
    }
  }, [dispatch, isFetched]);

  return (
    <div className="py-8">
      <Container>
        <h1 className="text-3xl font-bold mb-6">{categoryMap[category]}</h1>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold">No blogs found</h2>

            <p className="text-gray-500 mt-2">
              Sorry, no blogs found in this category.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-full md:w-1/2 lg:w-1/3">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default CategoryPost;
