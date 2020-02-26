<template>
    <div class="sideBar">
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>新闻管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/news/add">新闻添加</el-menu-item>
                    <el-menu-item index="/news">新闻列表</el-menu-item>
                    <el-menu-item index="/category">新闻类型</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>轮播图管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/img">轮播图</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/users/add">用户添加</el-menu-item>
                    <el-menu-item index="/users/list">用户列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>评议模块</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/discuss/list">评议管理</el-menu-item>
                    <el-menu-item index="/discuss/changeSummary">审议总结</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>留言管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/interact/list">留言管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
    export default {
        name: "side-bar"
    }
</script>
<style scoped>
    .sideBar {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 230px;
        background: #545c64;
    }
</style>

<style>
    .sideBar .el-menu {
        border-right: none;
    }
</style>