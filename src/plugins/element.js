import Vue from 'vue'
import {
  Button,
  Dialog,
  Form,
  Table,
  Select,
  Option,
  FormItem,
  Input,
  Message,
  MessageBox,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  Popover,
  DatePicker,
  Container,
  Header,
  Aside,
  Main,
  TableColumn,
  Upload,
  Radio,
  RadioGroup,
  Card,
  Pagination
} from 'element-ui'
// import ElementUI from 'element-ui';

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(Table)
Vue.use(Select)
Vue.use(Option)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Popover)
Vue.use(DatePicker)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(TableColumn)
Vue.use(Upload)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Card)
Vue.use(Pagination)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm;
