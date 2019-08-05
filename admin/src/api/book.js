import fetch from './fetch';

export default {
  // 获取期刊列表
  getBooks(params) {
    return fetch.get('book/hot_list', params)
  },

  // 搜索文章列表
  search(params) {
    return fetch.get('/search/article', params)
  },

  // 获取文章详情
  detail(params) {
    const {id} = params;
    delete params.id;

    return fetch.get('/article/' + id, params);
  },

  // 更新文章
  update(params) {
    const {id} = params;
    delete params.id;
    return fetch.put('/book/' + id, params)
  },

  // 删除文章
  destroy(id) {
    return fetch.delete('/book/' + id)
  },

  // 创建文章
  create(params) {
    return fetch.post('/book/add/book', params);
  }
}
