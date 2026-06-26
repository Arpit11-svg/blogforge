import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allPosts: [],
    loading: false,
    error: null,
    isFetched: false
};

const postsSlice = createSlice({
    name: "posts",

    initialState,

    reducers: {

        setLoading: (state, action) => {
            state.loading = action.payload;
            if (action.payload) {
                state.error = null;
            }
        },

        setPosts: (state, action) => {
            state.allPosts = action.payload;
            state.loading = false;
            state.error = null;
            state.isFetched = true;
        },

        addPost: (state, action) => {
            state.allPosts.unshift(action.payload);
        },

        updatePost: (state, action) => {

            const index = state.allPosts.findIndex(
                post => post.$id === action.payload.$id
            );

            if (index !== -1) {
                state.allPosts[index] = action.payload;
            }

        },

        removePost: (state, action) => {

            state.allPosts = state.allPosts.filter(
                post => post.$id !== action.payload
            );

        },

        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        clearPosts: (state) => {
            state.allPosts = [];
            state.loading = false;
            state.error = null;
            state.isFetched = false;
        }

    }

});

export const {
    setLoading,
    setPosts,
    addPost,
    updatePost,
    removePost,
    setError,
    clearPosts
} = postsSlice.actions;

export default postsSlice.reducer;