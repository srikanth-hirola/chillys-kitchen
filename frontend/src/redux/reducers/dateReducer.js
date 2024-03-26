 // reducers/dateReducer.js
const initialState = {
    formattedDate: ''
  };
  
  const dateReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FORMATTED_DATE':
        return { ...state, formattedDate: action.payload };
      default:
        return state;
    }
  };
  
  export default dateReducer;
  