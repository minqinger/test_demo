import {ActionWidget, ServerActionWidget, SPI, Widget} from '@kunlun/dependencies';
import CustomServerActionVue from './CustomServerAction.vue';

@SPI.ClassFactory(
    ActionWidget.Token({
        model: 'resource.ResourceCity',
        name: 'delete'
    })
)
export class CustomServerAction extends ServerActionWidget {
    public initialize(props) {
        super.initialize(props);
        this.setComponent(CustomServerActionVue);
        return this;
    }

    @Widget.Method()
    public clickAction() {
        // 这里断点试试看
        return super.clickAction()
    }
}
