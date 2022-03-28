<template>
  <div>
       <div class="filter-container2">
      <el-button
        slot="trigger"
        @click="dialogVisible = true"
        icon="el-icon-document"
        type="primary"
        class="buts"
        >导入
      </el-button>
      <el-dialog width="900px" :visible.sync="dialogVisible">
        <el-form ref="form" label-width="70px" v-model="formT">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-exceed="exceed"
            limit="1"
            :show-file-list="true"
            :on-remove="remove"
            accept=".xlsx"
            :http-request="uploadFile"
          >
            <el-button size="small" type="primary" plain>选择文件</el-button>
          </el-upload>
        </el-form>
        <div class="preview-excel">
          <el-table
            class="listTable_ele"
            :row-class-name="tableRowClassName"
            :data="list"
            stripe
            align="center"
            height="250"
            style="width: 100%"
          >
            <el-table-column
              :label="item.label"
              align="center"
              :prop="item.props"
              :key="'table' + index"
              :min-width="item.width && item.width + 'px'"
              width="min-content"
              v-for="(item, index) in tableThead"
            >
              <template slot-scope="{ row, $index }">
                <el-tooltip
                  v-if="
                    errorIndexArr.indexOf($index) != -1 &&
                    errorIndexMsgObj[$index] &&
                    errorIndexMsgObj[$index][item.props]
                  "
                  effect="dark"
                  :content="
                    errorIndexMsgObj[$index] &&
                    errorIndexMsgObj[$index][item.props]
                  "
                  placement="top"
                >
                  <div class="table-content table-content-error">
                    {{ (item.props && row[item.props]) || "该列不可为空！" }}
                  </div>
                </el-tooltip>
                <div v-else class="table-content">
                  {{ item.props && row[item.props] }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            class="download"
            type="primary"
            size="small"
            icon="el-icon-download"
            @click="exportDefaultTemplate()"
          >
            下载模板
          </el-button>
          <el-button
            type="primary"
            :loading="downloadLoading"
            size="small"
            @click="importU()"
            >导入</el-button
          >
        </span>
      </el-dialog>
      <el-button>
        生成曲线
      </el-button>
    </div>
  </div>
</template>

<script>
import XLSX from "../../../node_modules/xlsx"
import {exportDefaultTemplate,piliangjisuan} from "../../request/api"
export default {
data() {
    return {
      tableThead: [
        {
          props: "r7",
          label: "R7",
          width: "180",
        },
      
      ],
      formLabelWidth: "120px",
      name: "模板-砼抗压强度推算分析软件.xlsx",
      dialogVisible: false,
      downloadLoading: false,
      formT: {},
      errorIndexArr: [],
      errorIndexMsgObj: {},
}
},
methods:{
  async uploadFile(params) {
      console.log(params);
      const _file = params.file;
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          for (let sheet in workbook.Sheets) {
            //循环读取每个文件
            const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            //若当前sheet没有数据，则continue
            if (sheetArray.length == 0) {
              continue;
            }
            console.log("读取文件");
            console.log(sheetArray);
            for (let item in sheetArray) {
              let rowTable = {};
              //这里的rowTable的属性名注意要与上面表格的prop一致
              //sheetArray的属性名与上传的表格的列名一致
              rowTable.r7 = sheetArray[item].R7;
              this.list.push(rowTable);
            }
          }
        } catch (e) {
          this.$message.warning("文件类型不正确！");
        }
      };
      fileReader.readAsBinaryString(_file);
    },
    daoruErrorFun(msgArr) {
      let errorIndexArr = [];
      let errorIndexMsgObj = {};
      msgArr.forEach((v) => {
        let arr = v.split("#@") || [];
        let index = parseFloat(arr[0]);
        errorIndexArr.push(index);
        let value = arr[1] || "";
        let arr1 = value.split("@");
        errorIndexMsgObj[index] = {};
        arr1.forEach((v1) => {
          let arr2 = v1.split(":");
          errorIndexMsgObj[index][arr2[0]] = arr2[1];
        });
      });
      this.errorIndexArr = errorIndexArr;
      this.errorIndexMsgObj = errorIndexMsgObj;
    },
    tableRowClassName({ row, rowIndex }) {
      let $index = rowIndex;
      for (let props in row) {
        let res =
          this.errorIndexArr.indexOf($index) != -1 &&
          this.errorIndexMsgObj[$index] &&
          this.errorIndexMsgObj[$index][props];
        if (res) {
          return "table-row-error";
        }
      }
      return "";
    },
    importU() {
      if (this.list.length == 0) {
        this.$message.warning("请最少导入一条数据！");
      } else {
        this.piliangjisuan();
      }
    },
    piliangjisuan() {
      piliangjisuan({
        list: this.list,
      })
        .then((res) => {
          if (res.data.code == 400) {
            let msgArr = res.data.message || [];
            console.log(msgArr);
            this.daoruErrorFun(msgArr);
            this.$message.error("导入失败！！");
          } else {
            this.$message.success("导入成功！！");
            this.dialogVisible = false;
          }
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    exportDefaultTemplate() {
      exportDefaultTemplate({
        moduleNameCn: this.name,
      })
        .then((res) => {
          // this.$message("文件下载成功");
          console.log(res);
          const blob = new Blob([res]);
          const fileName = this.name;
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    beforeUpload(file) {
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      if (extension !== "xlsx") {
        this.$message({
          message: "上传文件只能是 xlsx格式!",
          type: "warning",
        });
        return false;
      }
    },
    uploadSuccess(res) {
      if (res.code == 200) {
        this.$message({
          message: "导入成功!",
          type: "info",
        });
      } else {
        this.$alert(res.message, "导入失败", {
          confirmButtonText: "确定",
        });
      }
      this.$refs.upload.clearFiles();
    },
    exceed: function () {
      this.$message.error("最多只能上传1个xls文件");
    },
    remove() {
      this.list = [];
    },
}
}
</script>

<style>
.filter-container2{
margin-left:60px;
}
</style>