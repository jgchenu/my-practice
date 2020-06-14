// 将值通过私钥签名.分割原值和签名
var sign = function(val, secret) {
  return (
    val +
    '.' +
    crypto
      .createHmac('sha256', secret)
      .update(val)
      .digest('base64')
      .replace(/\=+$/, '')
  );
};

var val = sign(req.sessionID, secret);
res.setHeader('Set-Cookie', cookie.serialize(key, val));

// 取出口令部分进行签名
var unsign = function(val, secret) {
  return sign(str, secret) == val ? str : false;
};
