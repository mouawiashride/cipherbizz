import React, { useState } from "react";
import EmplyeeGroup from "../../components/EmplyeeGroup/EmplyeeGroup";

import { employees } from "../../services/employees";
import { HandleError } from "../../utils/HandleError";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Modal,
  NativeSelect,
  Pagination,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [name, setName] = useState("");
  const [department, setdepartment] = useState("");
  const [status, setstatus] = useState("");

  const { isLoading, isSuccess, isError, data, error, refetch } = useQuery(
    ["employees", name, department, status, page, limit],
    employees.GetEmployees,
    {
      onError(error) {
        HandleError(error);
      },
    }
  );

  return (
    <>
      <Container
        fixed
        sx={{
          marginTop: "100px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            marginBottom: "10px",
          }}
        >
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="fullWidth"
            id="fullWidth"
          />
          <FormControl
            sx={{
              width: "200px",
            }}
          >
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              department
            </InputLabel>
            <NativeSelect
              onChange={(e) => {
                setdepartment(e.target.value)
                setName('');
              }}
              defaultValue={""}
              inputProps={{
                name: "department",
                id: "uncontrolled-native",
              }}
            >
              <option value={""}></option>
              <option value={"it"}>it</option>
              <option value={"clear"}>clear</option>
            </NativeSelect>
          </FormControl>
          <FormControl
            sx={{
              width: "200px",
            }}
          >
            <InputLabel variant="standard" htmlFor="uncontrolled-nativ">
              ALL Status
            </InputLabel>
            <NativeSelect
              onChange={(e) => {
                setstatus(e.target.value);
                setName('');
              
              }}
              defaultValue={""}
              inputProps={{
                name: "All Status",
                id: "uncontrolled-nativ",
              }}
            >
              <option value={""}></option>
              <option value={"active"}>active</option>
              <option value={"unactive"}>unactive</option>
            </NativeSelect>
          </FormControl>
        </Box>
        <Grid
          container
          alignItems="center"
          flexWrap="wrap"
          spacing={3}
          sx={{
            direction: { sm: "row" },
            justifyContent: {
              xs: "center",
              sm: "space-between",
            },
          }}
        >
          {data?.data?.map((user) => {
            return (
              <EmplyeeGroup
                key={user.id}
                id={user.id}
                position={user.position}
                StafId={user.StafId}
                name={user.name}
                coverPhoto={user.coverPhoto}
              />
            );
          })}
          {!data?.data?.length && !isLoading ? (
            <h3
              style={{
                color: "red",
                textAlign: "center",
              }}
            >
              There no data
            </h3>
          ) : (
            <></>
          )}
        </Grid>
        <Grid container justifyContent="center">
          <Stack spacing={2}>
            {/* <Pagination 
      shape='rounded'
       variant="outlined" 
       count={data?.meta?.pagination?.total_pages} 
       showFirstButton
        showLastButton 
        page={page}
        defaultPage={1}
         onChange={(e,value)=>setPage(value)} 
         /> */}
          </Stack>
        </Grid>
      </Container>
    </>
  );
}
