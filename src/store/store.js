import vue from 'vue';

import vuex from 'vuex';

import app from './modules/app';
import Util from '../util/util.js';
import createPersistedState from 'vuex-persistedstate'
vue.use(vuex);

export default new vuex.Store({
    state: {
        salaemanData: '',
        displaySkuData: [],
        skuList: {},
        status: false,
        noticeMsg: 0 //通知消息数字
    },
    mutations: {
        setNoticeMsg(state, data) {
            state.noticeMsg = data;
        },
        default (state, data) {
            state.salaemanData = data;
        },
        clearDisplaySkuData(state) {
            //陈列 --> 清空sku数据
            state.displaySkuData = [];
        },
        resetDispalySkuData(state, data) {
            //陈列 --> 设置sku数据
            state.displaySkuData = data;
        },
        //活动设置sku清空
        settingSkuClear(state) {
            state.skuList = {}
        },
        //活动设置存储sku
        settingSkuSave(state, key, value) {
            state.skuList[key] = value;
            state.status = true;
        },
        changeStatus(state) {
            state.status = !state.status;
        }

    },
    actions: {
        //获取noticeMsg
        getNoticeMsg(context) {
            Util.doPost('condition/queryBrands.json', {}, res => {
                context.commit('setNoticeMsg', 11);
            })
        },
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        reducer(val) {
            return {
                // 只储存state中的noticeMsg
                noticeMsg: val.noticeMsg
            }
        }
    })],
    modules: {
        app
    }
})