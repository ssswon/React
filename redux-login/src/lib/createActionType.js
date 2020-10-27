export const createActionType = (type) => {
  const SUCCESS = `auth/${type}_SUCCESS`;
  const FAILURE = `auth/${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};
