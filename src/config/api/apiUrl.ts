const ENV_MODE: 'dev' | 'prod' = 'dev'
const hostPath = {
    'dev' : 'http://localhost:8801',
    'prod': 'https://api.skylineflyleague.cn'
}

export default {
    enroute:{
        tilemap: 'http://api.skylineflyleague.cn/efb-v2/enroute/aip',
        colormap: '8Ag605TXQnLb4viZY9drNfZhVFZ4js9xtHNwB6lMjp8XbWzTavatcaNSerGnx2tRimDYfOdNv4VVccp8bHTf+A==',
        routeMap: `${hostPath[ENV_MODE]}/efb-v3/enroute/mapbox-v2-beta/route/{z}/{y}/{x}`,
        amm: `${hostPath[ENV_MODE]}/efb-v3/enroute/mapbox-v2-beta/amm/{z}/{y}/{x}`,
        style: `${hostPath[ENV_MODE]}/efb-v3/enroute/getStyle`
    }
}