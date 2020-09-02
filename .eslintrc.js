
module.exports =
{
  // env 设置启用的环境
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true
  },
  'rules': {
    'no-unused-vars': 2,//定义了变量就必须使用, 0 = off, 1 = warn, 2 = error
    'no-console': 2,//不允许出席那console
    'quotes':[2,'single'],//使用单引号，1为单引号，2为双引号
  }
}