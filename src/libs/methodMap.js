/**
 * Created by truncate on 2017/3/28.
 * 请求地址API
 */

const methodMap = {
    /** 公共接口 无须授权 **/
    /** 编辑器素材分类接口 **/
    EditMaterialType: {url: '/api/common_api/edit_material_type', method: 'get'},
    /** 编辑器素材列表接口 **/
    EditMaterialList: {url: '/api/common_api/edit_material_list', method: 'get'},
    
    /** 登陆接口 **/
    Login: {url: '/api/login/index', method: 'post'},
    /** 退出接口 **/
    LoginOut: {url: '/api/login/out', method: 'post'},
    /** 持续验证登陆 **/
    VerifyLogin: {url: '/api/login/verify_login', method: 'post'},
    /** 权限节点接口 **/
    GetRule: {url: '/api/role_auth/rule', method: 'get'},
    /** 添加节点接口 **/
    AddRule: {url: '/api/role_auth/add_rule', method: 'post'},
    /** 编辑节点接口 **/
    EditRule: {url: '/api/role_auth/edit_rule', method: 'post'},
    /** 删除节点接口 **/
    DelRule: {url: '/api/role_auth/delete_rule', method: 'post'},
    /** 角色列表 **/
    GetRole: {url: '/api/role_auth/role', method: 'get'},
    /** 添加角色 **/
    AdminAddRole: {url: '/api/role_auth/add_role', method: 'post'},
    /** 编辑角色 **/
    EditRole: {url: '/api/role_auth/edit_role', method: 'post'},
    /** 删除角色 **/
    DelRole: {url: '/api/role_auth/delete_role', method: 'post'},
    /** 角色授权列表 **/
    Authorize: {url: '/api/role_auth/authorize', method: 'get'},
    /** 保存角色授权 **/
    SaveAuth: {url: '/api/role_auth/save_authorize', method: 'post'},
    /** 后台用户列表 **/
    AdminUser: {url: '/api/user/index', method: 'get'},
    /** 添加后台用户 **/
    AdminAddUser: {url: '/api/user/add', method: 'post'},
    /** 编辑后台用户 **/
    AdminEditUser: {url: '/api/user/edit', method: 'post'},
    /** 重置后台用户密码 **/
    RestPassword: {url: '/api/user/rest_password', method: 'post'},
    /** 商户列表 **/
    AdminMerchant: {url: '/api/merchant/index', method: 'get'},
    /** 添加商户 **/
    AdminAddMerchant: {url: '/api/merchant/add', method: 'post'},
    /** 查看商户 **/
    AdminMerchantView: {url: '/api/merchant/view', method: 'get'},
    /** 商户用户列表 **/
    MerchantUser: {url: '/api/merchant_user/index', method: 'get'},
    /** 重置商户用户密码 **/
    MerchantUserRestPassWord: {url: '/api/merchant_user/reset_password', method: 'post'},
    /** 编辑器素材列表 **/
    EditorMaterial: {url: '/api/editor_material/index', method: 'get'},
    /** 添加编辑器素材 **/
    AddEditorMaterial: {url: '/api/editor_material/add_material', method: 'post'},
    /** 编辑编辑器素材 **/
    EditMaterialEditor: {url: '/api/editor_material/edit_material', method: 'post'},
    /** 编辑器素材分类列表 **/
    AdminEditorMaterialCate: {url: '/api/editor_material/cate', method: 'get'},
    /** 编辑器素材分类列表 **/
    AddEditorMaterialCate: {url: '/api/editor_material/add_cate', method: 'post'},
    /** 编辑器素材分类列表 **/
    EditEditorMaterialCate: {url: '/api/editor_material/edit_cate', method: 'post'},
    /** 删除编辑器素材分类 **/
    AdminDelEditorMaterialCate: {url: '/api/editor_material/del_cate', method: 'post'},
    /** 删除编辑器素材 **/
    AdminDelEditorMaterial: {url: '/api/editor_material/del', method: 'post'},
    /** 获取公众号列表 **/
    AdminPublicList: {url: '/api/public_signal/index', method: 'get'},
    /** 文章分类列表 **/
    AdminCategoryList: {url: '/api/category/index', method: 'get'},
    /** 添加文章分类 **/
    AdminCategoryAdd: {url: '/api/category/add', method: 'post'},
    /** 修改文章分类 **/
    AdminCategoryEdit: {url: '/api/category/edit', method: 'post'},
    /** 删除文章分类 **/
    AdminCategoryDelete: {url: '/api/category/delete', method: 'post'},
    /** 文章列表 **/
    AdminArticleList: {url: '/api/article/index', method: 'get'},
    /** 保存文章 **/
    AdminArticleAdd: {url: '/api/article/add', method: 'post'},
    /** 保存文章 **/
    AdminArticleEdit: {url: '/api/article/edit', method: 'post'},
    
    
    // /** 以下接口为商户平台接口 以下接口地址没有走后台验证 **/
    /** 商户平台登陆中心 **/
    MerchantLogin: {url: '/merchant/login/index', method: 'post'},
    /** 获取某个用户详情 **/
    MerchantUserView: {url: '/merchant/user/view', method: 'get'},
    /** 商户用户个人资料修改 **/
    MerchantUserEdit: {url: '/merchant/user/edit', method: 'post'},
    /** 获取商户详情资料 **/
    MerchantView: {url: '/merchant/merchant/view', method: 'get'},
    /** 保存商户资料 **/
    MerchantInfoSave: {url: '/merchant/merchant/save', method: 'post'},
    /** 商户公众号列表 **/
    MerchantPublicList: {url: '/merchant/public_signal/index', method: 'get'},
    /** 微信菜单获取 **/
    MerchantWxMenu: {url: '/merchant/we_chat_menu/index', method: 'get'},
}

export default methodMap
