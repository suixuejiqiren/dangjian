<template>
    <div class="layout">
        <topHeader></topHeader>
        <sideBar></sideBar>
        <router-view></router-view>
    </div>
</template>
<script>
import sideBar from './components/side-bar'
import topHeader from './components/top-header'
export default {
    name:'index',
    components:{
        sideBar,
        topHeader
    }
}
</script>
<style scoped>
    .layout{
        padding-left: 240px;
        padding-top: 55px;
    }
</style>
