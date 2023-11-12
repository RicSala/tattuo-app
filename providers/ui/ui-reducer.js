export const uiReducer = (state, action) => {
  switch (action.type) {
    case "[UI] - set LoginModal open":
      return {
        ...state,
        loginModalOpen: action.payload,
      };

    case "[UI] - set Sidebar open":
      return {
        ...state,
        sidebarOpen: action.payload,
      };

    case "[UI] - set ArtistRegister open":
      return {
        ...state,
        artistRegisterOpen: action.payload,
      };

    case "[UI] - set UserModal variant":
      return {
        ...state,
        userModalVariant: action.payload,
      };

    default:
      return state;
  }
};
