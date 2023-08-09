import { createStore } from 'vuex'
// import { getStoreModule } from 'app-plugin/store'      // 引入 app-plugin 的 vuex 設定
import panels from 'app-plugin/store/modules/panels'   // 引入 panels 設定
import app from 'app-plugin/store/modules/app'

// const modules = getStoreModule()                       // 自動引入 modules 資料夾內的 modules 設定

export default createStore({
  modules: {
    // ...modules,
    panels, 
    app                                       // 帶入取得的內容
  },
})