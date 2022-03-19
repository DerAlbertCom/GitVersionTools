import { TaskMockRunner } from "azure-pipelines-task-lib/mock-run";
import * as path from "path";
import { setVariable } from "./helper";

const taskPath = path.join(__dirname, '..', 'index.js');
        
const tmr = new TaskMockRunner(taskPath);
tmr.setInput('masterBranch', 'master');
setVariable('Build.SourceBranchName', 'master')
setVariable('GitVersion.CommitsSinceVersionSource', '0');
tmr.run();