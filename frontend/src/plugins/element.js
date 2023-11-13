import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import { message } from './resetMessage';

import {
  Card,
  Pagination,
  Dialog,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  Popover,
  Tooltip,
  Form,
  FormItem,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Progress,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Link,
  Divider,
  Image,
  Carousel,
  CarouselItem,
  Transfer,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui';

Vue.use(Card);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Progress);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Link);
Vue.use(Divider);
Vue.use(Image);
Vue.use(Loading.directive);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Transfer);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
// 单例的Message
// Vue.prototype.$message = message;

/**
 * 系统提示弹窗
 * @param msg 提示的信息
 * @param type 提示类型 success / info / warning / error
 * @param closeOnModelAndEsc 是否在点击遮罩和按Esc键时关闭弹窗
 * @param callback 弹窗关闭后的回调
 */
Vue.prototype.$tips = (msg, type, closeOnModelAndEsc = true, callback) => {
  MessageBox.alert(msg, '提示', {
    confirmButtonText: '确定',
    closeOnClickModal: closeOnModelAndEsc ,
    closeOnPressEscape: closeOnModelAndEsc,
    type: type,
    callback: callback
  }).catch(() => {
  })
}
