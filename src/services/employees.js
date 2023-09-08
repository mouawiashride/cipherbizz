import apiclient from "../confiq/axios";

class Employees {
  GetEmployees = async (param) => {
    let filters = "";
    if (param.queryKey[1] !== "") filters += `name_like=${param.queryKey[1]}`;
    if (param.queryKey[2] !== "")
      filters += `department=${param.queryKey[2]}&&`;
    if (param.queryKey[3] !== "") filters += `status=${param.queryKey[3]}&&`;
    //    if(param.queryKey[4]!=="")
    //    filters+=`Language=${param.queryKey[4]}&&`;

    //    filters+=`SellPrice_gte=${param.queryKey[5][0]}&SellPrice_lte=${param.queryKey[5][1]}`
    // console.log(filters);
    return await apiclient.get(
      `employees?_page=${param.queryKey[4]}&_limit=${param.queryKey[5]}${filters}`
    );
  };

  GetEmployee = async (param) => {
    return await apiclient.get(`employees/${param.queryKey[1]}`);
  };

  DeleteEmployee = async (param) => {
    return await apiclient.delete(`employees/${param}`);
  };

  UpdateEmployee = async (param) => {
    console.log(param);
    return await apiclient.patch(`employees/${param.id}`, param);
  };
}
export const employees = new Employees();
