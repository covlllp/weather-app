import { handleActions } from 'redux-actions';
import { actions } from 'js/actions';

const actionMap = {};
actionMap[actions.SET_PONCHO_DESCRIPTION] = (state, action) => {
  const poncho = Object.assign({}, state.poncho, action.payload);
  return Object.assign({}, state, { poncho });
};
actionMap[actions.SET_TODAY_INFO] = (state, action) => {
  const today = Object.assign({}, state.today, action.payload);
  return Object.assign({}, state, { today });
};
actionMap[actions.SET_DAILY_INFO] = (state, action) => (
  Object.assign({}, state, { daily: action.payload })
);
actionMap[actions.SET_HOURLY_INFO] = (state, action) => (
  Object.assign({}, state, { hourly: action.payload })
);
actionMap[actions.SET_FLICKR_GROUP_ID] = (state, action) => (
  Object.assign({}, state, { flickrId: action.payload })
);
actionMap[actions.SET_IMAGE] = (state, action) => (
  Object.assign({}, state, { background: action.payload })
);

const reducer = handleActions(actionMap, {
  today: {},
  poncho: {},
  daily: [],
  hourly: [],
  background: null,
  flickrId: null,
});

export default reducer;
