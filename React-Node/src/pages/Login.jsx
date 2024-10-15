import React, {useContext} from "react";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from "../Context/UserContext.jsx";
import log from "eslint-plugin-react/lib/util/log.js";

function Login() {
    const navigate = useNavigate();
    const {login} = useContext(UserContext)
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
                                        const res = await fetch('http://localhost:3000/users', {
                                            method: 'GET',
                                        });
                                        if (res.ok) {  // Vérifie si la requête a réussi (status code 200)
                                            const data = await res.json();
                                            const user = data.find(user => user.email === values.email && user.password === values.password);
                                            if(user) {
                                                console.log("Login success");
                                                const res2 = await fetch('http://localhost:3000/CV', {
                                                    method: 'GET',
                                                });

                                                if(res2.ok) {
                                                    const cvData = await res2.json();
                                                    const userCV = cvData.find(cv => cv.email === user.email) || null;
                                                    login(user, userCV)
                                                    console.log("User info :"+localStorage.getItem('user') + "\n CVinfo : "+localStorage.getItem('cvData'));
                                                    navigate('/dashboard', { replace: true });
                                                }else {
                                                    console.log("Error: Status code", res2.status);
                                                }
                                            }else {
                                                setErrors({ username: "Invalid login or password" });
                                            }

                                        } else {
                                            console.log("Error: Status code", res.status);  // Affiche une erreur si la requête échoue
                                        }
                                        //methode tempo serveur json  facti
                                        //Vrai methode
                                        /* const res = await fetch('http://localhost:3000/users', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify(values),
                                        });
                                        console.log("status :"+res.status);
                                        if (res.ok) { // Vérification que la réponse HTTP est OK (status 200-299)
                                            const data = await res.json();
                                            console.log("data "+JSON.stringify(data));
                                            console.log("data.succes "+data.success);
                                            // Supposons que 'data' contient les informations de l'utilisateur
                                            if (data && data.success) {
                                                console.log("Login successful");
                                                login(data);
                                                navigate('/', { replace: true });
                                            } else {
                                                setErrors({ login: "Invalid login or password" });
                                            }
                                        } else {
                                            setErrors({ login: "Invalid login or password" });
                                        }*/
                                    } catch (error) {
                                        console.log("Error: ", error.message);
                                        setErrors({login: "An error occurred, please try again later."});
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
                                            <Field className="form-control" type="email" name="email"/>
                                            <ErrorMessage className="text-danger" name="email" component="div"/>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <Field className="form-control" type="password" name="password"/>
                                            <ErrorMessage className="text-danger" name="password" component="div"/>
                                        </div>

                                        <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
                                            Login
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
