<template>
        <div class="top-header">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in routeList"
            :to="item.path" :key="index">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
    </template>
    <script>
    export default {
        name:"top-header",
        data(){
            return{
                routeList:[]
            }
        },
        methods:{
            getList(){
                this.routeList = this.$route.matched.filter(item => item.name)
            }
        },
        watch: {
            $route(){ 
                this.getList();
            }
        },
        created(){
            this.getList();
        }
     }
    </script>
    <style scoped>
        .top-header{
            position:fixed;
            top: 0;
            left: 230px;
            right: 0;
            background: #fff;
            border-bottom: 1px solid #f1f1f1;
            padding: 20px 10px ;
             z-index:10;
        }
    </style>
    