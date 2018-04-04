const envInfo = require('./env')
const manifest = require(`../src/manifest.${envInfo.NODE_ENV}.json`)
const fileSystem = require('fs')
const path = require('path')

// generates the manifest file using the package.json informations
manifest.description = process.env.npm_package_description
manifest.version = process.env.npm_package_version

fileSystem.writeFileSync(
  path.join(__dirname, '../build/manifest.json'),
  JSON.stringify(manifest)
)
