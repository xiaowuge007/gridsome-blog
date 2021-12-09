<template>
  <Layout>
    <div style="min-height: 600px">
      <el-card shadow="never" style="min-height: 400px" v-if="user.id">
        <div slot="header">
          <span>{{user.title}}</span>
        </div>
        <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
          发布 {{$util.utcToLocal(user.created_at)}}
          <br> 更新 {{$util.utcToLocal(user.updated_at)}}
        </div>
        <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 5px 0px 5px 0px">
          <pre style="font-family: '微软雅黑'">{{user.description}}</pre>
        </div>
        <div v-html="$markdown(user.content)" class="markdown-body" style="padding-top: 20px"></div>
      </el-card>
      <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-if="!user.id">
        <font style="font-size: 30px;color:#dddddd ">
          <b>没有更新 ╮(๑•́ ₃•̀๑)╭</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>
<static-query>
  query{
    metadata{
      assetsBase
    }
  }
</static-query>
<page-query>
  query {
    gists: allStrapiGists(sortBy: "updated_at", limit: 1){
      edges{
        node{
          id,
          title,
          updated_at,
          created_at,
          description,
          content
        }
      }
    }
  }
</page-query>
<script>

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  computed:{
  	user() {
  		return this.$page.gists.edges[0].node
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
