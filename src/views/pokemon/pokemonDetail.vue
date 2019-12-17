<template>
  <div class="container">
    <div class="mainBoard">
      <div class="left-board">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>基本介绍</span>
            <el-button style="float: right; padding: 3px 0" type="text">编辑详情</el-button>
          </div>
          <label>外貌</label>
          <p>{{ pokemonDetail.pokemonDetail.pokemonAppearance || ''}}</p>
          <el-divider/>
          <label>特殊能力</label>
          <p>{{ pokemonDetail.pokemonDetail.pokemonSpecialPower || ''}}</p>
          <el-divider/>
          <label>性情</label>
          <p>{{ pokemonDetail.pokemonDetail.pokemonTemperament || ''}}</p>
        </el-card>
        <el-card class="box-card" style="margin-top: 1%">
          <div slot="header" class="clearfix">
            <span>游戏中</span>
          </div>
          <label>能力值</label>
          <p>
            <span style="float: left;margin-right: 2%">血量:</span>
            <el-rate
              v-model="parseFloat(pokemonDetail.pokemonHP/255*5).toFixed(2)"
              disabled
              show-score
              text-color="#8ac654"
            >
            </el-rate>
          </p>
          <p>
            <span style="float: left;margin-right: 2%">攻击:</span>
            <el-rate
              v-model="parseFloat(pokemonDetail.pokemonAD/255*5).toFixed(2)"
              disabled
              show-score
              text-color="#f8cb3c"
            >
            </el-rate>
          </p>
          <p>
            <span style="float: left;margin-right: 2%">防御:</span>
            <el-rate
              v-model="parseFloat(pokemonDetail.pokemonWF/255*5).toFixed(2)"
              disabled
              show-score
              text-color="#d98837"
            >
            </el-rate>
          </p>
          <p>
            <span style="float: left;margin-right: 2%">特攻:</span>
            <el-rate
              v-model="parseFloat(pokemonDetail.pokemonAP/255*5).toFixed(2)"
              disabled
              show-score
              text-color="#59c3d0"
            >
            </el-rate>
          </p>
          <p>
            <span style="float: left;margin-right: 2%">特防:</span>
            <el-rate
              v-model="parseFloat(pokemonDetail.pokemonTF/255*5).toFixed(2)"
              disabled
              show-score
              text-color="#5890cd"
            >
            </el-rate>
          </p>
          <p>
            <span style="float: left;margin-right: 2%">速度:</span>
            <el-rate
              v-model="parseFloat(pokemonDetail.pokemonSP/255*5).toFixed(2)"
              disabled
              show-score
              text-color="#a456d0"
            >
            </el-rate>
          </p>
          <el-divider/>
        </el-card>
      </div>
      <div class="right-board">
        <el-row type="flex">
          <el-col :span="18">
            <div class="pokemon-title">
              <p style="font-weight: bold">{{ pokemonDetail.pokemonName}}</p>
              <p>{{ pokemonDetail.pokemonNameEn}}</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="pokemon-index">
              <p>#{{ pokemonDetail.pokemonIndex}}</p>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex">
          <div class="poke-img">
            <el-image :src="pokemonDetail.pokemonDetail.pokemonImage" style="width: 100%; height: 350px"/>
          </div>
        </el-row>
        <el-row type="flex">
          <div class="pokemon-property">
            <label>属性</label>
            <div>
              <span v-for="item in pokemonDetail.pokemonDetail.pokemonProperty"
                    :style="{ backgroundColor: item.propertyColor}">{{ item.propertyName}}</span>
            </div>
          </div>
        </el-row>
        <el-row type="flex">
          <div class="pokemon-feature">
            <label>特性</label>
            <div>
              <span v-for="item in pokemonDetail.pokemonDetail.pokemonFeature">{{ item.featureName}} &nbsp; <var
                style="font-size: 12px;" v-show="item.featureHide">隐藏属性</var></span>
            </div>
          </div>
        </el-row>
        <el-row type="flex">
          <div class="pokemon-area">
            <label>地区图鉴</label>
            <div>
              <span v-for="item in pokemonDetail.pokemonDetail.pokemonArea" :style="{ backgroundColor : item.areaColor}">{{ item.areaName}}</span>
            </div>
          </div>
        </el-row>
      </div>
    </div>
    <div class="skillTable">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>可学会技能</span>
        </div>
        <el-table :data="pokemonDetail.pokemonDetail.pokemonSkills" stripe highlight-current-row
                  style="width: 100%">
          <el-table-column label="序号" align="center" type="index" width="80"></el-table-column>
          <el-table-column prop="skillName" label="招式" align="center"></el-table-column>
          <el-table-column prop="skillPropertyName" label="属性" align="center"></el-table-column>
          <el-table-column prop="skillClassification" label="分类" align="center"></el-table-column>
          <el-table-column prop="skillPower" label="威力" align="center"></el-table-column>
          <el-table-column prop="skillHit" label="命中" align="center"></el-table-column>
          <el-table-column prop="skillPP" label="PP" align="center"></el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pokemonDetail',
    props: {
      pokemonDetail: Object
    },
    data() {
      return {
      }
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  @import "../../styles/pokemon/pokemon-style.scss";
</style>
