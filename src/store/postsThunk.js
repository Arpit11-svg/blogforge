import appwriteService from "../appwrite/config";
import {
    setLoading,
    setPosts,
    addPost,
    updatePost,
    removePost,
    setError,
} from "./postsSlice";

export const fetchAllPosts = () => async (dispatch) => {

    dispatch(setLoading(true));

    try {

        const response = await appwriteService.getPosts();

        dispatch(setPosts(response.rows));

    } catch (error) {

        dispatch(setError(error.message));

    }

};

export const createPostThunk = ({ data, userId }) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const file = await appwriteService.uploadFile(data.image[0]);
        if (!file) {
            throw new Error("Image upload failed");
        }
        const dbPost = await appwriteService.createPost({
            ...data,
            featuredImage: file.$id,
            userId: userId,
        });

        dispatch(addPost(dbPost));
        dispatch(setLoading(false));

        return dbPost;

    } catch (error) {
        dispatch(setError(error.message));
        return error;
    }
};

export const updatePostThunk = ({ post, data, userId }) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const file = data.image[0]
            ? await appwriteService.uploadFile(data.image[0])
            : null;

        if (file) {
            appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : undefined,
        });
        dispatch(updatePost(dbPost));
        dispatch(setLoading(false));
        return dbPost;

    } catch (error) {
        dispatch(setError(error.message));
        throw error;
    }
};

export const deletePostThunk = (post) => async (dispatch) => {

    dispatch(setLoading(true));

    try {

        const status = await appwriteService.deletePost(post.$id);

        if (!status) {
            throw new Error("Failed to delete post");
        }

        await appwriteService.deleteFile(post.featuredImage);

        dispatch(removePost(post.$id));

        dispatch(setLoading(false));

        return true;

    } catch (error) {

        dispatch(setError(error.message));

        return false;

    }

};
