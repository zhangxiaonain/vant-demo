//用户登录
import {setWithTimer} from "@/tools";

async  function userLogin (userName, password) {
    try {
        const response = await fetch(`/api/user/userLogin?userName=${userName}&password=${password}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }


        })
        if(!response.ok) {
            throw new Error(`登录 error! status: ${response.status}`);



        }
        const result = await response.json();
        console.log(result);
        if (result.code === 200) {
            console.log('登录成功', result.data);
            localStorage.setItem('user',JSON.stringify(result.data));
            localStorage.setItem('user_id',result.data.id);



            const text =  JSON.parse(localStorage.getItem('user'))
            console.log("user:----"+ text.id);
            const isLoggedIn = 'user_id';
            const timeToLive = 3600000;
            setWithTimer(isLoggedIn, localStorage.getItem('user_id'), timeToLive);

            return result.data;
        } else {
            console.log('登录失败', result.message);
            return null;
        }
    }catch (error) {
        console.log('登录出错了'+error);
    }
}

//用户删除自己的评论
async function deleteCommentById(id) {
    try {
        const response = await fetch( `/api/comment/deleteComment?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
             // body: JSON.stringify({  integer: id })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

         const data = await response;
        return data;
    } catch (error) {
        console.error('删除评论时出错:', error);
        // throw error;
    }
}

//根据workId查询作品
async function getWorkById(id) {
    try {
        const response = await fetch( `/api/work/selectById?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({  integer: id })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("作品信息："+JSON.stringify(data))

        return data;
    } catch (error) {
        console.error('查询作品时出错:', error);
        // throw error;
    }
}
 export {
     //登录
     userLogin,
     //删除评论
     deleteCommentById,
     //根据id获取作品
     getWorkById
 }