import * as resolve from 'resolve'

export default function checkVersion(cwd: string) {
  const thisHuskyVersion: string = require('../../package.json').version

  let huskyVersion: string | undefined
  let err: NodeJS.ErrnoException | undefined
  try {
    const pathToHusky = resolve.sync('husky/package.json', { basedir: cwd })
    huskyVersion = require(pathToHusky).version
  } catch (error) {
    err = error
  }

  if (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      throw new Error('husky is not currently installed in this repository.')
    } else {
      throw err
    }
  }

  if (thisHuskyVersion !== huskyVersion) {
    throw new Error(
      `This version of husky is not compatible with your current version, use npx husky@${huskyVersion} husky-upgrade instead.`
    )
  }
}
