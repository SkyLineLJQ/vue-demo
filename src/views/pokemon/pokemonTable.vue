<template>
  <div class="container">
    <pokemonSearch @handle-filter="getTableData"/>
    <el-tabs v-model="tabsName" @tab-click="handleClick">
      <el-tab-pane label="精灵列表" name="table">
        <div class="modeButton">
          <el-button type="primary" @click="createPokemon">添加</el-button>
          <el-button type="danger" @click="removePokemon" :disabled="selections.length === 0">删除</el-button>
        </div>
        <el-table :data="pokemonTableData" stripe highlight-current-row v-loading="tableLoading"
                  @selection-change="rowsSelection" style="width: 100%">
          <el-table-column type="selection" align="center" width="80"></el-table-column>
          <el-table-column label="序号" align="center" type="index" width="80"></el-table-column>
          <el-table-column prop="pokemonIndex" label="图鉴编号" width="150" align="center"></el-table-column>
          <el-table-column prop="pokemonName" label="精灵名称" width="150" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="onView(scope.row)">{{scope.row.pokemonName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="pokemonNameEn" label="英文名称" align="center"></el-table-column>
          <el-table-column prop="" label="个体值" align="center">
            <el-table-column prop="pokemonHP" label="HP" align="center"></el-table-column>
            <el-table-column prop="pokemonAD" label="物攻" align="center"></el-table-column>
            <el-table-column prop="pokemonWF" label="物防" align="center"></el-table-column>
            <el-table-column prop="pokemonAP" label="特攻" align="center"></el-table-column>
            <el-table-column prop="pokemonTF" label="特防" align="center"></el-table-column>
            <el-table-column prop="pokemonSP" label="速度" align="center"></el-table-column>
            <el-table-column prop="pokemonSum" label="合计" align="center"></el-table-column>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 'ON'">启用</span>
              <span v-if="scope.row.status === 'OFF'">停用</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="updatePokemon(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" class="pageInation"
                       :current-page="listQuery.currentPage" :page-sizes="[10, 20, 50, 100]"
                       :page-size="listQuery.pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totalPage">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="精灵详情" name="detail">
        <pokemonDetailTable :pokemonDetail="pokemonDetail"/>
      </el-tab-pane>
    </el-tabs>

    <pokemonModal :pokemonModal="pokemonModal" @close-modal="handleClose" @save-modal="savePokemon"></pokemonModal>
  </div>
</template>

<script>
  import {
    findPokemonList,
    createOrUpdatePokemon,
    batchUpdatePokmonStatusByCodes,
    findPokemonDetailBypokemonCode
  } from '@/api/pokemon'

  export default {
    name: 'pokemonTable',
    data() {
      return {
        tabsName: 'table',
        pokemonTableData: [],
        tableLoading: false,
        selections: [],
        pokemonModal: {
          disable: false,
          title: '',
          current: {}
        },
        pageInfo: {
          currentPage: 1,
          totalPage: 10
        },
        listQuery: {
          currentPage: 1,
          pageSize: 10
        },
        pokemonDetail: {
          pokemonDetail: {
            pokemonAppearance: '',
            pokemonFeature: '',
            pokemonImage: '',
            pokemonProperty: '',
            pokemonSkills: '',
            pokemonSpecialPower: '',
            pokemonTemperament: '',
          },
          pokemonHP: 0,
          pokemonAD: 0,
          pokemonWF: 0,
          pokemonAP: 0,
          pokemonTF: 0,
          pokemonSP: 0,
        }
      };
    },
    components: {
      pokemonModal: (resolve) => {
        require(['./pokemonModal'], resolve)
      },
      pokemonSearch: (resolve) => {
        require(['./pokemonSearch'], resolve)
      },
      pokemonDetailTable: (resolve) => {
        require(['./pokemonDetail'], resolve)
      }
    },
    mounted() {
      this.getTableData()
    },
    methods: {
      getTableData(value = {}) {
        let self = this
        self.tableLoading = true
        let params = {
          ...value,
          ...self.listQuery
        }
        findPokemonList(params)
          .then(res => {
            self.pokemonTableData = res.data.data,
              self.pageInfo.totalPage = res.data.totalPage
            self.tableLoading = false
          })
          .catch(err => {
            self.$message.error(err.message)
            self.tableLoading = false
          })
      },
      handleSizeChange(value) {
        let self = this
        self.listQuery.pageSize = value
        self.getTableData()
      },
      handleCurrentChange(value) {
        let self = this
        self.listQuery.current = value
        self.getTableData()
      },
      handleClick() {
        let self = this
      },
      createPokemon() {
        let self = this
        self.pokemonModal.title = '添加宝可梦基础资料'
        self.pokemonModal.disable = true,
          self.pokemonModal.current = ''
      },
      updatePokemon(value) {
        let self = this
        self.pokemonModal.title = '编辑宝可梦基础资料'
        self.pokemonModal.disable = true
        self.pokemonModal.current = value
      },
      handleClose() {
        let self = this
        self.pokemonModal.disable = false
      },
      savePokemon(value) {
        let self = this
        createOrUpdatePokemon(value).then(res => {
          self.$message.success(res.message)
          self.pokemonModal.disable = false
          self.getTableData()
        }).catch(err => {
          self.$message.error(err.message)
        })
      },
      rowsSelection(value) {
        let self = this
        self.selections = value
      },
      removePokemon() {
        let self = this
        let pokemonCodes = []
        self.$confirm('删除后将永久找不到咯,是否确定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          self.selections.map(value => {
            pokemonCodes.push(value.pokemonCode)
          })
          let params = {
            pokemonCodes: pokemonCodes,
            status: 'OUT'
          }
          batchUpdatePokmonStatusByCodes(params)
            .then(res => {
              self.$message.success(res.message)
              self.getTableData()
            })
            .catch(err => {
              self.$message.error(err.message)
            })
        })
      },
      /**
       * 跳转到详情
       * @param value
       */
      onView(value) {
        let self = this
        self.tabsName = 'detail'
        let params = {
          pokemonCode: value.pokemonCode
        }
        findPokemonDetailBypokemonCode(params)
          .then(res => {
            self.pokemonDetail = res.data
          })
          .catch(err => {
            self.$message.error(err.message)
          })
      }
    }
  };

</script>

<style scoped lang="scss">
  .container {
    padding: 2%;
    height: auto
  }

  .modeButton {
    margin-bottom: 10px
  }

  .pageInation {
    margin: 1% 0;
  }

</style>
