export { delay } from "./library/delay";
export { JWTService } from "./jwt/jwt";
export {
  UserServiceService,
  UserRequest,
  UserServiceServer,
  UserServiceClient,
  TeamResponse,
  ProjectServiceServer,
  ProjectServiceClient,
  ProjectServiceService,
  ProjectsResponse,
  ProjectRequest,
} from "./grpc/cmn";
export {modify} from './middlewares/setParamsMiddleware'
import dotenv from "dotenv";
export { authenticate } from "./middlewares/authMiddleware";
dotenv.config();
export const environmentVariables = {
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME, 
  CLOUDINARY_APIKEY: process.env.CLOUDINARY_APIKEY,
  CLOUDINARY_APISECRET: process.env.CLOUDINARY_APISECRET,
};
