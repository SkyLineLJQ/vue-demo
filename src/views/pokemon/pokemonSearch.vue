<template>
  <div class="container">
    <el-form ref="searchForm" :model="searchForm" label-width="35%">
      <el-row type="flex">
        <el-col :span="6">
          <el-form-item label="精灵编号">
            <el-input v-model.trim="searchForm.pokemonIndex"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="精灵名称">
            <el-input v-model.trim="searchForm.pokemonName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="英文名称">
            <el-input v-model.trim="searchForm.pokemonNameEn"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" clearable placeholder="请选择状态">
              <el-option label="全部" value=""></el-option>
              <el-option label="启用" value="ON"></el-option>
              <el-option label="停用" value="OFF"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span='2' style="text-align: right;flex: 1">
          <el-button type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'pokemonSearch',
    data() {
      return {
        searchForm: {}
      }
    },
    components: {

    },
    methods: {
      handleFilter() {
        let self = this
        self.$emit('handle-filter', self.searchForm)
      }
    }
  }

</script>

<style scoped lang="scss">

</style>
