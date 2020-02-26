import Vue from 'vue'
import allapi from './allapi'
import base from './config'
import axios from 'axios'
import router from '../router/index'


let xhr = {
  get(url,params){
    return new Promise((resolve,reject) => {
      base.get(allapi[url],{params}).then(res => {
        if(res.data.isLogin == false){
          router.push('/login')
          }
        resolve(res.data)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  post(url,params){
    return new Promise((resolve,reject) => {
      base.post(allapi[url],params).then(res => {
        if(res.data.isLogin == false){
          router.push('/login')
        }
        resolve(res.data)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  qiniuGet(){
    return new Promise((resolve,reject) => {
      axios.get('/crm/token/upload').then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })

  }
}

Vue.prototype.$axios = xhr;


