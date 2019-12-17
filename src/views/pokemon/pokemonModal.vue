<template>
  <div class="container">
    <el-dialog :title="pokemonModal.title" :visible.sync="dialogVisible" :close-on-click-modal="false"
               :before-close="handleClose" @open="beforeOpen">
      <el-form :model="pokemonForm" ref="pokemonForm" :rules="pokemonRules" label-width="100px" class="demo-ruleForm"
               status-icon>
        <el-card class="box-card" shadow="hover">
          <el-form-item label="图鉴编码" prop="pokemonIndex">
            <el-input v-model.trim="pokemonForm.pokemonIndex"></el-input>
          </el-form-item>
          <el-form-item label="精灵名称" prop="pokemonName">
            <el-input v-model.trim="pokemonForm.pokemonName"></el-input>
          </el-form-item>
          <el-form-item label="英文名称" prop="pokemonNameEn">
            <el-input v-model.trim="pokemonForm.pokemonNameEn"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="desc">
            <el-input type="textarea" v-model="pokemonForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status" v-if="pokemonModal.current">
            <el-radio-group v-model="pokemonForm.status">
              <el-radio label="ON">启用</el-radio>
              <el-radio label="OFF">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-card>
        <el-card class="box-card" shadow="hover">
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="HP" prop="pokemonHP">
                <el-slider v-model="pokemonForm.pokemonHP" :max="255"></el-slider>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物攻" prop="pokemonAD">
                <el-slider v-model="pokemonForm.pokemonAD" :max="255"></el-slider>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="物防" prop="pokemonWF">
                <el-slider v-model="pokemonForm.pokemonWF" :max="255"></el-slider>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="特攻" prop="pokemonAP">
                <el-slider v-model="pokemonForm.pokemonAP" :max="255"></el-slider>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="特防" prop="pokemonTF">
                <el-slider v-model="pokemonForm.pokemonTF" :max="255"></el-slider>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="速度" prop="pokemonSP">
                <el-slider v-model="pokemonForm.pokemonSP" :max="255"></el-slider>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <label class="totalAttributes">合计六芒星: {{totalAttributes}}</label>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { checkPokemonIndexOrName } from '@/api/pokemon'

  export default {
    name: 'pokemonModal',
    props: {
      pokemonModal: Object
    },
    computed: {
      dialogVisible: function () {
        return this.pokemonModal.disable
      },
      totalAttributes: function () {
        return parseInt(this.pokemonForm.pokemonHP) + parseInt(this.pokemonForm.pokemonAD) + parseInt(this.pokemonForm
          .pokemonWF) + parseInt(this.pokemonForm.pokemonAP) + parseInt(this.pokemonForm.pokemonTF) + parseInt(this
          .pokemonForm.pokemonSP)
      }
    },
    data() {
      let checkPokemonIndex = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('图鉴编号不能为空'));
        }
        checkPokemonIndexOrName({ pokemonIndex: value, pokemonCode: this.pokemonForm.pokemonCode }).then((res) => {
          if (!res.data) {
            return callback(new Error(res.message))
          } else {
            return callback();
          }
        })
      };
      let checkPokemonName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('精灵名称不能为空'));
        }
        checkPokemonIndexOrName({ pokemonName: value, pokemonCode: this.pokemonForm.pokemonCode }).then((res) => {
          if (!res.data) {
            return callback(new Error(res.message))
          } else {
            return callback();
          }
        })
      };
      let checkPokemonNameEn = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('精灵英文名称不能为空'));
        }
        checkPokemonIndexOrName({ pokemonNameEn: value, pokemonCode: this.pokemonForm.pokemonCode }).then((res) => {
          if (!res.data) {
            return callback(new Error(res.message))
          } else {
            return callback();
          }
        })
      };
      return {
        pokemonForm: {
          pokemonHP: 0,
          pokemonAD: 0,
          pokemonWF: 0,
          pokemonAP: 0,
          pokemonTF: 0,
          pokemonSP: 0,
          pokemonIndex: '',
          pokemonName: '',
          pokemonNameEn: '',
          desc: '',
          status: ''
        },
        pokemonRules: {
          pokemonIndex: [
            { required: true, validator: checkPokemonIndex, trigger: 'blur' }
          ],
          pokemonName: [
            { required: true, validator: checkPokemonName, trigger: 'blur' }
          ],
          pokemonNameEn: [
            { required: true, validator: checkPokemonNameEn, trigger: 'blur' }
          ]
        }
      }
    },
    components: {},
    methods: {
      beforeOpen() {
        let self = this
        if (self.$refs['pokemonForm']) {
          self.$refs['pokemonForm'].resetFields();
        }
        Object.keys(self.pokemonForm).forEach(key => {
          self.pokemonForm[key] = (typeof self.pokemonForm[key] == 'number') ? 0 : ''
        })
        if (!self.pokemonForm.pokemonCode) {
          delete self.pokemonForm._id
        }
        self.pokemonForm = JSON.parse(JSON.stringify(self.pokemonModal.current)) || self.pokemonForm
      },
      handleClose() {
        let self = this
        self.$emit('close-modal', true)
      },
      save() {
        let self = this
        self.pokemonForm.pokemonSum = self.totalAttributes
        self.pokemonForm.status = self.pokemonForm.status || 'ON'
        self.$refs['pokemonForm'].validate((valid) => {
          if (valid) {
            self.$emit('save-modal', self.pokemonForm)
          } else {
            console.log('[ERROR] -- 校验不通过');
            return false;
          }
        });
      }
    }
  }

</script>

<style scoped lang="scss">
  .totalAttributes {
    margin-top: 1%;
    font-size: 14px;
    display: block;
    text-align: center
  }

</style>
