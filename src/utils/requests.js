
//定制请求实例
import axios from "axios";

const baseUrl = '/api';

const instance = axios.create({baseUrl});

import { showToast ,showNotify} from 'vant';



//添加响应拦截器

instance.interceptors.response.use(
    response =>{
        //判断业务状态码
        if(response.status === 200){
            console.log(response.data)
             return response.data;
        }
        //操作失败
        showNotify({ type: 'danger', message: '服务器异常' });
        console.log("操作失败")
       return Promise.reject(response.data);

    },
    //失败
    error =>{
           console.log("服务异常")
           showNotify({ type: 'danger', message: '服务器异常' });
           return Promise.reject(error); 
    }

)

//导出
export default instance;
