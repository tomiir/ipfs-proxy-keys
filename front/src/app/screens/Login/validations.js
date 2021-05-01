const REQUIRED_ERROR = 'This field is required';

export const requiredString = str => str?.length <= 0 && REQUIRED_ERROR;
