import ratelimit from "../config/upstash.js  ";

const rateLlimiter = async (req, res, next) => {
  try {
    //   just keeping it simple the general rule of thumb is to always pass the user_id or the ip address as the rate limit key
    const { success } = await ratelimit.limit("my rate-limit");
    if (!success) {
      return res
        .status(429)
        .json({ message: "too many request please try again later" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
export default rateLlimiter;
