import {BaseElementWidget, Widget, SPI, TableWidget, http, Entity} from '@kunlun/dependencies';
import CustomViewVue from './CustomView.vue';
@SPI.ClassFactory(BaseElementWidget.Token({ widget: 'CustomViewWidget' }))
export class CustomViewWidget extends TableWidget {
  public initialize(props) {
    super.initialize(props);
    this.setComponent(CustomViewVue);
    return this;
  }

  @Widget.Reactive()
  private list

  public async mounted() {
    const query = `{
    resourceLangQuery {
      queryListByEntity(query: {active: ACTIVE, installState: true}) {
        id
        name
        active
        installState
        code
        isoCode
      }
    }
  }
  `
    const result = await http.query('resource', query);
    this.list = result.data['resourceLangQuery']['queryListByEntity']
  }
}
