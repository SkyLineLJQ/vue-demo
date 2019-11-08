<template>
  <div class="container">
    <el-dialog title="表格设置" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-transfer style="margin-left: 14%" class="projDetail" v-model="dataRight" :data="dataLeft"
        :titles="['显示内容', '隐藏内容']" :button-texts="['显示','隐藏']" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="ok">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Transfer',
    props: {
      TransferModal: {
        visible: {
          type: Boolean
        },
        current: {
          type: Object
        },
      },
      rightArr: {}
    },
    data() {
      return {
        dataRight: [],
        initDataLeft: []
      }
    },
    computed: {
      dialogFormVisible: function () {
        return this.TransferModal.visible
      },
      dataLeft: function () {
        let DataArray = []
        for (let i = 0; i < this.TransferModal.current.length; i++) {
          if (this.TransferModal.current[i].prop) {
            DataArray.push({
              'key': this.TransferModal.current[i].prop,
              'label': this.TransferModal.current[i].label
            })
          }
        }
        this.initDataLeft = DataArray
        return DataArray
      }
    },
    components: {

    },
    methods: {
      cancel() {
        this.dataRight = this.rightArr
        this.$emit('Transfer-cancel')
      },
      handleClose() {
        this.dataRight = this.rightArr
        this.$emit('Transfer-cancel')
      },
      ok() {
        this.$emit('Transfer-ok', this.dataRight)
      }
    }
  }

</script>

<style scoped lang="scss">

</style>
