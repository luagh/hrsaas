<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
      :class="{ disabled: fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress
      v-if="showPercent"
      style="width: 180px"
      :percentage="percent"
    />
    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imgUrl" style="width: 100%" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from "cos-js-sdk-v5";
const cos = new COS({
  SecretId: "AKID4CMLlv060c7h4DBuPhojZggT1MXWJrEM",
  SecretKey: "ykJfme4E8oHZorvlRxkKh17ziDWhfR0M",
});
export default {
  data() {
    return {
      fileList: [], // 图片地址设置为数组
      showDialog: false, // 控制显示弹层
      imgUrl: "",
      currentFileUid: "", // 用一个变量 记住当前上传的图片id
      percent: 0,
      showPercent: false, // 默认不显示进度条
    };
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1;
    },
  },
  methods: {
    preview(file) {
      // 这里应该弹出一个层 层里是点击的图片地址
      this.imgUrl = file.url;
      this.showDialog = true;
    },
    handleRemove(file, fileList) {
      // file是点击删除的文件
      //   将原来的文件给排除掉了 剩下的就是最新的数组了
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
    },
    changeFile(file, fileList) {
      this.fileList = fileList.map((item) => item);
    },
    beforeUpload(file) {
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ["image/jpeg", "image/gif", "image/bmp", "image/png"];
      if (!types.includes(file.type)) {
        this.$message.error("上传图片只能是 JPG、GIF、BMP、PNG 格式!");
        return false;
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024;
      if (maxSize < file.size) {
        this.$message.error("图片大小最大不能超过5M");
        return false;
      }
      this.currentFileUid = file.uid; // 记住当前的uid
      this.showPercent = true;
      return true;
    },
    upload(params) {
      if (params.file) {
        // 执行上传操作
        cos.putObject(
          {
            Bucket: "luagth-23-1314763847", // 存储桶
            Region: "ap-beijing", // 地域
            Key: params.file.name, // 文件名
            Body: params.file, // 要上传的文件对象
            StorageClass: "STANDARD", // 上传的模式类型 直接默认 标准模式即可
            Body: params.file, // 将本地的文件赋值给腾讯云配置
            // 进度条
            onProgress: (params) => {
              this.percent = params.percent * 100;
            },
          },
          (err, data) => {
            if (!err && data.statusCode === 200) {
              this.fileList = this.fileList.map((item) => {
                if (item.uid === this.currentFileUid) {
                  return { url: "http://" + data.Location, upload: true };
                }
                return item;
              });
              setTimeout(() => {
                this.showPercent = false; // 隐藏进度条
                this.percent = 0; // 进度归0
              }, 2000);
            }
          }
        );
      }
    },
  },
};
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>