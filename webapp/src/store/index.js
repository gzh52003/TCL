import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    // 共享的数据：类似组件中的data
    state:{
        goodslist:[]
    },
    getters:{
      // 计算总价
        totalPrice(state){
            return state.goodslist.reduce((pre,item)=>pre+item.price*item.qty,0)*100;
        }
    },

    // 定义修改state的事件
    // 调用：this.$store.commit('add')
    mutations:{
        // 添加商品到购物车
        add(state,goods){
            state.goodslist.unshift(goods)
        },

        // 修改数量
        changeQty(state,{_id,qty}){
            state.goodslist = state.goodslist.map(item=>{
                if(item._id === _id){
                    item.qty = qty;
                }
                return item;
            })
        },

        // 删除商品
        remove(state,_id){
            state.goodslist = state.goodslist.filter(item=>item._id!==_id)
        },

        // 清空购物车
        clear(state){
            state.goodslist = []
        }
        
    }
})

export default store;