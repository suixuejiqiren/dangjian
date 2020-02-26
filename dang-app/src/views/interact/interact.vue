<template>

    <div class="list">
        <el-table :data="tableData" border style="margin-top: 20px;">
            <el-table-column prop="img" label="用户头像" width="200">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt="" class="img-item">
                </template>
            </el-table-column>
            <el-table-column prop="name" label="用户姓名">
            </el-table-column>
            <el-table-column prop="message" label="留言">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="del(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>  
</template>
<script>
    import axios from'axios'
    export default {
        name: 'list',
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            getData() {
                this.$axios.get('getinteract').then(res => {
                    this.tableData = res.data;
                })
            },
      del(val) {
        this.$confirm('确认删除此留言？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('delinteract',{id: val}).then(res => {
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
      }
        },
        created() {
            this.getData();
        }
    }
</script>
<style scoped>
    .img-item {
        width: 100px;
        max-height: 100px;
    }

</style>