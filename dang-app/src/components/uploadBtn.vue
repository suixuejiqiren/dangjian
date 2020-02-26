<template>
    <div>
    <label id="container">
        <input type="file" id="btn" name="file">
        <span class="item">插入图片</span>
    </label>
    </div>
</template>
<script>
    import qiniu from '@/unit/qiniu'
    export default {
        name: "upload-btn",
        data() {
            return {
                url: ''
            }
        },
        methods: {
            getToken() {
                this.$axios.qiniuGet().then(res => {
                    console.log(res);
                    this.token = res.data;
                    qiniu({ token: res.data }, (data) => {
                        this.url = data.url;
                        this.$emit('success', this.url)
                    })
                })
            }
        },
        created() {
            this.$nextTick(() => {
                this.getToken()
            })
        }
    }
</script>
<style scoped>
    #container {
        text-align: center;
        display: inline-block;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        border-radius: 4px;
        white-space: nowrap;
        cursor: pointer;
        padding: 2px 20px;
        font-size: 14px;
    }

    #btn {
        display: none;
    }
</style>