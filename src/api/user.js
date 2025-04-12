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
 export {
    deleteCommentById,
 }