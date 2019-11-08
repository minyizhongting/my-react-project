import React, { Component } from 'react';
import { connect } from 'dva';
import { getInfo } from '../services/home';
import styles from './index.less';
import { Button } from 'antd';

function mapStateToProps(state: any) {
  return {
    message: state.home.message
  }
}

type HomeProps = ReturnType<typeof mapStateToProps> & {dispatch?: any};

class Home extends Component<HomeProps> {

  async componentDidMount() {
    let info = await getInfo();
    console.log('info: ', info);
  }

  updateMessage = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/updateInfo',
      payload: 'haha sync'
    });
  }

  updateMessageAsync = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/updateInfoAsync'
    });
  }

  render() {
    const { message } = this.props;
    return (
      <div className={styles.homePage}>
        <p>{message}</p>
        <Button onClick={this.updateMessage}>click me sync</Button>
        <Button onClick={this.updateMessageAsync}>click me async</Button>
      </div>
    );
  }

}

export default connect(mapStateToProps)(Home);
