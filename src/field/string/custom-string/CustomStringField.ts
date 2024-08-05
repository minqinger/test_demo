import {FormFieldWidget, ModelFieldType, SPI, ViewType} from '@kunlun/dependencies';
import CustomStringFieldVue from './CustomStringField.vue';

@SPI.ClassFactory(
  FormFieldWidget.Token({ viewType: [ViewType.Form, ViewType.Search], ttype: ModelFieldType.String, widget: 'select' })
)
export class CustomStringField extends FormFieldWidget {
  public initialize(props) {
    super.initialize(props);
    this.setComponent(CustomStringFieldVue);
    return this;
  }
}
