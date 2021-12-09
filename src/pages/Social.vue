<template>
  <layout>
    <div>
      <el-card shadow="never" style="min-height: 400px;margin-bottom: 20px;padding: 0px 0px 20px 0px">
        <el-tabs v-model="activeTab" type="card" @tab-click="onSelect">
          <el-tab-pane :label="'粉丝 '+$page.followers.edges.length" name="followers" style="padding: 5px">
            <div>
              <div v-if="$page.followers.edges.length">
                <el-row style="min-height: 200px; ">
                  <el-col :span="8" v-for="(edge,index) in followers" :key="edge.node.id" style="padding: 10px">
                    <el-card shadow="hover" style="font-size: 13px;color: #606266;line-height: 20px">
                      <i class="el-icon-star-off"></i>&emsp;
                      <g-link style=" text-decoration:none;cursor:pointer" :to="`/social/details/${edge.node.id}`">
                        {{edge.node.name}}
                      </g-link>
                      <br>
                      <i class="el-icon-message"></i>&emsp;
                      <a :href="edge.node.html_url" target="_blank" style=" text-decoration:none;cursor:pointer">TA的主页</a>
                      <br>
                      <img :src="edge.node.avatar_url" style="width: 100%;border-radius:5px;margin-top: 5px">
                    </el-card>
                  </el-col>
                </el-row>
                <div style="text-align: center;margin-top: 10px">
                  <el-pagination @current-change="onSelect" background layout="prev, pager, next" :current-page.sync="follower.page"
                                 :page-size="follower.pageSize" :total="$page.followers.edges.length">
                  </el-pagination>
                </div>
              </div>
              <div style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-else>
                <font style="font-size: 30px;color:#dddddd ">
                  <b>(￢_￢) 没有一个粉丝</b>
                </font>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="'关注 '+$page.followings.edges.length" name="following" style="padding: 5px">
            <div>
              <div v-if="$page.followings.edges.length">
                <el-row style="min-height: 200px; ">
                  <el-col :span="8" v-for="edge in followings" :key="edge.node.id" style="padding: 10px">
                    <el-card shadow="hover" style="font-size: 13px;color: #606266;line-height: 20px">
                      <i class="el-icon-star-off"></i>&emsp;
                      <g-link style=" text-decoration:none;cursor:pointer" :to="`/social/details/${edge.node.id}`">
                        {{edge.node.name}}
                      </g-link>
                      <br>
                      <i class="el-icon-message"></i>&emsp;
                      <a :href="edge.node.html_url" target="_blank" style=" text-decoration:none;cursor:pointer">TA的主页</a>
                      <br>
                      <img :src="edge.node.avatar_url" style="width: 100%;border-radius:5px;margin-top: 5px">
                    </el-card>
                  </el-col>
                </el-row>
                <div style="text-align: center;margin-top: 10px">
                  <el-pagination @current-change="onSelect" background layout="prev, pager, next" :current-page.sync="following.page"
                                 :page-size="following.pageSize" :total="$page.followings.edges.length">
                  </el-pagination>
                </div>
              </div>
              <div style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-else>
                <font style="font-size: 30px;color:#dddddd ">
                  <b>(￢_￢) 还没有关注一个人</b>
                </font>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </layout>
</template>

<static-query>
  query {
    metadata {
      configuration {
        githubUsername
      }
    }
  }
</static-query>

<page-query>
  query {
    followers: allFollowers {
      edges{
        node{
          id,name,avatar_url,html_url
        }
      }
    }
    followings: allFollowings {
      edges{
        node{
          id,
          name,
          avatar_url,
          html_url
        }
      }
    }
  }
</page-query>
<script>
	export default {
		name: "Social",
    data() {
			return {
				follower:{
					pageSize:1,
					page: 1,
        },
				loading: false,
				activeTab: "followers",
				followersTotal: '',
				followingTotal: "",
				following: {
					page: 1,
					pageSize: 1
				}
      }
    },
    computed:{
			followers() {
				return this.$page.followers.edges.slice(
					(this.follower.page-1)*this.follower.pageSize, this.follower.page*this.follower.pageSize
        );
      },
			followings() {
				return this.$page.followings.edges.slice(
					(this.following.page-1)*this.following.pageSize, this.following.page*this.following.pageSize
				);
      }
    },
    methods:{
			onSelect(page){

      }
    }
	}
</script>

<style scoped>

</style>
