let checkToken = (req, res, next) => {
    // 获取token
    const token = req.get('token');
    // 判断token
    if (!token) {
        return res.json({
            code: '2003',
            msg: 'token缺失',
            data: null
        })
    }
    // 校验token（解密）
    jwt.verify(token, 'gouyulang_accounts', (err, data) => {
        // 检测token是否正确
        // 失败
        if (err) {
            return res.json({
                code: '2004',
                msg: 'token校验失败',
                data: null
            })
        }
        // token检验成功
        next();
    })
}

module.exports=checkToken;