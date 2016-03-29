const projectPlanning = (state = {}, action) => {
  switch (action.type) {
    case 'REMOVE_STORY':
      break;
    case 'NEW_STORY':
      debugger;
      return action.project;
    case 'REMOVE_SPRINT':
      break;
    case 'NEW_SPRINT':
      break;
    default:
      return state;
  }
};

export default projectPlanning;
