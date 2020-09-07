
import request from '../utils/request'
import {Notify} from 'vant'

const cart = {
    // 添加命名空间
    // namespaced:true,
    // 共享的数据：类似组件中的data
    state:{
        // 商品数据集合
        goodslist:[],
      
    },
    getters:{
        // 计算购物车总金额（这里面的单位是分，要乘以100）
        // 先判断是否有勾选，有勾选则计算，没勾选的不计算
        totalPrice(state){
            // return state.goodslist.reduce((pre,item)=>pre+item.price*item.qty,0)*100;
            let sum=0
           for(let i =0;i<state.goodslist.length;i++){
               if(state.goodslist[i].checked==false){
                   continue
               }
                    sum+=state.goodslist[i].price*state.goodslist[i].qty*100
           }
           return sum

           
        },
      
    },

    // 定义修改state的事件
    // 调用：this.$store.commit('add')
    mutations:{
        initCart(state,data){
            state.goodslist = data;
        },
        // 添加商品到购物车
        add(state,goods){
            state.goodslist.unshift(goods)
            // console.log('add to cart',goods)
        },
        // 初始化购物车页面
        GO(state,data){
            state.goodslist = data;
        },
        // 修改数量
        changeQty(state,{_id,qty}){
            state.goodslist = state.goodslist.map(item=>{
                if(item._id === _id){
                    item.qty = qty;
                }
                return item;
            });
        },

        // // 删除商品
        remove(state,_id){
            state.goodslist = state.goodslist.filter(item=>item._id!==_id)
            Notify("已成功删除")
        },

        // // 清空购物车
        clear(state){
            state.goodslist = []
            Notify("已成功清空购物车")
        }
        
    },

    actions:{
        // 根据库存数量来判断是否允许更改购物车商品数量
        async changeQtyAsync(context,{_id,qty}){
            console.log('context=',context);
            // 发起ajax请求，获取当前商品的库存数量
            // 库存>=qty：允许修改购物车商品数量
            // 库存<qty：不允许增加购物车商品数量
            const {data} = await request.get(`/good/${_id}/kucun`)
            const kucun = data.data;
            console.log('kucun=',kucun)

            if(kucun<qty){
                Notify({ type: 'danger', message: '库存不足' })
                qty = kucun;
            }
            context.commit('changeQty',{_id,qty})
        },
        // async getCart(){
        //     const {data} = await request.get(`/cart`);
        //     context.commit('initCart',data.data)

        // }
    }
}

export default cart;