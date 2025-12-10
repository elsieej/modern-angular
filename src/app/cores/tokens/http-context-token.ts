import { HttpContextToken } from '@angular/common/http';
const SEND_TOKEN_IN_AUTH_REQUEST = new HttpContextToken<boolean>(() => false);
export default SEND_TOKEN_IN_AUTH_REQUEST;
