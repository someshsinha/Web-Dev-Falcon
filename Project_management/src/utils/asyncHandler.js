//will handle all of the errors
import { healthCheck } from "../controllers/healthcheck.controller.js";
const asyncHandler = (healthCheck) => {
  return (req, res, next) => {
    Promise.resolve(healthCheck(req, res, next)).catch((err) => {
      next(err);
    });
  };
};
export default asyncHandler;
