/*
 * @Date: 2021-06-25 15:14:32
 * @LastEditors: Zth
 * @LastEditTime: 2021-12-16 15:53:32
 * @FilePath: \default\src\request\api\publicAPI.js
 */
import Vue from 'vue'
const vm = new Vue()

const publicAPI = {
  async getUnitCombotree() {
    const data = {
      Success: true,
      Message: 'ok',
      Data: []
    }
    const result = await vm.$query(`
      SELECT Unit_id AS 'id', ParentID AS 'parentid', Unit_name_all AS 'text'
        FROM UnitTable 
       WHERE IsEnable = 1;
    `)
    if (result.success) {
      data.Data = listToTree(result.rows, 0)
      return { data }
    } else {
      data.Success = false
      data.Data = null
      data.Message = result.message
      return { data }
    }
  },

  async loadCatalog(url, params) {
    const unitId = params.unitId
    const data = {
      Success: true,
      Message: 'ok',
      Data: []
    }
    const rootResult = await vm.$query(`
        SELECT Cate_id AS 'id', Cate_parent_id AS 'parentid', Cate_name AS 'text'
          FROM Category 
         WHERE Cate_parent_id = '00000000-0000-0000-0000-000000000000'
      ORDER BY Cate_sequence ASC;
    `)
    if (rootResult.success) {
      const roots = rootResult.rows
      const cateResult = await vm.$query(`
          SELECT Cate_id AS 'id', Cate_parent_id AS 'parentid', Cate_name AS 'text'
            FROM Category 
           WHERE UnitID = '${unitId}'
        ORDER BY Cate_sequence ASC;
      `)
      if (cateResult.success) {
        const catalogs = cateResult.rows
        data.Data = listToTree([].concat(roots, catalogs), '00000000-0000-0000-0000-000000000000')
        return { data }
      } else {
        data.Success = false
        data.Data = null
        data.Message = result.message
        return { data }
      }
    } else {
      data.Success = false
      data.Data = null
      data.Message = result.message
      return { data }
    }
  }

}

function listToTree(list, rootValue, key = 'id', parentKey = 'parentid') {
  let copyList = vm.$clone(list)
  let map = {}, node, roots = [], i, len = copyList.length
  let hasRoot = false

  for (i = 0; i < len; i++) {
    map[copyList[i][key]] = i
    copyList[i].children = []
  }
  for (i = 0; i < len; i++) {
    node = copyList[i]
    if (node[parentKey] !== rootValue) {
      copyList[map[node[parentKey]]].children.push(node)
    } else {
      hasRoot = true
      roots.push(node)
    }
  }
  if (hasRoot) {
    return roots
  } else {
    return [copyList[0]]
  }
}

export default publicAPI
