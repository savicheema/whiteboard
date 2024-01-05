import {
  REDO_ACTION,
  SET_COLOR,
  SET_OBJECTS,
  SET_SHAPE,
  UNDO_ACTION,
  SET_SIZE,
} from "../store/consts";

const initialState = {
  objects: [],
  shape: "pencil",
  color: "black",
  history: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_OBJECTS:
      return {
        ...state,
        history: [],
        objects: [...action.objects],
      };
    case SET_SHAPE:
      return {
        ...state,
        shape: action.shape,
      };
    case SET_SIZE: {
      return {
        ...state,
        size: action.size,
      };
    }
    case SET_COLOR:
      return {
        ...state,
        color: action.color,
      };
    case UNDO_ACTION:
      if (state.objects.length === 0) return state;
      state.history.push(state.objects[state.objects.length - 1]);
      return {
        ...state,
        history: [...state.history],
        objects: [
          ...state.objects.filter((m, i) => i < state.objects.length - 1),
        ],
      };
    case REDO_ACTION:
      if (state.history.length === 0) return state;
      state.objects.push(state.history[state.history.length - 1]);
      return {
        ...state,
        history: [
          ...state.history.filter((m, i) => i < state.history.length - 1),
        ],
        objects: [...state.objects],
      };
    default:
      return state;
  }
}
