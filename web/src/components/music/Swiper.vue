<template>
  <div>
    <el-carousel :interval="4000" type="card" height="260px">
      <el-carousel-item v-for="item in recommends" :key="item.id">
        <a :href="item.linkUrl">
          <img class="needsclick"  :src="item.picUrl">
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getRecommend } from "../../api/music/recommend.js";
import { get } from "http";
export default {
  data() {
    return {
      recommends: []
    };
  },
  created() {
    this._getRecommend();
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        this.recommends = res.data.slider;
        console.log(res.data);
      });
    }
  }
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.needsclick {
  width: 100%;
}
</style>