import conf from '../conf/conf.js';
import aiService from "../services/ai.js";
import { Client, ID, TablesDB, Storage, Query, Permission, Role } from "appwrite";

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

    async createPost({ title, slug, content, category, featuredImage, status, userId }) {
        try {

            const embeddingVector = await aiService.generateEmbedding(`${title} ${content}`);
            const embedding = embeddingVector ? JSON.stringify(embeddingVector) : null;
            return await this.tableDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteArticlesTableId,
                rowId: ID.unique(),
                data: {
                    title,
                    slug,
                    content,
                    category,
                    featuredImage,
                    status,
                    userId,
                    embedding,
                }

            });

        } catch (error) {
            console.error("createPost error:", error);
            throw error
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            const embeddingVector = await aiService.generateEmbedding(`${title} ${content}`);
            const embedding = embeddingVector ? JSON.stringify(embeddingVector) : null;

            const updatedRow = await this.tableDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteArticlesTableId,
                rowId: slug,
                data: { title, content, featuredImage, status, embedding }
            });

            await this.deleteSummariesForPost(slug); 

            return updatedRow;
        } catch (error) {
            console.error("updatePost error:", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.tableDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteArticlesTableId,
                rowId: slug,
            });

            await this.deleteSummariesForPost(slug);

            return true;
        } catch (error) {
            console.error("deletePost error:", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.tableDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteArticlesTableId,
                rowId: slug,
            });
        } catch (error) {
            console.error("getPost error:", error);
            return null;
        }
    }

    async getPosts(customQueries = []) {
        try {
            return await this.tableDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteArticlesTableId,
                queries: [
                    Query.equal("status", ["active"]),
                    ...customQueries
                    // Returns row if column(status) is equal to any value in the provided array
                ]
            });
        } catch (error) {
            console.error("getPosts error:", error);
            return null;
        }
    }

    //file upload services

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            return false;
        }
    }

    getFileView(fileId) {
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        ).toString()
    }

    downloadFile(fileId) {
        return this.bucket.getFileDownload(
            conf.appwriteBucketId,
            fileId
        )
    }

    // support storage
    async createSupportTicket({ name, email, subject, message, userId }) {
        try {
            return await this.tableDB.createRow(
                conf.appwriteDatabaseId,
                conf.appwriteSupportTableId,
                ID.unique(),
                {
                    name,
                    email,
                    subject,
                    message,
                    status: "open",
                    userId
                }
            );
        } catch (error) {
            console.log("Appwrite Support Error", error);
            throw error;
        }
    }

    // AI summary
    async getPostSummary(postId, userId) {
        try {
            const response = await this.tableDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwritePostSummariesTableId,
                queries: [
                    Query.equal("postId", postId),
                    Query.equal("userId", userId),
                ],
            });

            return response.rows.length > 0 ? response.rows[0] : null;

        } catch (error) {
            console.error("getPostSummary error:", error);
            return null;
        }
    }

    async createPostSummary(postId, userId, summary) {
        try {
            return await this.tableDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwritePostSummariesTableId,
                rowId: ID.unique(),
                data: {
                    postId,
                    userId,
                    summary,
                },
                permissions: [
                    Permission.read(Role.user(userId)),
                    Permission.update(Role.user(userId)),
                    Permission.delete(Role.user(userId)),
                ],
            });

        } catch (error) {
            console.error("createPostSummary error:", error);
            throw error;
        }
    }

    async updatePostSummaryRow(rowId, summary) {
        try {
            return await this.tableDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwritePostSummariesTableId,
                rowId: rowId,
                data: { summary },
            });
        } catch (error) {
            console.error("updatePostSummaryRow error:", error);
            throw error;
        }
    }

    async deleteSummariesForPost(postId) {
        try {
            const response = await this.tableDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwritePostSummariesTableId,
                queries: [Query.equal("postId", postId)],
            });

            await Promise.all(
                response.rows.map((row) =>
                    this.tableDB.deleteRow({
                        databaseId: conf.appwriteDatabaseId,
                        tableId: conf.appwritePostSummariesTableId,
                        rowId: row.$id,
                    })
                )
            );
        } catch (error) {
            console.error("deleteSummariesForPost error:", error);
        }
    }
}

const appwriteService = new Service();
export default appwriteService
