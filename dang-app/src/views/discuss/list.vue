<template>

    <div class="list">
        <el-table :data="tableData" border style="margin-top: 20px;">
            <el-table-column prop="title" label="评议">
            </el-table-column>


                
            <el-table-column v-html="tableData.content" label="评议内容">

            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="del(scope.row._id)">开启</el-button>
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
                this.$axios.get('getDiscuss').then(res => {
                    this.tableData = res.data;
                })
            },

        },
        created() {
            this.getData();
        }
    }
</script>
<style scoped>


</style>