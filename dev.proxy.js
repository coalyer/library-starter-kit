module.exports = {
  '/api_jianshu/': {
    target: 'https://data.jianshukeji.com',
    // changeOrigin: true,
    pathRewrite: {
      '^/api_jianshu/': ''
    }
  }
}