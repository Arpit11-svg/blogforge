const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteArticlesTableId: String(import.meta.env.VITE_APPWRITE_ARTICLES_Table_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinyMCE_API_KEY: String(import.meta.env.VITE_TINYMCE_API_KEY),
    appwriteSupportTableId: String(import.meta.env.VITE_APPWRITE_SUPPORT_TABLE_ID),
    appwriteLikesTableId: String(import.meta.env.VITE_APPWRITE_LIKES_TABLE_ID),
}

export default conf;