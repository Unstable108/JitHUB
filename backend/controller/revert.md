//internal api of node inside, which allow us to chcek existing things
//promisify is used as wrapper
const { promisify } = require("util") 

//first check if commit exist with that id
//if exist,copy all the files to parent directory
//basically overriding, so that changes revert ho jaye
const readDir = promisify(fs.readDir);
const copyFile= promisify(fs.copyFile);

----------
- first checking uss id or naam se already koi folder hai ya nahi
- agar folder hai, toh uske files ko read kiya jai
- or ak ak unn files ko parent directory meh copy kar liya jai