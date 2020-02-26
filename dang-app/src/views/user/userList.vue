<template>

    <div class="list">
        <el-table :data="tableData" border style="margin-top: 20px;">
            <el-table-column prop="img" label="头像" width="200">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt="" class="img-item">
                </template>
            </el-table-column>
            <el-table-column prop="name" label="用户姓名">
            </el-table-column>
            <el-table-column prop="idNum" label="身份证号">
            </el-table-column>
            <el-table-column prop="pwd" label="密码">
            </el-table-column>
            <el-table-column prop="species" label="种类">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="del(scope.row._id)">删除</el-button>
                    <!-- <el-switch
                    prop="iscanLogin"
                    v-model="iscanLogin"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                    </el-switch> -->
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
                tableData: [],
            }
        },
        methods: {
            getData() {
                this.$axios.get('getUser').then(res => {
                    this.tableData = res.data;
                })
            },
      del(val) {
        this.$confirm('确认删除此用户？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('delUser',{id: val}).then(res => {
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
      changeAll() {
        this.$confirm('确认修改密码为123456？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('changeAll').then(res => {
            if(res.code == 200){
              this.$message({
                type: 'info',
                message: '修改成功'
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