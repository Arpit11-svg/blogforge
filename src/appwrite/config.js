import conf from '../conf/conf.js';
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

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

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.tableDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: ID.unique(),
                data: {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            });

        } catch (error) {
            console.error("createPost error:", error);
            throw error
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.tableDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }
            });
        } catch (error) {
            console.error("updatePost error:", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.tableDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
            });

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
                tableId: conf.appwriteTableId,
                rowId: slug,
            });
        } catch (error) {
            console.error("getPost error:", error);
            return null;
        }
    }

    async getPosts() {
        try {
            return await this.tableDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries: [
                    Query.equal("status", ["active"])
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
}

const appwriteService = new Service();
export default appwriteService
