export const createComment=(comment)=>(
    $.ajax({
        url:'/api/comments',
        method:'post',
        data: {comment}
    })
);

export const deleteComment=(comment)=>(
    $.ajax({
        url: `/api/comments/${comment.id}`,
        method: 'delete'
    })
);