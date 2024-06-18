import { SPI, MaskWidget } from '@kunlun/dependencies'
import CustomMaskWidgetVue  from './MaskWidget.vue'
@SPI.ClassFactory(MaskWidget.Token({ widget: 'custom-mask-widget' }))
export class CustomMaskWidget extends MaskWidget {
    public initialize(props) {
        super.initialize(props);
        this.setComponent(CustomMaskWidgetVue);
        return this;
    }
}
