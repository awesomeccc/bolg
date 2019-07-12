<template>
  <el-row :gutter="20" >
    <el-col :span="4" v-for="(o, index) in listItem" :key="index" class ='card'>
      <el-card :body-style="{ padding: '0' }">
        <div class='img-container'>
           <img
          v-lazy="o.imgurl"
          class="image"
        >
        <p class="wrapper">{{o.dissname}}
          </p>
        </div>
        <div style="padding: 8px;">
          <span><p>{{o.creator.name}}</p></span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { getDiscList } from "../../api/music/recommend.js";
export default {
  data() {
    return {
      listItem: []
    };
  },
  methods: {
    _getDiscList() {
      getDiscList().then(res => {
        console.log(res)
        if(res.code ===0) {
          console.log(res)
          this.listItem = res.data.list;
        }else {
          console.log('歌单请求失败')
        }
      });
    }
  },
  mounted(){
    this._getDiscList()
  }
};
</script>
export default {
    data() {
    return {
      currentDate: new Date()
    };
  }
}
<style>
.img-container {
  position: relative
}
.image {
  width: 100%;
  display: block;
}
.wrapper {
  width: 100%;
  max-height: 20%;
  position: absolute;
  bottom: 0;
  background-color:rgba(81, 90, 218, 0.35);
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
