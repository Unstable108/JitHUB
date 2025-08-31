require("dotenv").config();
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers"); //to read arguments from terminal

const { initRepo } = require("./controller/init");
const { addRepo } = require("./controller/add");
const { commitRepo } = require("./controller/commit");
const { pullRepo } = require("./controller/pull");
const { revertRepo } = require("./controller/revert");
const { pushRepo } = require("./controller/push");

//command(command, description, parameter, controller function)
//demandCommand() ensures user se command lena jaruri hai
//argv -> joh bhi argument, command se sath araha hai
yargs(hideBin(process.argv))
  .command("init", "Inititalize a new repo", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to the repo",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )
  .command(
    "commit <message>",
    "Commit changes to the repo",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
  )
  .command("push", "Push changes to the remote repository", {}, pushRepo)
  .command("pull", "Pull changes from the remote repository", {}, pullRepo)
  .command(
    "revert <commitID>",
    "Revert to a specifi commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Revert to this commit ID",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitID);
    }
  )
  .demandCommand(1, "You need atleast one command")
  .help().argv;
