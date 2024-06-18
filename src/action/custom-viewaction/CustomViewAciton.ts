import {ActionWidget, RouterViewActionWidget, SPI, Widget} from '@kunlun/dependencies';
import CustomViewActionVue from './CustomViewAction.vue';

@SPI.ClassFactory(
    ActionWidget.Token({
        model: 'resource.ResourceCity',
        name: 'redirectCreatePage'
    })
)
export class CustomViewAction extends RouterViewActionWidget {
    public initialize(props) {
        super.initialize(props);
        this.setComponent(CustomViewActionVue);
        return this;
    }

    @Widget.Method()
    public clickAction() {
        // 这里断点试试看
        return super.clickAction()
    }
}
