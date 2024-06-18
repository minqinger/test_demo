export * from './tableLayout';
export * from './formLayout';
export * from './widget'


/**
 * 系统内置布局-表格
 * */
const defaultTableLayout = `<view type="TABLE">
    <pack widget="group">
        <view type="SEARCH">
            <element widget="search" slot="search" slotSupport="field" />
        </view>
    </pack>
    <pack widget="group" slot="tableGroup">
        <element widget="actionBar" slot="actionBar" slotSupport="action">
            <xslot name="actions" slotSupport="action" />
        </element>
        <element widget="table" slot="table" slotSupport="field">
            <element widget="expandColumn" slot="expandRow" />
            <xslot name="fields" slotSupport="field" />
            <element widget="rowActions" slot="rowActions" slotSupport="action" />
        </element>
    </pack>
</view>`

/**
 * 系统内置布局-表单
 * */
const defaultFormLayout = `<view type="FORM">
    <element widget="actionBar" slot="actionBar" slotSupport="action">
        <xslot name="actions" slotSupport="action" />
    </element>
    <element widget="form" slot="form">
        <xslot name="fields" slotSupport="pack,field" />
    </element>
</view>`

/**
 * 系统内置布局-详情
 * */
const defaultDetailLayout = `<view type="DETAIL">
  <element widget="actionBar" slot="actionBar" slotSupport="action">
      <xslot name="actions" slotSupport="action" />
  </element>
  <element widget="detail" slot="detail">
      <xslot name="fields" slotSupport="pack,field" />
  </element>
</view>`

/**
 * 系统内置布局-画廊
 * */
const defaultGalleryLayout = `<view type="GALLERY">
    <view type="SEARCH">
        <element widget="search" slot="search" slotSupport="field" />
    </view>
    <element widget="actionBar" slot="actionBar" slotSupport="action">
        <xslot name="actions" slotSupport="action" />
    </element>
    <element widget="gallery" slot="gallery">
        <element widget="card" slot="card" slotSupport="pack,field" />
    </element>
</view>`

/**
 * 系统内置布局-树形
 * */
const defaultTreeLayout = `<view type="TREE">
    <pack widget="group">
        <view type="SEARCH">
            <element widget="search" slot="search" slotSupport="field" />
        </view>
    </pack>
    <pack widget="group">
        <element widget="actionBar" slot="actionBar" slotSupport="action">
            <xslot name="actions" slotSupport="action" />
        </element>
        <element widget="card-cascader" slot="tree" slotSupport="nodes,node" />
    </pack>
</view>`
