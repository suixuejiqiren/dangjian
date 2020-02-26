<template>
    <div class="add">
        <el-form :model="formData" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="新闻分类">
                 <el-select v-model="formData.type" placeholder="请选择">
    <el-option
      v-for="item in arr"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
            </el-form-item>
            <el-form-item label="上传图片">
                <el-upload class="avatar-uploader" action="https://upload-z1.qiniup.com" :show-file-list="false"
                 :on-success="upload"
                 :data="{token: token}">
                    <img v-if="formData.img" :src="formData.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <uploadBtn @success="getUrl"></uploadBtn>
            </el-form-item>
            <el-form-item>
                <editor v-model="formData.content" @getText="getText"></editor>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="submit" v-if="$route.name=='新闻添加'">保存</el-button>
                <el-button type="danger" @click="saveEdit" v-if="$route.name=='新闻修改'">保存更改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import editor from '@/components/editor/wang'
    import qiniu from '@/unit/qiniu'
    import uploadBtn from '@/components/uploadBtn'
    export default {
        name: 'add',
        components:{
            editor,
            uploadBtn
            },
        data() {
            return {
                formData: {
                    title: '',
                    img: '',
                    content:'',
                    contentText:'',
                    type:'',
                    number:'',
                },
                arr:[  ],
                token:'',
                
            }
        },
        methods: {
            upload(res) {
                this.formData.img = res.url;
            },
            getText(val){
                this.formData.contentText =val;
            },
            getToken(){
    
                this.$axios.qiniuGet().then(res =>{
                    this.token=res.data;
                })
            },
            getUrl(url){
                this.formData.content+=`<img src="${url}"/>`
            },
            submit() {
                this.$axios.post('addNews', this.formData).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: '新闻添加成功！',
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
                        this.$router.push('/news')
                    },1500)
                })
            },
            getCateData() {
              this.$axios.get('getcategory').then(res => {
              this.arr = res.data;
      
            })
           },
            getData(){
                this.$axios.get('getNews',{id:this.$route.query.id}).then(res=>{
                    // console.log(res);
                    this.formData=res.data[0]
                })
            },
            saveEdit(){
                let params={
                    ...this.formData,
                    id:this.$route.query.id
                }
                this.$axios.post('updateNews',params).then(res=>{
                    if(res.code==200){
                        this.$message({
                            message: '新闻修改成功！',
                            type: 'success'
                        });
                        setTimeout(()=>{
                            this.$router.push('/news')
                        },1000)
                    }
                })
            }
        },
        created(){
            if(this.$route.name=="新闻修改"){
                this.getData()
            }
            this.getToken();
            this.getCateData();
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
