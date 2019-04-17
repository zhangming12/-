/*
 * 项目配置
 * 
 * */
// PRE 预发布环境  TEST 测试环境   PRO 生产环境  DEMO 演示环境  pre预发布环境
let RUNTIME_ENVIRONMENT = "";

let dommain = location.hostname; // 主机域名

let port = location.port;

if (dommain.search('112.124.18.48') != -1 || dommain.search('op.hzhuihe.cn') != -1 || (dommain.search('localhost') != -1 && port == '8081')) {
    RUNTIME_ENVIRONMENT = 'TEST' //测试环境
        // RUNTIME_ENVIRONMENT = 'pro' //正式环境
        // RUNTIME_ENVIRONMENT = 'pre' //预发布环境
} else if (dommain.search('47.99.39.16') != -1 && port == 8090) {
    RUNTIME_ENVIRONMENT = 'pre' //预发布环境
} else if (dommain.search('192.168.1.132') != -1 && port == 8090) {
    RUNTIME_ENVIRONMENT = 'gTest' //冠彦专用测试环境
} else {
    RUNTIME_ENVIRONMENT = 'pro'
}

if (port == '8080') {
    RUNTIME_ENVIRONMENT = 'dev'
}
if (port == '8085') {
    RUNTIME_ENVIRONMENT = 'quan' //张权专用
}

var PROJECT_CONFIG = {};
if (RUNTIME_ENVIRONMENT === "gTest") {
    /*
     * 冠彦专用测试环境
     *
     * */
    PROJECT_CONFIG = {
        'VERSION': '1.0.0',
        'clientType': 'WEB',
        'rootPath': 'web',
        'dataServer': 'http://192.168.1.132:8090/pms/',
        'downloadServer': 'http://192.168.1.132:8090',
        'ossServer': 'https://hbrand.oss-cn-hangzhou.aliyuncs.com/',
        'fileServer': 'http://192.168.1.132:8090/',
        'littleGameServer': 'https://op.hzhuihe.cn/',
        "phone": "18357021750"
    };
}
if (RUNTIME_ENVIRONMENT === "quan") {
    /*
     * 张权专用
     *
     * */
    PROJECT_CONFIG = {
        'VERSION': '1.0.0',
        'clientType': 'WEB',
        'rootPath': 'web',
        'dataServer': 'http://localhost:8090/pms-web/',
        'downloadServer': 'http://localhost:8090',
        'ossServer': 'https://hbrand.oss-cn-hangzhou.aliyuncs.com/',
        'fileServer': 'http://localhost:8090/',
        "phone": "15168325218"
    };
}
if (RUNTIME_ENVIRONMENT === "dev") {
    /*
     * 后端本地环境配置
     *
     * */
    PROJECT_CONFIG = {
        'VERSION': '1.0.0',
        'clientType': 'WEB',
        'rootPath': 'web',
        'dataServer': 'http://localhost:8080/pms-web/',
        'downloadServer': 'http://localhost:8080',
        'ossServer': 'https://hbrand.oss-cn-hangzhou.aliyuncs.com/',
        'fileServer': 'http://localhost:8080/',
        "phone": "15168325218"
    };
}

if (RUNTIME_ENVIRONMENT === "pre") {
    /*
     * 预发布环境配置
     *
     * */
    PROJECT_CONFIG = {
        'VERSION': '1.0.0',
        'clientType': 'WEB',
        'rootPath': 'web',
        'dataServer': 'http://47.99.39.167:8090/pms/',
        'downloadServer': 'http://47.99.39.167:8090',
        'ossServer': 'https://hbrand.oss-cn-hangzhou.aliyuncs.com/',
        'fileServer': 'http://47.99.39.167:8090/',
        "phone": "15168325218"
    };
}

if (RUNTIME_ENVIRONMENT === "pro") {
    /*
     * 生产环境配置
     *
     * */
    PROJECT_CONFIG = {
        'VERSION': '1.0.0',
        'clientType': 'WEB',
        'rootPath': 'web',
        'dataServer': 'http://pms.hzhuihe.cn/pms/',
        //'dataServer': 'http://114.55.24.191:8090/pms/',
        'downloadServer': 'http://pms.hzhuihe.cn',
        'ossServer': 'https://hbrand.oss-cn-hangzhou.aliyuncs.com/',
        'fileServer': 'http://114.55.24.191:8090/',
        'littleGameServer': 'https://hzhuihe.cn/',
        "phone": "15168325218"
    };
}

if (RUNTIME_ENVIRONMENT === "DEMO") {
    /*
     * 演示环境配置
     * */
    PROJECT_CONFIG = {
        'VERSION': '1.0.0',
        'clientType': 'WEB',
        'rootPath': 'web',
        'dataServer': 'http://112.124.18.48:8090/pms-demo/',
        // 'dataServer': 'https://op.hzhuihe.cn/bpp-pre/8080',
        'downloadServer': 'http://112.124.18.48:8090',
        'ossServer': 'https://hbrand.oss-cn-hangzhou.aliyuncs.com/',
        'fileServer': 'http://112.124.18.48:8090/',
        "phone": "15168325218"
    };
}

if (RUNTIME_ENVIRONMENT === "TEST") {
    /*
     * 测试环境配置
     *
     * */
    PROJECT_CONFIG = {
        'VERSION': '1.0.0',
        'clientType': 'WEB',
        'rootPath': 'web',
        'dataServer': 'http://112.124.18.48:8090/pms/',
        // 'dataServer': 'http://192.168.1.145:8080/pms-web/',//朝里
        // 'dataServer': 'http://192.168.1.169:8080/pms-web/', //荣杰
        // 'dataServer': 'http://192.168.1.162:8080/pms-web/',//西鲁
        // 'dataServer': 'http://192.168.1.106:8080/pms-web/', //柯田会
        // 'dataServer': 'http://192.168.1.142:8090/pms-web/', //张权
        // 'dataServer': 'http://192.168.1.134:8080/pms-web/', //刘慧芳
        'downloadServer': 'http://112.124.18.48:8090',
        'ossServer': 'https://hbrand.oss-cn-hangzhou.aliyuncs.com/',
        'fileServer': 'http://112.124.18.48:8090/',
        'littleGameServer': 'https://op.hzhuihe.cn/',
        "phone": "18357021750"
    };
}
PROJECT_CONFIG['uploadWorkerExcel'] = PROJECT_CONFIG.dataServer + 'doUploadFileToServer.json';

export default PROJECT_CONFIG