const {ccclass, property} = cc._decorator;

@ccclass
export default class {{camelize name}} extends cc.Component {
  projectId: string = '{{name}}';
  onLoad () {}
  start () {}
}