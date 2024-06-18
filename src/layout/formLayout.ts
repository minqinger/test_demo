import {registerLayout, ViewType} from '@kunlun/dependencies'

/**
 * 把系统内所有表单类型视图的全局动作放入页面底部
 * */

const registerGlobalFormLayout = () => {
    return registerLayout(`<view type="FORM">
    <element widget="form" slot="form">
        <xslot name="fields" slotSupport="pack,field" />
    </element>
    <element widget="actionBar" slot="actionBar" slotSupport="action">
        <xslot name="actions" slotSupport="action" />
    </element>
</view>`, { viewType: ViewType.Form })
}

registerGlobalFormLayout()
