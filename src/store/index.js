import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        // 用户头像
        userIcon:"",
        // 用户的名字
        username:"",
        // 用户的角色
        role:""
    },
    mutations:{
        // 修改头像
        changeIcon(state,newIcon){
            state.userIcon = newIcon
        },
        // 修改名字
        changeName(state,newName){
            state.username = newName
        },
        // 修改角色
        changeRole(state,newRole){
            state.role = newRole
        }
    }
})

export default store