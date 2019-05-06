import fetch from '@/util/fetch';

/**
 * @desc 陈列活动管理——陈列活动参与明细 列表查询
 */

export function displayApplyDetail(dataList) {
    let data = {
        data: dataList
    }
    return fetch({
        url: 'display/displayApplyDetail.json',
        method: 'post',
        data
    })
}

/**
 * @desc 陈列活动管理——陈列活动参与明细2 列表查询
 */

export function displayApplyDetailTwo(dataList) {
    let data = {
        data: dataList
    }
    return fetch({
        url: 'display/displayApplyDetailTwo.json',
        method: 'post',
        data
    })
}

/**
 * @desc 陈列活动管理——陈列业代关联汇总 列表查询
 * @param {ObjList}
 * @return {ArrayList} 
 */

export function workerStoreDisplayStatistics(dataList) {
    let data = {
        data: dataList
    }
    return fetch({
        url: 'report/workerStoreDisplayStatistics.json',
        method: 'post',
        data
    })
}

/**
 * @desc 陈列活动管理——陈列活动门店明细 列表查询
 * @param {ObjList}
 * @return {ArrayList} 
 */

export function displayApplyStoreDetail(dataList) {
    let data = {
        data: dataList
    }
    return fetch({
        url: 'display/displayApplyStoreDetail.json',
        method: 'post',
        data
    })
}

/**
 * @desc 陈列活动管理——陈列申请概况统计列表查询
 * @param {Object} 
 * @return {Promise}
 */

export function displayApplyProfileStatistics(dataList) {
    let data = {
        data: dataList,
    }
    return fetch({
        url: '/report/displayApplyProfileStatistics.json',
        method: 'post',
        data
    })
}
/**
 * @desc 陈列活动管理——陈列上传成长曲线
 * @param {Object} 
 * @return {Promise}
 */

export function storeDisplayUploadScanGrowthCurve(dataList) {
    let data = {
        data: dataList,
    }
    return fetch({
        url: '/report/storeDisplayUploadScanGrowthCurve.json',
        method: 'post',
        data
    })
}
/**
 * @desc 陈列活动管理——业代(关联门店)陈列上传完成率排行
 * @param {Object} 
 * @return {Promise}
 */

export function workerDisplayUploadCompletionRateRanking(dataList) {
    let data = {
        data: dataList,
    }
    return fetch({
        url: '/report/workerDisplayUploadCompletionRateRanking.json',
        method: 'post',
        data
    })
}
/**
 * @desc 陈列活动管理——业代(关联门店)陈列上传绩效排行
 * @param {Object} 
 * @return {Promise}
 */

export function workerDisplayUploadPerformanceRanking(dataList) {
    let data = {
        data: dataList,
    }
    return fetch({
        url: '/report/workerDisplayUploadPerformanceRanking.json',
        method: 'post',
        data
    })
}

/**
 * @desc 陈列活动管理——进货量-列表
 * @param {Object} 
 * @return {Promise}
 */

export function queryDisplayRetailPurchases(dataList) {
    let data = {
        data: dataList,
    }
    return fetch({
        url: '/display/queryDisplayRetailPurchases.json',
        method: 'post',
        data
    })
}
/**
 * @desc 陈列活动管理——进货量-导入
 * @param {Object} 
 * @return {Promise}
 */

export function displayRetailPurchases(dataList) {
    let data = {
        data: dataList,
    }
    return fetch({
        url: '/display/displayRetailPurchases.json',
        method: 'post',
        data
    })
}

/**
 * @desc 陈列活动管理——合并发奖——列表
 * @param {Object} 
 * @return {Promise}
 */

export function queryDisplayLiquidateRecord(dataList) {
    let data = {
        data: dataList,
    }
    return fetch({
        url: '/liquidate/queryDisplayLiquidate.json',
        method: 'post',
        data
    })
}

/**
 * @desc 陈列活动管理——合并发奖——全部发奖
 * @param {Object} 
 * @return {Promise}
 */

export function callDisplayAwardPrice(dataList) {
    let data = {
        data: dataList,
    }
    return fetch({
        url: '/display/callDisplayAwardPrice.json',
        method: 'post',
        data
    })
}


export function displayTrackStatisticsForPeriod(dataList) {
    let data = {
        data: dataList,
    }
    return fetch({
        url: '/report/displayTrackStatisticsForPeriod.json',
        method: 'post',
        data
    })
}

/**
 * @desc 陈列活动管理——分页查询CNY签到信息
 * @param {Object} 
 * @return {Promise}
 */

export function querySignRecord(dataList) {
    let data = {
        data: dataList,
    }
    return fetch({
        url: '/cnySignRecord/querySignRecord.json',
        method: 'post',
        data
    })
}

/**
 * @desc 陈列活动管理——分页查询CNY签到信息
 * @param {Object} 
 * @return {Promise}
 */

export function signDoDelete(dataList) {
    let data = {
        data: dataList,
    }
    return fetch({
        url: '/cnySignRecord/doDelete.json',
        method: 'post',
        data
    })
}

/**
 * @desc 陈列活动管理——CNY 导入
 * @param {Object} 
 * @return {Promise}
 */

export function cnySignRecordImport(dataList) {
    let data = {
        data: dataList,
    }
    return fetch({
        url: '/cnySignRecord/cnySignRecordImport.json',
        method: 'post',
        data
    })
}