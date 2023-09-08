import apiclient from "../confiq/axios";
class Users {
  CreateUser = async (param) => {
    console.log(param);
    return await apiclient.post("register", param);
  };

  Login = async (param) => {
    return await apiclient.post(`login`, JSON.stringify({ ...param }));
  };
}
export const USER = new Users();
