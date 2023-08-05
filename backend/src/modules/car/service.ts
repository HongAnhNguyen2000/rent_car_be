const awsService = require("../../services/awsService");

exports.uploadFiles = async (files, folder) => {        
    const urls = [];
    try {
        for (const file of files) {
            const extension = file.originalname.split(".").pop();
            const epoch = Date.now().toString();
            const key = `${folder}/${epoch}.${extension}`;
            let url = await awsService.awsPutObject(key, file.buffer);
            urls.push(url);
        };
    } catch (error) {
        throw error;
    }
    return urls;
}