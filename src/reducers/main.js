import { DEFAULT_STATE } from '../constants/defaults';

export default function screenReducer(state = DEFAULT_STATE, action){

  switch(action.type) {
    case "WINDOW_RESIZE":
      return {
        ...state,
        windowWidth: action.payload.windowWidth,
        windowHeight: action.payload.windowHeight
      }
    default: 
      return {
        ...state
      };
  }

};