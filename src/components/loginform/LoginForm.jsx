import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthProvider';

import { USER } from '../../services/users';

import styles from "./LoginForm.module.scss"
import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { HandleError } from '../../utils/HandleError';
import { Button, Grid, TextField } from '@mui/material';
export default function LoginForm() {
    const { setToken } = useContext(AuthContext);
    let navigate = useNavigate();
    const { register, handleSubmit, reset, watch, formState: { errors, isDirty, isValid } } = useForm({
        mode: 'onChange',
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const onSubmit = (data) => {
        Login(data);
    }

    const { mutate: Login } = useMutation(['Login'], USER.Login,
        {
            onSuccess(res) {
                toast.success("Login  is done ");
                reset();
                console.log(res);
                const { exp } = decodeToken(res.data.accessToken);
                navigate('/', { replace: true });
                setToken(res.data.accessToken);
                document.cookie = `token=${res.data.accessToken}; max-age=${exp};`;
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
                    textAlign: "center"
                }}>LogIn</h2>
                <Grid container justifyContent="center" alignItems="center" direction="column">
                    <Grid item >
                        <TextField
                            type="email"
                            {...register("email",
                                {
                                    required: {
                                        value: true,
                                        message: "required"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "min length 8 char"
                                    }
                                })}
                            label={"email"}
                        />
                        <br />
                    </Grid>
                        {errors.email && <label  className={styles.validation}>{errors.email.message}</label>}
                    <Grid item >
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
                        />   <br />
                       
                    </Grid>
                    {errors.password && <label  className={styles.validation}>{errors.password.message}</label>}
                </Grid>

                <Button className={styles.submitbutton} disabled={!isDirty || !isValid} type="submit" >Submit</Button>
            </form>
        </>
    )
}
