const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    //将token值作为公共的访问属性放出
    token: state => state.user.token
}

export default getters