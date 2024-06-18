import {registerLayout, ViewType} from "@kunlun/dependencies";

export const registerCustomView = () => {
    registerLayout(
        `
    <view type="TABLE">
      <custom widget="CustomViewWidget" />
    </view>
    `,
        {
            viewType: ViewType.Table,
            moduleName: 'resource',
            model: 'resource.ResourceCountryGroup'
        }
    );
};

// registerCustomView();

export const registerViewElement = () => {
    registerLayout(
        `
    <view type="TABLE">
      <pack widget="group">
        <view type="SEARCH">
            <element widget="search" slot="search" slotSupport="field" />
        </view>
      </pack>  
      <element widget="actionBar" slot="actionBar" slotSupport="action">
        <xslot name="actions" slotSupport="action" />
      </element>
      <custom widget="CustomViewWidget" />
    </view>
    `,
        {
            viewType: ViewType.Table,
            moduleName: 'resource',
            model: 'resource.ResourceCountry'
        }
    );
};

// registerViewElement();

export const registerResolveModelView = () => {
    registerLayout(
        `
    <view type="TABLE">
      <element widget="CustomViewWidget">
          <xslot name="actions" slotSupport="action" />
          <xslot name="fields" slotSupport="field" />
      </element>
    </view>
    `,
        {
            viewType: ViewType.Table,
            moduleName: 'resource',
            model: 'resource.ResourceCountry'
        }
    );
};

registerResolveModelView()
