import fetch from '@/util/fetch';

/**
 * @desc 业务代表管理-业代信息——解锁、绑定
 * @param {ObjectList}
 * @return {Array}
 */

export function workerUpdateStatus(dataList){
    let data = {
        data:dataList
    }
    return fetch({
        url:'worker/updateStatus.json',
        method:'post',
        data
    })
}