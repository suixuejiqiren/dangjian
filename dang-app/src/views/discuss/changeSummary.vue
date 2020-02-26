<template>
    <div class="list">
        <el-table :data="tableData" border style="margin-top: 20px;">
            <el-table-column prop="img" label="总结" width="200">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt="" class="img-item">
                </template>
            </el-table-column>
            <el-table-column prop="userId" label="用户">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="pass(scope.row._id)">通过</el-button>
                </template>
            </el-table-column>
        </el-table>
        <template>
</template>

        
    </div>
</template>
<script>
export default {
          name: 'list',
        data() {
            return {
                tableData: [],
                id:'5ad71529aac8301e14fa5bb7',
                st:1
            }
        },
        methods:{

            getData() {
                this.$axios.get('getSummary',{discussId:this.id}).then(res => {
                    console.log(res.data)
                    this.tableData = res.data;
                })
            },
            pass(val){
                console.log(this.st)
                this.tableData.status==1
                this.$axios.post('delSummary',{id: val,status:this.st}).then(res => {
                    console.log(res)
                })
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
