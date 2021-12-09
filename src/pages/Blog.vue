<template>
  <layout>
    <div style="min-height: 600px">
      <el-card shadow="never" style="margin-bottom: 20px">
        <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px"></el-input>
        <el-button @click="search" icon="el-icon-search" style="margin-left: 10px" circle plain></el-button>
        <el-button @click="$share()" style="margin-left: 10px" icon="el-icon-share" type="warning" plain circle></el-button>
        <el-button type="primary" icon="el-icon-edit" round plain style="float: right;" @click="goAdd">写博文</el-button>
      </el-card>

      <div v-if="$page.gists.pageInfo.totalPages">
        <el-card shadow="hover" v-for="(edge,index) in $page.gists.edges" :key="edge.node.id" style="margin-bottom: 20px">
          <div slot="header">
            <el-row>
              <el-col :span="16">
                            <span>
                                <a style="text-decoration:none;cursor:pointer" @click="goDetails(edge.node.id)">
                                    <i class="el-icon-edit-outline"></i>&nbsp;&nbsp; {{edge.node.title}}
                                </a>
                            </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right;">
                  <el-button @click="$share('/user/blog/details/'+edge.node.id)" style="padding: 3px 0" type="text" icon="el-icon-share"></el-button>
                  <el-button @click="editBlog(index)" style="padding: 3px 0" type="text" icon="el-icon-edit" v-if="token"></el-button>
                  <el-button @click="deleteBlog(index)" style="padding: 3px 0" type="text" icon="el-icon-delete" v-if="token"></el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
            最近更新 {{edge.node.updated_at}}
          </div>
          <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px">
            {{edge.node.description}}
          </div>
        </el-card>
        <div style="text-align: center">
          <el-pagination @current-change="list" background layout="prev, pager, next" :current-page.sync="currentPage" :page-size="pageSize"
                         :total="$page.gists.pageInfo.totalPages * pageSize">
          </el-pagination>
        </div>

      </div>

      <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-if="!$page.gists.pageInfo.totalPages">
        <font style="font-size: 30px;color:#dddddd ">
          <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </layout>
</template>
<page-query>
  query($page: Int) {
    gists:allStrapiGists(perPage: 3, page: $page) @paginate{
      pageInfo {
        totalPages
        currentPage
      }
      edges{
        node{
          id,
          description,
          created_at,
          updated_at,
          title
        }
      }
    }
  }
</page-query>
<script>
	export default {
		data() {
			return {
        pageSize: 3,
				currentPage: 1,
				searchKey: "",
				token: ''
			}
		},
		mounted() {
      this.currentPage = this.$route.params.page? parseInt(this.$route.params.page) : 1
		},
		methods: {
			list(page) {
				let path = page > 1 ? '/blog/' + page: '/blog'
        this.$router.push(path);
			},
			search() {

			},
			editBlog() {
				if (!this.token) {
					this.$message({
						message: '请绑定有效的Token',
						type: 'warning'
					})

				}
			},
			deleteBlog(index) {

			},
			goAdd() {

			},
			goDetails(id) {
				this.$router.push("/user/blog/details/" + id)
			}
		}
	}
</script>
