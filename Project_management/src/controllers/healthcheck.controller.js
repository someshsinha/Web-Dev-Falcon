/*
here is why we have control, to control I mean so that we can design what function do I want to pass then this request comes in here
*/

import ApiResponse from "../utils/apiresponse.js";
import ApiError from "../utils/apierror.js";
import asyncHandler from "../utils/asyncHandler.js";
//it's job is to deilver the responses
const healthCheck = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "Alhamdulliah brother it is working "));
});
export { healthCheck };
