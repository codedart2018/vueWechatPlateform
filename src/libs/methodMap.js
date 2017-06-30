/**
 * Created by truncate on 2017/3/28.
 * 请求地址API 说明打？号的表示有问题或者不确定
 */

const methodMap = {
    /** 公共接口 无须授权 **/
    /** 编辑器素材分类接口 **/
    EditMaterialType: {url: '/manage/common_api/edit_material_type', method: 'get'},
    /** 编辑器素材列表接口 **/
    EditMaterialList: {url: '/manage/common_api/edit_material_list', method: 'get'},
    
    /** 登陆接口 **/
    Login: {url: '/manage/login/index', method: 'post'},
    /** 退出接口 **/
    LoginOut: {url: '/manage/login/out', method: 'post'},
    /** 持续验证登陆 **/
    VerifyLogin: {url: '/manage/login/verify_login', method: 'post'},
    /** 权限节点接口 **/
    GetRule: {url: '/manage/role_auth/rule', method: 'get'},
    /** 添加节点接口 **/
    AddRule: {url: '/manage/role_auth/add_rule', method: 'post'},
    /** 编辑节点接口 **/
    EditRule: {url: '/manage/role_auth/edit_rule', method: 'post'},
    /** 删除节点接口 **/
    DelRule: {url: '/manage/role_auth/delete_rule', method: 'post'},
    /** 角色列表 **/
    GetRole: {url: '/manage/role_auth/role', method: 'get'},
    /** 添加角色 **/
    AdminAddRole: {url: '/manage/role_auth/add_role', method: 'post'},
    /** 编辑角色 **/
    EditRole: {url: '/manage/role_auth/edit_role', method: 'post'},
    /** 删除角色 **/
    DelRole: {url: '/manage/role_auth/delete_role', method: 'post'},
    /** 角色授权列表 **/
    Authorize: {url: '/manage/role_auth/authorize', method: 'get'},
    /** 保存角色授权 **/
    SaveAuth: {url: '/manage/role_auth/save_authorize', method: 'post'},
    /** 后台用户列表 **/
    AdminUser: {url: '/manage/user/index', method: 'get'},
    /** 添加后台用户 **/
    AdminAddUser: {url: '/manage/user/add', method: 'post'},
    /** 编辑后台用户 **/
    AdminEditUser: {url: '/manage/user/edit', method: 'post'},
    /** 重置后台用户密码 **/
    RestPassword: {url: '/manage/user/rest_password', method: 'post'},
    /** 商户列表 **/
    AdminMerchant: {url: '/manage/merchant/index', method: 'get'},
    /** 添加商户 **/
    AdminAddMerchant: {url: '/manage/merchant/add', method: 'post'},
    /** 查看商户 **/
    AdminMerchantView: {url: '/manage/merchant/view', method: 'get'},
    /** 商户用户列表 **/
    MerchantUser: {url: '/manage/merchant_user/index', method: 'get'},
    /** 重置商户用户密码 **/
    MerchantUserRestPassWord: {url: '/manage/merchant_user/reset_password', method: 'post'},
    /** 编辑器素材列表 **/
    EditorMaterial: {url: '/manage/editor_material/index', method: 'get'},
    /** 添加编辑器素材 **/
    AddEditorMaterial: {url: '/manage/editor_material/add_material', method: 'post'},
    /** 编辑编辑器素材 **/
    EditMaterialEditor: {url: '/manage/editor_material/edit_material', method: 'post'},
    /** 编辑器素材分类列表 **/
    AdminEditorMaterialCate: {url: '/manage/editor_material/cate', method: 'get'},
    /** 编辑器素材分类列表 **/
    AddEditorMaterialCate: {url: '/manage/editor_material/add_cate', method: 'post'},
    /** 编辑器素材分类列表 **/
    EditEditorMaterialCate: {url: '/manage/editor_material/edit_cate', method: 'post'},
    /** 删除编辑器素材分类 **/
    AdminDelEditorMaterialCate: {url: '/manage/editor_material/del_cate', method: 'post'},
    /** 删除编辑器素材 **/
    AdminDelEditorMaterial: {url: '/manage/editor_material/del', method: 'post'},
    /** 获取公众号列表 **/
    AdminPublicList: {url: '/manage/public_signal/index', method: 'get'},
    /** 文章分类列表 **/
    AdminCategoryList: {url: '/manage/category/index', method: 'get'},
    /** 添加文章分类 **/
    AdminCategoryAdd: {url: '/manage/category/add', method: 'post'},
    /** 修改文章分类 **/
    AdminCategoryEdit: {url: '/manage/category/edit', method: 'post'},
    /** 删除文章分类 **/
    AdminCategoryDelete: {url: '/manage/category/delete', method: 'post'},
    /** 文章列表 **/
    AdminArticleList: {url: '/manage/article/index', method: 'get'},
    /** 保存文章 **/
    AdminArticleAdd: {url: '/manage/article/add', method: 'post'},
    /** 保存文章 **/
    AdminArticleEdit: {url: '/manage/article/edit', method: 'post'},
    /** 微站分类 **/
    AdminWebsiteCategory: {url: '/manage/website/category', method: 'get'},
    /** 添加微站分类 **/
    AdminWebsiteAddCategory: {url: '/manage/website/add_category', method: 'post'},
    /** 修改微站分类 **/
    AdminWebsiteEditCategory: {url: '/manage/website/edit_category', method: 'post'},
    /** 删除微站分类 **/
    AdminWebsiteDeleteCategory: {url: '/manage/website/delete_category', method: 'post'},
    /** 微站列表 **/
    AdminWebsiteIndex: {url: '/manage/website/index', method: 'get'},
    /** 锁定解锁微站 **/
    AdminWebsiteLock: {url: '/manage/website/lock', method: 'post'},
    
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
    /** 保存微信菜单 **/
    MerchantWxMenuSave: {url: '/merchant/we_chat_menu/save', method: 'post'},
    /** 保存并同步数据 **/
    MerchantWxMenuSync: {url: '/merchant/we_chat_menu/sync', method: 'post'},
    /** 获取微信粉丝 **/
    MerchantWxFans: {url: '/merchant/we_chat_fans/index', method: 'get'},
    /** 获取微信粉丝分组 ? **/
    MerchantWxFansGroup: {url: '/merchant/we_chat_fans/get_group', method: 'get'},
    /** 单个微信用户粉丝同步 **/
    MerchantWxFansSync: {url: '/merchant/we_chat_fans/sync', method: 'post'},
    /** 把微信用户移入黑名单 ? **/
    MerchantWxFansSetBlack: {url: '/merchant/we_chat_fans/set_black', method: 'post'},
    /** 微信消息列表 **/
    MerchantWxMessage: {url: '/merchant/we_chat_message/index', method: 'get'},
    /** 微信消息发送回复 **/
    MerchantWxSendMessage: {url: '/merchant/we_chat_message/send_message', method: 'post'},
    /** 微信消息详情列表 **/
    MerchantWxMessageListView: {url: '/merchant/we_chat_message/list_view', method: 'get'},
    /** 资讯文章分类列表 **/
    ArchivesCategoryList: {url: '/merchant/archives_category/index', method: 'get'},
    /** 资讯文章分类添加 **/
    ArchivesCategoryAdd: {url: '/merchant/archives_category/add', method: 'post'},
    /** 文章列表 **/
    ArchivesList: {url: '/merchant/archives/index', method: 'get'},
    /** 保存文章 **/
    ArchivesAdd: {url: '/merchant/archives/add', method: 'post'},
    /** 保存文章 **/
    ArchivesEdit: {url: '/merchant/archives/edit', method: 'post'},
    /** 保存同步文章（图文消息）**/
    ArchivesSaveSyncMaterialNews: {url: '/merchant/archives/sync_material', method: 'post'},
    
    /** 平台商户微网站站点获取 **/
    MerchantWebsite: {url: '/merchant/website/plat_form_website', method: 'get'},
    /** 平台商户微网站站点获取 **/
    MerchantWebsiteCate: {url: '/merchant/website/category', method: 'get'},
    /** 平台商户微站数据保存 **/
    MerchantWebsiteSave: {url: '/merchant/website/save', method: 'post'},
}

export default methodMap
