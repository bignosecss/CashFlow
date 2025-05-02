# Upgrade Yarn from 1.22.22 to 3.6.4

## Commit Message
```
chore: upgrade yarn from 1.22.22 to 3.6.4
```

## Description
This PR upgrades the package manager from Yarn Classic (1.22.22) to Yarn 3.6.4, which is the recommended version for React Native 0.74.0+.

### Changes Made
- Added `.yarnrc.yml` configuration file with:
  ```yaml
  yarnPath: .yarn/releases/yarn-3.6.4.cjs
  nodeLinker: node-modules
  ```
- Updated `package.json` to specify Yarn 3.6.4 as the package manager
- Maintained `node-modules` linker for compatibility with existing tooling

### Why This Change?
- React Native 0.74.0+ recommends using Yarn 3.x as the package manager
- Yarn 3 provides better performance and reliability
- Using `node-modules` linker ensures compatibility with existing React Native tooling

### Verification
- [x] Project builds successfully with new Yarn version
- [x] All dependencies install correctly
- [x] No breaking changes to existing workflows
