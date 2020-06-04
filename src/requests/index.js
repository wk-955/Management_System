import axios from 'axios'
import {message} from 'antd'


export const picURL="http://192.168.80.97:5000/api/v1"
const baseURL='http://192.168.80.97:5000/api/v1'
const redictURL= "http://192.168.80.97:3000"


// export const picURL="http://192.168.80.120:5000/api/v1"
// const baseURL='http://192.168.80.120:5000/api/v1'
// const redictURL= "http://192.168.80.120:5000"

export const services = axios.create({
    baseURL
})

export const fetch = axios.create({
    baseURL
})

export const uploadfetch = axios.create({
    baseURL
})

export const downloadfetch = axios.create({
    baseURL
})


services.interceptors.request.use(config=>{
    config.headers.Authorization = 'Token '+window.localStorage.getItem('Token') || window.sessionStorage.getItem('Token')
    config.data = Object.assign({},config.data)
    return config
})

services.interceptors.response.use(resp=>{
        return resp.data
    },
    (err)=>{
        if(err.response.status===401 || err.response.status===403){
            window.localStorage.clear()
            window.sessionStorage.clear()
            window.location.replace(redictURL+"/login");
        }else if(err.response.status===400){
            window.location.replace(redictURL+"/manager/404")
        }
    }
)

uploadfetch.interceptors.request.use(config=>{
    config.headers.Authorization = 'Token '+window.localStorage.getItem('Token') || window.sessionStorage.getItem('Token')
    return config
})

uploadfetch.interceptors.response.use(resp=>{
        return resp.data
},
(err)=>{
    if(err.response.status===401 || err.response.status===403){
        window.localStorage.clear()
        window.sessionStorage.clear()
        window.location.replace(redictURL+"/login");
    }else if(err.response.status===400){
        window.location.replace(redictURL+"/manager/404")
    }
}
)
downloadfetch.interceptors.request.use(config=>{
    config.headers.Authorization = 'Token '+window.localStorage.getItem('Token') || window.sessionStorage.getItem('Token')
    config.responseType='blob'
    return config
})


export const register_postdata =(table,data) =>{
    let savecode = true
    services.post('/register'+table,data).then((resp)=>{
        // console.log('post-rep',resp)
        if (resp.code===200){
            message.success('保存成功')
        }else{
            savecode = false
            message.error('保存失败')
        }
    })
    return savecode
}


export const register_getgroup = () =>{
    let savecode = {}
    services.get('/register/getGroup').then((resp)=>{
        // console.log('post-rep',resp)
        if (resp.code===200){

            savecode ={...resp.data}
        }
    })
    console.log(savecode)
    return savecode
}