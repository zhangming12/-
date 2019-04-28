// 枚举
export let awardStatus = {
    '0': '无效',
    '1': '有效'
}

// 折扣类型
export let goodsType = {
        '0': '电子券',
        '1': '实物',
        '2': '电子红包',
        '5': '咪咕流量包',
        '9': '谢谢惠顾'
    }
    //实物状态
export let physicalStatus = {
        '0': "待使用",
        '1': "流通中",
        '10': "待核销",
        '2': "已核销",
        '4': "已过期",
    }
    //开奖活动维护 展示状态
export let showStatus = {
        '0': '非展示中',
        '1': '展示中',
    }
    //码包生成状态
export let codeProductStatus = {
        '1': '执行中',
        '2': '暂停',
        '3': '执行完毕'
    }
    //咨询列表 渠道
export let channelCode = {
        'BPP': 'e店佳',
        'CPP': 'e促达',
    }
    //陈列展示状态
export let dispalyShowStatus = {
        '1': '展示中',
        '2': '非展示中',
        '3': '未开始',
        '4': '已结束'
    }
    //陈列活动参与明细 —— 审核意见
export let dispalyExamineSuggesteStatus = {
        '0': '未审核',
        '1': '通过',
        '2': '不通过',
        '3': '二次审核通过',
        '4': '退回',
    }
    //陈列活动 陈列申请状态 
export let displayApplyStatus = {
    '0': '未审核',
    '1': '通过',
    '2': '不通过',
}

//陈列活动管理  
export let displayCheckStatus = {
    '0': '审核中',
    '1': '视频通过',
    '2': '审核不通过',
    '3': '退回需重传',
    '4': '通过已发奖',
    '1001': '预审通过',
    '1010': '已清算',
    '1002': '预审不通过',
    '1003': '预审退回',
    '2001': '审核通过',
}

//陈列活动管理  
export let hbDisplayCheckStatus = {
    '-1': '未上传',
    '0': '审核中',
    '1': '合格',
    '2': '不合格',
    '3': '不合格',
    '4': '合格',
    '1001': '审核中',
    '1010': '已清算',
    '1002': '审核中',
    '1003': '审核中',
    '2001': '审核中',
}

//监察管理 - 监察记录 参与记录
export let monitorRecord = {
        '1': '合格',
        '2': '不合格',
        '3': '终止',
        '4': '恢复'
    }
    //监察管理 - 参与状态查询
export let participationStatus = {
        '1': '待参与',
        '2': '参与中',
        '3': '被终止',
        '4': '活动结束'
    }
    //仅供 陈列活动参与明细 和 陈列活动参与明细2 用

export let displayParketCheckStatus = {
    '0': '待审核',
    '1': '通过',
    '2': '审核不通过',
    '3': '退回需重传',
    '4': '通过已发放',
    '1010': '已清算',
    '1001': '审核中',
    '1002': '审核中',
    '1003': '审核中',
    '2001': '审核中',
    '4040': '未达发放要求',
}

//清算状态
export let liquidationState = {
        '-1': '待参与',
        '0': '待清算',
        '1010': '已清算',
        '4': '已发奖'
    }
    //领取状态
export let receiveState = {
        '0': '待领用',
        '1': '已领用',
        '2': '已清算',
        '3': '已发奖'
    }
    //清算发奖-列表状态
export let mergeGiveAwardStatus = {
        '-1': '不符合发奖要求',
        '0': '待清算',
        '1010': '已清算',
        '4': '已发奖',
        '4040': '不符合发奖要求',
        '9090': '不符合发奖要求',

    }
    //清算发奖 - 发放状态
export let distributionStatus = {
        '-1': '不符合发奖要求',
        '0': '待清算',
        '1010': '已清算',
        '4': '已发奖',
        '4040': '不符合发奖要求',
        '9090': '不符合发奖要求',
    }
    //清算发奖-审查状态
export let mergeGiveAwardCheckStatus = {
        '1': '正常',
        '2': '异常'
    }
    //清算发奖-是否提现
export let mergeGiveAwardRecStatus = {
        '0': '未领取',
        '1': '领取中',
        '2': '已领取',
        '3': '提现退回',
    }
    //广东清算发奖-综合判定状态
export let gdSyntheticalStatus = {
        '0': '不合格',
        '1': '合格'
    }
    //CNY-点亮
export let CNYSignStatus = {
    '0': '未签到',
    '1': '已签到',
    '2': '迟到',
    '3': '待签到',
}

//金银铜签约状态
export let protocolStatus = {
        '-1': '待提交',
        '0': '待审核',
        '1': '审核通过',
        '1001': '待审核',
        '2': '不通过',
        '3': '退回重签中',
    }
    //金银铜签约- 考核冰柜
export let protocolCheckFreezer = {
        '0': '无',
        '1': 'KO冰柜',
        '2': '客户自有冰柜',
        '3': 'KO、客户冰柜',
    }
    //金银铜签约-冷饮设备
export let protocolCorpFreezer = {
        // '1':'是',
        // '0':'否', 
        '1': 'KO冰柜',
        '2': '客户冰柜',
        '3': 'KO冰柜/客户冰柜',

    }
    //金银铜签约-汽水销售圈
export let protocolIsSodaSales = {
    '1': '是',
    '0': '否',
}

//金银铜签约-汽水ZM
export let protocolIsSodaSalesZm = {
    '-2': '未参与',
    '-1': '未上传',
    '0': '审核中',
    '1': '合格',
    '2': '不合格',
    '3': '退回重传',
}

//金银铜签约-三项协议5（二次陈列）
export let protocolSecondDisplay = {
        '0': '无',
        '1': '端架陈列',
        '2': '小方展架陈列',
        '3': '带有价格提示的RB套餐牌',
        '4': '助销工具投放及使用',
        '5': '果汁货架陈列',
    }
    //金银铜签约-月销售目标
export let salesTargetsGoods = {
        'Milk': '含乳饮品',
        'nutrient': '营养素饮料',
        'juice': '果汁',
        'soda': '汽水',
    }
    //金银铜签约-客户状态
export let protocolStoreStatus = {
        '0': '初始',
        '1': '正常',
        '2': '锁定',
    }
    //金银铜签约-BAP渠道
export let protocolBapChannel = {
    'GT': 'GT',
    'JY': '教育',
    'WB': '网吧',
    'YS': '饮食',
    'GZCS': "工作场所",
    'QT': '其他',
}

//金银铜签约-协议类型
export let protocolProtClass = {
    'GT': {
        // 'GT_JY_PLUS': '即饮+',
        'GT_JY': '即饮'
    },
    'JY': {
        'JY_CS': "超市",
        'JY_SPD': "食品店",
        'JY_STNKK': '食堂内档口',
        'JY_STNCS': '食堂内超市',
        'JY_STNSB': '食堂内水吧',
        // 'JY_STNSPD': '教育食堂内食品店',

        // 'JY_RB': '大学传统餐馆（RB）',
        // 'JY_SSPET': '大学传统餐馆（SSPET）',
        // 'JY_DXZGDCT': '大学中高档餐馆',
        // 'JY_DXWB': '大学网吧',
    },
    'WB': {
        'WB_WB': '网吧'
    },
    'GZCS': {
        'GZCS_JY': "即饮"
    },
    'YS': {
        'YS_ZTWWD': '传统（无网店）',
        'YS_ZTYWD': '传统（有网店）',

        'YS_ZGDCYXX': '中高档（线下）',
        'YS_ZGDCYXSXX': '中高档（线上+线下）',
    },
    'QT': {
        'QT_QT': '其他'
    },
}

//金银铜签约-销售大区
export let protocolSalesDept = {
        '冀北销售部': '冀北销售部',
        '冀南销售部': '冀南销售部',
        '冀中销售部': '冀中销售部',
        '雄安销售部': '雄安销售部',
    }
    //金银铜签约-签约属性
export let protocolSignAttr = {
    "diamond": "钻石",
    'gold': '金',
    'silver': '银',
    'copper': '铜'
        // 'iron': '铁',
}

//金银铜签约-二次陈列
export let protocolSecDisplay = {
    '0': '无',
    '1': '端架陈列',
    '2': '小方展架陈列',
    '3': '带有价格提示的RB套餐牌',
    '4': '助销工具投放及使用',
    '5': '果汁货架陈列',
}

//地龙活动管理-地龙参与状态
export let landLoongIsLoong = {
        '-1': '不可参与',
        '0': '未参与',
        '1': '执行中',
    }
    //地龙活动管理-执行状态
export let landLoongStatus = {
    '0': '未参与',
    '1': '参与中',
    '2': '已取消',
}

//银行名称对应
export let bankList = {
    "ICBKCNBJ": "工商银行",
    "PCBCCNBJ": "建设银行",
    "COMMCNSH": "交通银行",
    "ABOCCNBJ": "农业银行",
    "PSBCCNBJ": "邮政储蓄银行",
    "BKCHCNBJ": "中国银行",
}