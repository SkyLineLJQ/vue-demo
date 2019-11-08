<template>
  <div class="container">
    <div class="arical">
      <h2 style="text-align: center">{{ $t('HelloMessage.text')}}</h2>
      <div class="ari-form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item :label="$t('HelloMessage.activeName')" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('HelloMessage.activeRage')" prop="region">
            <el-select v-model="ruleForm.region" :placeholder="$t('HelloMessage.ragePlaceholder')">
              <el-option :label="$t('HelloMessage.regin1')" value="shanghai"></el-option>
              <el-option :label="$t('HelloMessage.regin2')" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('HelloMessage.activeNow')" prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('HelloMessage.activeAttr')" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox :label="$t('HelloMessage.type1')" name="type"></el-checkbox>
              <el-checkbox :label="$t('HelloMessage.type2')" name="type"></el-checkbox>
              <el-checkbox :label="$t('HelloMessage.type3')" name="type"></el-checkbox>
              <el-checkbox :label="$t('HelloMessage.type4')" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item :label="$t('HelloMessage.activeResouse')" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio :label="$t('HelloMessage.resource1')"></el-radio>
              <el-radio :label="$t('HelloMessage.resource2')"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('HelloMessage.activeLive')" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('HelloMessage.submit')}}</el-button>
            <el-button @click="resetForm('ruleForm')">{{ $t('HelloMessage.resetForm')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <h3 style="text-align: center;color: #f56c6c">{{ $t('HelloMessage.changeLang')}}</h3>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [{
              required: true,
              message: this.$t("HelloMessage.ruleName"),
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: this.$t("HelloMessage.ruleNameLen"),
              trigger: 'blur'
            }
          ],
          region: [{
            required: true,
            message: this.$t("HelloMessage.ruleRegion"),
            trigger: 'change'
          }],
          type: [{
            type: 'array',
            required: true,
            message: this.$t("HelloMessage.ruleType"),
            trigger: 'change'
          }],
          resource: [{
            required: true,
            message: this.$t("HelloMessage.ruleResource"),
            trigger: 'change'
          }],
          desc: [{
            required: true,
            message: this.$t("HelloMessage.ruleDesc"),
            trigger: 'blur'
          }]
        }
      }
    },
    components: {

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message.success(this.$t("HelloMessage.submitSuccess"))
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>

<style scoped lang="scss">
  .main {
    margin: 5% 10%;

    .title {
      display: block;
      width: 100%;
    }
  }

  .arical {
    display: block
  }

  .ari-form {
    width: 60%;
    margin: 0px auto;
  }

</style>
