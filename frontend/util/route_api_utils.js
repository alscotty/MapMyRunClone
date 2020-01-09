export const fetchRoutes=()=>(
    $.ajax({
        url:'/api/routes'
    })
);

export const fetchRoute=(routeId)=>(
    $.ajax({
        url:`/api/routes/${routeId}`,
        data: {routeId}
    })
);

export const createRoute=(route)=>(
    $.ajax({
        url:'/api/routes',
        method:'post',
        data: {route}       
    })
);

export const deleteRoute=(routeId)=>(
    $.ajax({
        url:`/api/routes/${routeId}`,
        method:'delete'
    })
);