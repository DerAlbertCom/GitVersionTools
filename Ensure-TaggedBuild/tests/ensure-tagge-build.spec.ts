import { MockTestRunner } from 'azure-pipelines-task-lib/mock-test';

import * as fs from 'fs';
import * as path from 'path';
import { clearVariables } from './helper';

describe("Ensure-TaggedBuild", () => {

    afterEach(() => {
        clearVariables();
    });

    async function run(testFile: string) {
        const testPath = path.join(__dirname, testFile);

        if (!fs.existsSync(testPath)) {

            throw new Error(`Missing ${testFile}`);

        }
        const testRunner = new MockTestRunner(testPath);

        await testRunner.run();
        return testRunner;
    }

    it('with not commit variable it should fail', async () => {
        const tr = await run('master-branch-no-commits.js');

        expect(tr.succeeded).toBeFalsy();
        expect(tr.errorIssues[0]).toContain('You have to run the GitVersion Task')

    })

    it('with no branch variable it should fail', async () => {


        const tr = await run('master-branch-no-branch-variable.js');

        expect(tr.succeeded).toBeFalsy();

        expect(tr.errorIssues[0]).toContain('Not in a git branch,')

    })

    it('with master branch and one commit should fail', async () => {

        const tr = await run('master-branch-one-commit.js');

        expect(tr.succeeded).toBeFalsy();
        expect(tr.errorIssues[0]).toContain(`You can't build master`);
    })

    it('with master branch and zero commits should continue', async () => {

        const tr = await run('master-branch-zero-commit.js');

        expect(tr.succeeded).toBeTruthy();
        expect(tr.stdout).toContain(`You can happily build`);
    })
})
