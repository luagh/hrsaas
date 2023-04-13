const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    //将token值作为公共的访问属性放出
    token: state => state.user.token,
    name: state => state.user.userInfo.username,
    userId: state => state.user.userInfo.userId,
    staffPhoto: state => state.user.userInfo.staffPhoto, // 建立用户头像的映射
    companyId: state => state.user.userInfo.companyId // 建立对于user模块的companyId的快捷访问
}

export default getters