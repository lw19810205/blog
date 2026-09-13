import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/blog/',
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