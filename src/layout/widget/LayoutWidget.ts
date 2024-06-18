import {SPI, BaseElementWidget} from '@kunlun/dependencies'
import CustomLayoutWidgetVue  from './LayoutWidget.vue'
@SPI.ClassFactory(BaseElementWidget.Token({ widget: 'custom-layout-widget' }))
export class CustomLayoutWidget extends BaseElementWidget {
    public initialize(props) {
        super.initialize(props);
        this.setComponent(CustomLayoutWidgetVue);
        return this;
    }
}
