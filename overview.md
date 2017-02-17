These extension contains the following tasks around [GitVersion](/items?itemName=gittools.gitversion)

for build

    * Ensure-TaggedBuild


You find the source on GitHub [https://github.com/DerAlbertCom/GitVersionTools](https://github.com/DerAlbertCom/GitVersionTools)

## Ensure-TaggedBuild

Ensure that the release branch (per default master) will have a build number
without patchlevel of zero. This implies that the head commit is tagged with a version 
number.

Also, it ensure that other branches like develop must have patchlevel > 0, so that
a develop build won't get the same version number.

This helps to avoid wrongly run builds which may create releases or nuget packages with wrong version
numbers. 



