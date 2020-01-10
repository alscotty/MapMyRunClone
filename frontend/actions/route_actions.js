import * as RouteAPIUtil from '../util/route_api_utils'

export const RECEIVE_ROUTES='RECEIVE_ROUTES'
export const RECEIVE_ROUTE='RECEIVE_ROUTE'
export const REMOVE_ROUTE='REMOVE_ROUTE'

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
        .then((route,coordinates) => dispatch(receiveRoute(route,coordinates)))
);

export const deleteRoute=(route)=>dispatch=>(    
    RouteAPIUtil.deleteRoute(route)
        .then((route)=>dispatch(removeRoute(route)))
    )
    