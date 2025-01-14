interface Environment {
  production: boolean;
  websiteAPI:string;
  aiAPI:string;
}

export const environment: Environment = {
  production:true,
  websiteAPI:"http://192.168.10.162:1010",
  aiAPI:"http://192.168.10.162:1010/api/user/ai/"
};
