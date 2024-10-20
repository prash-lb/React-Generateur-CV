import React, {useContext, useState} from "react";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from "../Context/UserContext.jsx";

function Login() {
    const navigate = useNavigate();
    const {login} = useContext(UserContext);
    const [errormessage, setErrormessage] = useState('');

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
                                    email: '',
                                    password: ''
                                }}
                                onSubmit={async (values, {setSubmitting, setErrors}) => {
                                    try {
                                        const res = await fetch('https://cv-generator-klm2.onrender.com/api/login', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify(values),
                                        });
                                        console.log("status :"+res.status);
                                        if (res.status === 201 || res.status === 200) {
                                            const data = await res.json();
                                            console.log("Login successful");
                                            login(data);
                                            navigate('/dashboard', { replace: true });
                                        } else if (res.status === 500) {
                                            setErrormessage("Login ou mot de passe incorrect");
                                        } else if(res.status === 401) {
                                            setErrormessage("Compte inexistant");
                                        }else {
                                            setErrors( "Invalid login or password" );
                                        }
                                    } catch (error) {
                                        console.log("Error: ", error.message);
                                        setErrors("An error occurred, please try again later.");
                                    }
                                    setSubmitting(false);
                                }}
                                validationSchema={Yup.object({
                                    email: Yup.string().email('Invalid email format').required('Email is required'),
                                    password: Yup.string().required('Password is required'),
                                })}
                            >
                                {({isSubmitting}) => (
                                    <Form>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <Field className="form-control" type="email" name="email" />
                                            <ErrorMessage className="text-danger" name="email" component="div" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <Field className="form-control" type="password" name="password" />
                                            <ErrorMessage className="text-danger" name="password" component="div" />
                                        </div>

                                        {errormessage && (
                                            <p className="text-danger">{errormessage}</p>
                                        )}

                                        <button
                                            className="btn btn-primary w-100"
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <div className="spinner-border spinner-border-sm" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            ) : "Login"}
                                        </button>
                                    </Form>
                                )}
                            </Formik>

                            <div className="text-center mt-3">
                                <p>
                                    Vous n'avez pas de compte? <Link to="/register">Inscrivez-vous</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
