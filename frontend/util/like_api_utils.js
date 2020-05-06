export const createLike = (like) => (
    $.ajax({
        url:'api/likes',
        method:'post',
        data: {like}
    })
);

export const deleteLike = (like) =>(
    $.ajax({
        url:`api/likes/${like.id}`,
        method:'delete'
    })
);