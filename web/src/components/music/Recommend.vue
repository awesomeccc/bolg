<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4" v-for="(o, index) in listItem" :key="index" class="card">
        <el-card :body-style="{ padding: '0', height:'200px',display: 'block'}" shadow="never">
          <div>{{o.creator.name}}</div>
           <div class="wrapper">{{o.dissname}}</div>
           <div  @click="selectItem(o)">
          <img v-lazy="o.imgurl" class="image">
          </div>
         
          <!-- <div style="padding: 8px;">
            <span>
              <p>{{o.creator.name}}</p>
            </span>
          </div> -->
        </el-card>
      </el-col>
    </el-row>
    <loading v-show="!listItem.length"></loading>
  </div>
</template>
<script>
import { getDiscList } from "../../api/music/recommend.js";
import { mapMutations } from "vuex";
import Loading from "../Loading.vue";

export default {
  data() {
    return {
      listItem: []
    };
  },
  methods: {
    _getDiscList() {
      getDiscList().then(res => {
       // console.log(res);
        if (res.code === 0) {
          //console.log(res);
          this.listItem = res.data.list;
        } else {
          console.log("歌单请求失败");
        }
      });
    },
    selectItem(item) {
      this.$router.push({
        path: `/music/${item.dissid}`
      });
      //console.log(item);
      this.setDisc(item);
    },
    ...mapMutations({
      setDisc: "music/SET_DISC"
    })
  },
  mounted() {
    this._getDiscList();
  },
  components: {
    Loading
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
  position: relative;
  display: block;
}
.image {
  width: 100%;
  height: 100%;
  display: block;
}
.wrapper {
  width: 100%;
  max-height: 20%;
  bottom: 0;
  background-color: rgba(81, 90, 218, 0.35);
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
  /* .loading-container{
     position: absolute;
     width: 100%;
     top: 50%;
     transform: translateY(-50%);
   } */
       
</style>
