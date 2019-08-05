<template>
  <section>
    <Button type="primary" @click="toPathLink('/book/create')" icon="md-add" style="margin-bottom: 16px;">新增图书
    </Button>

    <section v-if="list">
      <Table border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="update(row.id)">编辑</Button>
          <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
        </template>
      </Table>
    </section>

       <section class="page">
        <Page :total="count" :page-size="10" :current="currentPage" show-total
        @on-change="handlePage"></Page>
      </section>

  </section>
</template>

<script>
  import book from '../../api/book'

  export default {
    name: "list",
    data() {
      return {
        list: [],
        currentPage: 1,
        count: null,
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 80,
            align: "center"
          },
          {
            title: 'title',
            key: 'title'
          },
          {
            title: 'author',
            key: 'author'
          },
          {
            title: 'image',
            key: 'image'
          },
          {
            title: 'summary',
            key: 'summary'
          },
          {
            title: 'Action',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ]
      }
    },
    created() {
      this._getBooks();
    },
    methods: {

      // 获取分类
      async _getBooks() {
        const res = await book.getBooks({
          page: this.currentPage
        });
        this.list = res.data;
        this.count = this.list.pop().count

        console.log(this.count)
        // console.log(this.list)
      },
        handlePage(page) {
        // this.$router.replace({
        //   query: merge(this.$route.query, {
        //     page
        //   })
        // });
        this.currentPage = page;
        this._getBooks();
      },
      // 路由跳转
      toPathLink(path) {
        this.$router.push(path)
      },
      // 更新
      update(id) {
        this.$router.push(`/book/update/${id}`);
      },
      // 删除分类
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此书籍吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await book.destroy(id);
              this.$Message.success('删除成功');

              this._getBooks();

            } catch (e) {
              this.$Message.error(e);

            } finally {
              this.$Modal.remove();
            }

          },
          onCancel: () => {
            this.$Message.warning('取消！');
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
