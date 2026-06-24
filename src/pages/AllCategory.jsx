import React, { useEffect, useState } from "react";
import { CategoryCard, Container, Input } from "../components";
import { categories } from "../components/constants/allcategories";
import appwriteService from "../appwrite/config";

function AllCategory() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((response) => {
      if (response) {
        setPosts(response.rows);
      }
    });
  }, []);

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
