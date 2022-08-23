# Upload files to s3 bucket - fullstack example built with serverless and react

This example is a fullstack project:
1. client - react app created via vite. minimal ui for uploading a file.
2. server - nodejs app built on top serverless framework. generates api endpoint for uploading files to s3 bucket via lambda function.


## Quick start

### Prerequisites
Following prerequisites are required before you can run the app:
1. Make sure you have nodejs installed on the machine you're going to run this project.
2. Install serverless globally by running `npm install -g serverless`.
3. Make sure you have proper aws config file: the config file is located at `~/. aws/config` on Linux or macOS, or at `C:\Users\ USERNAME \. aws\config` on Windows. This file contains the configuration settings for the default profile and any named profiles.
4. Go to react-web and serverless-api folders, and for each run: `npm install`.
5. Create or use existing *public* s3 bucket.

### Configuration

1. Go to `react-web/src/App.jsx` 
and change the following (in case it's needed) to your actual endpoint:
```
const UPLOAD_ENDPOINT = 'http://localhost:4000/upload'
```
2. Go to `serverless-api/serverless.yml`
and change bucket named stated in provider.environment:
```
  environment:
    BUCKET: ume-hackathon
```



### Running the example
#### client
```
cd react-web
npm run dev
```
you should see something like:
```
  VITE v3.0.9  ready in 246 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
```
client should be available on http://127.0.0.1:5173

#### server
```
cd serverless-api
npm run start
```
api should be available on http://localhost:4000
