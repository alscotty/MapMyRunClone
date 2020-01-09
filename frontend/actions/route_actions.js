import * as RouteAPIUtil from '../util/route_api_utils'

export const RECEIVE_ROUTES='RECEIVE_ROUTES'
export const RECEIVE_ROUTE='RECEIVE_ROUTE'
export const REMOVE_ROUTE='REMOVE_ROUTE'

//reg action creators
const receiveRoutes=(routes)=>({
    type: RECEIVE_ROUTES,
    routes
});

const receiveRoute=(route)=>({
    type: RECEIVE_ROUTE,
    route
});

const removeRoute=(routeId)=>({
    type: REMOVE_ROUTE,
    routeId
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

export const createRoute=(route)=>dispatch=>(
    RouteAPIUtil.createRoute(route)
        .then((route) => dispatch(receiveRoute(route)))
);

export const deleteRoute=(routeId)=>dispatch=>(
    RouteAPIUtil.deleteRoute(routeId)
        .then((routeId)=>dispatch(removeRoute(routeId)))
)