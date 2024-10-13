import {useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";


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
                                    name: '',
                                    email: '',
                                    login: '',
                                    password: '',
                                    confirmPassword: ''
                                }}
                                onSubmit={async (values) => {
                                    const postForm = await fetch('https://jsonplaceholder.typicode.com/users', {
                                        method: 'POST',
                                        data: values
                                    });
                                    const data = await postForm.json();
                                    console.log(data);
                                    navigate('/login');
                                }}
                                validationSchema={Yup.object({
                                    name: Yup.string()
                                        .min(3, 'Must be at least 3 characters')
                                        .max(15, 'Must be 15 characters or less')
                                        .required('Required'),
                                    email: Yup.string().email('Invalid email address').required('Required'),
                                    login: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
                                    password: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
                                    confirmPassword: Yup.string()
                                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                        .required('Required')
                                })}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Full Name</label>
                                            <Field className="form-control" type="text" name="name" />
                                            <ErrorMessage className="text-danger" name="name" component="div" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <Field className="form-control" type="email" name="email" />
                                            <ErrorMessage className="text-danger" name="email" component="div" />
                                        </div>

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

                                        <div className="mb-3">
                                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                            <Field className="form-control" type="password" name="confirmPassword" />
                                            <ErrorMessage className="text-danger" name="confirmPassword" component="div" />
                                        </div>

                                        <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
                                            Register
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

export default Register