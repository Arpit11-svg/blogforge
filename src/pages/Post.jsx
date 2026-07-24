import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import AISummary from "../components/AISummary";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deletePostThunk } from "../store/postsThunk";
import { selectPostById } from "../store/postsSelectors";
import { fetchAllPosts } from "../store/postsThunk";
import { Pencil, Trash2 } from "lucide-react";

export default function Post() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);

  const isFetched = useSelector((state) => state.posts.isFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchAllPosts());
    }
  }, [dispatch, isFetched]);

  const post = useSelector((state) => selectPostById(state, slug));
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const deletePost = () => {
    const status = dispatch(deletePostThunk(post));
    if (status) {
      navigate("/");
    }
  };

  return post ? (
    <div className="py-10 bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Featured image */}
          <div className="w-full relative rounded-2xl overflow-hidden shadow-md mb-6">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="w-full max-h-[420px] object-cover"
            />

            {isAuthor && (
              <div className="absolute right-4 top-4 flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-white/90"
                    className="!text-gray-800 hover:!bg-white flex items-center gap-1.5 backdrop-blur-sm shadow-sm"
                  >
                    <Pencil size={14} />
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500/90"
                  onClick={deletePost}
                  className="flex items-center gap-1.5 backdrop-blur-sm shadow-sm hover:!bg-red-500"
                >
                  <Trash2 size={14} />
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* AI Summary */}
          <div className="mb-8">
            <AISummary post={post} />
          </div>

          {/* Full content */}
          <div className="browser-css bg-white rounded-2xl shadow-sm p-6 md:p-8">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
