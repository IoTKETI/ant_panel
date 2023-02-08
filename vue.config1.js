module.exports = { 
    devServer: {  //api 요청이 있을 때 어디서 처리할지 설정
      proxy: { 
        '/api': { 
          target: 'http://localhost:3000/api',
          changeOrigin: true, 
          pathRewrite: { 
            '^/api': ''
          } 
        } 
      },

    },
    outputDir: '../backend/public',  //배포 파일의 위치 설정
  }