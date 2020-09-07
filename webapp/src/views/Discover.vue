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
            v-for="(item,idx) in contentData"
            :key="idx"
            :class="idx==active?'discoverActive':''"
            @click="changeMenu(idx)"
          >
            <img
              class="classification"
              v-if="idx==active"
              :src="item.data.data[0].retData.colorIcon"
              alt
            />

            <img class="classification" v-else :src="item.data.data[0].retData.icon" alt />
            {{item.data.data[0].retData.titleName}}
          </li>
        </ul>
      </van-col>
      <van-col span="19" :style="{height:this.el_height}">
        <discover-list :transfer="contentData" :transferIdx="active" />
      </van-col>
    </van-row>
  </div>
</template>

<script>
import DiscoverList from "./Discover-module/discover-list";
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
  components: {
    DiscoverList,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      active: 0,
      //   左侧资料
      el_height:null,
      contentData: [],
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
      console.log(idx);
    },
  },
  async created() {
    let idList = [
      "5f522e5752830a33de95b427",
      "5f522e8252830a33de95b42f",
      "5f522e9452830a33de95b432",
      "5f522eb652830a33de95b439",
      "5f522ece52830a33de95b43d",
      "5f522ee752830a33de95b442",
    ];
    let data;
    idList.forEach(async (item) => {
      data = await this.$request.get("good/list/" + item);
      this.contentData.push(data);
    });
    console.log("this.contentData=", this.contentData);
    // let {
    //   data: { data: result },
    // } = await this.$request.get("good/list/" + idList[0]);

    // console.log(result[0]);
    // this.contentData=result[0]
  },
  mounted() {
    this.el_height= getComputedStyle(this.$el.lastElementChild).height
  },
};
</script>

<style lang="scss" >
html,
body {
  height: 100%;
}
.discoverActive {
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
      overflow-y: auto;
    }
  }
}
</style>
