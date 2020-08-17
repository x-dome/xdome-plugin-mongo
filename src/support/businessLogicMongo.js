"use strict";

const businessLogic     = require("xdome-extension-rest").support.businessLogic;
const mongoInterface    = require("./mongoInterface");

class businessLogicMongo extends businessLogic{

    constructor(){
        super(...arguments);

        this.instance   = undefined;
        this.id         = undefined;
    }

    getIdFromParams(){
        let id      = false;

        if(this.request.params.id || this.request.query.id){
            id = this.request.params.id || this.request.query.id;
        }

        return id;
    }

    async beforeProcess(){
        this.instance   = await mongoInterface.getInstance(this.collectionName);
        this.id         = this.getIdFromParams();
    }

    async afterProcess(){
        await this.instance.dissconnect();
    }

    async getProcess(){
        let result = "";
        this.preProcess();

        if(this.id){
            result = await this.instance.get(this.collectionName, this.id);
        }
        else{
            result = await this.instance.find(this.collectionName, {});
        }

        await this.afterProcess();

        return result;
    }

    async postProcess(){
        let result = "";
        this.preProcess();

        result = await this.instance.post(this.collectionName, this.request.dome.input);

        await this.afterProcess();

        return result;
    }

    async putProcess() {
        let result = "";
        this.preProcess();

        result = await this.instance.put(this.collectionName, this.id, this.request.dome.input);

        await this.afterProcess();

        return result;
    }

    async deleteProcess() {
        let result = "";
        this.preProcess();

        result = await this.instance.delete(this.collectionName, this.id);

        await this.afterProcess();

        return result;
    }
}

module.exports = businessLogicMongo;
