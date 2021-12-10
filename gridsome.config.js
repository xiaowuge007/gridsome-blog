// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const merge = require('webpack-merge')

module.exports = {
  siteName: 'Gridsome',
  // pathPrefix: '/app',
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: 'http://106.75.169.210:1337',
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['Gists', 'Repos'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        loginData: {
          identifier: '',
          password: ''
        }
      }
    }
  ],
  templates: {
    People: [
      {
        path: '/social/details/:id',
        component: './src/templates/social/details.vue'
      }
    ]
  },
  // configureWebpack(config) {
  //   return merge(config,{
  //     devtool: "cheap-module-source-map"
  //   })
  // }
}
