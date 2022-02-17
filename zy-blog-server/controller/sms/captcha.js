let $sql = require('../../sqlMap/system') // sql语句
let conn = require('../../common') // 引入公共连接池
let tools = require('../../utils/tools') // 引入工具模块
let svgCaptcha = require('svg-captcha');
let fs = require('fs');
//查询字典列表业务处理
exports.queryCaptcha = async (req, res, next) => {
    try {
        //验证码配置api
        let options = {
            noise: 1,
            color: true,
            fontSize:86,
            // background: '#cc9966'
        }
        let captcha = svgCaptcha.create(options);
        // fs.writeFileSync('test.png', captcha.data);
        // res.type('svg');
        res.status(200).json({img:captcha.data});
        // res.json({
        //     data:captcha.data,
        //     // image: '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',
        //     // key: '1491618026777497602'
        //     text:captcha.text
        // }) //以json的方式返回客户端
    } catch (err) {
        next(err)
    }
}

