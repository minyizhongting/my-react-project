import { updateInfoAsync } from '../services/home';

export default {
  namespace: 'home',

  state: {
    message: 'home message'
  },

  effects: {
    *updateInfoAsync(_: any, {call, put}: any) {
      let res = yield call(updateInfoAsync);
      console.log(res);
      yield put({
        type: 'updateInfo',
        payload: res.result
      })
    }
  },
  reducers: {
    updateInfo(state: any, { payload }: {payload: object}){
      return {
          ...state,
          message: payload
      };
  },
  }
  
}