These extension contains the following tasks around [GitVersion](https://marketplace.visualstudio.com/items?itemName=gittools.gittools).

    * Ensure-TaggedBuild

They can be used in build definitions.

You find the source on GitHub [https://github.com/DerAlbertCom/GitVersionTools](https://github.com/DerAlbertCom/GitVersionTools)

## Ensure-TaggedBuild

Ensures that the release branch (per default master) will have a build number
without additional commits. This implies that the head commit must be tagged with a version 
number.

It ensures also that other branches like develop must have a commit count > 0, so that
a develop build won't get the same version number.

This helps to avoid build wrong Version number for builds, nuget packages and releases if
someone forgot to correctly tag a commit.

You must run the the Execute Task from the GitVersion GitTools first, before running this tasks.


