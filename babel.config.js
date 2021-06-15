const prodPulgins = []
if(process.env.NODE_ENV === 'production'){
  prodPulgins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins:[
    ...prodPulgins
  ]
}
