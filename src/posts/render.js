/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const fm = require('front-matter')
const chokidar = require('chokidar')
const dayjs = require('dayjs')
const marked = require('marked')
const { init } = require('svelte/internal')

const mode = process.env.NODE_ENV
const dev = mode === 'development'

let watcher = null

if (dev) watcher = chokidar.watch('src/posts')

const renderer = new marked.Renderer()

renderer.image = function (
  href,
  title,
  text
) {
  let renderSize = ''
  if (title) {
    let size= title.split('x')
    if (size[1]) {
      renderSize = `width=${size[0]} height=${size[1]}`
    } else {
      renderSize = `width=${size[0]}`
    }
  } else {
    renderSize = ''
  }
  return `<img align="center" style="width: 100%;margin-bottom: 20px;border-radius: 8px;background: #f8fdf3;" data-zoomable src="${href}" alt="${text}" ${renderSize}>`
}
renderer.link = function (
  href,
  title,
  text
) {
  let link = marked.Renderer.prototype.link.call(this, href, title, text)
  return link.replace('<a', '<a target=\'_blank\' ')
}
marked.setOptions({
  renderer,
  highlight: function (code) {
    const hljs = require('highlight.js')
    return hljs.highlightAuto(code).value
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
})

// 遍历目录后返回目录所有文件
const getAllFiles = function (dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []
  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file))
    }
  })
  return arrayOfFiles
}

const render = () => {
  console.log('!!Ready to generate _posts.js!!')
  try {
    const dirs = getAllFiles('src/posts')
    let posts = []
    for (let fileName of dirs) {
      if (/.md/.test(fileName)) {
        const fileData = fs.readFileSync(`./${fileName}`, 'utf-8')
        const fmData = fm(fileData)
        const { title, description, keywords, labels, date } = fmData.attributes
        const rmSuffix = fileName.replace(/src\/posts\//g, '')

        posts.push({
          title,
          description,
          keywords,
          labels,
          date: dayjs(date).format('YYYY-MM-DD'),
          path: rmSuffix,
          slug: rmSuffix.replace(/\//g, '_').replace('.md', ''),
          html: marked(fmData.body).replace(/^\t{3}/gm, '')
        })
      }
    }
    posts = posts.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1)
    const exportString = `export default ${JSON.stringify(posts)}`
    fs.writeFile('src/routes/blog/_posts.js', exportString, err => {
      if (err) return console.log('!!fail to generate _posts.js!!', err)
      console.log('!!_posts.js was generated!!')
    })
  } catch (error) {
    console.error('error', error)
  }
}

const generateInfo = (event, path) => {
  if (event === 'add') {
    const fileData = fs.readFileSync(`./${path}`, 'utf-8')
    if (fileData === '') {
      // 新建了一个markdown文件
      const outPutContent =
`---
title: 
description: 
keywords: 
labels: []
date: ${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}
---`
      fs.writeFile(path, outPutContent, err => {
        if (err) return console.log('填充文本失败', err)
      })
      console.log('you add new file', path)
    }
  }
}
const onGenerate = (event, path) => {
  console.log('event path', event, path)
  if (/md|MD/g.test(path)) {
    generateInfo(event, path)
  }
  render()
}

// 首次使用没有_posts.js文件需要生成等初始化操作
const initProject = () => {
  const postsPath = 'src/routes/blog/_posts.js'
  try {
    if (!fs.existsSync(postsPath)) {
      console.log('!!_posts.js not exists!!')
      fs.writeFile('src/routes/blog/_posts.js', `
        export default []
      `, err => {
        if (err) return console.log('!!fail to generate default _posts.js!!', err)
        console.log('!!_posts.js was generated!!')
      })
    }
  } catch (error) {
    console.log('!!check file error!!')
  }
}

initProject()
render()

if (dev) {
  let isReady = false
  watcher
    .on('ready', () =>{
      console.log('!!Initial scan complete. Ready for changes!!')
      isReady = true
    })
    .on('add', path => {
      if (isReady) onGenerate('add', path)
    })
    .on('change', path => {
      if (isReady) onGenerate('change', path)
    })
    .on('unlink', path => {
      if (isReady) onGenerate('unlink', path)
    })
}
