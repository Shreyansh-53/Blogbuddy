import envConfig from "../configENV/configENV";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class dbService{
    client = new Client();
    databases;
    storage;
    constructor(){
        this.client
        .setEndpoint(envConfig.appwriteURL)
        .setProject(envConfig.appwriteProjectID)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title,slug,content,userID,imageID,status}){
        try {
            return await this.databases.createDocument(
                envConfig.appwriteDatabaseID,
                envConfig.appwriteCollectionID,
                ID.unique(),
                {
                    title,
                    content,
                    userID,
                    imageID,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error ", error);
            throw error;
        }
    }
    
    async updatePost({title,slug,content,imageID,status}){
        try {
            return await this.databases.updateDocument(
                envConfig.appwriteDatabaseID,
                envConfig.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    imageID,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error ", error);
            throw error;
        }
    }
    
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                envConfig.appwriteDatabaseID,
                envConfig.appwriteCollectionID,
                slug,
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error ", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                envConfig.appwriteDatabaseID,
                envConfig.appwriteCollectionID,
                slug,
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error ", error);
            return false;
        }
    }

    async listPost(currentUserID = null){
        let filters =  [
            Query.orderDesc('$createdAt'),
        ];

        if (currentUserID) {
        filters.push(
            Query.and([
                Query.equal("userID", currentUserID),
                Query.or([
                    Query.equal("status", "active"),
                    Query.equal("status", "inactive"),
            ])
            ])
        );
        } else {
        filters.push(Query.equal("status", "active"));
        }
        try {
            return await this.databases.listDocuments(
                envConfig.appwriteDatabaseID,
                envConfig.appwriteCollectionID,
                filters,
            );
        } catch (error) {
            console.log("Appwrite service :: listPost :: error ", error);
            return false;
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                envConfig.appwriteBucketID,
                ID.unique(),
                file,
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error ", error);
            throw error;
        }
    }

    async deleteFile(fileID){
        try {
            await this.storage.deleteFile(
                envConfig.appwriteBucketID,
                fileID,
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error ", error);
            throw error;
        }
    }

    getFilePreview(fileID){
            return this.storage.getFileView(
                envConfig.appwriteBucketID,
                fileID,
            );
    }
}

const DBservice = new dbService();

export default DBservice;