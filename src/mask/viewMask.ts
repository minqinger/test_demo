import { registerMask } from '@kunlun/dependencies'


/**
 * registerMask 第二个入参为{moduleName: 'resource', model: 'resource.ResourceRegionProxyModel'}即注册了resource(资源)和resource.ResourceRegionProxyModel(地区)模型的母版
 *
 * resource来源: 通常是浏览器url上的module
 * model来源:  通常是浏览器url上的model
 *
 * 拿掉菜单
 * `<sidebar>
 *    <widget widget="nav-menu" height="100%" />
 *  </sidebar>`
 *
 *  拿掉appFounder
 *  `<widget widget="app-switcher" />`
 * */
const registerViewMask = () => {
    registerMask(`<mask>
    <multi-tabs />
    <header>
        
        <block>
            <widget widget="notification" />
            <widget widget="divider" />
            <widget widget="language" />
            <widget widget="divider" />
            <widget widget="user" />
        </block>
    </header>
    <container>
        <content>
            <breadcrumb />
            <block width="100%">
                <widget width="100%" widget="main-view" />
            </block>
        </content>
    </container>
</mask>`, { moduleName: 'resource', model: 'resource.ResourceRegionProxyModel'})
}
registerViewMask();
