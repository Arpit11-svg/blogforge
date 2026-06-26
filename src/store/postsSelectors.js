export const selectAllPosts = (state) => state.posts.allPosts;

export const selectMyPosts = (state, userId) =>
    state.posts.allPosts.filter(
        post => post.userId === userId
    );

export const selectPostsByCategory = (state, category) =>
    state.posts.allPosts.filter(
        post => post.category === category
    );


export const selectPostById = (state, slug) =>
    state.posts?.allPosts?.find(
        post => post.$id === slug
    );