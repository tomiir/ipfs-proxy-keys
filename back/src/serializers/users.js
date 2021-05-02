export const signInMapper = ({
  expirationTime = process.env.JWT_EXPIRATION_TIME,
  token,
}) => ({ expirationTime, token });

export const userMapper = ({ email }) => ({ email });
