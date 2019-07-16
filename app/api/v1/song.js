const Router = require('koa-router')
const axios = require('axios')

const router = new Router({
  prefix: '/v1/song'
})

router.get('/getDiscList',  async (ctx)=> {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  let res = await axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: ctx.query
  })

    
    ctx.body = res.data
   // console.log(res)
    //console.log(1)
  
})

router.get('/getSongList',async (ctx)=> {
  //console.log('getSongList')
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
let res = await axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: ctx.query
  })
  var ret = res.data
  if(typeof ret === 'string'){
    var reg = /^\w+\(({.+})\)$/
    var matches = ret.match(reg)
    if(matches) {
      ret = JSON.parse(matches[1])
      ctx.body = ret
  }}
})
router.get('/getplaysongvkey', async(ctx)=> {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
 let res =await axios.get(url, {
    headers: {
      origin: 'https://y.qq.com',
      referer: 'https://y.qq.com/portal/player.html'
    },
    params: ctx.query
  })
  ctx.body = res.data
})

module.exports = router