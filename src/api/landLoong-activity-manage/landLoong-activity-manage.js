import fetch from '@/util/fetch';


/**
 * @desc 查询活动参与门店的信息列表 分页查询
 * @param 
 * @return  
 * 
 */
export function queryLoongStoreList(objList){
    let data={
        data:objList
    }
    return fetch({
        url: '/displayLoongLog/queryLoongStoreList.json',
        method: 'post',
        data
    })
}
/**
 * @desc 查询活动参与门店的信息列表 导入
 * @param 
 * @return  
 * 
 */
export function brandStoreSignInfoImport(objList){
    let data={
        data:objList
    }
    return fetch({
        url: '/brandStoreSign/brandStoreSignInfoImport.json',
        method: 'post',
        data
    })
}
/**
 * @desc 删除参与地龙活动的门店  软删除
 * @param {Number} id
 * @return 
 * 
 */
export function deleteLoongStoreInfo(objList){
    let data={
        data:objList
    }
    return fetch({
        url: '/displayLoongLog/deleteLoongStoreInfo.json',
        method: 'post',
        data
    })
}
/**
 * @desc 查询地龙活动参与情况明细列表 分页查询
 * @param 
 * @return  
 * 
 */
export function queryLoongActivityList(objList){
    let data={
        data:objList
    }
    return fetch({
        url: '/displayLoongLog/queryLoongActivityList.json',
        method: 'post',
        data
    })
}
/**
 * @desc 查询活动异常预警列表 分页查询
 * @param 
 * @return  
 * 
 */
export function queryLoongActivityRisk(objList){
    let data={
        data:objList
    }
    return fetch({
        url: '/displayLoongLog/queryLoongActivityRisk.json',
        method: 'post',
        data
    })
}

/**
 * @desc 地龙活动参与情况 店铺详情
 * @param 
 * @return  
 * 
 */
export function getLoongActivityInfo(objList){
    let data={
        data:objList
    }
    return fetch({
        url: '/displayLoongLog/getLoongActivityInfo.json',
        method: 'post',
        data
    })
}
/**
 * @desc 地龙活动参与情况 店铺详情
 * @param 
 * @return  
 * 
 */
export function queryLoongActivityMonitor(objList){
    let data={
        data:objList
    }
    return fetch({
        url: '/displayLoongLog/queryLoongActivityMonitor.json',
        method: 'post',
        data
    })
}

/**
 * @desc 地龙追踪  活动参与情况汇总
 * @param 
 * @return  
 * 
 */
export function loongTrackStatisticsForWeek(objList){
    let data={
        data:objList
    }
    return fetch({
        url: '/report/loongTrackStatisticsForWeek.json',
        method: 'post',
        data
    })
}

/**
 * @desc 地龙追踪  活动参与明细
 * @param 
 * @return  
 * 
 */
export function loongTrackStatisticsDetail(objList){
    let data={
        data:objList
    }
    return fetch({
        url: '/report/loongTrackStatisticsDetail.json',
        method: 'post',
        data
    })
}