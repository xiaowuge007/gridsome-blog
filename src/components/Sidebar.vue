<template>
    <div>
        <el-card shadow="never">
            <el-menu :default-active="active" @select="onSelect">
                <el-menu-item v-for="item in constantRouterMap"
                    :key="item.path" :index="item.path">
                    <g-link class="el-menu-item_g_link"  :to="item.path">
                        <i :class="item.meta.icon"></i>
                        <span slot="title">{{item.meta.title}}</span>
                    </g-link>
                </el-menu-item>
            </el-menu>
        </el-card>

        <!--<el-card shadow="never" style="margin-top: 20px;text-align: center">
            <div v-if="!token" style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                <el-tag type="danger" size="small">&nbsp;</el-tag>&nbsp;&nbsp; Token未绑定&nbsp;&nbsp;
                <el-button type="text" @click="openTokenDialog">绑定</el-button>
            </div>
            <div v-if="token" style="font-size: 0.9rem;line-height: 1.5;color: #303133;">
                <el-tag type="success" size="small">&nbsp;</el-tag>&nbsp;&nbsp; Token已绑定&nbsp;&nbsp;
                <el-button type="text" @click="cancellation">注销</el-button>
            </div>
            <div style="margin-top: 10px;text-align: left">
                <el-alert title="Token获取" type="info" description="在 github-> settings-> developerSettings-> personalAccessTokens 勾选gist权限,获取Token. 详情参考README.md"
                    :closable="false">
                </el-alert>
            </div>
        </el-card>-->
        <!--<token-dialog ref="tokenDialog"></token-dialog>-->
    </div>
</template>

<script>
    // import { constantRouterMap } from '@/router'
    // import TokenDialog from '@/views/common/TokenDialog'
    export default {
        components: {
            // TokenDialog
        },
        data() {
            return {
                constantRouterMap: [
                    {
                        path: '/',
                        meta: {
                            type: "user",
                            icon: 'el-icon-star-off',
                            title: '最新动态'
                        }
                    },{
                        path: '/social',
                        meta: {
                            type: "user",
                            icon: 'el-icon-mobile-phone',
                            title: '社交圈'
                        }
                    },{
                        path: '/blog',
                        meta: {
                            type: "user",
                            icon: 'el-icon-edit-outline',
                            title: '博客列表'
                        }
                    },{
                        path: '/project',
                        meta: {
                            type: "user",
                            icon: 'el-icon-service',
                            title: '开源项目'
                        }
                    }
                ],
                active: this.$route.path,
                parentUrl: "",
                menuList: [

                ],
                token: ''
            }
        },
        computed: {
        },
        mounted() {
            if(this.$route.path !== '/'){
                this.active = '/' + this.$route.path.split('/')[1]
            }
        },
        methods: {
            onSelect(index) {
                this.$router.push(index)
            }
        }
    }
</script>
<style>
    .el-menu-item_g_link{
        color: #303133;
    }
    .el-menu-item.is-active .el-menu-item_g_link{
        color: #409EFF;
    }
</style>
