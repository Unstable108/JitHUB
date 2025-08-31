//pull the commits stored in bucket4
//extract all things from s3 to local
const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");

async function pullRepo() {
  const repoPath = path.resolve(process.cwd(), ".jitHub");
  const commitsPath = path.join(repoPath, "commited"); //konse folder me comimit store karna hai

  try {
    //everything inside s3-bucket have to come in local
    //one by one
    //read all the files,folder inside s3-bucket -> commited folder
    const data = await s3
      .listObjectsV2({
        Bucket: S3_BUCKET,
        Prefix: "commited/",
      })
      .promise();

    const objects = data.Contents; //store the list in objects

    for (const object of objects) {
      const key = object.Key;
      const commitDir = path.join(
        commitsPath,
        path.dirname(key).split("/").pop()
      );

      await fs.mkdir(commitDir,{recursive:true});

      const params={
                Bucket: S3_BUCKET,
                Key: key,
            };
       const fileContent = await s3.getObject(params).promise();
       await fs.writeFile(path.join(repoPath,key),fileContent.Body);

    }
       console.log("All commits pulled from s3");

  } catch (error) {
    console.error("getting error trying to pull: ", error);
  }
}

module.exports = { pullRepo };
