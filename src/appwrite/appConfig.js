import config from "../config/config";

import { Client,ID, Databases,Storage, Query } from "appwrite"; 

export class Service {
    client = new Client();
    databases;
    bucket;
    
    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content, featuredImage, status, userId}){
        try {
           return await this.databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
           ) 
        } catch (error) {
            console.log("Appwrite Service :: CreatePost :: error ", error );
        }
    }

    // Update the post
    async updatePost(slug,{title,content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: UpdatePost :: error ", error );
        }
    }

    // To Delete the Document
    async deletePost(slug){
        try {
             await this.databases.deleteDocument( 
                 config.appwriteDatabaseId,
                 config.appwriteCollectionId,
                 slug  
            )
            return true    

        } catch (error) {
            console.log("Appwrite Service :: DeletePost :: error ", error );
            return false
        }
    }

    // To get the Single Post
    async getPost(slug){
         try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service :: GetPost :: error ", error );
            return false
        }
        return null;
    
    }

    // get All Posts 
    async getAllPosts(queries = [Query.equal("status","active")] ){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
               

            )
        } catch (error) {
            console.log("Appwrite Service :: GetAllPosts :: error ", error );
            
        }
    }

    // File Upload Service
    async uploadFile(file){
         try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: UploadFile :: error ", error );
        }
        return null;
    
    }

    // File Delete Service
     async deleteFile(fileId){
         try {
            return await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: DeleteFile :: error ", error );
            return false;
        }
          
     }

     // Get file Preveiew 
     getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
     }





}


const service = new Service();
export default service;