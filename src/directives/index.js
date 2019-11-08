import Vue from 'vue'
/** 检查权限的方法 */
import store from '@/store'

export default () => {
  // 滚动条监听
  Vue.directive('scroll', {
    bind(el, binding) {
      // 获取滚动页面DOM
      let SCROLL_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
      let scrollPosition = 0
      SCROLL_DOM.addEventListener('scroll', function () {
        // 当前的滚动位置 减去  上一次的滚动位置
        // 如果为true则代表向上滚动，false代表向下滚动
        let flagToDirection = this.scrollTop - scrollPosition > 0
        // 记录当前的滚动位置
        scrollPosition = this.scrollTop
        const LIMIT_BOTTOM = this.scrollHeight / 4
        let scrollBottom = this.scrollHeight - (this.scrollTop + this.clientHeight) < LIMIT_BOTTOM
        console.log(flagToDirection ? '滚动方向：下' : '滚动方向：上')
        // 将滚动行为告诉组件
        // 如果向下滚动 并且距离底部只有100px
        if (flagToDirection && scrollBottom) {
          // 将滚动行为告诉组件
          binding.value(flagToDirection)
        }
        // 如果是向上滚动  并且距离顶部只有100px
        if (!flagToDirection && this.scrollTop < LIMIT_BOTTOM) {
          binding.value(flagToDirection)
        }
      })
    }
  }),

  // 控制按钮指令 
  Vue.directive('perm', {
    bind(el, binding) {
      // 获取滚动页面DOM    
      setTimeout(()=>{
        if(!hasPerm(binding.value)){
          el.parentNode.removeChild(el);
        }
    },0)
    }
  })
}

function hasPerm(permStr) {
  // 如果传入的权限字符串值是空的，视为有权限
  if(!permStr || permStr === '') return true;
  //  console.log(store.getters.buttonPermissions)
  // 校验权限
  return store.getters.buttonPermissions.findIndex(val=>val == permStr) !== -1
}
