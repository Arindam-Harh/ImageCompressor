import rateLimit from "express-rate-limit";

const DAY = 24 * 60 * 60 * 1000;

const make = (limit, message, extra = {}) =>
  rateLimit({
    windowMs: DAY,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => res.status(429).json({ message }),
    ...extra,
  });

export const globalLimiter = make(
  2000,
  "Too many requests. Please try again in 24 hours."
);

export const authLimiter = make(
  20,
  "Too many attempts. Please try again in 24 hours.",
  { skipSuccessfulRequests: true }
);