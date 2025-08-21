const fs = require("fs").promises;
const path = require("path");
//every new id for every commit - uuid
const { v4: uuidv4 } = require("uuid");

async function commitRepo(message) {
  const repoPath = path.resolve(process.cwd(), ".jitHub");
  const stagedPath = path.join(repoPath, "staged");
  const commitPath = path.join(repoPath, "commited");


  try {
    const commitID = uuidv4();
    //every commit directory, id of the commit
    //a new folder insider commited, with commitID
    const commitDir = path.join(commitPath, commitID);
    await fs.mkdir(commitDir, { recursive: true });

    //read all files inside staged folder
    const files = await fs.readdir(stagedPath);
    for (const file of files) {
      await fs.copyFile(
        path.join(stagedPath, file),
        path.join(commitDir, file)
      );
    }

    //updating json with commit details
    await fs.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify({ message, date: new Date().toISOString() })
    );

    console.log(`Commit ${commitID} created with msg ${message}`);
  } catch (error) {
    console.log("Error commiting from stage: ", error);
  }


}

module.exports = { commitRepo };
