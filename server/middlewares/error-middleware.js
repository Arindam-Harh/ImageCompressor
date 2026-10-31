export const errorMiddleware = async (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Invalid Credentials";
  return res.status(status).json({ message });
};
