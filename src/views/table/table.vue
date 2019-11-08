<template>
  <div class="container">
    <h1>好长的列表</h1>
    <el-button class="settingBtn" type="text" icon="el-icon-setting" @click="setTableTitle">表格设置</el-button>
    <el-table :data="tableData" border fit highlight-current-row key="eleTable" v-loading="tabletLoading">
      <el-table-column align="center" type="selection" width="60"></el-table-column>
      <el-table-column type="index" width="80" align="center" label="序号"></el-table-column>
      <template v-for="(col,key) in Cols">
        <el-table-column v-if="col.display  && col.slot" align="center" :prop="col.prop" :label="col.label" :type="col.type" :key="key"
          :width="col.width" sortable>
          <template slot-scope="scope">
            <i class="el-icon-star-on" v-for="item in scope.row.level" :key="item"></i>
          </template>
        </el-table-column>
        <el-table-column v-else-if="col.display" align="center" :prop="col.prop" :label="col.label" :type="col.type" :key="key"
          :width="col.width" show-overflow-tooltip sortable />
      </template>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="pageInfo.currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totoalPage">
    </el-pagination>

    <Transfer :transfer-modal="TransferModal" :rightArr="RightDataArr" @Transfer-cancel="TransferCancel"
      @Transfer-ok="TransferOk"></Transfer>
  </div>
</template>

<script>
  import {
    getList
  } from '@/api/table'
  import {
    loopTableList
  } from '../../utils/renderTable'

  export default {
    name: 'Table',
    data() {
      return {
        tableData: [],
        tabletLoading: true,
        pageInfo: {},
        listQuery: {
          currentPage: 1,
          pageSize: 20
        },
        initCols: [],
        Cols: [{
            prop: 'userCode',
            label: '编号',
            display: true,
          }, {
            prop: 'userName',
            label: '姓名',
            display: true,
          }, {
            prop: 'level',
            label: '等级',
            slot: true,
            display: true,
          }, {
            prop: 'age',
            label: '年龄',
            display: true,
          }, {
            prop: 'birthday',
            label: '出生日期',
            display: true,
          }, {
            prop: 'money',
            label: '存款',
            display: true,
          },
          {
            prop: 'mark',
            label: '描述',
            display: true,
          }
        ],
        TransferModal: {
          visible: false,
          current: {}
        },
        RightDataArr: [], //隐藏内容
      }
    },
    components: {
      Transfer: () => import('../../layout/components/Table/Transfer')
    },
    mounted() {
      this.getTableData()
      this.initCols = this.Cols // 备份表头
    },
    methods: {
      getTableData() {
        let self = this
        getList(self.listQuery).then(response => {
          //   this.tableData = response.data.data
          loopTableList(response.data.data, "tableData", self)
          self.pageInfo = response.data.pageInfo
          self.tabletLoading = false
        })
      },
      handleSizeChange(val) {
        let self = this
        console.log(`每页 ${val} 条`);
        self.listQuery.pageSize = val
        self.tabletLoading = true
        this.getTableData()
      },
      handleCurrentChange(val) {
        let self = this
        console.log(`当前页: ${val}`);
        self.listQuery.currentPage = val
        self.tabletLoading = true
        this.getTableData()
      },
      setTableTitle() {
        let self = this
        self.TransferModal.visible = true
        self.TransferModal.current = self.initCols
      },
      TransferCancel() {
        let self = this
        self.TransferModal.visible = false
      },
      TransferOk(val) {
        let self = this
        self.TransferModal.visible = false
        self.RightDataArr = val
        // set display = false
        self.Cols.map((value)=>{
           return  value.display = val.findIndex((item)=>{
                return item == value.prop
            }) == -1 ? true : false
        })
      }
    }
  }

</script>

<style scoped lang="scss">
  .container {
    margin: 0 5px;

    h1 {
      text-align: center
    }

    .settingBtn {
      float: right;
      margin-right: 5px
    }
  }

</style>
