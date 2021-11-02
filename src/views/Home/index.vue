<template>
  <div>
    <el-container>
      <el-header
        ><dv-border-box-13>
          <div class="title">
            <router-link class="tt" to="/home"
              >太原太工天昊土木工程检测有限公司项目</router-link
            >
          </div>
        </dv-border-box-13>
      </el-header>
      <el-main>
        <div>
          <div class="left">
            <dv-border-box-9> 
              
            </dv-border-box-9>
          </div>
          <div class="moddle">
            <Tab></Tab>
          </div>
          <div class="right">
            <dv-border-box-11 title="砼抗压强度推算散点图">
              <div class="echart">
                <Sdt></Sdt>
              </div>
            </dv-border-box-11>
          </div>

          <div class="bottom"></div>
        </div>
      </el-main>
    </el-container>
    <dv-border-box-12>
      <!-- <el-table-column width="200">
          <template slot="header">
            <el-button
              class="download"
              type="primary"
              size="mini"
              icon="el-icon-download"
              @click="exportDefaultTemplate()"
            >
              下载模板
            </el-button>
            <el-button
              :loading="downloadLoading"
              type="primary"
              size="mini"
              @click="importU()"
              >导入</el-button
            >
          </template>
        </el-table-column> -->
    </dv-border-box-12>
  </div>
</template>
<script>
import { pageConcreteStrength } from "../../request/api";
import Sdt from "../echarts/sdt.vue";
import Tab from "../Home/tab.vue";
export default {
  inject: ["reload"],
  name: "index",
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 12,
      total: 0,
    };
  },
  components: { Sdt, Tab },

  mounted() {
    this.pageConcreteStrength();
  },
  methods: {
    pageConcreteStrength() {
      pageConcreteStrength({
        current: this.currentPage,
        size: this.pageSize,
        r7: this.tableData.r7,
        r28: this.tableData.r28,
        createTime: this.tableData.createTime,
      })
        .then((res) => {
          this.tableData = res.data.records;
          this.total = Number(res.data.total);
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageConcreteStrength(val, 1);
      this.currentPage = 1;
    },
    //显示第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageConcreteStrength(this.pageSize, val);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>
<style scoped>
.tt {
  text-decoration: none;
  color: white;
}
.el-header {
  height: 80px;
}
.contains {
  background: #000a2d;
  height: 975px;
  width: 1928px;
  margin-left: -8px;
  margin-top: -7px;
}
.title {
  display: flex;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 2rem;
  align-items: center;
  height: 100%;
}
.left {
  height: 510px;
  width: 200px;
}
.moddle {
  width: 600px;
  height: 510px;
  margin-left: 210px;
  margin-top: -510px;
}
.right {
  width: 425px;
  height: 510px;
  margin-left: 810px;
  margin-top: -510px;
}
.echart {
  width: 400px;
  height: 500px;
  margin-left: 10px;
}
</style>