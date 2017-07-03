/**
 * Created by truncate on 2017/3/28.
 * 请求地址API 说明打？号的表示有问题或者不确定
 */

const methodMap = {
    /** 公共接口 无须授权 **/
    /** 编辑器素材分类接口 **/
    EditMaterialType: {url: '/admin/common_api/edit_material_type', method: 'get'},
    /** 编辑器素材列表接口 **/
    EditMaterialList: {url: '/admin/common_api/edit_material_list', method: 'get'},
    
    /** 登陆接口 **/
    Login: {url: '/admin/login/index', method: 'post'},
    /** 退出接口 **/
    LoginOut: {url: '/admin/login/out', method: 'post'},
    /** 持续验证登陆 **/
    VerifyLogin: {url: '/admin/login/verify_login', method: 'post'},
    /** 权限节点接口 **/
    GetRule: {url: '/admin/role_auth/rule', method: 'get'},
    /** 添加节点接口 **/
    AddRule: {url: '/admin/role_auth/add_rule', method: 'post'},
    /** 编辑节点接口 **/
    EditRule: {url: '/admin/role_auth/edit_rule', method: 'post'},
    /** 删除节点接口 **/
    DelRule: {url: '/admin/role_auth/delete_rule', method: 'post'},
    /** 角色列表 **/
    GetRole: {url: '/admin/role_auth/role', method: 'get'},
    /** 添加角色 **/
    AdminAddRole: {url: '/admin/role_auth/add_role', method: 'post'},
    /** 编辑角色 **/
    EditRole: {url: '/admin/role_auth/edit_role', method: 'post'},
    /** 删除角色 **/
    DelRole: {url: '/admin/role_auth/delete_role', method: 'post'},
    /** 角色授权列表 **/
    Authorize: {url: '/admin/role_auth/authorize', method: 'get'},
    /** 保存角色授权 **/
    SaveAuth: {url: '/admin/role_auth/save_authorize', method: 'post'},
    /** 后台用户列表 **/
    AdminUser: {url: '/admin/user/index', method: 'get'},
    /** 添加后台用户 **/
    AdminAddUser: {url: '/admin/user/add', method: 'post'},
    /** 编辑后台用户 **/
    AdminEditUser: {url: '/admin/user/edit', method: 'post'},
    /** 重置后台用户密码 **/
    RestPassword: {url: '/admin/user/rest_password', method: 'post'},
    /** 商户列表 **/
    AdminMerchant: {url: '/admin/merchant/index', method: 'get'},
    /** 添加商户 **/
    AdminAddMerchant: {url: '/admin/merchant/add', method: 'post'},
    /** 查看商户 **/
    AdminMerchantView: {url: '/admin/merchant/view', method: 'get'},
    /** 商户用户列表 **/
    MerchantUser: {url: '/admin/merchant_user/index', method: 'get'},
    /** 重置商户用户密码 **/
    MerchantUserRestPassWord: {url: '/admin/merchant_user/reset_password', method: 'post'},
    /** 编辑器素材列表 **/
    EditorMaterial: {url: '/admin/editor_material/index', method: 'get'},
    /** 添加编辑器素材 **/
    AddEditorMaterial: {url: '/admin/editor_material/add_material', method: 'post'},
    /** 编辑编辑器素材 **/
    EditMaterialEditor: {url: '/admin/editor_material/edit_material', method: 'post'},
    /** 编辑器素材分类列表 **/
    AdminEditorMaterialCate: {url: '/admin/editor_material/cate', method: 'get'},
    /** 编辑器素材分类列表 **/
    AddEditorMaterialCate: {url: '/admin/editor_material/add_cate', method: 'post'},
    /** 编辑器素材分类列表 **/
    EditEditorMaterialCate: {url: '/admin/editor_material/edit_cate', method: 'post'},
    /** 删除编辑器素材分类 **/
    AdminDelEditorMaterialCate: {url: '/admin/editor_material/del_cate', method: 'post'},
    /** 删除编辑器素材 **/
    AdminDelEditorMaterial: {url: '/admin/editor_material/del', method: 'post'},
    /** 获取公众号列表 **/
    AdminPublicList: {url: '/admin/public_signal/index', method: 'get'},
    /** 文章分类列表 **/
    AdminCategoryList: {url: '/admin/category/index', method: 'get'},
    /** 添加文章分类 **/
    AdminCategoryAdd: {url: '/admin/category/add', method: 'post'},
    /** 修改文章分类 **/
    AdminCategoryEdit: {url: '/admin/category/edit', method: 'post'},
    /** 删除文章分类 **/
    AdminCategoryDelete: {url: '/admin/category/delete', method: 'post'},
    /** 文章列表 **/
    AdminArticleList: {url: '/admin/article/index', method: 'get'},
    /** 保存文章 **/
    AdminArticleAdd: {url: '/admin/article/add', method: 'post'},
    /** 保存文章 **/
    AdminArticleEdit: {url: '/admin/article/edit', method: 'post'},
    /** 微站分类 **/
    AdminWebsiteCategory: {url: '/admin/website/category', method: 'get'},
    /** 添加微站分类 **/
    AdminWebsiteAddCategory: {url: '/admin/website/add_category', method: 'post'},
    /** 修改微站分类 **/
    AdminWebsiteEditCategory: {url: '/admin/website/edit_category', method: 'post'},
    /** 删除微站分类 **/
    AdminWebsiteDeleteCategory: {url: '/admin/website/delete_category', method: 'post'},
    /** 微站列表 **/
    AdminWebsiteIndex: {url: '/admin/website/index', method: 'get'},
    /** 锁定解锁微站 **/
    AdminWebsiteLock: {url: '/admin/website/lock', method: 'post'},
    
    // /** 以下接口为商户平台接口 以下接口地址没有走后台验证 **/
    /** 商户平台登陆中心 **/
    MerchantLogin: {url: '/merchants/passport/login', method: 'post'},
    /** 商户注册 **/
    MerchantRegister: {url: '/merchants/passport/register', method: 'post'},
    /** 商户退出 **/
    MerchantSignOut: {url: '/merchants/passport/sign_out', method: 'post'},
    /** 获取某个用户详情 **/
    MerchantUserView: {url: '/merchants/user/view', method: 'get'},
    /** 商户用户个人资料修改 **/
    MerchantUserEdit: {url: '/merchants/user/edit', method: 'post'},
    /** 获取商户详情资料 **/
    MerchantView: {url: '/merchants/merchant/view', method: 'get'},
    /** 保存商户资料 **/
    MerchantInfoSave: {url: '/merchants/merchant/save', method: 'post'},
    /** 商户公众号列表 **/
    MerchantPublicList: {url: '/merchants/public_signal/index', method: 'get'},
    /** 公众号平台切换 **/
    MerchantPublicSwitch: {url: '/merchants/public_signal/switch', method: 'get'},
    /** 微信公众号绑定 **/
    MerchantPublicBind: {url: '/merchants/public_signal/bind', method: 'get'},
    /** 微信菜单获取 **/
    MerchantWxMenu: {url: '/merchants/we_chat_menu/index', method: 'get'},
    /** 保存微信菜单 **/
    MerchantWxMenuSave: {url: '/merchants/we_chat_menu/save', method: 'post'},
    /** 保存并同步数据 **/
    MerchantWxMenuSync: {url: '/merchants/we_chat_menu/sync', method: 'post'},
    /** 获取微信粉丝 **/
    MerchantWxFans: {url: '/merchants/we_chat_fans/index', method: 'get'},
    /** 获取微信粉丝分组 ? **/
    MerchantWxFansGroup: {url: '/merchants/we_chat_fans/get_group', method: 'get'},
    /** 单个微信用户粉丝同步 **/
    MerchantWxFansSync: {url: '/merchants/we_chat_fans/sync', method: 'post'},
    /** 把微信用户移入黑名单 ? **/
    MerchantWxFansSetBlack: {url: '/merchants/we_chat_fans/set_black', method: 'post'},
    /** 微信消息列表 **/
    MerchantWxMessage: {url: '/merchants/we_chat_message/index', method: 'get'},
    /** 微信消息发送回复 **/
    MerchantWxSendMessage: {url: '/merchants/we_chat_message/send_message', method: 'post'},
    /** 微信消息详情列表 **/
    MerchantWxMessageListView: {url: '/merchants/we_chat_message/list_view', method: 'get'},
    /** 资讯文章分类列表 **/
    ArchivesCategoryList: {url: '/merchants/archives_category/index', method: 'get'},
    /** 资讯文章分类添加 **/
    ArchivesCategoryAdd: {url: '/merchants/archives_category/add', method: 'post'},
    /** 文章列表 **/
    ArchivesList: {url: '/merchants/archives/index', method: 'get'},
    /** 保存文章 **/
    ArchivesAdd: {url: '/merchants/archives/add', method: 'post'},
    /** 保存文章 **/
    ArchivesEdit: {url: '/merchants/archives/edit', method: 'post'},
    /** 保存同步文章（图文消息）**/
    ArchivesSaveSyncMaterialNews: {url: '/merchants/archives/sync_material', method: 'post'},
    
    /** 平台商户微网站站点获取 **/
    MerchantWebsite: {url: '/merchants/website/plat_form_website', method: 'get'},
    /** 平台商户微网站站点获取 **/
    MerchantWebsiteCate: {url: '/merchants/website/category', method: 'get'},
    /** 平台商户微站数据保存 **/
    MerchantWebsiteSave: {url: '/merchants/website/save', method: 'post'},
}

export default methodMap
