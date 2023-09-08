import { toast } from "react-toastify";



export const HandleError=(error)=>{
    toast.error( error?.response?.data || error.message);
}