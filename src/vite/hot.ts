import fs from 'fs'
import path from 'path'

const isProduction = process.env.NODE_ENV === 'production'
const hotFilePath = path.resolve('hot')

function removeHotFile() {
  try {
    fs.rmSync(hotFilePath, { force: true })
    console.log('Hot file removed.')
  } catch (error) {
    console.error('Error removing hot file:', error)
  }
}

export function hotFilePlugin() {
  if (!isProduction) {
    try {
      fs.writeFileSync(hotFilePath, 'hot')
      console.log('Hot file created.')
    } catch (error) {
      console.error('Error creating hot file:', error)
    }
  }

  process.on('exit', removeHotFile)
  process.on('SIGINT', () => process.exit())
  process.on('SIGTERM', () => process.exit())
  process.on('SIGHUP', () => process.exit())

  return {
    name: 'hot-file-plugin',
  }
}
