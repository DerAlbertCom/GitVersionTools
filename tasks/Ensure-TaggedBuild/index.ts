import * as tl from 'azure-pipelines-task-lib/task';

const INPUT_MasterBranch = 'masterBranch';
const VAR_SourceBranchName = 'Build.SourceBranchName';
const VAR_CommitsSinceVersion = 'GitVersion.CommitsSinceVersionSource';
const VAR_CurrentVersion = 'GitVersion.SemVer';

async function run() {
    try {
        const currentBranch = tl.getVariable(VAR_SourceBranchName);
        const commits = tl.getVariable(VAR_CommitsSinceVersion);
        const currentVersion = tl.getVariable(VAR_CurrentVersion);

        const masterBranch: string | undefined = tl.getInput(INPUT_MasterBranch, false);

        console.log('currentBranch', currentBranch);
        console.log('commits', commits);
        console.log('masterBranch', masterBranch);

        if (typeof currentBranch === 'undefined') {
            tl.setResult(tl.TaskResult.Failed, 'Not in a git branch, you have to be in a git branch');
            return;
        }

        if (typeof commits === 'undefined') {
            tl.setResult(tl.TaskResult.Failed, 'You have to run the GitVersion Task before running this task. The task is gitversion/execute@0 from the GitTools Extensions https://marketplace.visualstudio.com/items?itemName=gittools.gittools');
            return;
        }

        console.log(`Ensuring that tagged current branch is ${currentBranch}, they are ${commits} commits after version source, the release branch is set to ${masterBranch}`);

        if (commits === '0' && currentBranch !== masterBranch) {
            tl.setResult(tl.TaskResult.Failed, `You can't build ${currentBranch} with commits count of ${commits}`);
            return;
        }

        if (commits !== '0' && currentBranch === masterBranch) {
            tl.setResult(tl.TaskResult.Failed, `You can't build ${currentBranch} with commits count of ${commits}`);
            console.error(`You must a least tag with a higher version than ${currentVersion}`)
            console.warn('git tag NEWVERSION');
            console.warn(`git push origin ${currentBranch} --tags`)
            return;
        }

        console.log('You can happily build');

    }
    catch (err : any) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();