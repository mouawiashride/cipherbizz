import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { HiDownload } from "react-icons/hi";
import { AiFillEye } from "react-icons/ai";
import { employees } from "../../services/employees";
import { queryClient } from "../../App";
import { queries } from "@testing-library/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { HandleError } from "../../utils/HandleError";
import generatePDF from "react-to-pdf";
import { options } from "../../confiq/pdfoptions";
import { Controller, useForm } from "react-hook-form";
export default function EmplyeeGroup({
  name,
  coverPhoto,
  StafId,
  id,
  position,
}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const { mutate: Delete } = useMutation(
    ["DeleteEmployee"],
  employees.DeleteEmployee,
    {
      onSuccess(res) {
        toast.success("Delete  is done ");
        queryClient.invalidateQueries({ queryKey: ["employees"] });
      },
      onError(error) {
        HandleError(error);
      },
    }
  );
  const getTargetElement = () => document.getElementById('content-id');
  const [open, setOpen] = React.useState(false);
  const { handleSubmit, control,formState:{isDirty,isValid}, reset,setValue } = useForm();

  const onSubmit = (data) => {
    // Handle form submission here
    data.id=id;
    Update(data);
  };


  const { mutate: Update } = useMutation(
    ["UpdateEmployee"],
  employees.UpdateEmployee,
    {
      onSuccess(res) {
        toast.success("Employee Update");
        queryClient.invalidateQueries({ queryKey: ["employees"] });
        setOpen(false);
      },
      onError(error) {
        HandleError(error);
      },
    }
  );


  useEffect(()=>{
setValue('name',name);
setValue('StafId',StafId);
setValue('position',position);


  },[]);
  return (<>
    <Modal
    open={open}
    onClose={()=>setOpen(false)}
    aria-labelledby="parent-modal-title"
    aria-describedby="parent-modal-description"
  >
    <Box sx={{ ...style, width: 400 }}>
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Input 1"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="position"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="position"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="StafId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="StafId"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>

         
        </Grid>

        <Button type="submit" variant="contained" color="primary" disabled={!isDirty || !isValid}>
          Submit
        </Button>
      </form>
    </Box>
  </Modal>
    <Grid item xs={10} sm={8} md={3} id="content-id" >
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              objectFit: "cover",
              borderRadius: "100%",
              width: "60px",
              height: "60px",
            }}
            image={coverPhoto}
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <span
                style={{
                  fontWeight: 200,
                  margin: "0px",
                  padding: "0px",
                }}
              >
                {StafId}
              </span>
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                margin: "0px",
                padding: "0px",
                lineHeight: "1",
              }}
            >
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <span
                style={{
                  fontWeight: 200,
                }}
              >
                {" "}
                {position}
              </span>
            </Typography>
          </CardContent>
        </div>
        <CardActions sx={{
          display:"flex",
          justifyContent:"space-between",
          alignContent:"center",
          backgroundColor:"#f5f5f5",
          alignItems:"center",
          width:"100%"
        }}>
          <label>

          Documents(5)
          </label>
          <div>

         
          <FaRegTrashAlt style={{
            padding:"4px",fontSize:"20px",margin:"0px 2px",backgroundColor:"white",borderRadius:"10px"
          }} color="red" onClick={() => Delete(id)} />
          <MdOutlineEdit style={{
            padding:"4px",fontSize:"20px",margin:"0px 2px",backgroundColor:"white",borderRadius:"10px"
          }}  color="green" onClick={()=>setOpen(true)} />
          <HiDownload style={{
            padding:"4px",fontSize:"20px",margin:"0px 2px",backgroundColor:"white",borderRadius:"10px"
          }}  onClick={() => generatePDF(getTargetElement, options)} />
          <Link to={`show/${id}`}>
          <AiFillEye style={{
            padding:"4px",fontSize:"20px",margin:"0px 2px",backgroundColor:"white",borderRadius:"10px"
          }}  />
          </Link>
          </div>
        </CardActions>
      </Card>
    </Grid>
    </>
  );
}
