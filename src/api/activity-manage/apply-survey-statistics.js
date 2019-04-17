import fetch from '@/util/fetch';




/**
 * @desc 陈列活动参与明细
 * @param {Object} 
 * @return {Promise}
 */

export function queryDisplayList1(dataList){
    let data = {
        data:dataList,
    }
    return fetch({
        url: '/display/queryDisplayList.json',
        method: 'post',
        data
    })
}

/**
 * @desc 陈列活动排行榜
 * @param {Object} 
 * @return {Promise}
 */

export function displayRankingShow(dataList){
    let data = {
        data:dataList,
    }
    return fetch({
        url: '/report/displayRankingShow.json',
        method: 'post',
        data
    })
}