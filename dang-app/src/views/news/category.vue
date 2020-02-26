<template>
  <div class="category">
    <div class="add">
      <el-form :inline="true" :model="formdata" class="demo-form-inline">
        <el-form-item label="标签">
          <el-input v-model="formdata.label" placeholder="label"></el-input>
        </el-form-item>
        <el-form-item label="值">
          <el-input v-model="formdata.value" placeholder="value"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>

    </div>
    <div class="list">
        <el-table :data="tableData" border style="margin-top: 20px;">
            <el-table-column prop="label" label="标签">
            </el-table-column>
            <el-table-column prop="value" label="值">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="del(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'category',
    data(){
      return{
        formdata:{
          label:"",
          value:""          
        },
        tableData: []
      }
    },
    methods:{
      submit() {
                this.$axios.post('addcategory', this.formdata).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            message: '分类添加成功！',
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

    getData() {
              this.$axios.get('getcategory').then(res => {
              this.tableData = res.data;
            })
           }, 
    del(val) {
       
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('delcategory',{id: val}).then(res => {
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
    },
    created() {
            this.getData();
        }
  }
</script>
<style scoped>
.category{
  margin-top: 30px;
}
</style>