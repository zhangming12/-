import fetch from '@/util/fetch';



/**
 * @desc 初审列表查询 分页查询
 */
export function queryBrandStoreSignProtFirstList(dataList){
    let data = {
        data:dataList
    }
    return fetch({
        url: '/brandStoreSign/queryBrandStoreSignProtFirstList.json',
        method: 'post',
        data
    })
}

/**
 * @desc 复审列表查询 分页查询
 */
export function queryBrandStoreSignSecondAuditList(dataList){
    let data = {
        data:dataList
    }
    return fetch({
        url: '/brandStoreSign/queryBrandStoreSignSecondAuditList.json',
        method: 'post',
        data
    })
}

/**
 * @desc 获取签约详情
 */
export function getBrandStoreSignDetialInfo(dataList){
    let data = {
        data:dataList
    }
    return fetch({
        url: '/brandStoreSign/getBrandStoreSignDetialInfo.json',
        method: 'post',
        data
    })
}

/**
 * @desc 签约一审
 */
export function brandStoreSignFirstAudit(dataList){
    let data = {
        data:dataList
    }
    return fetch({
        url: '/brandStoreSign/brandStoreSignFirstAudit.json',
        method: 'post',
        data
    })
}

/**
 * @desc 签约复审
 */
export function brandStoreSignSecondAudit(dataList){
    let data = {
        data:dataList
    }
    return fetch({
        url: '/brandStoreSign/brandStoreSignSecondAudit.json',
        method: 'post',
        data
    })
}

/**
 * @desc 一审导入签约审核  
 */
export function firstImportAudit(dataList){
    let data = {
        data:dataList
    }
    return fetch({
        url: '/brandStoreSign/firstImportAudit.json',
        method: 'post',
        data
    })
}



/**
 * @desc 二审导入签约审核  
 */
export function seondImportAudit(dataList){
    let data = {
        data:dataList
    }
    return fetch({
        url: '/brandStoreSign/seondImportAudit.json',
        method: 'post',
        data
    })
}