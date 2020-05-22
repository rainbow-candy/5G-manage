<template>
  <el-dialog
    title="导入文件"
    :visible.sync="dialogVisible"
    width="30%">
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button size="small">点击上传</el-button>
      </el-upload>
    <span slot="footer" class="dialog-footer">
        <el-button class="import" @click="dialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
</template>

<script>

export default {
  name: 'importFileModal',
  data () {
    return {
      dialogVisible: false,
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    }
  },
  methods: {
    open () {
      this.dialogVisible = true
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
}
</script>

<style lang="less" scoped>
.upload-demo {
  margin-left: 10px;
}
</style>
