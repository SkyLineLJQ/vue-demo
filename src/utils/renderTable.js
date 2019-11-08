/**
 * 渲染大数据列表
 * @param sourceList
 * @param targetList
 * @param self
 */
export function loopTableList(sourceList, targetList, self) {
    self[targetList] = []
    // 插入N条数据
    const total = sourceList.length
    // 一次插入 20 条，如果觉得性能不好就减少
    const once = 50
    // 渲染数据总共需要几次
    const loopCount = total / once
    let countOfRender = 0
    loop(countOfRender, loopCount, once, sourceList, targetList, self)
  }
  
  function loop(countOfRender, loopCount, once, sourceList, targetList, self) {
    if (countOfRender < loopCount) {
      setTimeout(() => {
        addDataTable(countOfRender, loopCount, once, sourceList, targetList, self)
      }, 500)
    }
  }
  
  function addDataTable(countOfRender, loopCount, once, sourceList, targetList, self) {
    // 优化性能，插入不会造成回流
    for (let i = 0; i < once; i++) {
      if (!sourceList[once * countOfRender + i]) break;
      self[targetList].push(sourceList[once * countOfRender + i])
    }
    countOfRender += 1
    loop(countOfRender, loopCount, once, sourceList, targetList, self)
  }
  