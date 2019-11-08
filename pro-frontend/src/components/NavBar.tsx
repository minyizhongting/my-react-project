/* eslint-disable no-empty-pattern */
import React, { Component } from 'react';
import { connect, routerRedux } from 'dva';
import withRouter from 'umi/withRouter';

import styles from './NavBar.less';

export interface Prop {
  dispatch: any;
  location: any;
  [propName: string]: any;
}

function mapStateToProps() {
  return {};
}

class NavBar extends Component<Prop> {

  componentDidMount() {
    console.log('withRouter props: ', this.props);
  }

  goPage = (val: string) => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`${val}`));
  }

  render() {
    const { location } = this.props;
    const pathname = location.pathname;
    return (
      <ul className={styles.navBar}>
        <li className={pathname === '/' ? styles.active : ''} onClick={this.goPage.bind(this, '/')}>home</li>
        <li className={pathname === '/edit' ? styles.active : ''} onClick={this.goPage.bind(this, '/edit')}>edit</li>
      </ul>
    )
  }


}

export default withRouter(connect(mapStateToProps)(NavBar));
