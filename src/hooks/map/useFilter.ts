
/**获取航路图显示类型，如IFR、VFR、World Map、World Satellite等 */
const getMapType = () => {
    const defaultType: any = "ifrh"
    const userType = localStorage.getItem('map-type')
    if (userType){
        return userType
    }else{
        localStorage.setItem('map-type', defaultType)
        return defaultType
    }
}

/**获取航路图具体显示内容，如航点、机场、VOR等 */
const getFilteredType = () => {
    
}

export {
    getMapType
}