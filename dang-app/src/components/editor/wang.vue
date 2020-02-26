<template>
    <div class="wang" id="editor">
    </div>
</template>
<script>
    import WangEditor from 'wangeditor'
    export default {
        name: "wang",
        data() {
            return {
                editor: null,
                currentValue: ''
            }
        },
        props: {
            value: {
                type: String
            }
        },
        created() {
            let that = this;
            this.$nextTick(() => {
                this.editor = new WangEditor("#editor");
                this.editor.customConfig.onchange = function (html) {
                    // console.log(html)
                    that.$emit('input', html)
                    that.$emit('getText', that.editor.txt.text())
                }
                this.editor.create();
                document.getElementById('editor').addEventListener('keyup',
                    function () {
                        // 如果未配置 editor.customConfig.onchange，则 editor.change 为 undefined
                        that.editor.change && that.editor.change()
                    })
            })
        },
        watch: {
            value(val) {
                this.currentValue = val;
                this.editor.txt.html(val)
            }
        }
    }
</script>
<style scoped>
</style>