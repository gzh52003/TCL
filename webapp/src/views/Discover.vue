<template>
  <div id="discover">
    <!-- 头部栏 -->
    <van-nav-bar title="分类" left-arrow @click-left="onClickLeft" />
    <!-- 分类选择 -->
    <van-row>
      <van-col span="5">
        <ul>
          <!-- 选项卡 -->
          <li
            v-for="(item,idx) in items"
            :key="idx"
            :class="idx==active?'active':''"
            @click="changeMenu(idx)"
          >
            <img class="classification" v-if="idx==active" :src="publicPath+item.actionsIco" alt />
            
            <img class="classification" v-else :src="publicPath+item.ico" alt />
            {{item.text}}
          </li>
        </ul>
      </van-col>
      <van-col span="19" >
        
          <discover-list :transfer="contentData"/>
        
      </van-col>
    </van-row>
  </div>
</template>

<script>
import DiscoverList from "./Discover-module/discover-list"
import Vue from "vue";
import {
  TreeSelect,
  NavBar,
  Col,
  Row,
  Image as VanImage,
  Divider,
  Grid,
  GridItem,
  Card,
} from "vant";
Vue.use(NavBar);
Vue.use(TreeSelect);
Vue.use(Row);
Vue.use(Col);
Vue.use(VanImage);
Vue.use(Divider);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Card);
export default {
  name: "List",
  components:{
      DiscoverList
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      active: 0,
    //   左侧资料
      contentData:{},
      items: [
        {
          text: "空调",
          ico: "vue-ico/kontiao-gray.png",
          actionsIco: "vue-ico/kontiao-red.png",
          
        },
        {
          text: "电视",
          ico: "vue-ico/television-gray.png",
          actionsIco: "vue-ico/television-red.png",
          
        },
        {
          text: "冰箱",
          ico: "vue-ico/binxiang-gray.png",
          actionsIco: "vue-ico/binxiangred.png",
          
        },
        {
          text: "洗衣机",
          ico: "vue-ico/washing-gray.png",
          actionsIco: "vue-ico/washing-red.png",
          
        },
        {
          text: "健康电器",
          ico: "vue-ico/Health-gray.png",
          actionsIco: "vue-ico/Health-red.png",
          
        },
        {
          text: "智能硬件",
          ico: "vue-ico/intelligent-gray.png",
          actionsIco: "vue-ico/intelligent-red.png",
          
        },
        {
          text: "其他",
          ico: "vue-ico/other.png",
          actionsIco: "vue-ico/other-red.png",
          
        },
      ],
    };
  },
  methods: {
    onClickLeft() {
      //通知父组件收起弹出分类
      this.$emit("update:switch", false);
    },
    //切换商品类选项
    changeMenu(idx) {
      this.active = idx;
    },
  },
  async created(){
  let id="5f522e5752830a33de95b427"
    const {data:{data:result}}=await this.$request.get('good/list/'+id)
    console.log(result[0]);
    this.contentData=result[0]
  },
  mounted(){
      console.log(this.$el);
  }
};
</script>
<style lang="scss">
html,
body {
  height: 100%;
}
.active {
  color: #ff4545 !important;
  background-color: #fff;
  border-left: 2px solid #ff4545;
}
#discover {
  height: 100%;
  padding: 50px 0 0;
  box-sizing: border-box;
  //头部
  .van-nav-bar {
    height: 50px;
    margin: -50px 0 0;
    .van-nav-bar__left {
      i {
        &::before {
          color: #5c5c5c;
        }
      }
    }
    .van-nav-bar__title {
      color: #5c5c5c;
    }
  }

  .van-row {
    min-height: 100%;
    display: flex;
    .van-col {
      background-color: #f6f6f6;
    }
    .van-col--5 {
      ul {
        li {
          text-align: center;
          height: 70px;
          font-size: 15px;
          position: relative;
          padding-top: 15px;
          box-sizing: border-box;
          //   border-bottom: 1px solid #fff;
          //   border-right: 1px solid #eee;
          color: #999;
          .classification {
            display: block;
            height: 21px;
            width: 21px;
            margin: 0 auto 7px;
          }
        }
      }
    }
    .van-col--19 {
      background-color: #fff;
      
    }
  }
}
</style>
