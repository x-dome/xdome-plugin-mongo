"use strict";

const mongoInstance     = require("./mongoInstance");

class mongoInterface{

    constructor(){
        this.config = undefined;
    }

    // var config = {
    //     pluginInfo : {
    //         url?: "",
    //         basePath?: "",
    //         user?: "",
    //         pass?: "",
    //         dbName: "",
    //     },
    //     mongoOptions? : {
    //         // anything from http://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html#.connect
    //     },
    // }
    configure(config){
        this.config             = config;
        // this.dbBasePath = process.env.dbBasePath || "ds211875.mlab.com:11875/oneandone"
        // this.user = process.env.dbUser || "joeldelatorriente";
        // this.pass = process.env.dbPass || "joeldelatorriente1";
        // this.dbName = process.env.dbName || "oneandone";
        // this.url = `mongodb://${this.user}:${this.pass}@${this.dbBasePath}`;
        this.url                = this.config.pluginInfo.url;
    }

    async getInstance(collectionName){
        const instance          = await this.getSingleInstance(collectionName); /* @TODO => this.getPoolInstance() should be an option too */
        return instance
    }

    async getSingleInstance(collectionName){
        const instance          = new mongoInstance(this.config);
        await instance.connect();
        instance.setCollection(collectionName);
        return instance;
    }

}

module.exports = new mongoInterface();
