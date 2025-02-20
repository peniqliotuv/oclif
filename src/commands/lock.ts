import {Command} from '@oclif/core'
import * as fs from 'node:fs/promises'

const fileExists = async (path: string): Promise<boolean> => {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}

export default class Lock extends Command {
  static {
    this.summary = 'Copy the yarn.lock to oclif.lock'
    this.description = `Using oclif.lock allows your plugins dependencies to be locked to the version specified in the lock file during plugin install.
Once the oclif.lock file is created you can include it your npm package by adding it to the files property of your package.json. We do not recommend committing the oclif.lock file to git.`
  }

  public async run(): Promise<void> {
    if (await fileExists('yarn.lock')) {
      this.log('Copying yarn.lock to oclif.lock')
      await fs.copyFile('yarn.lock', 'oclif.lock')
    } else {
      throw this.error('yarn.lock does not exist')
    }
  }
}
