// eslint-disable-next-line no-unused-vars
import React, {useContext, } from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import * as Yup from "yup";
import {UserContext} from "../Context/UserContext.jsx";
import Header from "../components/Header.jsx";
/**
 * Composant page de gestion du cv pour changer les champ
 * @component
 */
function GestionCv() {
    const navigate = useNavigate();
    const location = useLocation();
    const { getUserInfos } = useContext(UserContext);
    const { cv } = location.state || {};
    const cvdata = cv[0];

    return (
        <>
        <Header />
        <div className="container">
            <div className="row  justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card shadow-lg">
                        <div className="card-header text-center bg-primary text-white">
                            <h3>Modifier le CV</h3>
                        </div>
                        <div className="card-body">
                            <Formik
                                initialValues={{
                                    firstName:  cvdata.firstName,
                                    lastName:  cvdata.lastName,
                                    description: cvdata.description,
                                    education: cvdata.education,
                                    experiences: cvdata.experiences,
                                    isVisible:  cvdata.isVisible
                                }}
                                validationSchema={Yup.object({
                                    firstName: Yup.string().required('First name is required'),
                                    lastName: Yup.string().required('Last name is required'),
                                    description: Yup.string().required('Description is required'),
                                    education: Yup.array().of(
                                        Yup.object({
                                            formation: Yup.string().required('formation is required'),
                                            institution: Yup.string().required('Institution is required'),
                                            year: Yup.string().required('Year is required'),
                                        })
                                    ),
                                    experiences: Yup.array().of(
                                        Yup.object({
                                            role: Yup.string().required('Role is required'),
                                            company: Yup.string().required('Company is required'),
                                            year: Yup.string().required('Year is required'),
                                        })
                                    ),
                                    isVisible: Yup.boolean().required('Visibility is required'),
                                })}
                                onSubmit={async (values, { setSubmitting }) => {
                                    const cvid = cvdata._id;
                                    try {
                                        const res = await fetch(`https://cv-generator-klm2.onrender.com/api/cvRouter/${cvid}`, {
                                            method: 'PUT',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'authorization': `Bearer ${getUserInfos().user.user.token}`,
                                            },
                                            body:JSON.stringify(values),
                                        });
                                        if(res.status === 401) {
                                            const errorData = await res.json();
                                            if (errorData.message === "Token has expired, please log in again") {
                                                navigate("/login");
                                            }
                                        }else if (res.status === 201 || res.status === 200) {
                                            console.log("CV modified successfully");
                                            navigate('/dashboard')
                                        } else {
                                            console.log("Failed to modified CV");
                                        }
                                    }catch (err){
                                        console.log(err);
                                    }
                                    setSubmitting(false);
                                }}>
                                {({ isSubmitting, values }) => (
                                    <Form>
                                        <div className="mb-3">
                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                            <Field className="form-control" type="text" name="firstName"/>
                                            <ErrorMessage className="text-danger" name="firstName" component="div"/>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                            <Field className="form-control" type="text" name="lastName"/>
                                            <ErrorMessage className="text-danger" name="lastName" component="div"/>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Description</label>
                                            <Field as="textarea" className="form-control" name="description"/>
                                            <ErrorMessage className="text-danger" name="description" component="div"/>
                                        </div>
                                        <div className="mb-3 form-check form-switch">
                                            <label htmlFor="isVisible" className="form-check-label">CV Visible ?</label>
                                            <Field
                                                type="checkbox"
                                                className="form-check-input"
                                                id="isVisible"
                                                name="isVisible"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Education</label>
                                            <FieldArray name="education">
                                                {({remove, push}) => (
                                                    <div>
                                                        {values.education.map((_, index) => (
                                                            <div key={index} className="row">
                                                                <div className="col">
                                                                    <Field className="form-control"
                                                                           name={`education.${index}.formation`}
                                                                           placeholder="Formation"/>
                                                                    <ErrorMessage className="text-danger"
                                                                                  name={`education.${index}.formation`}
                                                                                  component="div"/>
                                                                </div>
                                                                <div className="col">
                                                                    <Field className="form-control"
                                                                           name={`education.${index}.institution`}
                                                                           placeholder="Institution"/>
                                                                    <ErrorMessage className="text-danger"
                                                                                  name={`education.${index}.institution`}
                                                                                  component="div"/>
                                                                </div>
                                                                <div className="col">
                                                                    <Field className="form-control"
                                                                           name={`education.${index}.year`}
                                                                           placeholder="Year"/>
                                                                    <ErrorMessage className="text-danger"
                                                                                  name={`education.${index}.year`}
                                                                                  component="div"/>
                                                                </div>
                                                                <div className="col-1">
                                                                    <button type="button" className="btn btn-danger"
                                                                            onClick={() => remove(index)}>X
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <button type="button" className="btn btn-secondary mt-3"
                                                                onClick={() => push({
                                                                    formation: '',
                                                                    institution: '',
                                                                    year: ''
                                                                })}>
                                                            Ajouter une éducation
                                                        </button>
                                                    </div>
                                                )}
                                            </FieldArray>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Experiences</label>
                                            <FieldArray name="experiences">
                                                {({remove, push}) => (
                                                    <div>
                                                        {values.experiences.map((_, index2) => (
                                                            <div key={index2} className="row">
                                                                <div className="col">
                                                                    <Field className="form-control"
                                                                           name={`experiences.${index2}.role`}
                                                                           placeholder="Role"/>
                                                                    <ErrorMessage className="text-danger"
                                                                                  name={`experiences.${index2}.role`}
                                                                                  component="div"/>
                                                                </div>
                                                                <div className="col">
                                                                    <Field className="form-control"
                                                                           name={`experiences.${index2}.company`}
                                                                           placeholder="Company"/>
                                                                    <ErrorMessage className="text-danger"
                                                                                  name={`experiences.${index2}.company`}
                                                                                  component="div"/>
                                                                </div>
                                                                <div className="col">
                                                                    <Field className="form-control"
                                                                           name={`experiences.${index2}.year`}
                                                                           placeholder="Year"/>
                                                                    <ErrorMessage className="text-danger"
                                                                                  name={`experiences.${index2}.year`}
                                                                                  component="div"/>
                                                                </div>
                                                                <div className="col-1">
                                                                    <button type="button" className="btn btn-danger"
                                                                            onClick={() => remove(index2)}>X
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <button type="button" className="btn btn-secondary mt-3"
                                                                onClick={() => push({
                                                                    role: '',
                                                                    company: '',
                                                                    year: ''
                                                                })}>
                                                            Ajouter une expérience
                                                        </button>
                                                    </div>
                                                )}
                                            </FieldArray>
                                        </div>

                                        <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
                                            Soumettre le CV
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}

export default GestionCv;