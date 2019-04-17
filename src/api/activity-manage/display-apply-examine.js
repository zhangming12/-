import fetch from '@/util/fetch';

/**
 * @desc 陈列活动管理-陈列申请审核——列表查询
 * @param {ObjectList}
 * @return {Array}
 */

export function queryDisPlayApplyAudit(dataList){
    let data = {
        data:dataList
    }
    return fetch({
        url:'display/queryDisPlayApplyAudit.json',
        method:'post',
        data
    })
}

/**
 * @desc 陈列活动管理-陈列申请审核-审核（陈列门店申请审核）
 * @param {Number}  status 同意 1 不同意 2
 * @param {String}  displayAuditOpinion 不同意时审核意见 
 */
export function displayApplyAudit(objList){
    let data = {
        data:objList
    }
    return fetch({
        url:'display/displayApplyAudit.json',
        method:'post',
        data
    })
}
/**
 * @desc 陈列活动管理-陈列一级审核 table列表接口
 * @param {ObjList}  
 */
export function queryYxtgFirstAudit(objList){
    let data = {
        data:objList
    }
    return fetch({
        url:'displayYxtg/queryYxtgFirstAudit.json',
        method:'post',
        data
    })
}

/**
 * @desc 陈列活动管理-陈列二级审核 店铺商品列表接口
 * @param {ObjList}  
 */
export function queryYxtgSecondAudit(objList){
    let data = {
        data:objList
    }
    return fetch({
        url:'displayYxtg/queryYxtgSecondAudit.json',
        method:'post',
        data
    })
}

/**
 * @desc 陈列活动管理-陈列确认及奖励发放 （品牌）终审列表
 * @param {ArrayList} 
 */
export function queryYxtgFinalAudit(objList){
    let data = {
        data:objList
    }
    return fetch({
        url:'displayYxtg/queryYxtgFinalAudit.json',
        method:'post',
        data
    })
}

/**
 * @desc 陈列活动管理-陈列确认及奖励发放 （品牌）发奖列表
 * @param {ArrayList}  
 */
export function queryDisplayListAwardPrizes(objList){
    let data = {
        data:objList
    }
    return fetch({
        url:'display/queryDisplayListAwardPrizes.json',
        method:'post',
        data
    })
}

/**
 * @desc 陈列活动管理-陈列确认及奖励发放 终审 全部确认
 * @param {ArrayList}  
 */

export function displayYxtgAuditAllPass(objList){
    let data = {
        data:objList
    }
    return fetch({
        url:'displayYxtg/displayYxtgAuditAllPass.json',
        method:'post',
        data
    })
}

/**
 * @desc 陈列活动管理-陈列确认及奖励发放 终审 全部确认发奖
 * @param {ArrayList}  
 */
export function displayApplyBrandAuditAllPassGiveprize(objList){
    let data = {
        data:objList
    }
    return fetch({
        url:'display/displayApplyBrandAuditAllPassGiveprize.json',
        method:'post',
        data
    })
}

/**
 * @desc 陈列活动管理-陈列确认及奖励发放 终审 批量选择确认
 * @param {ArrayList}  
 */

export function displayYxtgAuditChoicePass(objList){
    let data = {
        data:objList
    }
    return fetch({
        url:'displayYxtg/displayYxtgAuditChoicePass.json',
        method:'post',
        data
    })
}

/**
 * @desc 陈列活动管理-陈列确认及奖励发放 终审 批量选择确认发奖
 * @param {ArrayList}  
 */
export function displayApplyBrandAuditChoosePassGiveprize(objList){
    let data = {
        data:objList
    }
    return fetch({
        url:'display/displayApplyBrandAuditChoosePassGiveprize.json',
        method:'post',
        data
    })
}

/**
 * @desc 陈列活动管理-陈列确认及奖励发放 陈列审核（品牌终审） 修改
 * @param {ArrayList}  
 */

export function displayFinalAudit(objList){
    let data = {
        data:objList
    }
    return fetch({
        url:'displayYxtg/displayFinalAudit.json',
        method:'post',
        data
    })
}