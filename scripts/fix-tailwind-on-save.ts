import { relative, resolve, sep } from 'node:path'

const file = process.argv[2]
if (!file) {
  console.error('Expected a file path')
  process.exit(1)
}

const root = resolve(import.meta.dir, '..')
const relativeFile = relative(root, resolve(file))
if (
  !relativeFile ||
  relativeFile === '..' ||
  relativeFile.startsWith(`..${sep}`)
) {
  console.error('File is outside this project')
  process.exit(1)
}

const pattern = `./${relativeFile.split(sep).join('/')}`
const result = Bun.spawnSync(
  ['bunx', 'tailwind-lint', '--config', './src/styles.css', pattern, '--fix'],
  { cwd: root, stdout: 'inherit', stderr: 'inherit' },
)
process.exit(result.exitCode)
