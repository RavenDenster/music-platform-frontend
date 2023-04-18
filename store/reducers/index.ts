import {combineReducers} from 'redux'
import {playerReducer} from './playerReducer'
import { HYDRATE, } from "next-redux-wrapper";
import { trackReducer } from './trackReducer';
import { albumReducer } from './albumReducer';
import { musicHomeReducer } from './musicHomeReducer';
import { authReducer } from './authReducer';

const rootReducer = combineReducers({
    player: playerReducer,
    track: trackReducer,
    album: albumReducer, 
    musicHome: musicHomeReducer,
    auth: authReducer
})

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state, 
        ...action.payload,
      };
      if (state.count) nextState.count = state.count;
      return nextState;
    } else {
      return rootReducer(state, action);
    }
};

export type RootState = ReturnType<typeof rootReducer>