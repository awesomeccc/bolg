const Router = require('koa-router')


const {
    HotBookDao
} = require('../../dao/hot-book')
const {
    Book
} = require('../../models/book')
const {
    FavorDao
} = require('../../dao/favor')
const {
    Comment
} = require('../../models/book-comment')
const {
    PositiveIntegerValidator,
    SearchValidator,
    AddShortCommentValidator,
    BookValidator
} = require('../../validators/book')

const {success} = require('../../lib/helper')

const {
    Auth
} = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/book'
})

const AUTH_ADMIN = 16;

router.get('/hot_list', async (ctx, next) => {
   // console.log(HotBookDao)
   const {page} = ctx.query;
   console.log(ctx.query)
   if(page){
   ctx.body =  await HotBookDao.getAll(page)
   }else {
    ctx.body = await HotBookDao.getAll()
   }
   
   // ctx.body = books
})

router.get('/:id/detail', async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    const book = new Book()
    ctx.body = await book.detail(v.get('path.id'))
})

router.get('/search', async ctx => {
    const v = await new SearchValidator().validate(ctx)
    const result = await Book.searchFromYuShu(
        v.get('query.q'), v.get('query.start'), v.get('query.count'))
    ctx.body = result
})

router.get('/favor/count', new Auth().m, async ctx => {
    const count = await Book.getMyFavorBookCount(ctx.auth.uid)
    ctx.body = {
        count
    }
})

router.get('/:book_id/favor', new Auth().m, async ctx => {
    const v =await new PositiveIntegerValidator().validate(ctx, {
        id: 'book_id'
    })
    const favor = await FavorDao.getBookFavor(
        ctx.auth.uid, v.get('path.book_id'))
    ctx.body = favor
})

router.post('/add/short_comment', new Auth().m, async ctx => {
    const v = await new AddShortCommentValidator().validate(ctx,{
        id:'book_id'
    })
    Comment.addComment(v.get('body.book_id'),v.get('body.content'))
    success()
})

router.get('/:book_id/short_comment', new Auth().m, async ctx=>{
    const v = await new PositiveIntegerValidator().validate(ctx,{
        id:'book_id'
    })
    const book_id = v.get('path.book_id')
    const comments = await Comment.getComments(book_id)
    ctx.body = {
        comments,
        book_id
    }
})

router.post('/add/book', new Auth(AUTH_ADMIN).m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new BookValidator().validate(ctx);

    // 创建文章
    await HotBookDao.createBook(v);

    // 返回结果
    ctx.response.status = 200;
    success();
});


/**
 * 删除书籍
 */
router.delete('/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveIntegerValidator().validate(ctx);

    // 获取分类ID参数
    const id = v.get('path.id');
    // 删除分类
    await HotBookDao.destroyBook(id);

    ctx.response.status = 200;
    ctx.body = {
        id,
        message: "删除成功"
    }
})

/**
 * 更新书籍
 */

router.put('/book/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

    // 通过验证器校验参数是否通过
    const v = await new PositiveIntegerValidator().validate(ctx);

    // 获取书籍ID
    const id = v.get('path.id');
    // 更新文章
    await ArticleDao.updateBook(id, v);

    ctx.response.status = 200;
    ctx.body = res.success('更新书籍成功');
})
router.get('/hot_keyword', async ctx => {
    ctx.body = {
        'hot': ['Python',
            '哈利·ccblog特',
            '村上春树',
            '东野圭吾',
            '白夜行',
            '韩寒',
            '金庸',
            '王小ccblog'
        ]
    }
    // 搜索次数最多
    // 一部分参考算法，人工编辑
    // Lin-CMS，编辑热门关键字的功能
})

// 爬虫 必备工具 数据处理和分析
// KOA
// Python 爬虫工具 requests，BF4，Scrapy
// node.js 正则表达式
// 找工作 第二语言

module.exports = router