//fs has old-style callbacks and sync methods.
//fs.promises has modern promise-based async methods (better for async/await).
const fs = require("fs").promises;
const path = require("path"); //path to the current directory

//folder creation is time consuming operation, so we will use async-await
async function initRepo() {
  //new hidden folder will be created-> .jitHub
  //process.cwd() will give the current working directory ->backend
  const repoPath = path.resolve(process.cwd(), ".jitHub");
  const commitsPath = path.join(repoPath, "commited");

  //we don't know if folder creation is successful or not
  try {
    //recursive-> if one folder exist, folder will be created inside that folder
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitsPath, { recursive: true });
    //config file-> last commit kab huya, last push kab huya
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({ bucket: "S3 bucket" })
    );
    console.log("Repository initialized");
  } catch (err) {
    console.error("Error creating repository:", err);
  }
}
module.exports = { initRepo };
