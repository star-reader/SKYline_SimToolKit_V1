const ENV_MODE: 'dev' | 'prod' = 'dev'
const hostPath = {
    'dev' : 'http://localhost:8801/efb-v3/',
    'prod': 'https://api.skylineflyleague.cn/efb-v3/'
}

export default {
    enroute:{
        tilemap: 'http://api.skylineflyleague.cn/efb-v2/enroute/aip',
        colormap: '8Ag605TXQnLb4viZY9drNfZhVFZ4js9xtHNwB6lMjp8XbWzTavatcaNSerGnx2tRimDYfOdNv4VVccp8bHTf+A=='
    }
}