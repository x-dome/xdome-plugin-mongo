"use strict";

const mongoDB = require("mongodb");

class mongoInstance{

    constructor(config){
        this.client         = undefined;
        this.db             = undefined;

        this.ObjectId       = mongoDB.ObjectID;
        this.config         = config;
        this.collections    = {};
    }

    async connect(){
        const options = { useUnifiedTopology: true};
        this.client = await mongoDB.MongoClient.connect(this.config.pluginInfo.url, options);
        this.db = this.client.db();
    }

    async dissconnect(){
        const result = await this.client.close();
        return result;
    }

    async get(collectionName, id){
        const result = await this.collections[collectionName].findOne({"_id":this.ObjectId(id)});
        return result;
    }

    async find(collectionName, options){
        let findOptions = options || {};
        const result = await this.collections[collectionName].find(findOptions).toArray();
        return result;
    }

    async post(collectionName, docs){
        const result = await this.collections[collectionName].insertOne(docs, {})
        return result;
    }

    async put(collectionName, id, doc){
        const result = await this.collections[collectionName].findOneAndReplace({"_id":this.ObjectId(id)}, doc)
        return result;
    }

    async delete(collectionName, id){
        const result = await this.collections[collectionName].deleteOne({"_id":this.ObjectId(id)}, {})
        return result;
    }

    ////////////////////////////////
    ////////////////////////////////
    ////////////////////////////////

    // convertToOID(id){
    //     return this.ObjectId(id);
    // }

    setCollection(collectionName){
        this.collections[collectionName] = this.db.collection(collectionName);
    }

    // getCollection(collectionName){
    //     return this.collections[collectionName];
    // }
}

module.exports = mongoInstance;
