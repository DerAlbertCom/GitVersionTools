# GitVersion Tools

## Ensure-Tagged-Build

Ensures that the release branch (per default master) will have a build number without additional commits. This implies that the head commit must be tagged with a version number.

It ensures also that other branches like develop must have a commit count > 0, so that a develop build won't get the same version number.

This helps to avoid build wrong Version number for builds, nuget packages and releases if someone forgot to correctly tag a commit.

## Azure DevOps Install

  * Install from the [Marketplace](https://marketplace.visualstudio.com/items?itemName=albertweinert.gitversion-tools)
  * You need also: https://marketplace.visualstudio.com/items?itemName=gittools.gitversion

# Local Development

Install dependencies

```powershell
Save-Module -Name VstsTaskSdk -Path .
```

## Test and Publish

### Test

```powershell
# Import module
Import-Module  .\VstsTaskSdk\ -ArgumentList @{ NonInteractive = $true }

# Set environment variables
$env:BUILD_SOURCEBRANCHNAME = "master"
$env:GITVERSION_MAJORMINORPATCH = "0.0.1" 
$env:GITVERSION_COMMITSINCEVERSIONSOURCE = "0"

# Run task script
Invoke-VstsTaskScript -ScriptBlock { . .\ensure-tagged-build\EnsureTaggedBuild.ps1 }
```

### Publish

To publish the extension run the following command. The default publisher is BioNTech.Software, you have to replace it with your marketplace id.

```powershell
tfx extension create --manifest-globs vss-extension.json --rev-version --publisher <MARKETPLACEUSERID>
```

