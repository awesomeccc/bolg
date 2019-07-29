const { HotBook } = require('../models/hot-book')
const { Favor } = require('../models/favor')
const {Sequelize,Op} = require('sequelize')



class HotBookDao {
    static async getAll(){
        const books =await HotBook.findAll({
            order:[
                'index'
            ]
        })
        const ids = []
        books.forEach((book)=>{
            ids.push(book.id)
        })
        const favors =await Favor.findAll({
            where:{
                art_id:{
                    [Op.in]:ids,
                },
                type:400
                // 国画
                // 漫画
            },
            group:['art_id'],
            attributes:['art_id', [Sequelize.fn('COUNT','*'),'count']]
        })
        books.forEach(book=>{
          HotBookDao._getEachBookStatus(book, favors)
        })
        //python 二维矩阵
        return books
      }
      
      static _getEachBookStatus(book, favors){
        let count = 0
        favors.forEach(favor=>{
            if(book.id === favor.art_id){
                count = favor.get('count')
            }
        })
        book.setDataValue('fav_nums',count)
        return book
      }
}

module.exports = {
  HotBookDao
}