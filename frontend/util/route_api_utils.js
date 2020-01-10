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

export const createRoute=(route,coordinates)=>(
    $.ajax({
        url:'/api/routes',
        method:'post',
        data: {route,coordinates}       
    })
);

export const deleteRoute=(routeId)=>(
    $.ajax({
        url:`/api/routes/${routeId}`,
        method:'delete'
    })
);