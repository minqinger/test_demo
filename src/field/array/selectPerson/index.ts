import { FormFieldWidget, ModelFieldType, SPI, ViewType } from '@kunlun/dependencies'
import component from './index.vue'

@SPI.ClassFactory(
  FormFieldWidget.Token({
    viewType: [ViewType.Form, ViewType.Search],
    ttype: ModelFieldType.OneToMany,
    widget: 'test' // api名称
  })
)

export class CustomArraySelectPerson extends FormFieldWidget {
  public initialize(props) {
    super.initialize(props)
    this.setComponent(component)
    return this
  }
}
