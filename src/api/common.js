import fetch from '@/util/fetch';



/**
 * @desc 获取省市区三级联动接口 doQueryAll
 * @@param {String}   等级 1-省 2-市 3-区 level
 * @@param {String}   父区域码 parentId:id
 */
export function doQueryProvinceCityAll(level, id) {
    let data = {
        data: {
            level: level,
            parentId: id
        }
    }
    return fetch({
        url: '/areaDict/doQueryAll.json',
        method: 'post',
        data
    })
}

/**
 * @desc 获取用户全部品牌
 * @param {Number} status
 * @return {ObjList} 品牌数组
 * 
 */
export function getBrandsListDoQuery() {
    let data = {
        data: {
            status: 1
        }
    }
    return fetch({
        url: '/brand/doQueryWithPage.json',
        method: 'post',
        data
    })
}
/**
 * @desc 根据品牌ID获取活动列表
 * @param {String} 品牌ID 
 * @return {ArrayList} 活动列表
 */
export function getActivityListDoQuery(id) {
    let data = {
        data: {
            brandId: id
        }
    }
    return fetch({
        url: '/activity/queryActivityList.json',
        method: 'post',
        data
    })
}

/**
 * @desc 根据品牌ID获取陈列活动列表
 * @param {String} 品牌ID 
 * @param {String} 活动类型 type=3 
 * @return {ArrayList} 活动列表
 */
export function getDisplayActivityListDoQuery(id) {
    let data = {
        data: {
            brandId: id,
            type: 3
        }
    }
    return fetch({
        url: '/activity/queryActivityList.json',
        method: 'post',
        data
    })
}
/**
 * @desc 根据品牌ID获取陈列活动包名列表
 * @param {String} 品牌ID 
 * @param {String}
 * @return {ArrayList}
 */
export function queryActivityGroupVOByBrandId(id) {
    let data = {
        data: id
    };
    return fetch({
        url: '/displayYxtg/queryActivityGroupVOByBrandId.json',
        method: 'post',
        data
    })
}
/**
 * @desc 根据角色吗ID角色详情
 * @param {String} 品牌ID 
 * @param {String}
 * @return {ArrayList}
 */
export function getRoleResource(id) {
    let data = {
        data: id
    };
    return fetch({
        url: '/resource/getRoleResource.json',
        method: 'post',
        data
    })
}
/**
 * @desc 根据roleId删除角色
 * @param {String} 品牌ID 
 * @param {String}
 * @return {ArrayList}
 */
export function removeRoleResource (id) {
    let data = {
        data: id
    };
    return fetch({
        url: '/resource/removeRoleResource.json',
        method: 'post',
        data
    })
}
/**
 * @desc 根据菜单Id删除菜单
 * @param {String} 品牌ID 
 * @param {String}
 * @return {ArrayList}
 */
export function doDelete (id) {
    let data = {
        data: id
    };
    return fetch({
        url: '/resource/doDelete.json',
        method: 'post',
        data
    })
}
/**
 * @desc 根据活动包名ID获取陈列活动列表
 * @param {String} 品牌ID 
 * @param {String}
 * @return {ArrayList}
 */
export function queryActivityVOByGroupId(id) {
    let data = {
        data: id
    };
    return fetch({
        url: '/displayYxtg/queryActivityVOByGroupId.json',
        method: 'post',
        data
    })
}
/**
 * @desc 根据活动ID获取陈列活动分组列表
 * @param {String} 品牌ID 
 * @param {String}
 * @return {ArrayList}
 */
export function queryActivityPresentVOByactivityId(id) {
    let data = {
        data: id
    };
    return fetch({
        url: '/displayYxtg/queryActivityPresentVOByactivityId.json',
        method: 'post',
        data
    })
}

/**
 * @desc 根据品牌ID及活动id获取活动月序列表
 * @param {String} 品牌ID 
 * @param {String} 活动ID
 * @return {ArrayList} 月序列表
 */
export function getActivityMonthDict(objList) {
    let data = {
        data: objList
    }
    return fetch({
        url: '/report/getActivityMonthDict.json',
        method: 'post',
        data
    })
}




/**
 * @desc 根据活动包名ID获取活动列表
 * @param {grourId:String} 活动包名ID
 * @param {type:Number}1扫码活动 3陈列活动 2 摇奖活动  4 阶梯活动
 * @return {ArrayList}
 */
export function typeQueryActivityVOByGroupId(opt) {
    let data = {
        data: opt
    };
    return fetch({
        url: '/activityUtil/queryActivityVOByGroupId.json',
        method: 'post',
        data
    })
}
/**
 * @desc 根据品牌ID获取活动包名列表
 * @param {brandId:String} 品牌ID 
 * @param {groupType:Number}1扫码活动 3陈列活动 2 摇奖活动  4 阶梯活动
 * @return {ArrayList}
 */
export function typeQueryActivityGroupVOByBrandId(opt) {
    let data = {
        data: opt
    };
    return fetch({
        url: '/activityUtil/queryActivityGroupVOByBrandId.json',
        method: 'post',
        data
    })
}

// 2018-07-27

/**
 * @desc 查询四级组织数据
 * @param {brandId:String} 品牌ID 
 * @param {presentId:Number}
 * @return {ArrayList}
 */
export function queryOrganizationDictList(opt) {
    let data = {
        data: opt
    };
    return fetch({
        url: '/uploadReport/queryOrganizationDictList.json',
        method: 'post',
        data
    })
}