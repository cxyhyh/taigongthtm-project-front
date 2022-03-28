<template>
  <div class="contains">
    <el-container >
      <el-main>
          <div class="left">  <But></But></div>
           <div class="moddle"> <Tab></Tab></div>
            <div class="right">  <Sdt>
        </Sdt></div>
              
       
      
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { pageConcreteStrength } from "../../request/api";
import Sdt from "../echarts/sdt.vue";
import Tab from "../Home/tab.vue";
import But from "../Home/but.vue"
//import Sdt1 from "../echarts/sdt1.vue"
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
components: { Sdt, Tab ,But},
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

body::-webkit-scrollbar {display: none;}
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