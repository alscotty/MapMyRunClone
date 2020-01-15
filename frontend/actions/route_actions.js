import * as RouteAPIUtil from '../util/route_api_utils'

export const RECEIVE_ROUTES='RECEIVE_ROUTES'
export const RECEIVE_ROUTE='RECEIVE_ROUTE'
export const REMOVE_ROUTE='REMOVE_ROUTE'

export const RECEIVE_ROUTE_ERRORS='RECEIVE_ROUTE_ERRORS'
export const CLEAR_ROUTE_ERRORS='CLEAR_ROUTE_ERRORS'


//reg action creators
const receiveRoutes=(routes)=>({
    type: RECEIVE_ROUTES,
    routes
});

const receiveRoute=(route,coordinates)=>({
    type: RECEIVE_ROUTE,
    route,
    coordinates
});

const removeRoute=(route)=>({
    type: REMOVE_ROUTE,
    route
})

export const receiveRouteErrors=(errors)=>({
    type: RECEIVE_ROUTE_ERRORS,
    errors
})

export const clearRouteErrors=()=>({
    type: CLEAR_ROUTE_ERRORS
})


//thunk actions
export const requestRoutes=()=>dispatch=>(
    RouteAPIUtil.fetchRoutes()
        .then((routes)=>dispatch(receiveRoutes(routes)))
)

export const requestRoute=(routeId)=>dispatch=>(
    RouteAPIUtil.fetchRoute(routeId)
        .then((route)=>dispatch(receiveRoute(route)))
)

export const createRoute=(route,coordinates)=>dispatch=>(
    RouteAPIUtil.createRoute(route,coordinates)
        .then((route,coordinates) => dispatch(receiveRoute(route,coordinates)),
        err => {dispatch(receiveRouteErrors(err.responseJSON))}
        )
);

export const deleteRoute=(route)=>dispatch=>(    
    RouteAPIUtil.deleteRoute(route)
        .then((route)=>dispatch(removeRoute(route)))
    )
    