<template>
    <div class="list">
        <el-table :data="tableData" border style="margin-top: 20px;">
            <el-table-column prop="img" label="头图" width="200">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt="" class="img-item">
                </template>
            </el-table-column>
            <el-table-column prop="title" label="新闻标题">
            </el-table-column>
            <el-table-column prop="type" label="类型">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="edit(scope.row._id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="del(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <template>
</template>

        
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

                  open5() {
        this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', '微信支付', {
          dangerouslyUseHTMLString: true
        });
      },




            getData() {
                this.$axios.get('getNews').then(res => {
                    this.tableData = res.data;
                })
            },
      del(val) {
        console.log(val)
        this.$confirm('确认删除新闻？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('delNews',{id: val}).then(res => {
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
      edit(id){
          this.$router.push({path:'/news/update',query:{id}})
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