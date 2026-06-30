import conf from '../conf/conf.js';
import { ID, Query, Permission, Role } from "appwrite";

export class Service {
    client = new Client();
    tableDB;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.tableDB = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    async likePost(postId, userId) {
        try {
            return await this.tableDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteLikesTableId,
                rowId: ID.unique(),
                data: {
                    postId,
                    userId
                }
            })

        } catch (error) {
            console.log("likePost error: ", error);
            throw error;

        }
    }
    async unlikePost(likeId) {
        try {
            await this.tableDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteLikesTableId,
                rowId: likeId
            });

            return true;
        } catch (error) {
            console.error("unlikePost error:", error);
            return false;
        }
    }
    async getUserLike(postId, userId) {
        try {
            const response = await this.tableDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteLikesTableId,
                queries: [
                    Query.equal("postId", [postId]),
                    Query.equal("userId", [userId])
                ]
            });

            return response.rows.length ? response.rows[0] : null;
        } catch (error) {
            console.error("getUserLike error:", error);
            return null;
        }
    }
    async getLikeCount(postId) {
        try {
            const response = await this.tableDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteLikesTableId,
                queries: [
                    Query.equal("postId", [postId])
                ]
            });

            return response.total;
        } catch (error) {
            console.error("getLikeCount error:", error);
            return 0;
        }
    }
    async toggleLike(postId, userId) {
        try {
            const existingLike = await this.getUserLike(postId, userId);

            if (existingLike) {
                await this.unlikePost(existingLike.$id);
                return {
                    liked: false
                };
            }

            await this.likePost(postId, userId);

            return {
                liked: true
            };

        } catch (error) {
            console.error("toggleLike error:", error);
            throw error;
        }
    }
}
const likeService = Service();
export default likeService;