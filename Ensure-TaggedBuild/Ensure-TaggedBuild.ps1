[CmdletBinding()]

param(
    [string]$masterBranch = "master"
)

$currentBranch = $Env:BUILD_SOURCEBRANCHNAME
$patchLevel = $env:GitVersion_Patch
$currentVersion = $env:GITVERSION_MajorMinorPatch

if (-not $currentBranch )  {
    Write-Error "Not in a git branch, you have to be in a git branch"
    Exit 1
}

if (-not $patchLevel) {
    Write-Error "You have to start the GitVersion Task before running that script"
    Exit 1
}

Write-Host "Ensure:Tagged current branch os $currentBranch, the pathlevel is $patchLevel, the release branch is set to $masterBranch"

if ($patchLevel -eq "0" -And $currentBranch -ne $masterBranch ) {
    Write-Error "You can't build $currentBranch with a patchLevel of $patchLevel"
    Exit 1
}
if ($patchLevel -ne "0" -And $currentBranch -eq $masterBranch ) {
    Write-Error "You can't build $currentBranch with a patchLevel of $patchLevel, a release build must have a direct tag"
    Write-Error "You must a least tag with a higher version that $currentVersion"
    Write-Error "git tag NEWVERSION"
    Write-Error "git push origin $currentBranch --tags"
    Exit 1
}

Write-Host "You can happily build"