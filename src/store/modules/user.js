import firebase from 'firebase/app'
import 'firebase/auth'
import { currentUser, isAuthGuardActive } from '../../constants/config'
import { setCurrentUser, getCurrentUser } from '../../utils'

export default {
  state: {
 //   currentUser: isAuthGuardActive ? getCurrentUser() : currentUser,
    currentUser : isAuthGuardActive ? getCurrentUser() : currentUser,
    loginError: null,
    processing: false,
    forgotMailSuccess: null,
    resetPasswordSuccess: null
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError,
    forgotMailSuccess: state => state.forgotMailSuccess,
    resetPasswordSuccess: state => state.resetPasswordSuccess,
  },
  mutations: {
    setUser(state, payload) {
      console.log(state.currentUser)
      console.log(payload)
      state.currentUser = payload
      console.log(state.currentUser)
      state.processing = false
      state.loginError = null
    },
    setLogout(state) {
      state.currentUser = null
      state.processing = false
      state.loginError = null
    },
    setProcessing(state, payload) {
      state.processing = payload
      state.loginError = null
    },
    setError(state, payload) {
      state.loginError = payload
      state.currentUser = null
      state.processing = false
    },
    setForgotMailSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.forgotMailSuccess = true
    },
    setResetPasswordSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.resetPasswordSuccess = true
    },
    clearError(state) {
      state.loginError = null
    }
  },
  actions: {
    login({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)

      fetch('https://dev.quotation.node.zoomit.co.id/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({
          query: `
          query{
            login(phone:"${payload.email}" password:"${payload.password}"){
              user{
                name
                id
                phone
                photo
                email
                role{
                  id
                  name
                }
                target_liter
                target_rupiah
                reference_accurate_id_1
                reference_accurate_id_2
              }
              token
              refreshToken
            }
          }
      `

      // query{
      //   login(phone:"${payload.email}" password:"${payload.password}"){
      //     user{
      //       name
      //       id
      //       phone
      //       photo
      //       email
      //       role{
      //         id
      //         name
      //       }
      //       omzet_rupiah
      //       omzet_liter
      //       reference_accurate_id_1
      //       reference_accurate_id_2
      //     }
      //     token
      //     refreshToken
      //   }
      // }
      }),
    }).then(function(response) {
      console.log(response)
        return response.json()
    }).then(function(text) {
      console.log(text)
        return text.data.login;
    })
    .then(resp => {
        if(resp == null){
          setCurrentUser(null);
          commit('setError', 'Username / password tidak valid')
          setTimeout(() => {
            commit('clearError')
          }, 3000)
        }else{
          const currentUser ={
              id: resp.user.id,
              email : resp.user.email,
              pass: payload.password,
              phone : resp.user.phone,
              title: resp.user.name,
              img: '/assets/img/profiles/l-1.jpg',
              date: 'Last seen today '+ new Date().getHours+":"+new Date().getMinutes,
              role: resp.user.role.id,
              oRp: resp.user.target_rupiah,
              oLtr: resp.user.target_liter,
              ref1: resp.user.reference_accurate_id_1,
              ref2 : resp.user.reference_accurate_id_2,
              jwt : resp.token,
              refreshtoken : resp.refreshToken
            };
          const item = {token:resp.token,...currentUser } //2 jam untuk ... :v
          setCurrentUser(item)
          console.log(item)
          commit('setUser', item)
        }
      });

    },


    signOut({ commit }) {
      setCurrentUser(null);
      commit('setLogout')
    }
  }
}
