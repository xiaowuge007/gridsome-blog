// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const {
  getPeople
} = require('./api.js')
module.exports = function (api) {
  api.loadSource(async actions => {
      await Promise.all([
        getPeople
      ].map(fn => fn(actions)))
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    /*
    * 个人主页详情
    * */
  })
}
