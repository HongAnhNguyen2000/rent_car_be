export default class Setting {
    static JWT_KEY: string = process.env.JWT_KEY || '';
    static AWS_ACCESS_KEY_ID: string = process.env.AWS_ACCESS_KEY_ID || '';
    static AWS_SECRET_ACCESS_KEY: string = process.env.AWS_SECRET_ACCESS_KEY || '';
    static AWS_REGION: string = process.env.AWS_REGION || '';
    static AWS_BUCKET: string = process.env.AWS_BUCKET || '';
    static GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || '';
    static GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET || '';
    static GOOGLE_CALLBACK_URL: string = process.env.GOOGLE_CALLBACK_URL || '';
    static OAUTH_USER_PASSWORD: string = process.env.OAUTH_USER_PASSWORD || '';
  }
  