<template>
  <div class="tatal">
              <div class="ta">
                <el-table
                  :data="tableData"
                  height="438"
                  width="400"
                  border
                  :row-style="{ height: '9px' }"
                  :cell-style="{
                    background: 'white',
                    fontFamily: 'Arial',
                    fontSize: '12px',
                    textAlign: 'center',
                    padding: '4.2px',
                  }"
                  :header-cell-style="{
                    background: 'white',
                    fontFamily: 'Helvetica',
                    fontSize: '14px',
                    textAlign: 'center',
                  }"
                  class="tab"
                >
                  <el-table-column label="R7值" prop="r7">
                    <template slot-scope="props">
                      <span>{{ props.row.r7 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="R28推算值" prop="r28">
                    <template slot-scope="props">
                      <span>{{ props.row.r28 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="导入时间" prop="createTime">
                    <template slot-scope="props">
                      <span>{{ props.row.createTime }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <div class="block">
                <span class="demonstration"></span>
                <el-pagination
                background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[12, 24, 48, 96]"
                  :page-size="pageSize"
                  layout="sizes, prev, pager, next, total,jumper "
                  :total="total"
                >
                </el-pagination>
              </div>
  </div>
</template>

<script>
import { pageConcreteStrength } from "../../request/api";
export default {
inject: ["reload"],
 data() {
    return {
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 12,
      total: 0,
    };
  },
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
}
</script>

<style scoped>
.tab{
    width: 580px;
    height: 510px;
    margin-left: 10px;
    border-radius: 10px;
     background-color: white;

}
.block{
    margin-top: 20px;
    margin-left: -16px;
}
.demonstration{
    background-color: white;
}

</style>