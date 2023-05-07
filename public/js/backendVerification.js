import {ObjectId} from 'mongodb';
import fetch from 'node-fetch';

const exportedMethods = {
    checkId(id, varName) {
        if (!id) throw `Error: You must provide a ${varName}`;
        if (typeof id !== 'string') throw `Error:${varName} must be a string`;
        id = id.trim();
        if (id.length === 0) throw `Error: ${varName} cannot be an empty string or just spaces`;
        if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
        return id;
    },

    async checkURL(url, varName) {  
        url = this.checkString(url, varName); 
        const response = await fetch(url);
        if (!response.ok) {
        return false;
        }
        const contentType = response.headers.get('content-type');
        if (!contentType.startsWith('image/')) {
        return false;
        }
        return true;
    }
}

export default exportedMethods;
