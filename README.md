# PantheonAPI-Types [![CI](https://github.com/Pantheon-Community/PantheonAPI-Types/actions/workflows/ci.yml/badge.svg)](https://github.com/Pantheon-Community/PantheonAPI-Types/actions/workflows/ci.yml)

Shared types for Pantheon API related services.

This repository is intended to be used as a submodule for the Pantheon API and its clients.

### Links

- [Github Repository](https://github.com/Pantheon-Community/PantheonAPI-Types)
- [Pantheon API](https://github.com/Pantheon-Community/PantheonAPI)
- [Example Client](https://github.com/Pantheon-Community/PantheonAPI-Client)

### Config

For improved developer experience with submodules, use the following commands:

```sh
git config --global submodule.recurse true
git config --global push.recurseSubmodules on-demand
```

### Installation

Add using git submodules:

```sh
git submodule add https://github.com/Pantheon-Community/PantheonAPI-Types.git shared
```

### Development

Local development requires [Bun](https://bun.com/).

```sh
git clone https://github.com/Pantheon-Community/PantheonAPI-Types.git
cd PantheonAPI-Types
bun install
bun check-all
```

[Visual Studio Code](https://code.visualstudio.com/) is also recommended.
