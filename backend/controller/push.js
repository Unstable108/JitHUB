const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");

async function pushRepo() {
  const repoPath = path.resolve(process.cwd(), ".jitHub");
  const commitsPath = path.join(repoPath, "commited");

  try {
    const commitDirs = await fs.readdir(commitsPath);
    //looping in commits folder
    //contain multiple commit folder
    for(const commitDir of commitDirs)
    {
        const commitPath = path.join(commitsPath,commitDir);
        //running loop inside each commit folder
        //in each file of comiit folder
        const files = await fs.readdir(commitPath);

        for(const file of files)
        {
            const filePath = path.join(commitPath,file);
            const fileContent = await fs.readFile(filePath);

            const params={
                Bucket: S3_BUCKET,
                Key: `commited/${commitDir}/${file}`,
                Body: fileContent,
            };

            await s3.upload(params).promise();
        }
    }
    console.log("All commits pushed to S3");
  } catch (error) {
    console.error("Error pushing to s3: ", error);
  }
}

module.exports = { pushRepo };
