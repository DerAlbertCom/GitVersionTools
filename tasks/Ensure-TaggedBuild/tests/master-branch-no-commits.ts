import { setVariable } from "./helper";
import { TaskMockRunner } from "azure-pipelines-task-lib/mock-run";


import * as path from "path";
const taskPath = path.join(__dirname, '..', 'index.js');

const tmr = new TaskMockRunner(taskPath);

tmr.setInput('masterBranch', 'master');

setVariable('Build.SourceBranchName', 'master')
tmr.run();