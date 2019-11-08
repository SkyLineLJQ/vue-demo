<template>
  <div class="container" v-loading="loadPerm">
    <h3>当前权限是：{{ roleCode}}</h3>
    <label>选择</label>
    <el-radio-group v-model="roleCode" style="margin-left: 10px" @change="changeRole">
      <el-radio :label="'admin'">admin</el-radio>
      <el-radio :label="'visitor'">visitor</el-radio>
    </el-radio-group>
    <h4>{{ JSON.stringify(roleArray) }}</h4>
    <div class="btnMain" :key="key">
      <el-button type="primary" v-perm="'commonButton1'">公共按钮1</el-button>
      <el-button type="warning" v-perm="'commonButton2'">公共按钮2</el-button>
      <el-button type="primary" v-perm="'admin1'">admin按钮1</el-button>
      <el-button type="success" v-perm="'admin2'">admin按钮2</el-button>
      <el-button type="primary" v-perm="'visitor1'">visitor按钮1</el-button>
      <el-button type="danger" v-perm="'visitor1'">visitor按钮2</el-button>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'permissionButton',
    data() {
      return {
        roleCode: 'admin',
        roleArray: [],
        adminArray: ['commonButton1', 'commonButton2', 'admin1', 'admin2'],
        visitorArray: ['commonButton1', 'commonButton2', 'visitor1', 'visitor2'],
        key: 1,
        loadPerm: false
      }
    },
    mounted() {
      this.$store.commit('setBtnRole', this.adminArray)
      this.roleArray = this.buttonPermissions
    },
    computed: {
      ...mapGetters([
        'buttonPermissions',
      ])
    },
    components: {

    },
    methods: {
      async changeRole(val) {
        let self = this
        self.loadPerm = true
        await self.commitStor().then(() => {
          setTimeout(() => {
            self.loadPerm = false

          }, 1000)
        })
      },
      async commitStor() {
        let self = this
        self.$store.commit('setBtnRole', self.roleCode == 'admin' ? self.adminArray : self.visitorArray)
        self.roleArray = self.buttonPermissions
        self.key++;
      }
    }
  }

</script>

<style scoped lang="scss">
  .container {
    margin: 0 5px;
  }

</style>
