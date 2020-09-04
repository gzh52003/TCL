const common = {
    state:{
        // 初始为显示
        showTabbar:true
    },
    getters:{
    },
    mutations:{
        // 改变showtabbar的显示状态
        displayTabbar(state,payload){
            state.showTabbar = payload;
        },
    },
    actions:{

    }
}

export default common;
