<template>
    <div class="img">
        <div class="list">
            <el-table :data="tableData" border style="margin-top: 20px;">
                <el-table-column prop="img" label="头图" width="200">
                    <template slot-scope="scope">
                        <img :src="scope.row.img" alt="" class="img-item">
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="描述">
                </el-table-column>
                <el-table-column prop="url" label="链接">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="del(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="add">
            <el-form :model="formData" >
                <el-form-item label="上传图片">
                    <el-upload class="avatar-uploader" action="https://upload-z1.qiniup.com" :show-file-list="false" :on-success="upload" :data="{token: token}">
                        <img v-if="formData.img" :src="formData.img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label="链接">
                    <el-input v-model="formData.url"></el-input>
                </el-form-item>
                <el-form-item>
                        <el-button type="danger" @click="submit">上传</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import qiniu from '@/unit/qiniu'
    import axios from'axios'
    export default {
        name:"imgs",
        data() {
            return {
                tableData: [
             
                ],
                formData: {img: '',title:'',url:''},
                token:''
            }
        },
        methods:{
       getData() {
                this.$axios.get('getImgs').then(res => {
                    this.tableData = res.data;
                })
            }, 
      del(val) {
        console.log(val)
        this.$confirm('确认删除图片？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('delImgs',{id: val}).then(res => {
            if(res.code == 200){
              this.$message({
                type: 'info',
                message: '已成功删除'
              });
              setTimeout(() => {
                this.$router.go(0)
              },1000)
            }
          })
        }).catch((err) => {
            console.log(err)
        });
      },
            upload(res) {
                this.formData.img = res.url;
            },
            getToken(){
    
                this.$axios.qiniuGet().then(res =>{
                    this.token=res.data;
                })
            },
            submit() {
                this.$axios.post('addImgs', this.formData).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: '图片添加成功！',
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
                        this.$router.go(0)
                    },1500)
                })
            },
        },
        created() {
            this.getData();
            this.getToken();
        }
    }
</script>
<style scoped>
.img-item {
        width: 100px;
        max-height: 100px;

    }
</style>
<style>
    .img .el-form-item__label{
        margin-top: 100px;
    }
    .img .avatar-uploader{
        margin-top: 100px;
    }
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