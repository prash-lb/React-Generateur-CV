import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import React from "react";


function Register() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-header text-center bg-primary text-white">
                            <h3>Register</h3>
                        </div>
                        <div className="card-body">
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: '',
                                }}
                                onSubmit={async (values) => {
                                    console.log("value+" + JSON.stringify(values));
                                    const postForm = await fetch('https://cv-generator-klm2.onrender.com/api/register', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(values)
                                    });
                                    const data = await postForm.json();
                                    console.log("register "+JSON.stringify(data));
                                    navigate('/');
                                }}
                                validationSchema={Yup.object({

                                    email: Yup.string().email('Invalid email address').required('Required'),
                                    password: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),

                                })}
                            >
                                {({isSubmitting}) => (
                                    <Form>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <Field className="form-control" type="email" name="email"/>
                                            <ErrorMessage className="text-danger" name="email" component="div"/>
                                        </div>


                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <Field className="form-control" type="password" name="password"/>
                                            <ErrorMessage className="text-danger" name="password" component="div"/>
                                        </div>
                                        <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
                                            Register
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                            <div className="text-center mt-3">
                                <p>
                                    Vous avez déja un compte? <Link to="/login">Connectez-vous</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register