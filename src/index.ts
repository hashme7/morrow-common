export { delay } from './library/delay';
export { JWTService } from './jwt/jwt';
export { UserServiceService,UserRequest,UserServiceServer,UserServiceClient,TeamResponse } from './grpc/user';
import dotenv from 'dotenv'
export  {authenticate} from './middlewares/authMiddleware';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });
export const environmentVariables = {
    CLOUDINARY_URL:process.env.CLOUDINARY_URL,
    CLOUDINARY_NAME:process.env.CLOUDINARY_NAME,
    CLOUDINARY_APIKEY:process.env.CLOUDINARY_APIKEY,
    CLOUDINARY_APISECRET:process.env.CLOUDINARY_APISECRET,
}
