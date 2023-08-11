export const authReducer = (state, action) => {

  switch (action.type) {

    case '[AUTH] - Login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    case '[AUTH] - Logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };

    case '[AUTH] - Add Board':
      return {
        ...state,
        user: {
          ...state.user,
          boards: [...state.user.boards, action.payload],
        },
      };

    case '[AUTH] - Remove Board':
      return {
        ...state,
        user: {
          ...state.user,
          boards: state.user.boards.filter((board) => board.id !== action.payload),
        },
      };



    default:
      return state;
  }
};