// Initial State
const initialState = {
    favorites: [],
  };
const favoriteReducer = (state = initialState, action) => {
  console.log("action",action);
  switch (action.type) {
    case 'ADD_FAVORITE': {
      const newData = state.favorites
      newData.push(action.user)
      console.log('newData', newData)
      return {
        ...state,
        favorites: newData
      }
    }
   
    default: {
      return state;
    }
  }
};
export default favoriteReducer;