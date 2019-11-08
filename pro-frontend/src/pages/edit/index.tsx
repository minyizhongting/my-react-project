import React, { Component } from 'react';
import styles from './index.less';
import { Button, Input, Checkbox, message } from 'antd';
// import { submitData } from '../../services/edit';

interface Props {

}

interface listItem {
  key?: string | number;
  cn?: string;
  en?: string;
  in?: string;
  br?: string;
}

interface State {
  list: Array<listItem>;
  name: string;
  key: string;
  cn: string;
  en: string;
  in: string;
  br: string;
  jsonOption: string[];
}

type EventKey = 'name' | 'key' | 'cn' | 'en' | 'in' | 'br';


class Edit extends Component<Props, State> {
  firstInput: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      list: [],
      name: '',
      key: '',
      cn: '',
      en: '',
      in: '',
      br: '',
      jsonOption: ['in', 'br'], // 默认勾选印度和巴西
    };

  }

  componentDidMount() {
    let list = localStorage.getItem('actList');
    if (list) {
      this.setState({
        list: JSON.parse(list)
      });
    }
  }

  // input的change事件
  inputChangeHandle = (type: EventKey, event: any) => {
    let state: any = {};
    state[type] = event.target.value;
    this.setState({...state});
  }

  // 删除列表中的一行
  deleteHandle = (index: number) => {
    let list = this.state.list;
    list.splice(index, 1);
    this.setState({list});
    localStorage.setItem('actList', JSON.stringify(list));
  }

  // 清空列表数据
  clearListHandle = () => {
    this.setState({
      list: []
    });
    localStorage.removeItem('actList');
  };

  //  添加按钮click
  addBtnHandle = () => {
    let list = this.state.list;
    if (!this.state.key) {
      message.error('请输入key！', 2);
      return;
    }
    if (this.state.list.some(item => item.key === this.state.key)) {
      message.error('key值已存在！', 2);
      return;
    }

    list.push({
      key: this.state.key,
      cn: this.state.cn,
      en: this.state.en,
      in: this.state.in,
      br: this.state.br,
    });
    
    localStorage.setItem('actList', JSON.stringify(list));

    this.setState({
      list,
      key: '',
      cn: '',
      en: '',
      in: '',
      br: '',
    });
  }

  // 提交按钮click
  submitBtnHandle = () => {
    if (!this.state.name) {
      message.error('请输入活动名称！');
      return;
    }
    if (!this.state.list.length) {
      message.error('请输入数据！');
      return;
    }
    if (!this.state.jsonOption.length) {
      message.error('请至少选择一种语言！');
      return;
    }
    let options: any = ['key'].concat(this.state.jsonOption);
    let list = this.state.list.map((item: any) => {
      let o: any = {};
      options.forEach((elem: string) => {
        if (item[elem] !== '' && item[elem] !== undefined) {
          o[elem] = item[elem];
        }
      });
      return o;
    });

    console.log(list);
    let data = JSON.stringify(list);
    let lang = JSON.stringify(this.state.jsonOption);
    // return;
    window.location.href = `/api/submitData?data=${data}&name=${this.state.name}&lang=${lang}`;
  }

  // 复选框的change事件
  onChangeHandle = (checkedValues: any[]) => {
    // console.log(checkedValues);
    this.setState({
      jsonOption: checkedValues
    });
  }

  // 回车监听
  keyDownHandle = (e: any) => {
    if (e.keyCode === 13) {
      this.addBtnHandle();
      this.firstInput.focus();
    }
  }

  renderResult = () => {
    return (
      <div className={styles.resultList}>
        <h5>
          <span>列表数据</span>
          <Button onClick={this.clearListHandle}>清空列表</Button>
        </h5>
        <table className={styles.tableBox+' '+styles.tableResult}>
          <tbody>
            <tr>
              <th>key</th>
              <th>中文</th>
              <th>英文</th>
              <th>印度</th>
              <th>巴西</th>
              <th>操作</th>
            </tr>
            {
              this.state.list.map((item, index) => {
                return (
                  <tr key={item.key}>
                    <td>
                      <span>{item.key}</span>
                    </td>
                    <td>
                      <span>{item.cn}</span>
                    </td>
                    <td>
                      <span>{item.en}</span>
                    </td>
                    <td>
                      <span>{item.in}</span>
                    </td>
                    <td>
                      <span>{item.br}</span>
                    </td>
                    <td>
                      <Button onClick={this.deleteHandle.bind(this, index)}>删除</Button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }

  renderCheckbox = () => {
    const plainOptions = ['cn', 'en', 'in', 'br'];
    return (
      <label><i className={styles.star}></i>请选择生成json的字段：
      <Checkbox defaultChecked disabled /><span className={styles.disabledKey}>key</span>
      <Checkbox.Group options={plainOptions} defaultValue={['in', 'br']} onChange={this.onChangeHandle} /></label>
    )
  }

  render() {
    return (
      <div className={styles.editPage}>
        <label><i className={styles.star}></i>请输入活动名称：<Input type="text" placeholder="" value={this.state.name} onChange={this.inputChangeHandle.bind(this, 'name')} /></label>
        <table className={styles.tableBox} cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <th><i className={styles.star}></i>key</th>
                <th>中文</th>
                <th>英文</th>
                <th>印度</th>
                <th>巴西</th>
              </tr>
              <tr>
                <td>
                  <input ref={input => {this.firstInput = input}} type="text" placeholder="请输入" value={this.state.key} onChange={this.inputChangeHandle.bind(this, 'key')} />
                </td>
                <td>
                  <input type="text" placeholder="请输入" value={this.state.cn} onChange={this.inputChangeHandle.bind(this, 'cn')}/>
                </td>
                <td>
                  <input type="text" placeholder="请输入" value={this.state.en} onChange={this.inputChangeHandle.bind(this, 'en')} />
                </td>
                <td>
                  <input type="text" placeholder="请输入" value={this.state.in} onChange={this.inputChangeHandle.bind(this, 'in')} />
                </td>
                <td>
                  <input type="text" placeholder="请输入" value={this.state.br} onChange={this.inputChangeHandle.bind(this, 'br')} onKeyDown={(e: any) => this.keyDownHandle(e)} />
                </td>
              </tr>
            </tbody>
          </table>
        <Button className={styles.btnGo} onClick={this.addBtnHandle}>添加</Button>
        {this.renderResult()}
        {this.renderCheckbox()}
        <Button download className={styles.btnGo} onClick={this.submitBtnHandle}>生成json</Button>
        
      </div>
    )
  };
}

export default Edit;