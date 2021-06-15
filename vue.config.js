module.exports={
    chainWebpack:config=>{
        config.when(process.env.NODE_ENV === 'production',config=>{
            config
                .entry('app')
                .clear()
                .add('./src/main-prod.js')
            config.set('externals',{
                'vue': 'Vue',
                'element-ui':'Element'
            })
            config.pulgin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })
        config.when(process.env.NODE_ENV === 'development',config=>{
            config
                .entry('app')
                .clear()
                .add('./src/main.js')
            
            config.pulgin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
    }
}