import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/Auth/AuthProvider";
import {  employees } from "../../services/employees";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

export default function EmplyeeCard() {
  const { IsSignIn } = useContext(AuthContext);
  const { id } = useParams();

  const { isLoading, isSuccess, isError, data, error, refetch } = useQuery(
    ["employee", id],
    employees.GetEmployee,
    {
      onError(error) {
        toast.error(error.message);
      },
    }
  );
  
console.log(data);
  return (
    <Grid container justifyContent="center" spacing={4}>
      <Grid item xs={10} sm={8} md={4}>
        <Card>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={data?.data?.coverPhoto}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <Grid container justifyContent="space-between">
                <Grid item>{data?.data?.position}</Grid>
                <Grid item>{data?.data?.NumberOfPages} {data.data.name}</Grid>
              </Grid>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <Grid container justifyContent="space-between">
                <Grid item>
                  <span
                    style={{
                      fontWeight: 200,
                    }}
                  >
                    {data.data.StafId}
                  </span>{" "}
                 
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
          <CardActions>
            
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
