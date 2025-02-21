import axios from "axios";
import {toast} from "react-toastify";
import {redirect} from "react-router-dom";


export const deleteJobAction = async ({params})=>{
  try {
    await axios.request({
      method:'delete',
      url:`/api/jobs/${params.id}`
    })
    toast.success("job deleted successfully")
  }catch (e) {
    toast.error(e.response.data.message || e.message)
  }
  return redirect("/dashboard/all-jobs")

}