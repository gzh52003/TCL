<template>
<div>
  <div id="main" style="width: 600px;height: 400px;" ref="myEchart"></div>
  <div id="main2" style="width: 600px;height: 400px;position:absolute;top:100px;right:20px" ref="myEchart2"></div>

  </div>
</template>






<script>
import '../../node_modules/echarts/map/js/china.js' 

export default {
  methods: {
    get(){
      let main=this.$refs.myEchart2
var mychart = this.$echarts.init(main);

var option = {
    title: {
        text: "商品类别销售占比",
        // subtext: "纯属虚构",
        left: "center"
    },
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c}次 ({d}%)"
    },
    legend: {
        orient: "vertical",
        left: "50",
        data: ["空调", "电视", "冰箱", "洗衣机", "健康电器","智能硬件"]
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {
                show: true,
                readOnly: true
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    series: [
        {
            name: "访问来源",
            type: "pie", // 图例类型是饼图
            radius: "55%", // radius半径 = Math.min(容器的宽度,容器的高度)/2 * radius给出的百分比
            center: ["50%", "60%"], // 圆心的坐标点
            data: [
                {
                    value: 335, // 具体的数值
                    name: "空调" // 每个扇形的代表的数据的名称
                },
                {
                    value: 310,
                    name: "电视"
                },
                {
                    value: 234,
                    name: "冰箱"
                },
                {
                    value: 135,
                    name: "洗衣机"
                },
                {
                    value: 1548,
                    name: "健康电器"
                },
                {
                    value: 1548,
                    name: "智能硬件"
                }
            ]
        }
    ]
}

mychart.setOption(option);
    },

    getdata() {
      let main = this.$refs.myEchart
   
      var mychart = this.$echarts.init(main);
      // var option = {
      //     series:[
      //         {
      //             type:"map",
      //             map:"北京"
      //         }
      //     ]
      // }
      function randomData() {
        return Math.round(Math.random() * 60);
      }
      var mydata = [
        { name: "北京", value: "100" },
        { name: "天津", value: randomData() },
        { name: "上海", value: randomData() },
        { name: "重庆", value: randomData() },
        { name: "河北", value: randomData() },
        { name: "河南", value: randomData() },
        { name: "云南", value: randomData() },
        { name: "辽宁", value: randomData() },
        { name: "黑龙江", value: randomData() },
        { name: "湖南", value: randomData() },
        { name: "安徽", value: randomData() },
        { name: "山东", value: randomData() },
        { name: "新疆", value: randomData() },
        { name: "江苏", value: randomData() },
        { name: "浙江", value: randomData() },
        { name: "江西", value: randomData() },
        { name: "湖北", value: randomData() },
        { name: "广西", value: randomData() },
        { name: "甘肃", value: randomData() },
        { name: "山西", value: randomData() },
        { name: "内蒙古", value: randomData() },
        { name: "陕西", value: randomData() },
        { name: "吉林", value: randomData() },
        { name: "福建", value: randomData() },
        { name: "贵州", value: randomData() },
        { name: "广东", value: randomData() },
        { name: "青海", value: randomData() },
        { name: "西藏", value: randomData() },
        { name: "四川", value: randomData() },
        { name: "宁夏", value: randomData() },
        { name: "海南", value: randomData() },
        { name: "台湾", value: randomData() },
        { name: "香港", value: randomData() },
        { name: "澳门", value: randomData() },
      ];
      var option = {
        backgroundColor: "#FFFFFF",
        title: {
          text: "各地区消费人数",
          subtext: "",
          x: "center",
        },
        // tooltip : {
        //     trigger: 'item'
        // },

        //左侧小导航图标
        visualMap: {
          show: true,
          x: "left",
          y: "center",
          splitList: [
            { start: 50, end: 60 },
            { start: 40, end: 50 },
            { start: 30, end: 40 },
            { start: 20, end: 30 },
            { start: 10, end: 20 },
            { start: 0, end: 10 },
          ],
          color: [
            "#5475f5",
            "#9feaa5",
            "#85daef",
            "#74e2ca",
            "#e6ac53",
            "#9fb5ea",
          ],
        },

        //配置属性
        series: [
          {
            name: "数据",
            type: "map",
            mapType: "china",
            roam: true,
            label: {
              normal: {
                show: true, //省份名称
              },
              emphasis: {
                show: false,
              },
            },
            data: mydata, //数据
          },
        ],
      };
      mychart.setOption(option);
    },
  },
  mounted(){
    this.getdata()
    this.get()
  }
};
</script>



