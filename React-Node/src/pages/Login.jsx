import React from "react";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-header text-center bg-primary text-white">
                            <h3>Login</h3>
                        </div>
                        <div className="card-body">
                            <Formik
                                initialValues={{
                                    login: '',
                                    password: ''
                                }}
                                onSubmit={async (values) => {
                                    try {
                                        const res = await fetch('https://jsonplaceholder.typicode.com/users', {
                                            method: 'POST',
                                            data: values
                                        });
                                        if (res.status === 200 || res.status === 201) {
                                            console.log("Login successful");
                                            const data = await res.json();
                                            console.log(data);
                                            navigate('/', { replace: true });
                                        }
                                    } catch (error) {
                                        console.log("Error: ", error.message);
                                    }
                                }}
                                validationSchema={Yup.object({
                                    login: Yup.string().required('Login is required'),
                                    password: Yup.string().required('Password is required'),
                                })}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="mb-3">
                                            <label htmlFor="login" className="form-label">Username</label>
                                            <Field className="form-control" type="text" name="login" />
                                            <ErrorMessage className="text-danger" name="login" component="div" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <Field className="form-control" type="password" name="password" />
                                            <ErrorMessage className="text-danger" name="password" component="div" />
                                        </div>

                                        <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
                                            Login
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
