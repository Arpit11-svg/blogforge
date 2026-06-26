import React, {useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deletePostThunk } from "../store/postsThunk";
import { selectPostById } from "../store/postsSelectors";
import { fetchAllPosts } from "../store/postsThunk";

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
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFileView(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
