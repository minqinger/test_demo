import { registerMask } from '@kunlun/dependencies'


/**
 * registerMask 第二个入参为{moduleName: 'resource'}即注册了resource(资源)应用的母版
 *
 * resource来源: 通常是浏览器url上的module
 *
 * 拿掉菜单
 * `<sidebar>
 *    <widget widget="nav-menu" height="100%" />
 *  </sidebar>`
 * */
const registerModuleMask = () => {
    registerMask(`<mask>
    <multi-tabs />
    <header>
        <widget widget="app-switcher" />
        <block>
            <widget widget="notification" />
            <widget widget="divider" />
            <widget widget="language" />
            <widget widget="divider" />
            <widget widget="user" />
            <widget widget="custom-mask-widget" />
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
</mask>`, { moduleName: 'resource'})
}

registerModuleMask();
