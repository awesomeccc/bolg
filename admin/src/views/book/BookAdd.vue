<template>
  <Form
    :model="formLeft"
    label-position="left"
    ref="formLeft"
    :rules="ruleValidate"
    :label-width="100"
  >
    <div class="title">新建图书</div>
    <FormItem label="Title"  prop="title">
      <Input v-model="formLeft.title"></Input>
    </FormItem>
    <FormItem label="author"  prop="author">
      <Input v-model="formLeft.author"></Input>
    </FormItem>
    <FormItem label="image address"  prop="image">
      <Input v-model="formLeft.image"></Input>
    </FormItem>
    <FormItem label="summary"  prop="summary" >
      <Input v-model="formLeft.summary" type="textarea" :rows="4" placeholder="Enter 
      something..." />
    </FormItem>
    <FormItem>
      <Button @click="handleReset('formLeft')">重置</Button>
      <Button type="primary" @click="handleSubmit('formLeft')" style="margin-left: 8px">提交</Button>
    </FormItem>
  </Form>
</template>
<script>
import book from "../../api/book";

export default {
  data() {
    return {
      id: this.$route.params.id,
      formLeft: {
        title: "",
        author: "",
        image: "",
        summary: ""
      },
      ruleValidate: {
        title: [
          { required: true, message: "书籍标题不能为空", trigger: "blur" }
        ],
        author: [
          { required: true, message: "书籍作者不能为空", trigger: "blur" }
        ],
        image: [
          { required: true, message: "书籍封面不能为空", trigger: "blur" }
        ],
        summary: [
          { required: true, message: "书籍概要不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async _createBook() {
      try {
        await book.createBook(this.formLeft);
        this.$Message.success("新增成功!");
        this.$router.push("/book");
      } catch (e) {}
    },
    // 提交
   handleSubmit(name) {
      this.$refs[name].validate( async valid => {
        if (valid) {
       let res = await book.create(this.formLeft);
        // console.log(res)
      
          this.$Message.success("Success!");
          this.$router.push("/book");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style>
.title {
  height: 29px;
  line-height: 29px;
  color: blueviolet;
  font-size: 16px;
  font-weight: 500;
  text-indent: 40px;
  border-bottom: 1px solid #dae1ec;
}
</style>

