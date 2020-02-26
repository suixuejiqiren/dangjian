<template>
    <div class="main">
    <div class="login">
      
        <el-form :model="formData" label-width="80px">
            <el-form-item label="用户名:" prop="pass">
                <el-input  v-model="formData.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="密 码:" prop="pass">
                <el-input type="password"  v-model="formData.pwd" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>
<script>

    export default {
        data() {
            return {
                formData: {
                    name:"",
                    pwd:""
                }
            }
        },
        methods:{
        submit() {
            let params={
                    ...this.formData
                }
            this.$axios.post('login',params).then(res=>{
                    if(res.code == 200){
                        this.$message({
                            message: '登录成功！',
                            type: 'success'
                        });
                        setTimeout(()=>{
                            this.$router.push('/news')
                        },1000)
                    }
                    else{
                        this.$message({
                            message: '用户名或密码错误！',
                           
                        });
                        setTimeout(()=>{
                            this.$router.go(0)
                        },1000)
                    }
                })
        },
    }
    }


</script>
<style scoped>
    .login {
       position: absolute;
       top: 50%;
       left: 50%;
       clear: both;
    }
    .login .el-form{
        position: relative;
        right: 141px;
        bottom: 82px;
    }

    .main{
        height: 665px;
        background:url('../style/img/下载.png') ;
        background-repeat:no-repeat;
        background-size:100% 100%;
    }
</style>
<style>


</style>