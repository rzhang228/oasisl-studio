module.exports = {
  "parser": "babel-eslint",
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
  "extends": "airbnb",
  "rules": {
    // 不使用分号
    "semi": ["error", "never"],
    // 使用windows CRLF
    "linebreak-style": ["error", "windows"],
    // 对象末尾的逗号：多行的对象可以加可以不加，单行的一定不能加
    "comma-dangle": [2, "only-multiline"],
    // 含有console时，由error改为warn
    "no-console": 1,
    // if else语句，多行时必须有{}
    "curly": ["error", "multi"],
    // 因为在style中使用style['xxx']形式，故关闭
    "dot-notation": 0,
    // 100太少，改为150
    "max-len": ["error", { "code": 150 }],
    // 注释中允许空格
    "no-trailing-spaces": ["error", { "ignoreComments": true }],
    // 实例方法内需要含有this，由error降为warn
    "class-methods-use-this": 1,
    // airbnb对propTypes校验，默认禁用了any、array、object，在此放开禁用
    "react/forbid-prop-types": 0,
    // airbnb禁用了for-in、for-of、labels、with语法，在此放开禁用
    "no-restricted-syntax": 0
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./build/webpack.base.conf.js"
      }
    }
  }
}