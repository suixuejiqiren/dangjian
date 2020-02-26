<template>
    <div class="add">
        <el-form :model="formData" label-width="80px">
            <el-form-item label="身份证号">
                <el-input v-model="formData.idNum"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formData.pwd"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="种类">
                <el-input v-model="formData.species"></el-input>
            </el-form-item>
            <el-form-item label="上传头像">
                <el-upload class="avatar-uploader" action="https://upload-z1.qiniup.com" :show-file-list="false" :on-success="upload" :data="{token: token}">
                    <img v-if="formData.img" :src="formData.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="submit">上传</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    // import qiniu from '@/unit/qiniu'
    import axios from 'axios'
    export default {
        data() {
            return {
                formData: {
                    idNum: '',
                    pwd: '',
                    name: '',
                    sex: '2',
                    type: '0',
                    img: '',
                    species:''
                },
                token: ''
            }
        },
        methods: {
            upload(res) {
                this.formData.img = res.url;
            },
            getToken() {

                this.$axios.qiniuGet().then(res => {
                    console.log(res.data)
                    this.token = res.data;
                })
            },            
            submit() {
                this.$axios.post('addUser', this.formData).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: '用户添加成功！',
                            type: 'success'
                        });
                    }
                    else {
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                    setTimeout(()=>{
                        this.$router.push('/users/list')
                    },1500)
                })
            },
        },
        created(){
            //  this.$nextTick(this.getToken)
             this.getToken();
        }
    }
</script>
<style scoped>

    .add{
        margin-top: 20px;
    }
</style>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>