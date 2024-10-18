import React, {useContext, useEffect} from 'react';
import { useNavigate} from "react-router-dom";
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import * as Yup from "yup";
import {UserContext} from "../Context/UserContext.jsx";

function Cv() {
    const navigate = useNavigate();
  /*mettre le token */


    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card shadow-lg">
                        <div className="card-header text-center bg-primary text-white">
                            <h3>Remplissez votre CV</h3>
                        </div>
                        <div className="card-body">
                            <Formik
                                initialValues={{
                                    email: '',
                                    firstName: '',
                                    lastName: '',
                                    description: '',
                                    education: [
                                        { title: '', institution: '', year: '' }
                                    ],
                                    experience: [
                                        { title: '', company: '', duration: '' }
                                    ],
                                }}
                                validationSchema={Yup.object({
                                    email: Yup.string().email('Invalid email format').required('Email is required'),
                                    firstName: Yup.string().required('First name is required'),
                                    lastName: Yup.string().required('Last name is required'),
                                    description: Yup.string().required('Description is required'),
                                    education: Yup.array().of(
                                        Yup.object({
                                            title: Yup.string().required('Title is required'),
                                            institution: Yup.string().required('Institution is required'),
                                            year: Yup.string().required('Year is required'),
                                        })
                                    ),
                                    experience: Yup.array().of(
                                        Yup.object({
                                            title: Yup.string().required('Title is required'),
                                            company: Yup.string().required('Company is required'),
                                            duration: Yup.string().required('Duration is required'),
                                        })
                                    ),
                                })}
                                onSubmit={async (values, { setSubmitting }) => {
                                    try {
                                        const res = await fetch('https://cv-generator-klm2.onrender.com/api/cvRouter/create', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': `Bearer ${token}`
                                            },
                                            body: JSON.stringify(values),
                                        });

                                        if (res.ok) {
                                            console.log("CV submitted successfully");
                                            const data = await  res.json();
                                            console.log(data);
                                            navigate('/dashboard')
                                        } else {
                                            console.log("Failed to submit CV");
                                        }
                                    } catch (error) {
                                        console.error("Error submitting CV:", error);
                                    }
                                    setSubmitting(false);
                                }}
                            >
                                {({ isSubmitting, values }) => (
                                    <Form>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <Field className="form-control" type="email" name="email" />
                                            <ErrorMessage className="text-danger" name="email" component="div" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                            <Field className="form-control" type="text" name="firstName" />
                                            <ErrorMessage className="text-danger" name="firstName" component="div" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                            <Field className="form-control" type="text" name="lastName" />
                                            <ErrorMessage className="text-danger" name="lastName" component="div" />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Description</label>
                                            <Field as="textarea" className="form-control" name="description" />
                                            <ErrorMessage className="text-danger" name="description" component="div" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Education</label>
                                            <FieldArray name="education">
                                                {({ remove, push }) => (
                                                    <div>
                                                        {values.education.map((_, index) => (
                                                            <div key={index} className="row">
                                                                <div className="col">
                                                                    <Field className="form-control" name={`education.${index}.title`} placeholder="Title" />
                                                                    <ErrorMessage className="text-danger" name={`education.${index}.title`} component="div" />
                                                                </div>
                                                                <div className="col">
                                                                    <Field className="form-control" name={`education.${index}.institution`} placeholder="Institution" />
                                                                    <ErrorMessage className="text-danger" name={`education.${index}.institution`} component="div" />
                                                                </div>
                                                                <div className="col">
                                                                    <Field className="form-control" name={`education.${index}.year`} placeholder="Year" />
                                                                    <ErrorMessage className="text-danger" name={`education.${index}.year`} component="div" />
                                                                </div>
                                                                <div className="col-1">
                                                                    <button type="button" className="btn btn-danger" onClick={() => remove(index)}>X</button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <button type="button" className="btn btn-secondary mt-3" onClick={() => push({ title: '', institution: '', year: '' })}>
                                                            Ajouter une éducation
                                                        </button>
                                                    </div>
                                                )}
                                            </FieldArray>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Experience</label>
                                            <FieldArray name="experience">
                                                {({ remove, push }) => (
                                                    <div>
                                                        {values.experience.map((_, index) => (
                                                            <div key={index} className="row">
                                                                <div className="col">
                                                                    <Field className="form-control" name={`experience.${index}.title`} placeholder="Title" />
                                                                    <ErrorMessage className="text-danger" name={`experience.${index}.title`} component="div" />
                                                                </div>
                                                                <div className="col">
                                                                    <Field className="form-control" name={`experience.${index}.company`} placeholder="Company" />
                                                                    <ErrorMessage className="text-danger" name={`experience.${index}.company`} component="div" />
                                                                </div>
                                                                <div className="col">
                                                                    <Field className="form-control" name={`experience.${index}.duration`} placeholder="Duration" />
                                                                    <ErrorMessage className="text-danger" name={`experience.${index}.duration`} component="div" />
                                                                </div>
                                                                <div className="col-1">
                                                                    <button type="button" className="btn btn-danger" onClick={() => remove(index)}>X</button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <button type="button" className="btn btn-secondary mt-3" onClick={() => push({ title: '', company: '', duration: '' })}>
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
    );
}

export default Cv;