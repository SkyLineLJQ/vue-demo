<template>
  <div class="container">
    <div class="" style="padding: 0px 20px 0px 0px">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="35%">
        <div class="detailTop">
          <div class="text">角色信息</div>
        </div>

        <el-row type="flex" class="formData" style="margin-left: -4%;margin-top: 2%;">
          <el-col :span='8'>
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="ruleForm.roleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="角色类型" prop="productCode">
              <el-select v-model="ruleForm.productCode" placeholder="请选择类型" clearable style="width:100%">
                <el-option v-for="i in 5" :key="i" :label="parseInt( Math.random()*100)" :value="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="ruleForm.status">
                <el-radio label="ON">启用</el-radio>
                <el-radio label="OFF">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="formData" style="margin-left: -4%">
          <el-col :span='8'>
            <el-form-item label="英文名称" prop="roleNameEn">
              <el-input v-model="ruleForm.roleNameEn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="ruleForm.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="formData downForm" style="margin-left: -4%">
          <el-col :span='8'>
            <el-form-item label="" prop="ModeResouses" label-width="20%">
              <span class="detailTitle">功能权限</span>
              <div class="roleResouses">
                <el-radio-group v-model="radio" @change="chooseResouses">
                  <div v-for="item in OneMenu" :key="item.code">
                    <el-radio @click="chooseResouses" :label="item" style="margin: 10px" :class="{blueMark: item.mark}">
                      {{ item.name}}
                    </el-radio><br />
                  </div>
                </el-radio-group>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span='8'>
            <el-form-item label="" prop="ProcessResouses" label-width="20%">
              <span class="detailTitle">流程权限</span>
              <el-input placeholder="输入关键字进行过滤" v-model="filterText">
              </el-input>

              <el-tree class="filter-tree" :data="BPM_data" :props="defaultProps" default-expand-all
                :filter-node-method="filterNode" ref="tree" accordion show-checkbox check-on-click-node>
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <svg class="icon" aria-hidden="true" style="width:16px;height: 16px">
                    <use :xlink:href="data.icon"></use>
                  </svg>
                  <span>{{ node.label }}</span>
                </span>
              </el-tree>
            </el-form-item>
          </el-col>

          <el-col :span='8'>
            <el-form-item label="" prop="PostResouses" label-width="20%">
              <span class="detailTitle">数据权限</span>
              <div>
                <el-select v-model="PostList" placeholder="请选择" multiple filterable collapse-tags
                  @visible-change="visibleChange">
                  <el-option v-for="item in postOptions" :key="item.code" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </div>
              <!-- {{ postResult}} -->
              <div>
                <div v-for="item in postResult" :key="item.code">
                  <span>{{ item.name}}</span>
                  <i class="el-icon-delete" @click="deletePost(item)"></i>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <el-drawer :visible.sync="drawer" size="60%" direction="ltr" :wrapperClosable=false :show-close=true
        @closed="closeDrawer">
        <div style="position: relative">

          <el-card class="box-card" shadow="hover" style="position: absolute;top: -75px;left: 0" v-if="modeDisplay[0]">
            <div slot="header" class="clearfix">
              <span>{{ modeTitle[0]}}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="closeCard(0)">关闭</el-button>
            </div>
            <el-radio-group v-model="LabRadio" @change="chooseCenter" class="MenuRadio">
              <div v-for="item in TwoMenu" :key="item.code">
                <el-radio :label="item" style="margin: 10px" :class="{blueMark: item.mark}">{{ item.name}}
                </el-radio>
                <br />
              </div>
            </el-radio-group>
          </el-card>

          <el-card class="box-card" shadow="hover" style="position: absolute;top: -75px;left: 21%"
            v-show="modeDisplay[1]">
            <div slot="header" class="clearfix">
              <span>{{ modeTitle[1]}}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="closeCard(1)">关闭</el-button>
            </div>
            <el-radio-group v-model="Tworadio" @change="chooseTwoRadio" class="MenuRadio">
              <div v-for="item in ThreeMenu" :key="item.code">
                <el-radio :label="item" style="margin: 10px" :class="{blueMark: item.mark}">{{ item.name}}
                </el-radio>
                <br />
              </div>
            </el-radio-group>
          </el-card>

          <el-card class="box-card" shadow="hover" style="position: absolute;top: -75px;left: 42%"
            v-show="modeDisplay[2]">
            <div slot="header" class="clearfix">
              <span>{{ modeTitle[2]}}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="closeCard(2)">关闭</el-button>
            </div>
            <el-radio-group v-model="Threeradio" @change="chooseThreeRadio" class="MenuRadio">
              <div v-for="item in FourMenu" :key="item.code">
                <el-radio :label="item" style="margin: 10px" :class="{blueMark: item.mark}">{{ item.name}}
                </el-radio>
                <br />
              </div>
            </el-radio-group>
          </el-card>

          <el-card class="box-card" shadow="hover" style="width: 25%;position: absolute;top: -75px;left: 63%"
            v-show="modeDisplay[3]">
            <div slot="header" class="clearfix">
              <span>{{ modeTitle[3]}}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="closeCard(3)">关闭</el-button>
            </div>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkList" class="MenuRadio" @change="handleCheckedButtons"
              style="max-height: 525px">
              <div v-for="item in ButtonsMenu" :key="item.code" style="margin-bottom: 5px">
                <el-checkbox :label="item.code">{{ item.name}}</el-checkbox><br />
              </div>
            </el-checkbox-group>
          </el-card>

          <div>
            <el-button type="primary" @click="confirmRole" style="position: absolute;top: 200px;left: 90%">确认
            </el-button>
            <el-button type="info" @click="closeDrawer" style="position: absolute;top: 260px;left: 89%">取消</el-button>
          </div>
        </div>
      </el-drawer>

      <div class="footButton">
        <el-button>取消</el-button>
        <el-button type="primary" :loading="SaveLoading">保存</el-button>
        <el-button type="primary" :loading="SaveLoading">保存并继续创建</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getTwoMenu,
    getThreeMenu,
    getFourMenu,
    getButtonsMenu
  } from "@/api/roleManage";
  import '../../assets/commonicon/iconfont.js'

  export default {
    name: "roleMenu",
    data() {
      return {
        rules: {
          roleName: [{
              required: true,
              message: "请输入角色名称",
              trigger: "blur"
            },
            {
              max: 20,
              message: "长度不超过 20 个字符",
              trigger: "blur"
            }
          ],
          productCode: [{
            required: true,
            message: "请选择角色类型",
            trigger: "change"
          }],
          status: [{
            required: true,
            message: "请选择状态",
            trigger: "blur"
          }]
        },
        OneMenu: [{
            code: "xx",
            name: "xx平台"
          },
          {
            code: "yy",
            name: "yy平台",
            mark: true
          },
          {
            code: "zz",
            name: "zz平台"
          }
        ],
        TwoMenu: [],
        ThreeMenu: [],
        FourMenu: [],
        ButtonsMenu: [],
        postOptions: [{
            code: 1,
            name: "第一条"
          },
          {
            code: 2,
            name: "第2条"
          },
          {
            code: 3,
            name: "第3条"
          },
          {
            code: 4,
            name: "第4条"
          },
          {
            code: 5,
            name: "第5条"
          }
        ],
        ruleForm: {
          status: "ON",
          ModeResouses: [],
          ProcessResouses: [],
          PostResouses: [],
          roleName: "",
          productCode: "",
          productName: "",
          roleNameEn: "",
          remark: ""
        },
        isIndeterminate: true,
        checkAll: false,
        PostList: [],
        SaveLoading: false,
        checkList: [],
        radio: "",
        LabRadio: "",
        Tworadio: "",
        Threeradio: "",
        drawer: false,
        innerDrawer: false,
        twoDrawer: false,
        modeTitle: ["", "", "", ""],
        modeDisplay: [false, false, false, false],
        postResult: [],
        filterText: '',
        BPM_data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1',
              icon: '#icongangwei'
            }, {
              id: 10,
              label: '三级 1-1-2',
              icon: '#icongangwei'
            }],
            icon: '#iconbumen'
          }],
          icon: '#icongongsi'
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1',
            icon: '#iconbumen'
          }, {
            id: 6,
            label: '二级 2-2',
            icon: '#iconbumen'
          }],
          icon: '#icongongsi'
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1',
            icon: '#iconbumen'
          }, {
            id: 8,
            label: '二级 3-2',
            icon: '#iconbumen'
          }],
          icon: '#icongongsi'
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    computed: {},
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    components: {},
    created() {},
    methods: {
      closeDrawer() {
        let self = this;
        self.modeTitle = ["", "", "", ""];
        self.modeDisplay = [false, false, false, false];
        self.checkList = []
        self.drawer = false
      },
      chooseResouses(val) {
        let self = this;
        self.drawer = true;
        self.modeTitle[0] = val.name;
        self.modeDisplay[0] = true;
        getTwoMenu({
          ...val
        }).then(response => {
          self.TwoMenu = response.data.data;
        });
      },
      chooseCenter(val) {
        let self = this;
        self.modeDisplay[1] = true;
        self.innerDrawer = true;
        self.modeTitle[1] = val.name;
        getThreeMenu({
          ...val
        }).then(response => {
          self.ThreeMenu = response.data.data;
        });
      },
      chooseTwoRadio(val) {
        let self = this;
        self.twoDrawer = true;
        self.modeTitle[2] = val.name;
        self.modeDisplay[2] = true;
        getFourMenu({
          ...val
        }).then(response => {
          self.FourMenu = response.data.data;
        });
      },
      chooseThreeRadio(val) {
        let self = this;
        self.modeTitle[3] = val.name;
        self.modeDisplay[3] = true;
        if (self.checkList.length != 0) {
          self.$message.info('已保存按钮权限配置')
          self.checkList = []
        }
        getButtonsMenu({
          ...val
        }).then(response => {
          self.ButtonsMenu = response.data.data;
        });
      },
      deletePost(val) {
        let self = this;
        self.$message.info("删除成功");
        let del_index = self.postResult.findIndex(value => {
          return value.code == val.code;
        });
        self.postResult.splice(del_index, 1);
      },
      visibleChange(val) {
        let self = this;
        if (!val) {
          let res = [];
          for (let index = 0; index < self.PostList.length; index++) {
            res.push(
              self.postOptions.find((value, arr) => {
                return value.code == self.PostList[index];
              })
            );
          }
          self.postResult = res;
          self.PostList = [];
        }
      },
      handleCheckAllChange(val) {
        let self = this;
        // this.checkList = val ? self.ButtonsMenu : [];
        if (val) {
          for (let i = 0; i < self.ButtonsMenu.length; i++) {
            self.checkList.push(self.ButtonsMenu[i].code);
          }
        } else {
          self.checkList = [];
        }
        this.isIndeterminate = false;
      },
      handleCheckedButtons(value) {
        let self = this;
        let checkedCount = value.length;
        this.checkAll = checkedCount === self.ButtonsMenu.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < self.ButtonsMenu.length;
      },
      closeCard(value) {
        let self = this;
        for (let i = value; i < 4; i++) {
          self.modeDisplay[i] = false;
        }
        if (value == 0) {
          self.drawer = false;
        }
        self.checkList = []
        this.$forceUpdate(); // 强行更新dom 节点
      },
      confirmRole() {
        let self = this
        console.log('配置的权限id有:' + JSON.stringify(self.checkList))
        setTimeout(()=>{
          self.drawer = false
        },1000)
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    }
  };

</script>

<style scoped lang="scss">
  @import '../../assets/commonicon/iconfont.css';

  .roleHead {
    width: 100%;
    height: 300px;
    border: 1px solid red;
    display: block;
  }

  .roleBody {
    width: 100%;
    height: 500px;
    border: 1px solid blue;
  }

  .footButton {
    width: 100%;
    text-align: center;
    margin-top: 2%;
    padding-bottom: 2%;
  }

  .detailTop {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 700;
    border-bottom: 1px solid #eee;

    div {
      text-align: center;
      display: inline-block;
    }

    div.text {
      margin-left: 25px;
      font-size: 14px;
      color: #333;
      line-height: 20px;
    }
  }

  .detailTitle {
    font-size: 14px;
    color: #13284c;
    line-height: 20px;
    font-weight: 700;
  }

  .blueMark {
    color: #409eff;
  }

  .flexFourTab {
    display: flex;
    justify-content: center;
  }

  .MenuRadio {
    margin-left: 2%;
    max-height: 560px;
    overflow: auto;
  }

  .downForm {
    min-height: 400px;
  }

</style>
