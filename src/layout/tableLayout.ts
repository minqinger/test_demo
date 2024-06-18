import {registerLayout, ViewType} from '@kunlun/dependencies'

/**
 * 把系统内所有表格类型视图的全局动作放入搜索区域
 * */
const registerGlobalTableLayout = () => {
    return registerLayout(`<view type="TABLE">
    <element widget="actionBar" slot="actionBar" slotSupport="action">
        <xslot name="actions" slotSupport="action" />
    </element>
    <pack widget="group">
        <view type="SEARCH">
            <element widget="search" slot="search" slotSupport="field" />
            
        </view>
    </pack>
    <pack widget="group" slot="tableGroup">
        <element widget="table" slot="table" slotSupport="field">
            <element widget="expandColumn" slot="expandRow" />
            <xslot name="fields" slotSupport="field" />
            <element widget="rowActions" slot="rowActions" slotSupport="action" />
        </element>
    </pack>
</view>`, { viewType: ViewType.Table })
}

registerGlobalTableLayout()

const registerModuleTableLayout = () => {
    return registerLayout(`<view type="TABLE">
    <element widget="actionBar" slot="actionBar" slotSupport="action">
        <xslot name="actions" slotSupport="action" />
    </element>
    <pack widget="group">
        <view type="SEARCH">
            <element widget="search" slot="search" slotSupport="field" />
            
        </view>
    </pack>
    <pack widget="group" slot="tableGroup">
        <element widget="table" slot="table" slotSupport="field">
            <element widget="expandColumn" slot="expandRow" />
            <xslot name="fields" slotSupport="field" />
            <element widget="rowActions" slot="rowActions" slotSupport="action" />
        </element>
    </pack>
</view>`, { viewType: ViewType.Table, moduleName: 'resource' })
}

registerModuleTableLayout()

const registerViewTableLayout = () => {
    return registerLayout(`<view type="TABLE">
    <pack widget="group">
        <element widget="custom-layout-widget" />
        <view type="SEARCH">
            <element widget="search" slot="search" slotSupport="field" />
            <element widget="actionBar" slot="actionBar" slotSupport="action">
                <xslot name="actions" slotSupport="action" />
            </element>
        </view>
    </pack>
    <pack widget="group" slot="tableGroup">
        <element widget="table" slot="table" slotSupport="field">
            <element widget="expandColumn" slot="expandRow" />
            <xslot name="fields" slotSupport="field" />
            <element widget="rowActions" slot="rowActions" slotSupport="action" />
        </element>
    </pack>
</view>`, { viewType: ViewType.Table, moduleName: 'resource' })
}

registerViewTableLayout()
