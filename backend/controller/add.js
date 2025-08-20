const fs = require("fs").promises;
const path = require("path");
 
async  function addRepo(filePath){
    const repoPath = path.resolve(process.cwd(), ".jitHub");
    const stagedPath = path.join(repoPath,"staged");

    try {
        await fs.mkdir(stagedPath,{recursive: true});
        const fileName = path.basename(filePath); //read the file,joh user ne diya hai
        //copy that file to staged folder
        fs.copyFile(filePath,path.join(stagedPath, fileName));
        console.log(`File ${fileName} added to staging area!`); 

    } catch (err) {
        console.error("Error adding files to repository:", err);
    }
}

module.exports= {addRepo};