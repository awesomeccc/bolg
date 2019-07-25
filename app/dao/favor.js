const {
  sequelize
} = require('../../core/db')

const {
  Op
} = require('sequelize')
const {
  ArtDao
} = require('./art')
const { Favor } = require('../models/favor')
class FavorDao  {
  // 业务表
  static async like(art_id, type, uid) {
      const favor = await Favor.findOne({
          where: {
              art_id,
              type,
              uid
          }
      })
      if (favor) {
          throw new global.errs.LikeError()
      }
      return sequelize.transaction(async t => {
          await Favor.create({
              art_id,
              type,
              uid
          }, {
              transaction: t
          })
          const art = await ArtDao.getData(art_id, type, false)
          await art.increment('fav_nums', {
              by: 1,
              transaction: t
          })
      })
  }

  static async disLike(art_id, type, uid) {
      const favor = await Favor.findOne({
          where: {
              art_id,
              type,
              uid
          }
      })
      if (!favor) {
          throw new global.errs.DislikeError()
      }
      // Favor 表 favor 记录
      return sequelize.transaction(async t => {
          await favor.destroy({
              force: true,
              transaction: t
          })
          const art = await ArtDao.getData(art_id, type, false)
          await art.decrement('fav_nums', {
              by: 1,
              transaction: t
          })
      })
  }

  static async userLikeIt(art_id, type, uid) {
      const favor = await Favor.findOne({
          where: {
              uid,
              art_id,
              type,
          }
      })
      return favor ? true : false
  }

  static async getMyClassicFavors(uid) {
      const arts = await Favor.findAll({
          where: {
              uid,
              type:{
                  [Op.not]:400,
              }
          }
      })
      if(!arts){
          throw new global.errs.NotFound()
      }
     
      return await ArtDao.getList(arts)
  }

  static async getBookFavor(uid, bookID){
      const favorNums = await Favor.count({
          where: {
              art_id:bookID,
              type:400
          }
      })
      const myFavor = await Favor.findOne({
          where:{
              art_id:bookID,
              uid,
              type:400
          }
      })
      return {
          fav_nums:favorNums,
          like_status:myFavor?1:0
      }
  }
}


module.exports = {
  FavorDao
}

