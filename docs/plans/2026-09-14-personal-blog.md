# Personal Blog Implementation Plan

> **For Claude:** Use `C:\Users\0\.claude\skills\collaboration\executing-plans\SKILL.md` to implement this plan task-by-task.

**Goal:** 建立一个基于 VitePress 的个人技术博客，支持学习笔记和项目展示，托管在 GitHub Pages

**Architecture:** 使用 VitePress 静态站点生成器，Markdown 内容，GitHub Actions 自动部署到 GitHub Pages。单仓双目录结构：docs/notes 存放笔记，docs/projects 存放项目展示。

**Tech Stack:** VitePress, Markdown, GitHub Pages, GitHub Actions, Node.js

---

## Task 1: 初始化项目结构

**Files:**
- Create: `package.json`
- Create: `docs/index.md`
- Create: `docs/notes/index.md`
- Create: `docs/projects/index.md`
- Create: `docs/about.md`
- Create: `.vitepress/config.js`

**Step 1: 创建 package.json**

```json
{
  "name": "personal-blog",
  "version": "1.0.0",
  "description": "Personal tech blog with notes and projects",
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "^1.3.0"
  }
}
```

**Step 2: 创建 VitePress 配置文件**

```javascript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My Blog',
  description: 'Personal tech blog',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/notes/' },
      { text: '项目', link: '/projects/' },
      { text: '关于', link: '/about/' }
    ],
    sidebar: {
      '/notes/': [
        {
          text: '笔记',
          items: [
            { text: '全部笔记', link: '/notes/' }
          ]
        }
      ],
      '/projects/': [
        {
          text: '项目',
          items: [
            { text: '全部项目', link: '/projects/' }
          ]
        }
      ]
    }
  }
})
```

**Step 3: 创建首页 docs/index.md**

```markdown
---
layout: home

hero:
  name: "My Blog"
  text: "技术笔记与项目分享"
  actions:
    - theme: brand
      text: 查看笔记
      link: /notes/
    - theme: alt
      text: 查看项目
      link: /projects/
---
```

**Step 4: 创建笔记列表页 docs/notes/index.md**

```markdown
# 学习笔记

记录技术学习过程中的笔记和总结。

## 分类

暂无笔记，敬请期待...
```

**Step 5: 创建项目列表页 docs/projects/index.md**

```markdown
# 项目展示

展示个人项目和作品。

## 项目列表

暂无项目，敬请期待...
```

**Step 6: 创建关于页 docs/about.md**

```markdown
# 关于我

一个热爱技术的技术人。

## 技能

- 前端：Vue, React, TypeScript
- 后端：Node.js, Python

## 联系方式

- GitHub: https://github.com/yourname
```

**Step 7: 提交**

```bash
git init
git add package.json package-lock.json docs/ .vitepress/
git commit -m "feat: initialize VitePress blog structure"
```

---

## Task 2: 配置 GitHub Actions 自动部署

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: 创建 GitHub Actions 工作流**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run docs:build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Step 2: 提交**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions deployment workflow"
```

---

## Task 3: 配置 GitHub Pages

**Step 1: 在 GitHub 仓库设置中启用 Pages**

1. 访问仓库 Settings → Pages
2. Source 选择 "GitHub Actions"

**Step 2: 提交所有更改**

```bash
git add .
git commit -m "feat: complete blog setup with auto-deploy"
git push origin main
```

---

## Task 4: 验证部署

**Step 1: 推送后等待 GitHub Actions 完成**

访问: `https://github.com/yourname/blog/actions`

**Step 2: 验证博客访问**

访问: `https://yourname.github.io/blog/` 或自定义域名

**Step 3: 确认所有页面可访问**

- [ ] 首页正常显示
- [ ] 笔记页面可访问
- [ ] 项目页面可访问
- [ ] 关于页面可访问

---

## Task 5: 添加第一篇示例笔记

**Files:**
- Create: `docs/notes/first-note.md`

**Step 1: 创建示例笔记**

```markdown
---
title: 第一篇笔记
date: 2026-09-14
tags: [入门]
---

# 第一篇笔记

这是我的第一篇技术笔记。

## 代码示例

```javascript
console.log('Hello, Blog!')
```

## 总结

博客搭建成功！
```

**Step 2: 更新笔记列表页 docs/notes/index.md**

```markdown
# 学习笔记

记录技术学习过程中的笔记和总结。

## 分类

- [第一篇笔记](/notes/first-note)
```

**Step 3: 提交**

```bash
git add docs/notes/first-note.md docs/notes/index.md
git commit -m "docs: add first sample note"
git push origin main
```

---

## Task 6: 添加第一个示例项目

**Files:**
- Create: `docs/projects/my-first-project.md`

**Step 1: 创建示例项目页**

```markdown
---
title: 我的第一个项目
description: 这是一个示例项目
tags: [JavaScript, Node.js]
github: https://github.com/yourname
demo: https://yourname.github.io
---

# 我的第一个项目

这是一个示例项目，用于演示项目展示页面。

## 项目简介

这个项目用于展示个人作品。

## 技术栈

- Node.js
- JavaScript

## 功能特性

- 功能一
- 功能二

## 截图

暂无截图

## 链接

- [GitHub](https://github.com/yourname)
- [在线演示](https://yourname.github.io)
```

**Step 2: 更新项目列表页 docs/projects/index.md**

```markdown
# 项目展示

展示个人项目和作品。

## 项目列表

- [我的第一个项目](/projects/my-first-project)
```

**Step 3: 提交**

```bash
git add docs/projects/my-first-project.md docs/projects/index.md
git commit -m "docs: add first sample project"
git push origin main
```

---

## 任务完成检查清单

- [ ] 本地开发服务器正常运行 (`npm run docs:dev`)
- [ ] GitHub Actions 部署成功
- [ ] GitHub Pages 可访问
- [ ] 首页、笔记页、项目页、关于页全部正常
- [ ] 示例笔记和项目已添加

---

**Plan complete and saved to `docs/plans/2026-09-14-personal-blog.md`**

**Two execution options:**

**1. Subagent-Driven (this session)** — I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** — Open new session with executing-plans, batch execution with checkpoints

**Which approach?**