// Post-build step for GitHub Pages project-site hosting.
// The app's markup uses root-absolute asset paths (/assets, /css, /_next…)
// copied verbatim from the original site; on Pages the site lives under
// /agaram-website/, so prefix those references throughout the dist output
// and add the SPA 404 fallback.
import { readdirSync, readFileSync, writeFileSync, copyFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const BASE = '/agaram-website'
const DIST = fileURLToPath(new URL('../dist', import.meta.url))

const exts = ['.html', '.js', '.css', '.webmanifest']

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
}

let changed = 0
for (const file of walk(DIST)) {
  if (!exts.some((e) => file.endsWith(e))) continue
  const src = readFileSync(file, 'utf8')
  const out = src.replace(
    /(["'(=])\/(assets\/|css\/|fonts\/|_next\/|site\.webmanifest)/g,
    (m, pre, path) => `${pre}${BASE}/${path}`,
  )
  if (out !== src) {
    writeFileSync(file, out)
    changed++
  }
}

copyFileSync(join(DIST, 'index.html'), join(DIST, '404.html'))
console.log(`fix-base: rewrote ${changed} files, wrote 404.html`)
