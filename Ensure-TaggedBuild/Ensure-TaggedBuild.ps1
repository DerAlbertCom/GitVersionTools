[CmdletBinding()]

param(
    [string]$masterBranch = "master"
)

$currentBranch = $Env:BUILD_SOURCEBRANCHNAME
$commits = $env:GitVersion_CommitsSinceVersionSource
$currentVersion = $env:GITVERSION_MajorMinorPatch

if (-not $currentBranch )  {
    Write-Error "Not in a git branch, you have to be in a git branch"
    Exit 1
}

if (-not $commits) {
    Write-Error "You have to run the GitVersion Task before running this task"
    Exit 1
}

Write-Host "Ensure:Tagged current branch is $currentBranch, they are $commits commits after version source, the release branch is set to $masterBranch"

if ($commits -eq "0" -And $currentBranch -ne $masterBranch ) {
    Write-Error "You can't build $currentBranch with commits count of $commits"
    Exit 1
}

if ($commits -ne "0" -And $currentBranch -eq $masterBranch ) {
    Write-Error "You can't build $currentBranch with a commits count of $commits, a release build must have a direct version tag"
    Write-Error "You must a least tag with a higher version that $currentVersion"
    Write-Error "git tag NEWVERSION"
    Write-Error "git push origin $currentBranch --tags"
    Exit 1
}

Write-Host "You can happily build"