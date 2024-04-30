import multiparty from 'multiparty';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';

const bucketName = 'myecommercebucket-555'

export default async function handle(req, res){
    try {
        const form = new multiparty.Form();
    
        const {fields, files} = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) throw reject(err);
                resolve({fields, files});
            });
        });
        console.log('length:', files)
        
        const client = new S3Client({
            region: 'us-east-2',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            },
        });
        console.log('Connected to the S3 bucket successfully!');
    
        const links = [];
        // need mime types so we can read the type of file that will be added
        for (const file of files.file){
            const ext = file.originalFilename.split('.').pop();
            console.log({ext, file})
            const newFilename = Date.now() + '.' + ext;
            console.log(newFilename)
            client.send(new PutObjectCommand({
                Bucket: bucketName,
                Key: newFilename,
                Body: fs.readFileSync(file.path),
                ACL: 'public-read',
                ContentType: mime.lookup(file.path)
            }))
    
            const link = `https://${bucketName}.s3.us-east-2.amazonaws.com/${newFilename}`
            links.push(link)
            console.log(link);
        }
        return res.json({links})
        
    } catch (error) {
        console.error('Error occurred during S3 upload:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const config = {
    api: {
        bodyParser: false
    }
}