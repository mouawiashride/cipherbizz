
import React from 'react';
import styles from "./RegisterForm.module.scss";
import { USER } from '../../services/users';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { HandleError } from '../../utils/HandleError';
import { Button, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';


export default function RegisterForm() {
    const { register, handleSubmit, reset, watch, formState: { errors, isDirty, isValid } } = useForm({
        mode: 'onChange',
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const onSubmit =  (data)=> {
        Register(data);
	  }

      const { mutate:Register } = useMutation(['createUser'], USER.CreateUser ,
      {
        onSuccess(data) {
   toast.success("create account is done ");
   reset();
        },
        onError(error) {
            HandleError(error);
        },
  
      }
    );

    return (
        <>
           <form onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{
                textAlign:"center"
            }}>Signup</h2>
            <Grid container  justifyContent="center" alignItems="center" direction="column">
                <Grid item  xs={10} sm={6}>
                    <TextField 
        
                       type="email"
                        {...register("email",
                            {
                                required: {
                                    value: true,
                                    message: "required"
                                },
                                minLength: {
                                    value: 6,
                                    message: "min length 6 char"
                                }
                            })}
                        label={"email"}
                    />
                    <br/>
                   
                </Grid>
                {errors.email&&<label  className={styles.validation}>{errors.email.message}</label>}
                <Grid item  xs={10} md={6}>
                    <TextField
                     
                      {...register("password",
                      {
                          required: {
                              value: true,
                              message: "required"
                          },
                          minLength: {
                              value: 8,
                              message: "min length 8 char"
                          },
                          maxLength:
                          {
                              value: 32,
                              message: "max length 32 char"
                          }
                          ,
                          pattern: {
                              value: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,32}$/,
                              message: "you should conatin at least one specail char ,number,capital and small later"
                          }
                      })}
                        label={"password"}
                    />   <br/>
                   
                </Grid>
                {errors.password && <label className={styles.validation}>{errors.password.message}</label>}
            </Grid>
              
            <Button className={styles.submitbutton} disabled={!isDirty || !isValid} type="submit" >Submit</Button>
            </form>
        </>
    )
}
