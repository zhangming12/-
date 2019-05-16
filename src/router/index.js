/*
 * @Author: lisong 
 * @Date: 2017-09-10 22:51:18 
 * @Last Modified by: lisong
 * @Last Modified time: 2018-09-17 15:33:43
 */
import Vue from 'vue'
import Router from 'vue-router'
//开发环境不适用懒加载
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router)

export const routers = [{
        path: '/',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: _import('login')
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            title: ''
        },
        component: _import('index'),
        children: [{
                path: '/index',
                title: '首页',
                name: 'index',
                component: _import('index/index')
            },

            {
                path: '/recharge',
                title: '转入&充值',
                name: 'recharge',
                component: _import('account/recharge/list')

            },
            {
                path: '/widthdraw',
                name: 'widthdraw',
                title: '转出&提现',
                component: _import('account/widthdraw/list')
            },
            {
                path: '/money',
                name: 'money',
                title: '资金流水记录',
                component: _import('account/money/list')
            },
            {
                path: '/out',
                name: 'out',
                title: '转入&转出记录',
                component: _import('account/out/list')
            },
            {
                path: '/activityDetail',
                name: 'activityDetail',
                title: '活动参与明细',
                component: _import('data/activityDetail')
            },
            {
                path: '/activityTop',
                name: 'activityTop',
                title: '区域活动排行',
                component: _import('data/activityTop')
            },
            {
                path: '/activityAll',
                name: 'activityAll',
                title: '时间活动统计',
                component: _import('data/activityAll')
            },
            {
                path: '/prizeDetail',
                name: 'prizeDetail',
                title: '折扣使用明细',
                component: _import('data/prizeDetail')
            },
            {
                path: '/prizeCity',
                name: 'prizeCity',
                title: '区域活动统计（市）',
                component: _import('data/prizeCity')
            },
            {
                path: '/prizeArea',
                name: 'prizeArea',
                title: '区域活动统计（区）',
                component: _import('data/prizeArea')
            },
            {
                path: '/userInfo',
                name: 'userInfo',
                title: '客户信息查询',
                component: _import('user/customer-information/customer-information')
            },
            {
                path: '/customerInformate',
                name: 'customerInformate',
                title: '平台信息修改',
                component: _import('user/customer-information/customer-information')
            },
            {
                path: '/stopLog',
                name: 'stopLog',
                title: '停售日志',
                component: _import('user/customer-information/stop-log')
            },
            {
                path: '/customerInformateEdit',
                name: 'customerInformateEdit',
                title: '客户信息修改',
                component: _import('user/customer-information/customer-information-edit')
            },
            {
                path: '/userPortrait',
                name: 'userPortrait',
                title: '客户画像分析',
                component: _import('user/userPortrait')
            },
            {
                path: '/userAsset',
                name: 'userAsset',
                title: '客户实时资产',
                component: _import('user/userAsset')
            },
            {
                //B端客户管理-客户行为分析
                path: '/customerBehaviorAnalysis',
                name: 'customerBehaviorAnalysis',
                title: '客户行为分析',
                component: _import('user/customer-behavior-analysis/customer-behavior-analysis')
            },
            {
                //B端客户管理-客户扫码活动
                path: '/customerScancodeActivity',
                name: 'customerScancodeActivity',
                title: '扫码周参与分布',
                component: _import('user/customer-scancode-activity/customer-scancode-activity')
            },
            {
                //B端客户管理-扫码日参与曲线
                path: '/scancodeActivityGrowup',
                name: 'scancodeActivityGrowup',
                title: '扫码日参与曲线',
                component: _import('user/scancode-activity-growup/scancode-activity-growup')
            },
            {
                path: '/dataScreen',
                name: 'dataScreen',
                title: '扫码活动看板',
                component: _import('dataScreen/small')
            },
            {
                path: '/list',
                name: 'list',
                title: '扫码刷单预警',
                component: _import('monitor/list')
            },
            {
                path: '/account',
                name: 'account',
                title: '资金账户',
                component: _import('account/account/account')
            },
            {
                path: '/information',
                name: 'information',
                title: '资讯发布',
                component: _import('information/list')
            },
            {
                path: '/salesman',
                name: 'salesman',
                title: '业代推广活动设置',
                component: _import('salesman/list')
            },
            {
                path: '/salesmanEdd',
                name: 'salesmanEdd',
                title: '业代推广活动新建',
                component: _import('salesman/edd')
            },
            {
                path: '/salesmanNext',
                name: 'salesmanNext',
                title: '关联业代',
                component: _import('salesman/next')
            },
            {
                path: '/salesmanList',
                name: 'salesmanList',
                title: '业代信息管理',
                component: _import('salesmanInfo/list')
            },
            {
                //员工信息
                path: '/employeeInformation',
                name: 'employeeInformation',
                title: '品牌角色导入',
                component: _import('salesmanInfo/employee-information')
            },
            {
                path: '/salesmanInfo',
                name: 'salesmanInfo',
                title: '业代关联门店统计',
                component: _import('salesmanInfo/info')
            },
            {
                //B端业代管理-业代关联扫码趋势
                path: '/salesmanRelateScancode',
                name: 'salesmanRelateScancode',
                title: '业代关联扫码趋势',
                component: _import('salesmanInfo/salesman-relate-scancode/salesman-relate-scancode')
            },
            {
                //B端业代管理-业代关联门店分布
                path: '/salesmanRelateStore',
                name: 'salesmanRelateStore',
                title: '业代关联门店分布',
                component: _import('salesmanInfo/salesman-relate-store/salesman-relate-store')
            },
            {
                //B端业代管理-业代关联扫码排行
                path: '/scancodeAchieveRanking',
                name: 'scancodeAchieveRanking',
                title: '业代关联扫码排行',
                component: _import('salesmanInfo/scancode-achieve-ranking/scancode-achieve-ranking')
            },
            {
                // 业代推广活动统计
                path: '/salesmanActivity',
                name: 'salesmanActivity',
                title: '业代推广活动统计',
                component: _import('salesmanInfo/activity')
            },
            {
                //系统管理——用户管理——新增
                path: '/userManage',
                name: 'userManage',
                title: '用户管理',
                component: _import('systemManage/userManage')
            },
            {
                //系统管理——微信用户管理——对换客户账号
                path: '/weChatManage',
                name: 'weChatManage',
                title: '对换客户账号',
                component: _import('systemManage/weixinManage')
            },
            {
                //系统管理——资源管理——新增
                path: '/reourceManage',
                name: 'reourceManage',
                title: '资源管理',
                component: _import('systemManage/reourceManage')
            },


            {
                //C端活动数据统计-活动参与明细
                path: '/activityPartakeDetail-C',
                name: 'activityPartakeDetail-C',
                title: '活动参与明细',
                component: _import('activity-statistics-C/activity-partake-detail/activity-partake-detail')
            },
            {
                //C端活动数据统计-折扣使用明细
                path: '/activityUseDetail-C',
                name: 'activityUseDetail-C',
                title: '折扣使用明细',
                component: _import('activity-statistics-C/award-use-detail/activity-use-detail')
            },
            {
                //C端活动数据统计-区域折扣统计（市）
                path: '/areaAwardCity-C',
                name: 'areaAwardCity-C',
                title: '区域活动统计（市）',
                component: _import('activity-statistics-C/area-award-stastics-city/area-award-city')
            },
            {
                //C端活动数据统计-区域折扣统计（区）
                path: '/areaAwardArea-C',
                name: 'areaAwardArea-C',
                title: '区域活动统计（区）',
                component: _import('activity-statistics-C/area-award-stastics-area/area-award-area')
            },
            {
                //C端活动数据统计-时间活动统计
                path: '/activitySummaryStastics-C',
                name: 'activitySummaryStastics-C',
                title: '时间活动统计',
                component: _import('activity-statistics-C/activity-summary-stastics/activity-summary-stastics')
            },
            {
                //C端活动数据统计-区域活动排行
                path: '/activityRankingList-C',
                name: 'activityRankingList-C',
                title: '区域活动排行',
                component: _import('activity-statistics-C/activity-ranking-list/activity-ranking-list')
            },

            {
                //C端客户管理-客户信息查询
                path: '/customerInfor-C',
                name: 'customerInfor-C',
                title: '客户信息查询',
                component: _import('customer-manage-C/customer-infor/customer-infor')
            },
            {
                //C端客户管理-客户画像分析
                path: '/customerPortrait-C',
                name: 'customerPortrait-C',
                title: '客户画像分析',
                component: _import('customer-manage-C/customer-portrait/customer-portrait')
            },
            {
                //C端客户管理-客户实时资产
                path: '/customerAssets-C',
                name: 'customerAssets-C',
                title: '客户实时资产',
                component: _import('customer-manage-C/customer-Assets/customer-Assets')
            },

            {
                //折扣管理-实物折扣状态跟踪
                path: '/awardStatusTracking',
                name: 'awardStatusTracking',
                title: '实物折扣状态跟踪',
                component: _import('award-manage/award-status-tracking/award-status-tracking')
            },
            {
                //折扣管理-实物折扣状态跟踪-编辑
                path: '/awardStatusTracking-edit',
                name: 'awardStatusTracking-edit',
                title: '实物折扣状态跟踪-编辑',
                component: _import('award-manage/award-status-tracking/award-status-tracking-edit')
            },
            {
                //折扣管理-折扣管理
                path: '/awardManage',
                name: 'awardManage',
                title: '折扣管理',
                component: _import('award-manage/award-all-manage/award-all-manage')
            },
            {
                //折扣管理-折扣管理-编辑
                path: '/awardManage-edit',
                name: 'awardManage-edit',
                title: '折扣管理-编辑',
                component: _import('award-manage/award-all-manage/award-all-manage-edit')
            },
            {
                //折扣管理-实物折扣管理
                path: '/realyAwardManage',
                name: 'realyAwardManage',
                title: '实物折扣管理',
                component: _import('award-manage/realy-award-manage/realy-award-manage')
            },
            {
                //折扣管理-实物折扣管理-编辑
                path: '/realyAwardManage-edit',
                name: 'realyAwardManage-edit',
                title: '实物折扣管理-编辑',
                component: _import('award-manage/realy-award-manage/realy-award-manage-edit')
            },
            {
                //折扣管理-电子折扣管理
                path: '/electronAwardManage',
                name: 'electronAwardManage',
                title: '电子折扣管理',
                component: _import('award-manage/electron-award-manage/electron-award-manage')
            },
            {
                //折扣管理-电子折扣管理-编辑
                path: '/electronAwardManage-edit',
                name: 'electronAwardManage-edit',
                title: '电子折扣管理-编辑',
                component: _import('award-manage/electron-award-manage/electron-award-manage-edit')
            },
            {
                //折扣管理-红包折扣管理
                path: '/redAwardManage',
                name: 'redAwardManage',
                title: '红包折扣管理',
                component: _import('award-manage/red-award-manage/red-award-manage')
            },
            {
                //折扣管理-红包折扣管理-编辑
                path: '/redAwardManage-edit',
                name: 'redAwardManage-edit',
                title: '红包折扣管理-编辑',
                component: _import('award-manage/red-award-manage/red-award-manage-edit')
            },
            {
                //折扣管理-活动码包维护
                path: '/activityCodeMaintain',
                name: 'activityCodeMaintain',
                title: '活动码包维护',
                component: _import('award-manage/activity-code-maintain/activity-code-maintain')
            },
            {
                //折扣管理-活动码包维护-编辑
                path: '/activityCodeMaintain-edit',
                name: 'activityCodeMaintain-edit',
                title: '活动码包维护-编辑',
                component: _import('award-manage/activity-code-maintain/activity-code-maintain-edit')
            },
            {
                //折扣管理-活动码包维护-查看
                path: '/activityCodeMaintain-look',
                name: 'activityCodeMaintain-look',
                title: '活动码包-新增',
                component: _import('award-manage/activity-code-maintain/activity-code-maintain-look')
            },
            {
                //折扣管理-生成并下载码包
                path: '/productDownloadCode',
                name: 'productDownloadCode',
                title: '生成并下载码包',
                component: _import('award-manage/activity-code-maintain/product-download-code')
            },
            {
                //折扣管理-开奖活动维护
                path: '/openawardActivityMaintain',
                name: 'openawardActivityMaintain',
                title: '扫码活动维护',
                component: _import('award-manage/openaward-activity-maintain/openaward-activity-maintain')
            },
            {
                //折扣管理-开奖活动维护-修改
                path: '/openawardActivityMaintain-edit',
                name: 'openawardActivityMaintain-edit',
                title: '开奖活动维护-修改',
                component: _import('award-manage/openaward-activity-maintain/openaward-activity-maintain-edit')
            },

            {
                //活动任务管理——陈列奖励
                path: '/displayReward',
                name: 'displayReward',
                title: '陈列活动设置',
                component: _import('activity-manage/display-reward/display-reward')
            },
            {
                //活动任务管理——陈列奖励——编辑
                path: '/displayReward-edit',
                name: 'displayReward-edit',
                title: '陈列活动设置——编辑',
                component: _import('activity-manage/display-reward/display-reward-edit')
            },

            {
                //活动任务管理——陈列申请审核
                path: '/displayApply',
                name: 'displayApply',
                title: '陈列申请审核',
                component: _import('activity-manage/display-apply-examine/display-apply')
            },
            {
                //活动任务管理——陈列申请-审核
                path: '/displayApplyExamine',
                name: 'displayApplyExamine',
                title: '陈列申请-审核',
                component: _import('activity-manage/display-apply-examine/display-apply-examine')
            },
            {
                //陈列活动进货量管理（未启用）
                path: '/stockVolumeManage',
                name: 'stockVolumeManage',
                title: '陈列活动进货量管理',
                component: _import('activity-manage/display-result-examine/stock-volume-manage')
            },
            {
                //活动任务管理——审核详情
                path: '/displayResultOneEdit',
                name: 'displayResultOneEdit',
                title: '审核详情',
                component: _import('activity-manage/display-result-examine/display-result-examine')
            },
            {
                //活动任务管理——陈列结果二级审核——编辑
                path: '/displayResultTwoEdit',
                name: 'displayResultTwoEdit',
                title: '陈列结果二级审核——编辑',
                component: _import('activity-manage/display-result-examine/display-result-examine')
            },
            {
                //活动任务管理——审核详情
                path: '/auditDetail',
                name: 'auditDetail',
                title: '审核详情',
                component: _import('activity-manage/display-result-examine/display-result-examine')
            },
            {
                //活动任务管理——陈列奖励发放
                path: '/displayAwardGiveout',
                name: 'displayAwardGiveout',
                title: '陈列活动折扣发放',
                component: _import('activity-manage/display-result-examine/display-award-giveout')
            },
            {
                //B端活动数据统计——陈列申请统计
                path: '/applySurveyStatistics',
                name: 'applySurveyStatistics',
                title: '陈列申请统计',
                component: _import('activity-manage/display-activity-report/apply-survey-statistics')
            },
            {
                //陈列活动管理——陈列活动上传明细
                path: '/displayPartakeDetail',
                name: 'displayPartakeDetail',
                title: '陈列活动上传明细',
                component: _import('activity-manage/display-activity-report/display-partake-detail')
            },
            {
                //陈列活动管理——陈列活动上传监控
                path: '/displayPartakeDetail2',
                name: 'displayPartakeDetail2',
                title: '陈列活动上传监控',
                component: _import('activity-manage/display-activity-report/display-partake-detail2')
            },
            {
                //陈列活动管理——陈列上传明细报表导出
                path: '/displayPartakeDetail3',
                name: 'displayPartakeDetail3',
                title: '陈列上传报表导出',
                component: _import('activity-manage/display-activity-report/display-partake-detail3')
            },
            {
                //陈列活动管理——陈列活动门店明细
                path: '/displayStoreDetail',
                name: 'displayStoreDetail',
                title: '陈列活动单门店查询',
                component: _import('activity-manage/display-activity-report/display-store-detail')
            },
            {
                //陈列活动管理——门店陈列上传排行榜
                path: '/displayActivityRanking',
                name: 'displayActivityRanking',
                title: '陈列活动区域排行榜',
                component: _import('activity-manage/display-activity-report/display-activity-ranking')
            },
            {
                //陈列活动管理——业代关联上传率排行榜
                path: '/displayWorkerUploadRanking',
                name: 'displayWorkerUploadRanking',
                title: '陈列业代上传排行榜',
                component: _import('activity-manage/display-activity-report/display-worker-uploadRanking')
            },
            {
                //陈列活动管理——业代关联完成率排行榜
                path: '/displayWorkerDoneRanking',
                name: 'displayWorkerDoneRanking',
                title: '陈列业代完成排行榜',
                component: _import('activity-manage/display-activity-report/display-worker-doneRanking')
            },
            {
                //陈列活动管理——业代关联门店进度汇总
                path: '/displayWorkerSummary',
                name: '/displayWorkerSummary',
                title: '陈列业代关联合格率',
                component: _import('activity-manage/display-activity-report/display-worker-summary')
            },
            {
                //陈列活动管理——门店陈列成长曲线
                path: '/displayGrowupCurve',
                name: 'displayGrowupCurve',
                title: '陈列门店上传曲线',
                component: _import('activity-manage/display-activity-report/display-growup-curve')
            },
            {
                //陈列活动管理——门店陈列进货量
                path: '/awardPurchaseAmount',
                name: 'awardPurchaseAmount',
                title: '陈列进货量导入',
                component: _import('activity-manage/display-activity-report/award-purchase-amount')
            },
            {
                //陈列活动管理——陈列奖励清算(按月)
                path: '/giveoutPrizesClear',
                name: 'giveoutPrizesClear',
                title: '陈列奖励清算(按月)',
                component: _import('activity-manage/display-activity-report/giveout-prizes-clear')
            },
            {
                //陈列活动管理——门店陈列达成追踪
                path: '/displayTrackStatistics',
                name: 'displayTrackStatistics',
                title: '门店陈列达成追踪',
                component: _import('activity-manage/display-activity-report/displayt-rack-statistics')
            },
            {
                //陈列活动管理——陈列奖励清算(按周)
                path: '/displayClear',
                name: 'displayClear',
                title: '陈列奖励清算(按周)',
                component: _import('activity-manage/display-clear/display-clear-list')
            },
            {
                //陈列活动管理——广东陈列结果清算发奖详情
                path: '/displayClearDetail',
                name: 'displayClearDetail',
                title: '广东陈列结果清算发奖详情',
                component: _import('activity-manage/display-clear/display-clear-detail')
            },
            {
                //广东太古CNY点亮报表
                path: '/CNYSignReport',
                name: 'CNYSignReport',
                title: 'CNY点亮维护',
                component: _import('activity-manage/display-activity-report/CNY-sign-report')
            },
            {
                //广州市门店分布——太古
                path: '/GDStoreDistribute',
                name: 'GDStoreDistribute',
                title: 'CNY点亮看板',
                component: (resolve) => require(['../components/echarts/guangdong_store_distribute2.vue'], resolve)
            },
            {
                //全国门店数量分布
                path: '/nationalStoresStatistics',
                name: 'nationalStoresStatistics',
                title: '全国门店数量分布',
                component: _import('salesmanInfo/salesman-relate-store/national-stores-statistics')
            },
            {
                //活动配置-活动形式选择
                path: '/activeChoice',
                name: 'activeChoice',
                title: '活动形式选择',
                component: _import('active-configuration/active-choice')
            },
            {
                //活动配置-活动样式配置
                path: '/activeConfiguration',
                name: 'activeConfiguration',
                title: '活动样式配置',
                component: _import('active-configuration/active-configuration')
            },
            {
                //中粮陈列日报导出
                path: '/COFCOFromExport',
                name: 'COFCOFromExport',
                title: '中粮陈列日报导出',
                component: (resolve) => require(['../components/report-form-export.vue'], resolve)
            },
            {
                //金银铜协议——主任协议查报(业务员上级)
                path: '/examineDirector',
                name: 'examineDirector',
                title: '业务员协议查报',
                component: _import('yellow-gold-protocol/protocol-examine/examine-director')
            },
            {
                //金银铜协议——主任协议查报(市场部)
                path: '/examineDepartment',
                name: 'examineDepartment',
                title: '市场部协议查报',
                component: _import('yellow-gold-protocol/protocol-examine/examine-director')
            },
            {
                //金银铜协议——协议查报审查
                path: '/protocolReportExamine',
                name: 'protocolReportExamine',
                title: '协议查报审查',
                component: _import('yellow-gold-protocol/protocol-examine/protocol-report-examine')
            },
            {
                //地龙活动管理——活动参与门店
                path: '/activityPartakeStore',
                name: 'activityPartakeStore',
                title: '活动参与门店信息',
                component: _import('landLoong-activity-manage/activity-partake-store')
            },
            {
                //地龙活动管理——活动参与记录
                path: '/activityPartakeRecord',
                name: 'activityPartakeRecord',
                title: ' 活动参与情况明细',
                component: _import('landLoong-activity-manage/activity-partake-record')
            },
            {
                //地龙活动管理——活动异常预警
                path: '/activityAbnormalWarn',
                name: 'activityAbnormalWarn',
                title: '活动异常预警',
                component: _import('landLoong-activity-manage/activity-abnormal-warn')
            },
            {
                //地龙活动管理——活动监控
                path: '/activityMonitor',
                name: 'activityMonitor',
                title: '活动监控',
                component: _import('landLoong-activity-manage/activity-monitor')
            },
            {
                //地龙活动管理——审核详情
                path: '/examineDetail',
                name: 'examineDetail',
                title: '审核详情',
                component: _import('landLoong-activity-manage/activity-examine-detail')
            },
            {
                //地龙活动管理——活动参与情况汇总（周）
                path: '/activityPartakeSummary',
                name: 'activityPartakeSummary',
                title: '活动参与情况汇总（周）',
                component: _import('landLoong-activity-manage/activity-partake-summary')
            },
            {
                //地龙活动管理——活动参与情况明细
                path: '/activityPartakeDetail',
                name: 'activityPartakeDetail',
                title: '活动参与情况明细',
                component: _import('landLoong-activity-manage/activity-partake-detail')
            },
            {
                //监察管理——监察记录
                path: '/monitorRecoad',
                name: 'monitorRecoad',
                title: '监察记录',
                component: _import('monitorManage/monitor-recoad')
            },
            {
                //监察管理——参与记录
                path: '/participationRecoad',
                name: 'participationRecoad',
                title: '参与记录',
                component: _import('monitorManage/participation-record')
            },
            {
                //监察管理——参与状态查询
                path: '/participationStatusQuery',
                name: 'participationStatusQuery',
                title: '参与状态查询',
                component: _import('monitorManage/participation-status-query')
            },
            {
                //品牌前端角色管理
                path: '/brandRoleManage',
                name: 'brandRoleManage',
                title: '品牌前端角色管理',
                component: _import('menuPermissionManage/brand-role-manage')
            },
            {
                //功能权限设置
                path: '/menuPermissionsSettings',
                name: 'menuPermissionsSettings',
                title: '品牌功能权限设置',
                component: _import('menuPermissionManage/menu-permissions-settings')
            },
            {
                //功能菜单
                path: '/functionMenu',
                name: 'functionMenu',
                title: '功能菜单',
                component: _import('menuPermissionManage/function-menu')
            },
            {
                //功能权限设置
                path: '/menuSettings',
                name: 'menuSettings',
                title: '功能权限设置',
                component: _import('menuPermissionManage/menu-settings')
            },
            {
                //陈列折扣使用情况跟踪-品牌及经销商
                path: '/displayPrizesRacking',
                name: 'displayPrizesRacking',
                title: '陈列折扣使用跟踪情况-品牌及经销商',
                component: _import('activity-manage/display-prizes-racking')
            },
            {
                //陈列折扣使用情况汇总-品牌及经销商
                path: '/displayPrizesSummary',
                name: 'displayPrizesSummary',
                title: '陈列折扣使用情况汇总',
                component: _import('activity-manage/display-prizes-summary')
            },
            {
                //工厂人员管理
                path: '/factoryPersonnelManage',
                name: 'factoryPersonnelManage',
                title: '工厂人员管理',
                component: _import('systemManage/factory-personnel-management')
            },
            {
                //活动屏蔽人员
                path: '/internalYuangManage',
                name: 'internalYuangManage',
                title: '活动屏蔽人员',
                component: _import('systemManage/internal-yuang-manage')
            },
            {
                //陈列结果清算发奖
                path: '/displayResultsLiquidationAwards',
                name: 'displayResultsLiquidationAwards',
                title: '陈列结果清算发奖',
                component: _import('activity-manage/display-results-liquidation-awards')
            },
            {
                //实物流水记录-品牌及经销商
                path: '/writeDownFlowRecord',
                name: 'writeDownFlowRecord',
                title: '实物流水记录',
                component: _import('account/write-down-flow-record')
            },
            {
                //客户信息管理
                path: '/storeInformationManage',
                name: 'storeInformationManage',
                title: '客户信息管理',
                component: _import('systemManage/store-information-manage')
            },
            {
                //门店信息管理--客户信息
                path: '/userInformation',
                name: 'userInformation',
                title: '门店信息管理--客户信息',
                component: _import('systemManage/user-information')
            },
            {
                //陈列推广名单导入
                path: '/displayPromotionImport',
                name: 'displayPromotionImport',
                title: '陈列推广名单导入',
                component: _import('activity-manage/display-promotion-import')
            },
            {
                //陈列活动维护导入
                path: '/displayMaintainImport',
                name: 'displayMaintainImport',
                title: '陈列活动维护导入',
                component: _import('activity-manage/display-maintain-import')
            },
            {
                //陈列看板
                path: '/displayKanBan',
                name: 'displayKanBan',
                title: '陈列活动看板',
                component: _import('activity-manage/display-kan-ban')
            },
            {
                //陈列推广活动参与明细
                path: '/displayActivitiesParticipateDetail',
                name: 'displayActivitiesParticipateDetail',
                title: '陈列推广活动参与明细',
                component: _import('activity-manage/display-activities-participate-detail')
            },
            {
                //报表导入
                path: '/reportImport',
                name: 'reportImport',
                title: '基础数据相关导入',
                component: _import('import/report-import')
            },
            {
                //导入错误查询
                path: '/importErrorQuery',
                name: 'importErrorQuery',
                title: '导入错误查询',
                component: _import('import/import-error-query')
            },
            {
                //返利活动设置
                path: '/rebateSetting',
                name: 'rebateSetting',
                title: '返利活动设置',
                component: _import('staircasePurchaseReturn/rebate-setting')
            },
            {
                //返利统计明细
                path: '/statisticalDetailsRebate',
                name: 'statisticalDetailsRebate',
                title: '返利统计明细',
                component: _import('staircasePurchaseReturn/statistical-details-rebate')
            },
            {
                //返利统计汇总
                path: '/statisticalSummaryRebate',
                name: 'statisticalSummaryRebate',
                title: '返利统计汇总',
                component: _import('staircasePurchaseReturn/statistical-summary-rebate')
            },
            {
                //返利汇总数据
                path: '/summaryRebateData',
                name: 'summaryRebateData',
                title: '返利汇总数据',
                component: _import('staircasePurchaseReturn/summary-rebate-data')
            },
            {
                //返利看板
                path: '/rebateRealTimeKanban',
                name: 'rebateRealTimeKanban',
                title: '阶梯返利看板',
                component: _import('staircasePurchaseReturn/rebate-real-time-kanban')
            },
            {
                //返利月度清算发放
                path: '/monthlySettlement',
                name: 'monthlySettlement',
                title: '返利月度清算发放',
                component: _import('staircasePurchaseReturn/monthly-settlement')
            },
            {
                //河北金银铜GT&教育&娱乐结果清算
                path: '/hbGoldGtDisplayClear',
                name: 'hbGoldGtDisplayClear',
                title: 'GT&教育&娱乐结果清算',
                component: _import('hbGoldDisplayManage/hbGoldGtDisplayClear')
            },
            {
                //河北金银铜餐饮结果清算
                path: '/hbCaterDisplayClear',
                name: 'hbCaterDisplayClear',
                title: '餐饮结果清算',
                component: _import('hbGoldDisplayManage/hbCaterDisplayClear')
            },
            {
                //河北金银铜陈列上传监控
                path: '/hbGoldCaterDisplayCycle',
                name: 'hbGoldCaterDisplayCycle',
                title: '陈列上传监控',
                component: _import('hbGoldDisplayManage/hbGoldCaterDisplayCycle')
            },
            {
                //河北金银铜活动上传情况统计
                path: '/hbGoldActivityUpload',
                name: 'hbGoldActivityUpload',
                title: '活动上传统计',
                component: _import('hbGoldDisplayManage/hbGoldActivityUpload')
            },
            {
                //河北金银铜活动新老用户情况统计
                path: '/hbGoldActivityUser',
                name: 'hbGoldActivityUser',
                title: '活动新老用户',
                component: _import('hbGoldDisplayManage/hbGoldActivityUser')
            },
            {
                //河北金银铜活动参与情况统计
                path: '/hbGoldActivityPart',
                name: 'hbGoldActivityPart',
                title: '活动参与统计',
                component: _import('hbGoldDisplayManage/hbGoldActivityPart')
            },
            {
                //河北金银铜活动上传明细
                path: '/hbGoldActivityDetail',
                name: 'hbGoldActivityDetail',
                title: '活动上传明细',
                component: _import('hbGoldDisplayManage/hbGoldActivityDetail')
            },

            {
                //陈列活动设置SKU
                path: '/settingSKU',
                name: 'settingSKU',
                title: '陈列活动设置SKU',
                component: _import('activity-statistics-C/setting-SKU')
            },
            {
                //陈列审核SKU
                path: '/examineSKU',
                name: 'examineSKU',
                title: '陈列审核SKU',
                component: _import('activity-manage/display-result-examine/examine-SKU')
            },
            {
                //金银铜清算
                path: '/goldSilverCopperLiquidation',
                name: 'goldSilverCopperLiquidation',
                title: '金银铜折扣清算',
                component: _import('yellow-gold-protocol/gold-silver-copper-liquidation')
            },
            {
                //活动参与门店信息one
                path: '/activityPartakeStoreOne',
                name: 'activityPartakeStoreOne',
                title: '活动参与门店信息',
                component: _import('landLoong-activity/activity-partake-store-one')
            },
            {
                //活动参与门店信息two
                path: '/activityPartakeStoreTwo',
                name: 'activityPartakeStoreTwo',
                title: '活动参与门店信息',
                component: _import('landLoong-activity/activity-partake-store-two')
            },
            {
                //活动参与门店信息three
                path: '/activityPartakeStoreThree',
                name: 'activityPartakeStoreThree',
                title: '活动参与门店信息',
                component: _import('landLoong-activity/activity-partake-store-three')
            },
            {
                //活动参与门店信息four
                path: '/activityPartakeStoreFour',
                name: 'activityPartakeStoreFour',
                title: '活动参与门店信息',
                component: _import('landLoong-activity/activity-partake-store-four')
            },
            {
                //活动参与情况明细one
                path: '/activityPartakeRecordOne',
                name: 'activityPartakeStoreFour',
                title: '活动参与情况明细',
                component: _import('landLoong-activity/activity-partake-record-one')
            },
            {
                //活动参与情况明细two
                path: '/activityPartakeRecordTwo',
                name: 'activityPartakeRecordTwo',
                title: '活动参与情况明细',
                component: _import('landLoong-activity/activity-partake-record-two')
            },
            {
                //活动参与情况明细three
                path: '/activityPartakeRecordThree',
                name: 'activityPartakeRecordThree',
                title: '活动参与情况明细',
                component: _import('landLoong-activity/activity-partake-record-three')
            },
            {
                //活动参与情况明细four
                path: '/activityPartakeRecordFour',
                name: 'activityPartakeRecordFour',
                title: '活动参与情况明细',
                component: _import('landLoong-activity/activity-partake-record-four')
            },
            {
                //活动异常预警one
                path: '/activityAbnormalWarnOne',
                name: 'activityAbnormalWarnOne',
                title: '活动异常预警',
                component: _import('landLoong-activity/activity-abnormal-warn-one')
            },
            {
                //活动异常预警two
                path: '/activityAbnormalWarnTwo',
                name: 'activityAbnormalWarnTwo',
                title: '活动异常预警',
                component: _import('landLoong-activity/activity-abnormal-warn-two')
            },
            {
                //活动异常预警three
                path: '/activityAbnormalWarnThree',
                name: 'activityAbnormalWarnThree',
                title: '活动异常预警',
                component: _import('landLoong-activity/activity-abnormal-warn-three')
            },
            {
                //活动异常预警Four
                path: '/activityAbnormalWarnFour',
                name: 'activityAbnormalWarnFour',
                title: '活动异常预警',
                component: _import('landLoong-activity/activity-abnormal-warn-four')
            },
            {
                //活动监控one
                path: '/activityMonitorOne',
                name: 'activityMonitorOne',
                title: '活动监控',
                component: _import('landLoong-activity/activity-monitor-one')
            },
            {
                //活动监控two
                path: '/activityMonitorTwo',
                name: 'activityMonitorTwo',
                title: '活动监控',
                component: _import('landLoong-activity/activity-monitor-two')
            },
            {
                //活动监控three
                path: '/activityMonitorThree',
                name: 'activityMonitorThree',
                title: '活动监控',
                component: _import('landLoong-activity/activity-monitor-three')
            },
            {
                //活动监控Four
                path: '/activityMonitorFour',
                name: 'activityMonitorFour',
                title: '活动监控',
                component: _import('landLoong-activity/activity-monitor-four')
            },
            {
                //江西活动中奖明细
                path: '/jxActivityDetail',
                name: 'jxActivityDetail',
                title: '活动中奖明细-JX',
                component: _import('activity-manage/jx-activity-detail')
            },
            {
                //码包生产维护
                path: '/codeMaintenance',
                name: 'codeMaintenance',
                title: '码包生产维护',
                component: _import('code-management-maintenance/code-maintenance')
            },
            {
                //活动码包列表
                path: '/activityCodeList',
                name: 'activityCodeList',
                title: '活动码包列表',
                component: _import('code-management-maintenance/activity-code-list')
            },
            {
                //码包激活使用
                path: '/codeActivation',
                name: 'codeActivation',
                title: '码包激活使用',
                component: _import('code-management-maintenance/code-activation')
            },
            {
                //单码使用查询
                path: '/singleCodeQuery',
                name: 'singleCodeQuery',
                title: '单码使用查询',
                component: _import('code-management-maintenance/single-code-query')
            },
            {
                //活动分组
                path: '/activityGroup',
                name: 'activityGroup',
                title: "活动分组",
                component: _import('activity-manage/display-reward/activity-group')
            },
            {
                //后台管理--后台账户管理
                path: '/backstageAccountManagement',
                name: 'backstageAccountManagement',
                title: "设置用户权限",
                component: _import('backstageManage/backstageAccountManagement/backstage-account-management')
            },
            {
                //后台管理--后台角色管理
                path: '/backstageRoleManagement',
                name: 'backstageRoleManagement',
                title: "设置角色权限",
                component: _import('backstageManage/backstageRoleManagement/backstage-role-management')
            },
            {
                //后台管理--新建角色
                path: '/createNewRole',
                name: 'createNewRole',
                title: "新建/修改角色",
                component: _import('backstageManage/backstageRoleManagement/create-new-role')
            },
            {
                //后台管理--菜单管理
                path: '/menuManage',
                name: 'menuManage',
                title: "资源列表",
                component: _import('backstageManage/menuManage/menu-manage')
            },
            {
                //数据互通--客资更新列表
                path: '/guestUpdateList',
                name: 'guestUpdateList',
                title: "客资更新列表",
                component: _import('dataInteroperability/guest-updateList')
            },
            {
                //数据互通--客资更新操作日志  
                path: '/guestUpdateOperationLog',
                name: 'guestUpdateOperationLog',
                title: "客资更新操作日志",
                component: _import('dataInteroperability/guest-update-operation-log')
            },
            {
                //客服监控  
                path: '/customerServiceMonitoring',
                name: 'customerServiceMonitoring',
                title: "客服监控",
                component: _import('customerServiceMonitoring/customer-service-monitoring')
            },
            {
                //客服审核查询  
                path: '/customerServiceAuditQuery',
                name: 'customerServiceAuditQuery',
                title: "客服审核查询",
                component: _import('customerServiceMonitoring/customer-service-audit-query')
            },
            {
                //上传视频统计导出  
                path: '/uploadVideoImport',
                name: 'uploadVideoImport',
                title: "上传视频统计导出",
                component: _import('uploadVideoImport/upload-video-import')
            },
            {
                //码包预警  
                path: '/codeWarning',
                name: 'codeWarning',
                title: "码包激活预警",
                component: _import('code-management-maintenance/code-warning')
            },
            {
                //陈列上传明细 
                path: '/displayUploadDetail',
                name: 'displayUploadDetail',
                title: "陈列上传明细",
                component: _import('displayActivity/display-upload-detail')
            },
            {
                //陈列活动区域排行榜 
                path: '/displayActivityAreaSort',
                name: 'displayActivityAreaSort',
                title: "陈列活动区域排行榜",
                component: _import('displayActivity/display-activity-area-sort')
            },
            {
                //陈列活动业代排行榜 
                path: '/displayActivityKarmaSort',
                name: 'displayActivityKarmaSort',
                title: "陈列活动业代排行榜",
                component: _import('displayActivity/display-activity-karma-sort')
            },
            {
                //陈列上传监控 
                path: '/displayActivityUploadMonitor',
                name: 'displayActivityUploadMonitor',
                title: "陈列上传监控",
                component: _import('displayActivity/display-activity-upload-monitor')
            },
            {
                //陈列活动单门店查询 
                path: '/displayActivitySingleStoreQuery',
                name: 'displayActivitySingleStoreQuery',
                title: "陈列活动单门店查询",
                component: _import('displayActivity/display-activity-single-store-query')
            },
            {
                //陈列门店上传曲线 
                path: '/displayStoreUploadLine',
                name: 'displayStoreUploadLine',
                title: "陈列门店上传曲线",
                component: _import('displayActivity/display-store-upload-line')
            },

            {
                //陈列申请审核 
                path: '/displayApplicationAudit',
                name: 'displayApplicationAudit',
                title: "陈列申请审核",
                component: _import('displayActivity/display-application-audit')
            },
            {
                //陈列申请统计 
                path: '/displayApplicationStatistics',
                name: 'displayApplicationStatistics',
                title: "陈列申请统计",
                component: _import('displayActivity/display-application-statistics')
            },
            {
                //陈列推广名单导入 
                path: '/displayPromotionListImport',
                name: 'displayPromotionListImport',
                title: "陈列推广名单导入",
                component: _import('displayActivity/display-promotion-list-import')
            },
            {
                //陈列活动新老用户统计表 
                path: '/displayTableExport',
                name: 'displayTableExport',
                title: "陈列活动新老用户统计表",
                component: _import('displayActivity/display-table-export')
            },
            {
                //陈列进货导入 
                path: '/displayImportImport',
                name: 'displayImportImport',
                title: "陈列进货导入",
                component: _import('displayActivity/display-import-import')
            },
            {
                //扫码全程用码情况 
                path: '/scavengingCodeCondition',
                name: 'scavengingCodeCondition',
                title: "扫码全程用码情况",
                component: _import('code-management-maintenance/scavenging-code-condition')
            },
            {
                //二维码印刷及报废
                path: '/codePrintingAndScrap',
                name: 'codePrintingAndScrap',
                title: "二维码印刷及报废",
                component: _import('code-management-maintenance/code-printing-and-scrap')
            },
            {
                //二维码包装及报废 
                path: '/codePackagingAndDimensional',
                name: 'codePackagingAndDimensional',
                title: "二维码包装及报废",
                component: _import('code-management-maintenance/code-packaging-and-dimensional')
            },
            {
                //品牌资金变动审核 
                path: '/auditBrandCapitalChange',
                name: 'auditBrandCapitalChange',
                title: "品牌资金变动审核",
                component: _import('account/audit-brand-capital-change')
            },
            {
                //全站文件导入记录 
                path: '/importRecord',
                name: 'importRecord',
                title: "全站文件导入记录",
                component: _import('importRecord/import-record')
            },
            {
                //导入记录 ---失败详情
                path: '/importFailDetail',
                name: 'importFailDetail',
                title: "失败详情",
                component: _import('importRecord/import-fail-detail')
            },
            {
                //扫码活动配置
                path: '/scanActivityConfigure',
                name: 'scanActivityConfigure',
                title: "扫码活动配置",
                component: _import('scan-configure/scan-activity-configure')
            },
            {
                //扫码活动配置(活动包)
                path: '/scanActivityConfigureGroup',
                name: 'scanActivityConfigureGroup',
                title: "扫码活动配置(活动包)",
                component: _import('scan-configure/scan-activity-configure-group')
            },
            {
                //扫码活动配置(活动包)
                path: '/newScanActivityConfigureGroup',
                name: 'newScanActivityConfigureGroup',
                title: "扫码活动配置(活动包)",
                component: _import('scan-configure-detail/new-scan-activity-configure-group')
            },
            {
                //活动包配置
                path: '/scanGroupConfigure',
                name: 'scanGroupConfigure',
                title: "活动包配置",
                component: _import('scan-configure/scan-group-configure')
            },
            {
                //扫码活动配置(活动)
                path: '/scanActivityConfigureActivity',
                name: 'scanActivityConfigureActivity',
                title: "扫码活动配置(活动)",
                component: _import('scan-configure/scan-activity-configure-activity')
            },
            {
                //扫码活动配置(活动)
                path: '/newScanActivityConfigureActivity',
                name: 'newScanActivityConfigureActivity',
                title: "扫码活动配置(活动)",
                component: _import('scan-configure-detail/new-scan-activity-configure-activity')
            },
            {
                //折扣管理
                path: '/presentManagement',
                name: 'presentManagement',
                title: "折扣管理",
                component: _import('scan-configure/present-management')
            },
            {
                //活动参与明细(扫码C)
                path: '/participationDetailsScan',
                name: 'participationDetailsScan',
                title: "活动参与明细(扫码C)",
                component: _import('discount-usage-details/participation-details-scan')
            },
            {
                //折扣发放明细(陈列)
                path: '/discountDetailsDisplay',
                name: 'discountDetailsDisplay',
                title: "折扣发放明细(陈列)",
                component: _import('discount-usage-details/discount-details-display')
            },
            {
                //新资金流水记录
                path: '/capitalFlowRecords',
                name: 'capitalFlowRecords',
                title: "新资金流水记录",
                component: _import('discount-usage-details/capital-flow-records')
            },
            {
                //广东可乐资金流水报表
                path: '/gdklCapitalFlowRecords',
                name: 'gdklCapitalFlowRecords',
                title: "广东可乐资金流水报表",
                component: _import('discount-usage-details/gdkl-capital-flow-records')
            },
            {
                //区域活动统计(市)
                path: '/areaActivityStatistics',
                title: "区域活动统计(市)",
                component: _import('discount-usage-details/area-activity-statistics')
            },
            {
                //区域活动统计(区)
                path: '/cityActivityStatistics',
                title: "区域活动统计(区)",
                component: _import('discount-usage-details/city-activity-statistics')
            },
            {
                //活动参与统计C
                path: '/timeActivityStatistics',
                title: "活动参与统计C",
                component: _import('discount-usage-details/time-activity-statistics')
            },
            {
                //返利统计汇总
                path: '/statisticalSummaryOfRebates',
                name: 'statisticalSummaryOfRebates',
                title: "返利统计汇总",
                component: _import('discount-usage-details/statistical-summary-of-rebates')
            },
            {
                //导出记录
                path: '/exportRecord',
                name: 'exportRecord',
                title: "导出记录",
                component: _import('discount-usage-details/export-record')
            },
            {
                //活动参与明细(扫码B)
                path: '/participationDetailsScanB',
                title: "活动参与明细(扫码B)",
                component: _import('discount-usage-details/participation-details-scan-b')
            },
            {
                //活动参与统计B
                path: '/timeActivityStatisticsB',
                title: "活动参与统计B",
                component: _import('discount-usage-details/time-activity-statistics-b')
            },
            {
                //运营客服工具箱
                path: '/tools',
                name: 'tools',
                title: "运营客服工具箱",
                component: _import('tools/tools')
            },
            {
                //审核状态修改
                path: '/auditStatusModify',
                name: 'auditStatusModify',
                title: "审核状态修改",
                component: _import('tools/audit-status-modify')
            },
            {
                //异常扫码用户分布
                path: '/abnormalSweepUserDistribution',
                name: "abnormalSweepUserDistribution",
                title: "异常扫码用户分布",
                component: _import('tools/abnormal-sweep-user-distribution')
            },
            {
                //折扣管理
                path: '/discountManage',
                name: "discountManage",
                title: "折扣管理",
                component: _import('discountManage/discount-manage')
            },
            {
                //品牌系统管理---品牌管理
                path: '/brandManage',
                name: "brandManage",
                title: "品牌管理",
                component: _import('brandSystemManage/brand-manage')
            },
            {
                //品牌系统管理---合作伙伴管理
                path: '/distributorManage',
                name: "distributorManage",
                title: "合作伙伴管理",
                component: _import('brandSystemManage/distributor-manage')
            },
            // {
            //     //实物管理---实物流水记录
            //     path: '/physicalFlowRecord',
            //     title: "实物流水记录",
            //     component: _import('physicalManage/physical-flow-record')
            // },
            {
                //实物管理---陈列活动清算(经销商)
                path: '/distributorDisplayLiquidation',
                name: "distributorDisplayLiquidation",
                title: "陈列活动清算(经销商)",
                component: _import('physicalManage/distributor-display-liquidation')
            },
            {
                //实物管理---门店电子劵明细(品牌)
                path: '/physicalDisplayGrantingDetails',
                name: "physicalDisplayGrantingDetails",
                title: "门店电子劵明细(品牌)",
                component: _import('physicalManage/physical-display-granting-details')
            },
            {
                //实物管理---门店电子劵明细(经销商)
                path: '/physicalDistributorDistributionDetails',
                name: "physicalDistributorDistributionDetails",
                title: "门店电子劵明细(经销商)",
                component: _import('physicalManage/physical-distributor-distribution-details')
            },
            {
                //实物管理---实物配送统计(经销商配送统计)
                path: '/distributorDistributionStatistics',
                name: "distributorDistributionStatistics",
                title: "实物配送统计(经销商配送统计)",
                component: _import('physicalManage/distributor-distribution-statistics')
            },
            {
                //实物管理---银鹭陈列申请审核 
                path: '/yinLuDisplayAudit',
                name: "yinLuDisplayAudit",
                title: "银鹭陈列申请审核",
                component: _import('physicalManage/yin-lu-display-audit')
            },
            {
                //陈列一级审核(新页面)
                path: '/displayOneLevelAudit',
                name: "displayOneLevelAudit",
                title: "陈列一级审核(新页面)",
                component: _import('displayAudit/display-one-level-audit')
            },
            {
                //陈列二级审核(新页面)
                path: '/displayTwoLevelAudit',
                name: "displayTwoLevelAudit",
                title: "陈列二级审核(新页面)",
                component: _import('displayAudit/display-two-level-audit')
            },
            {
                //陈列风险记录
                path: '/displayWarningAbnormal',
                name: "displayWarningAbnormal",
                title: "陈列风险记录",
                component: _import('displayAudit/display-warning-abnormal')
            },
            {
                //风险详情
                path: '/displayAbnormalDetail',
                name: "displayAbnormalDetail",
                title: "风险详情",
                component: _import('displayAudit/display-abnormal-detail')
            },
            {
                //电子劵核销
                path: '/electronicVoucherWriteOff',
                name: "electronicVoucherWriteOff",
                title: "电子劵核销",
                component: _import('electronicVoucher/electronic-voucher-write-off')
            },
            {
                //电子劵核销记录
                path: '/electronicVoucherWriteOffRecord',
                name: "electronicVoucherWriteOffRecord",
                title: "电子劵核销记录",
                component: _import('electronicVoucher/electronic-voucher-write-off-record')
            },
            {
                //电子劵流通记录
                path: '/electronicVoucherCirculationRecord',
                name: 'electronicVoucherCirculationRecord',
                title: "电子劵流通记录",
                component: _import('electronicVoucher/electronic-voucher-circulation-record')
            },
            {
                //陈列活动业代排行榜-厦门
                path: '/displayActivityKarmaSortXiaMen',
                name: 'displayActivityKarmaSortXiaMen',
                title: "陈列活动业代排行榜-厦门",
                component: _import('yinLuNewPage/display-activity-karma-sort-xia-men')
            },
            {
                //陈列活动业代排行榜-集美
                path: '/displayActivityKarmaSortJiMei',
                name: 'displayActivityKarmaSortJiMei',
                title: "陈列活动业代排行榜-集美",
                component: _import('yinLuNewPage/display-activity-karma-sort-ji-mei')
            },
            {
                //陈列活动业代排行榜-同安
                path: '/displayActivityKarmaSortTongAn',
                name: 'displayActivityKarmaSortTongAn',
                title: "陈列活动业代排行榜-同安",
                component: _import('yinLuNewPage/display-activity-karma-sort-tong-an')
            },
            {
                //陈列活动上传监控-厦门
                path: '/displayActivityUploadMonitorXiaMen',
                name: 'displayActivityUploadMonitorXiaMen',
                title: "陈列活动上传监控-厦门",
                component: _import('yinLuNewPage/display-activity-upload-monitor-xia-men')
            },
            {
                //陈列活动上传监控-集美
                path: '/displayActivityUploadMonitorJiMei',
                name: 'displayActivityUploadMonitorJiMei',
                title: "陈列活动上传监控-集美",
                component: _import('yinLuNewPage/display-activity-upload-monitor-ji-mei')
            },
            {
                //陈列活动上传监控-同安
                path: '/displayActivityUploadMonitorTongAn',
                name: 'displayActivityUploadMonitorTongAn',
                title: "陈列活动上传监控-同安",
                component: _import('yinLuNewPage/display-activity-upload-monitor-tong-an')
            },
            {
                //协议审核
                path: '/agreementAudit',
                name: 'agreementAudit',
                title: "协议审核",
                component: _import('protocolRelated/agreement-audit')
            },
            {
                //工作流维护
                path: '/organizationalRelationshipManagement',
                name: 'organizationalRelationshipManagement',
                title: "工作流维护",
                component: _import('protocolRelated/organizational-relationship-management')
            },
            {
                //公司员工管理
                path: '/organizationPersonnelManagement',
                name: 'organizationPersonnelManagement',
                title: "公司员工管理",
                component: _import('protocolRelated/organization-personnel-management')
            },
            {
                //业务员关系管理
                path: '/workerRelationshipManagement',
                name: 'workerRelationshipManagement',
                title: "业务员关系管理",
                component: _import('protocolRelated/worker-relationship-management')
            },
            {
                //成功图像审核
                path: '/successImageAudit',
                name: 'successImageAudit',
                title: "成功图像审核",
                component: _import('protocolRelated/success-image-audit')
            },
            {
                //区域签约排行榜
                path: '/regionalAttendanceRanking',
                name: 'regionalAttendanceRanking',
                title: "区域签约排行榜",
                component: _import('protocolRelated/regional-attendance-ranking')
            },
            {
                //业代签约排行榜
                path: '/industryContractRanking',
                name: 'industryContractRanking',
                title: "业代签约排行榜",
                component: _import('protocolRelated/industry-contract-ranking')
            },
            {
                //签约审核统计
                path: '/contractAuditStatistics',
                name: 'contractAuditStatistics',
                title: "签约审核统计",
                component: _import('protocolRelated/contract-audit-statistics')
            },
            {
                //协议规则导入
                path: '/protocolRuleImport',
                name: 'protocolRuleImport',
                title: "协议规则导入",
                component: _import('protocolRelated/protocol-rule-import')
            },
            {
                //协议详情
                path: '/protocolReportAudit',
                name: 'protocolReportAudit',
                title: "协议详情",
                component: _import('protocolRelated/protocol-report-audit')
            },
            {
                //协议记录
                path: '/agreementAuditQuery',
                name: 'agreementAuditQuery',
                title: "协议记录",
                component: _import('protocolRelated/agreement-audit-query')
            },
            {
                //惠合码包回导
                path: '/zhanJiangCodeExport',
                name: 'zhanJiangCodeExport',
                title: "惠合码包回导",
                component: _import('code-management-maintenance/zhan-jiang-code-export')
            },
            {
                //审核记录(单)
                path: '/auditRecordSingle',
                name: 'auditRecordSingle',
                title: "审核记录(单)",
                component: _import('crossExamination/audit-record-single')
            },
            {
                //审核记录(双)
                path: '/auditRecordDouble',
                name: 'auditRecordDouble',
                title: "审核记录(双)",
                component: _import('crossExamination/audit-record-double')
            },
            {
                //陈列初审(单)
                path: '/firstInstanceDisplaySingle',
                name: 'firstInstanceDisplaySingle',
                title: "陈列初审(单)",
                component: _import('crossExamination/first-instance-display-single')
            },
            {
                //演示陈列初审(单)
                path: '/displayDemonstrationAudit',
                name: 'displayDemonstrationAudit',
                title: "演示陈列初审(单)",
                component: _import('crossExamination/display-demonstration-audit')
            },
            {
                //审核差异复审(单)
                path: '/auditReviewSingle',
                name: 'auditReviewSingle',
                title: "审核差异复审(单)",
                component: _import('crossExamination/audit-review-single')
            },
            {
                //陈列初审(双)
                path: '/firstInstanceDisplayDouble',
                name: 'firstInstanceDisplayDouble',
                title: "陈列初审(双)",
                component: _import('crossExamination/first-instance-display-double')
            },
            {
                //审核差异复审(双)
                path: '/auditReviewDouble',
                name: 'auditReviewDouble',
                title: "审核差异复审(双)",
                component: _import('crossExamination/audit-review-double')
            },
            {
                //陈列风险记录
                path: '/displayRiskRecord',
                name: 'displayRiskRecord',
                title: "陈列风险记录",
                component: _import('crossExamination/display-risk-record')
            },
            //陈列巡拍
            {
                //经销商管理
                path: '/dealerManagementPatrols',
                name: 'dealerManagementPatrols',
                title: "经销商管理",
                component: _import('displayPatrols/dealer-management-patrols')
            },
            {
                //巡拍门店信息管理
                path: '/storeInformationManagePatrols',
                name: 'storeInformationManagePatrols',
                title: "巡拍门店信息管理",
                component: _import('displayPatrols/store-information-manage-patrols')
            },
            {
                //合作伙伴员工
                path: '/dealerWorkerManagePatrols',
                name: 'dealerWorkerManagePatrols',
                title: "合作伙伴员工",
                component: _import('displayPatrols/dealer-worker-manage-patrols')
            },
            {
                //巡拍陈列设置
                path: '/dealerDispayManagePatrols',
                name: 'dealerDispayManagePatrols',
                title: "巡拍陈列设置",
                component: _import('displayPatrols/dealer-dispay-manage-patrols')
            },
            {
                //活动维护
                path: '/activityAddOrModifyPatrols',
                name: 'activityAddOrModifyPatrols',
                title: "活动维护",
                component: _import('displayPatrols/activity-add-or-modify-patrols')
            },
            {
                //分组维护
                path: '/presentWeiHu',
                name: 'presentWeiHu',
                title: "分组维护",
                component: _import('displayPatrols/present-wei-hu')
            },
            {
                //巡拍上传监控
                path: '/patrolsUploadMonitor',
                name: 'patrolsUploadMonitor',
                title: "巡拍上传监控",
                component: _import('displayPatrols/patrols-upload-monitor')
            },
            {
                //巡拍费用总汇总
                path: '/patrolsFeeCollectionSummary',
                name: 'patrolsFeeCollectionSummary',
                title: "巡拍费用总汇总",
                component: _import('displayPatrols/patrols-fee-collection-summary')
            },
            {
                //费用周领取汇总
                path: '/weeksFeeCollectionSummary',
                name: 'weeksFeeCollectionSummary',
                title: "费用周领取汇总",
                component: _import('displayPatrols/weeks-fee-collection-summary')
            },
            {
                //费用日领取汇总
                path: '/dailyFeeCollectionSummary',
                name: 'dailyFeeCollectionSummary',
                title: "费用日领取汇总",
                component: _import('displayPatrols/daily-fee-collection-summary')
            },
            {
                //费用日领取明细
                path: '/dailyFeeCollectionDetail',
                name: 'dailyFeeCollectionDetail',
                title: "费用日领取明细",
                component: _import('displayPatrols/daily-fee-collection-detail')
            },
            {
                //巡拍周上传明细
                path: '/patrolsWeeksUploadDetail',
                name: 'patrolsWeeksUploadDetail',
                title: "巡拍周上传明细",
                component: _import('displayPatrols/patrols-weeks-upload-detail')
            },
            {
                //巡拍周上传汇总
                path: '/patrolsWeeksUploadSummary',
                name: 'patrolsWeeksUploadSummary',
                title: "巡拍周上传汇总",
                component: _import('displayPatrols/patrols-weeks-upload-summary')
            },
            {
                //巡拍日上传明细
                path: '/patrolsDaysUploadDetail',
                name: 'patrolsDaysUploadDetail',
                title: "巡拍日上传明细",
                component: _import('displayPatrols/patrols-days-upload-detail')
            },
            {
                //巡拍日上传汇总
                path: '/patrolsDaysUploadSummary',
                name: 'patrolsDaysUploadSummary',
                title: "巡拍日上传汇总",
                component: _import('displayPatrols/patrols-days-upload-summary')
            },
            {
                //陈列巡拍审核
                path: '/dealerDisplayAuditPatrols',
                name: 'dealerDisplayAuditPatrols',
                title: "陈列巡拍审核",
                component: _import('displayPatrols/dealer-display-audit-patrols')
            },
            {
                //陈列巡拍复审
                path: '/dealerDisplayFinalAuditPatrols',
                name: 'dealerDisplayFinalAuditPatrols',
                title: "陈列巡拍复审",
                component: _import('displayPatrols/dealer-display-final-audit-patrols')
            },
            {
                //巡拍审核详情
                path: '/auditDetailPatrols',
                name: 'auditDetailPatrols',
                title: "巡拍审核详情",
                component: _import('displayPatrols/audit-detail-patrols')
            },
            {
                //签约追踪
                path: '/contractTracking',
                name: 'contractTracking',
                title: "签约追踪",
                component: _import('protocolRelated/contract-tracking')
            },
            {
                //巡拍清算(按周)
                path: '/patrollingClearingWeek',
                name: 'patrollingClearingWeek',
                title: "巡拍清算(按周)",
                component: _import('displayPatrols/patrolling-clearing-week')
            },
            {
                //巡拍清算(按月)
                path: '/patrollingClearingMonth',
                name: 'patrollingClearingMonth',
                title: "巡拍清算(按月)",
                component: _import('displayPatrols/patrolling-clearing-month')
            },
            {
                //修改终端手机号
                path: '/changePhone',
                name: 'changePhone',
                title: "修改终端手机号",
                component: _import('tools/change-phone')
            },
            {
                //客服考核系统---陈列活动分值配置
                path: '/activityListValueExhibition',
                name: 'activityListValueExhibition',
                title: "陈列活动分值配置",
                component: _import('customerAuditService/activity-list-value-exhibition')
            },
            {
                //客服考核系统---项目列表分值配置
                path: '/itemListValueExhibition',
                name: 'itemListValueExhibition',
                title: "项目列表分值配置",
                component: _import('customerAuditService/item-list-value-exhibition')
            },
            {
                //客服考核系统---客服陈列审核自查
                path: '/customerServiceAuditSelfWeek',
                name: 'customerServiceAuditSelfWeek',
                title: "客服陈列审核自查",
                component: _import('customerAuditService/customer-service-audit-self-day')
            },
            {
                //客服考核系统---客服陈列审核团控
                path: '/customerServiceAuditAllWeek',
                name: 'customerServiceAuditAllWeek',
                title: "客服陈列审核团控",
                component: _import('customerAuditService/customer-service-audit-all-day')
            },
            {
                //客服考核系统---客服陈列审核团控-详情1
                path: '/customerServiceAuditAllDetail1',
                name: 'customerServiceAuditAllDetail1',
                title: "客服陈列审核团控-详情1",
                component: _import('customerAuditService/customer-service-audit-all-detail1')
            },
            {
                //客服考核系统---客服陈列审核团控(月)-详情2
                path: '/customerServiceAuditAllDetail2',
                name: 'customerServiceAuditAllDetail2',
                title: "客服陈列审核团控-详情2",
                component: _import('customerAuditService/customer-service-audit-all-detail2')
            },
            {
                //客服考核系统---客服陈列审核团控-待审核
                path: '/customerServiceNoAudit',
                name: 'customerServiceNoAudit',
                title: "客服陈列审核团控-待审核",
                component: _import('customerAuditService/customer-service-no-audit')
            },
            {
                //工具箱---修改终端手机号日志
                path: '/changePhoneLog',
                name: 'changePhoneLog',
                title: "修改终端手机号日志",
                component: _import('tools/change-phone-log')
            },
            {
                //工具箱---对换客户账号日志
                path: '/weChatManageLog',
                name: 'weChatManageLog',
                title: "对换客户账号日志",
                component: _import('tools/we-chat-manage-log')
            },
            {
                //陈列活动累积汇总
                path: '/displayActivityAccumulateSummary',
                name: 'displayActivityAccumulateSummary',
                title: "陈列活动累积汇总",
                component: _import('displayActivity/display-activity-accumulate-summary')
            },
            {
                //陈列活动累积明细
                path: '/displayActivityAccumulateDetail',
                name: 'displayActivityAccumulateDetail',
                title: "陈列活动累积明细",
                component: _import('displayActivity/display-activity-accumulate-detail')
            },
            {
                //CNY-签到位置维护
                path: '/checkLocationMaintenance',
                name: 'checkLocationMaintenance',
                title: "签到位置维护",
                component: _import('CNY/check-location-maintenance')
            },
            {
                //CNY-签到位置审核
                path: '/checkLocationAudit',
                name: 'checkLocationAudit',
                title: "签到位置审核",
                component: _import('CNY/check-location-audit')
            },
            {
                //CNY-签到位置修改
                path: '/checkLocationModify',
                name: 'checkLocationModify',
                title: "签到位置修改",
                component: _import('CNY/check-location-modify')
            },
            {
                //CNY-签到信息维护
                path: '/checkInformationMaintenance',
                name: 'checkInformationMaintenance',
                title: "签到信息维护",
                component: _import('CNY/check-information-maintenance')
            },
            {
                //CNY-签到地图
                path: '/checkMap',
                name: 'checkMap',
                title: "签到地图",
                component: _import('CNY/check-map')
            },
            {
                //CNY-签到地图
                path: '/hzMap',
                name: 'hzMap',
                title: "签到地图",
                component: _import('CNY/hz-map')
            },
            {
                //CNY-签到统计
                path: '/checkStatistics',
                name: 'checkStatistics',
                title: "签到统计",
                component: _import('CNY/check-statistics')
            },
            {
                //浙江太古活动-门店列表
                path: '/storeList',
                name: 'storeList',
                title: "门店列表",
                component: _import('ZJTGActivity/store-list')
            },
            {
                //浙江太古活动-二维码列表
                path: '/codeList',
                name: 'codeList',
                title: "二维码列表",
                component: _import('ZJTGActivity/code-list')
            },
            {
                //浙江太古活动-用户列表
                path: '/userList',
                name: 'userList',
                title: "用户列表",
                component: _import('ZJTGActivity/user-list')
            },
            {
                //浙江太古活动-兑换列表
                path: '/exchangeList',
                name: 'exchangeList',
                title: "兑换列表",
                component: _import('ZJTGActivity/exchange-list')
            },
            {
                //浙江太古活动-门店数据统计
                path: '/storeDataSummary',
                name: 'storeDataSummary',
                title: "门店数据统计",
                component: _import('ZJTGActivity/store-data-summary')
            },
            {
                //浙江太古活动-综合控制台
                path: '/integratedConsole',
                name: 'integratedConsole',
                title: "综合控制台",
                component: _import('ZJTGActivity/integrated-console')
            },
            {
                //审核(J)
                path: '/outSourceAudit',
                name: 'outSourceAudit',
                title: "审核(J)",
                component: _import('audit/out-source-audit')
            },
            {
                //审核(W)
                path: '/outSourceAuditW',
                name: 'outSourceAuditW',
                title: "审核(W)",
                component: _import('audit/out-source-audit-w')
            },
            {
                //审核记录
                path: '/outSourceAuditRecord',
                name: 'outSourceAuditRecord',
                title: "审核记录",
                component: _import('audit/out-source-audit-record')
            },
            {
                //演示看板
                path: '/presentationBoard',
                name: 'presentationBoard',
                title: "演示看板",
                component: _import('presentationBoard/presentation-board')
            },
            {
                //门店地址定位修改
                path: '/modifyStoreAddress',
                name: 'modifyStoreAddress',
                title: "门店地址定位修改",
                component: _import('user/customer-information/modify-store-address')
            },
            {
                //组织架构
                path: '/organizationalStructure',
                name: 'organizationalStructure',
                title: "组织架构",
                component: _import('organizational/organizational-structure')
            },
            {
                //人员组织维护
                path: '/personnelOrganizationMaintenance',
                name: 'personnelOrganizationMaintenance',
                title: "人员组织维护",
                component: _import('organizational/personnel-organization-maintenance')
            },
            {
                //客户信息修改
                path: '/userInformationModifyNew',
                name: 'userInformationModifyNew',
                title: "客户信息修改",
                component: _import('user/customer-information/user-information-modify-new')
            },
            //江西C端扫码活动
            {
                //数据看板
                path: '/dataKanbanJX',
                name: 'dataKanbanJX',
                title: "数据看板",
                component: _import('jx-scan-c/data-kanban-JX')
            },
            {
                //门店数据统计
                path: '/storeDataSummaryJX',
                name: 'storeDataSummaryJX',
                title: "门店数据统计",
                component: _import('jx-scan-c/store-data-summary-JX')
            },
            {
                //领劵记录
                path: '/securitiesListJX',
                name: 'securitiesListJX',
                title: "领劵记录",
                component: _import('jx-scan-c/securities-list-JX')
            },
            {
                //核销记录
                path: '/writeOffRecordJX',
                name: 'writeOffRecordJX',
                title: "核销记录",
                component: _import('jx-scan-c/write-off-record-JX')
            },
            {
                //劵使用记录
                path: '/securitiesRecordJX',
                name: 'securitiesRecordJX',
                title: "劵使用记录",
                component: _import('jx-scan-c/securities-record-JX')
            },
            {
                //门店列表
                path: '/storeListJX',
                name: 'storeListJX',
                title: "门店列表",
                component: _import('jx-scan-c/storeListJX/store-list-JX')
            },
            {
                //新增/修改门店
                path: '/addStoreJX',
                name: 'addStoreJX',
                title: "新增/修改门店",
                component: _import('jx-scan-c/storeListJX/add-store-JX')
            },
            //粤东B端扫码+集卡活动
            {
                //集卡看板
                path: '/dataKanbanYD',
                name: 'dataKanbanYD',
                title: "集卡看板",
                component: _import('YD-scan-b/data-kanban-YD')
            },
            {
                //门店数据统计
                path: '/storeDataSummaryYD',
                name: 'storeDataSummaryYD',
                title: "门店数据统计",
                component: _import('YD-scan-b/store-data-summary-YD')
            },
            {
                //集卡记录
                path: '/cardCollectingRecordYD',
                name: 'cardCollectingRecordYD',
                title: "集卡记录",
                component: _import('YD-scan-b/card-collecting-record-YD')
            },
            {
                //合成记录
                path: '/synthesisRecordYD',
                name: 'synthesisRecordYD',
                title: "合成记录",
                component: _import('YD-scan-b/synthesis-record-YD')
            },
            /**
             * 2019 - 04 - 19
             * 客服系统外包质检 customerQualitySystem
             */
            {
                //审核分配
                path: '/auditAllocation',
                name: 'auditAllocation',
                title: "审核分配",
                component: _import('customer-quality-system/audit-allocation')
            },
            {
                //待审核
                path: '/overtimeForAudit',
                name: 'overtimeForAudit',
                title: "待审核",
                component: _import('customer-quality-system/overtime-for-audit')
            },
            {
                //初审
                path: '/firstAudit',
                name: 'firstAudit',
                title: "初审",
                component: _import('customer-quality-system/first-audit')
            },
            {
                //复审
                path: '/twiceAudit',
                name: 'twiceAudit',
                title: "复审",
                component: _import('customer-quality-system/twice-audit')
            },
            {
                //质检
                path: '/qualityTesting',
                name: 'qualityTesting',
                title: "质检",
                component: _import('customer-quality-system/quality-testing')
            },
            {
                //退回通知
                path: '/returnNotice',
                name: 'returnNotice',
                title: "退回通知",
                component: _import('customer-quality-system/return-notice')
            },
            {
                //质检记录
                path: '/testingRecord',
                name: 'testingRecord',
                title: "质检记录",
                component: _import('customer-quality-system/testing-record')
            },
            {
                //复审记录
                path: '/testingRecordTwice',
                name: 'testingRecordTwice',
                title: "复审记录",
                component: _import('customer-quality-system/testing-record-twice')
            },
            {
                //审核记录
                path: '/auditRecord',
                name: 'auditRecord',
                title: "审核记录",
                component: _import('customer-quality-system/audit-record')
            },
            {
                //质检数据统计
                path: '/batchAuditStatistics',
                name: 'batchAuditStatistics',
                title: "质检数据统计",
                component: _import('customer-quality-system/batch-audit-statistics')
            },
            {
                //审核日志
                path: '/auditLog',
                name: 'auditLog',
                title: "审核日志",
                component: _import('customer-quality-system/audit-log')
            },
            {
                //团队管理
                path: '/teamManage',
                name: 'teamManage',
                title: "团队管理",
                component: _import('customer-quality-system/team-manage')
            },
            /**
             * 资金流水记录-发红包
             */
            {
                //红包转账
                path: '/capitalFlowRecordImport',
                name: 'capitalFlowRecordImport',
                title: "红包转账",
                component: _import('account/capital-flow-record-import')
            },
            /**
             * 对换客户账号日志新
             */
            {
                //对换客户账户日志新
                path: '/newCustomLog',
                name: 'newCustomLog',
                title: "对换客户账户日志新",
                component: _import('tools/new-custom-log')
            },
            {
                //测试
                path: '/demo',
                name: "demo",
                title: "测试",
                component: _import('account/demo')
            }
        ]
    },
    {
        //演示看板
        path: '/presentationBoardBig',
        name: 'presentationBoardBig',
        title: "演示看板",
        component: _import('presentationBoard/presentation-board')
    },
    {
        path: '/bigScreen',
        name: 'bigScreen',
        title: '陈列活动大屏',
        component: _import('dataScreen/small')
    },
    {
        //广州市门店分布——太古
        path: '/bigGDStoreDistribute',
        name: 'bigGDStoreDistribute',
        component: (resolve) => require(['../components/echarts/guangdong_store_distribute2.vue'], resolve)
    },
    {
        //广州市门店分布——太古
        path: '/checkMapBig',
        name: 'checkMapBig',
        component: _import('CNY/check-map')
    },
    {
        //杭州地图
        path: '/hzMapBig',
        name: 'hzMapBig',
        component: _import('CNY/hz-map')
    },
    {
        //返利看板
        path: '/rebateRealTimeKanban1',
        name: 'rebateRealTimeKanban1',
        component: _import('staircasePurchaseReturn/rebate-real-time-kanban')
    },
    {
        //陈列看板
        path: '/displayKanBan1',
        name: "displayKanBan1",
        component: _import('activity-manage/display-kan-ban')
    },
    // {
    //     //错误页面
    //     path: '*',
    //     name: "error",
    //     component: _import('error')
    // }

];

export const router = new Router({
    routes: routers
})