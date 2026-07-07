---
title: "Why my entire second brain lives in Git"
description: "Sync stopped being a feature and started being a commit log."
type: musing
date: 2026-06-18
topics: ["Second Brain", "Tooling"]
draft: true
thumbColor: lime
thumbPattern: branches
---

Every note I've written in the last month — meeting captures, project plans, half-formed ideas — is plain Markdown in a Git repository. Not because I'm precious about tooling, but because everything else kept failing in the same quiet way: the sync worked until it didn't, and I never found out until I needed the note.

Git flips that. Sync isn't a background service hoping for the best; it's a commit with my name on it and a message saying what changed. When two machines disagree, I get a diff instead of a silent overwrite.

The unexpected win is that an AI agent can work the same channel. It commits its changes like anyone else, the log shows exactly what it touched, and anything I don't like reverts in one command. Version control turns out to be the permission system, the audit trail, and the undo button all at once.

Boring is beautiful.
