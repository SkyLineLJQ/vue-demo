!<template>
  <div class="container">
    <div class="middleContainer">
      <label>选择的是:</label>&nbsp; {{ value}}
    </div>
    <div class="middleContainer">
      <el-select v-model="value" placeholder="请选择" clearable filterable class="mid-select" v-scroll="handleScroll">
        <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="getOneHuandredsData">获取1000条数据</el-button>
    </div>
    <div class="listTextarea">
      <h4 style="text-align: center">数据列表</h4>
      <el-table :data="options" style="width: 100%">
        <el-table-column type="index" width="80" align="center" label="序号"></el-table-column>
        <el-table-column prop="id" label="#id"></el-table-column>
        <el-table-column prop="label" label="label"></el-table-column>
        <el-table-column prop="value" label="value"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {
    getSelectList
  } from '@/api/table'

  export default {
    name: '',
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕',
          id: '001'
        }, {
          value: '选项2',
          label: '双皮奶',
          id: '002'
        }, {
          value: '选项3',
          label: '蚵仔煎',
          id: '003'
        }, {
          value: '选项4',
          label: '龙须面',
          id: '004'
        }, {
          value: '选项5',
          label: '北京烤鸭',
          id: '005'
        }],
        value: '',
        listQuery: {
          currentPage: 1,
          pageSize: 20
        },
        flag: true
      }
    },
    components: {

    },
    methods: {
      getOneHuandredsData() {
        let self = this
        getSelectList(self.listQuery).then(response => {
          self.options = response.data.data
        })
      },
      handleScroll(param) {
        let self = this
        if (self.flag) {
          self.flag = false
          self.listQuery.currentPage = param ? self.listQuery.currentPage + 1 : self.listQuery.currentPage - 1
          if (self.listQuery.currentPage > 0) {
            getSelectList(self.listQuery).then(response => {
              self.options = self.options.concat(response.data.data)
            })
          }
          setTimeout(() => {
            self.flag = true
          }, 500)
        }

      },
    }
  }

</script>

<style scoped lang="scss">
  .container {
    margin: 5% 5px
  }

  .middleContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px auto
  }

  .mid-select {
    margin-right: 20%
  }

  .listTextarea {
    text-align: center;

    label {
      display: block
    }
  }

</style>
