const { HotBook } = require('../models/hot-book')
const { Favor } = require('../models/favor')
const {Sequelize,Op} = require('sequelize')



class HotBookDao {
  // 创建
  static async createBook(v) {

    // 检测是否存在文章
    const hasBook = await HotBook.findOne({
        where: {
            title: v.get('body.title'),
            deleted_at: null
        }
    });

    // 如果存在，抛出存在信息
    if (hasBook) {
        throw new global.errs.Existing('书籍已存在');
    }

    // 创建文章
    const book = new HotBook();

    book.title = v.get('body.title');
    book.author = v.get('body.author');
    book.image = v.get('body.image');
    book.summary = v.get('body.summary');


    book.save();
}

    static async getAll(page){
        if(page){
            const pageSize = 10;
            let arr = []

            // 筛选方式
            let filter = {
                deleted_at: null
            };

            const book = await HotBook.findAndCountAll({
                limit: pageSize,//每页10条
                offset: (page - 1) * pageSize,
                where: filter,
                // order: [
                //     [index, 'DESC']
                // ]
            });
            // console.log(book)
            book.rows.forEach((book)=>{
                
                if(book.keys = 'dataValues'){
                    // console.log(book.keys)
                    // console.log(book.dataValues)
                    let obj = {
                        id:book.dataValues.id,
                        index:book.dataValues.index,
                        image:book.dataValues.image,
                        author:book.dataValues.author,
                        title:book.dataValues.title,
                        summary:book.dataValues.summary
                    } 
                    arr.push(obj)
                }
                
            })
            arr.push({
                count:book.count
            })
            // console.log(arr)
            return arr 
            
        }else{
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
            //console.log(books)
            return books
        }
 
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

      static async destroyBook(id) {
        // 查询分类
        const book = await HotBook.findOne({
            where: {
                id
            }
        });
        if (!book) {
            throw new global.errs.NotFound('没有找到相关书籍');

        }
        book.destroy()
    }

    static async updateBook(id, v) {
        // 查询文章
        const book = await HotBook.findByPk(id);
        if (!book) {
            throw new global.errs.NotFound('没有找到相关文章');
        }

        // 更新文章
        book.title = v.get('body.title');
        book.author = v.get('body.author');
        book.image = v.get('body.image');
        book.summary = v.get('body.summary');
        // book.browse = v.get('body.browse');
        // book.category_id = v.get('body.category_id');

        article.save();
    }
}

module.exports = {
  HotBookDao
}