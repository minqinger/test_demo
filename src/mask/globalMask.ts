import { registerMask } from '@kunlun/dependencies'

/**
 * mask: 在做系统时，我们通常会把外层的布局(菜单、顶部导航)等抽出公共组件，公共组件会抽离全局通用。类似ppt母版的概念即为Mask
 * registerMask 第二个入参为{}即注册了全局得模版
 *
 * 移除右上角消息、语言切换、用户
 * ` <block>
 *     <widget widget="notification" />
 *     <widget widget="divider" />
 *     <widget widget="language" />
 *     <widget widget="divider" />
 *     <widget widget="user" />
 * </block>`
 * */
const registerGlobalMask = () => {
    registerMask(`<mask>
    <multi-tabs />
    <header>
         <widget widget="app-switcher" />
        <widget widget="notification" />
        <widget widget="language" />
         <widget widget="user" />
        <widget widget="custom-mask-widget" />
    </header>
    <container>
       <sidebar>
          <widget widget="nav-menu" height="100%" />
       </sidebar>
        <content>
            <breadcrumb />
            <block width="100%">
                <widget width="100%" widget="main-view" />
            </block>
        </content>
    </container>
</mask>`, {})
}

registerGlobalMask()
