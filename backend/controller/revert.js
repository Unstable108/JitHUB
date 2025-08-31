const fs= require("fs");
const path = require("path");
const { promisify } = require("util") 

//basically overriding, so that changes revert ho jaye
const readDir = promisify(fs.readdir);
const copyFile= promisify(fs.copyFile);

async  function revertRepo(commitID){
   const repoPath = path.resolve(process.cwd(), ".jitHub");
   const commitsPath = path.join(repoPath,"commited");

   try {
      //read the commit folder given by user
      const commitDir= path.join(commitsPath,commitID);
      const files= await readDir(commitDir);
      const parentDir = path.resolve(repoPath,"..");

      for(const file of files)
      {
        //copyFile(kaha se , kaha pe)
        await copyFile(path.join(commitDir,file),path.join(parentDir,file));
      }
      console.log(`commit ${commitID} reverted succefully`);
    
   } catch (error) {
       console.error("Unable to revert: ",error)
   }
}

module.exports= {revertRepo};