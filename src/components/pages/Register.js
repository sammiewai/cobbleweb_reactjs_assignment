import {
  Box,
  Center,
  Heading
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MakeApiCall } from "../../helpers/MakeApiCall";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";

function Register() {
  // Registration errors
  const [registrationErrors, setRegistrationErrors] = useState('')

  // Enroll form formik init
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    active: "" // TODO: Handle images upload
  }

  //  Form validation with Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required('FirstName is required!'),
    lastName: Yup.string().required('LastName is required!'),
    email: Yup.string().email('Invalid email!').required('Email is required!'),
    password: Yup.string().required('Password is required!'),
    role: Yup.string().required('Role is required!'),
    active: Yup.string()
  })

  // Enroll user submit
  const navigate = useNavigate();
  const onSubmit = async (values, onSubmitProps) => {
    // Api call
    const enroll_resp = await MakeApiCall({
      url: 'api/register',
      method: 'POST',
      body: values
    });

    if (!enroll_resp.success) {
      const errMsg = enroll_resp.message && typeof enroll_resp.message === 'string' ? enroll_resp.message : 'Server error occured. Try again later.'

      setRegistrationErrors(errMsg)
      console.log(JSON.stringify(enroll_resp))
      return
    }
    setRegistrationErrors('');

    // Formik props
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();

    // If successful, navigate to login
    return navigate(`/login`);
  }
  return (
    <Box
      pt={10}
      h={800}
      justifyContent="center"
      alignItems="center"
      backgroundColor="#2A4365"
    >
      <Center>
        <Box bg='#1a1c24' p={10} borderRadius='md' w={450}>
          <Heading as='h3' size='md' noOfLines={1} mb={5}>Register</Heading>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {
              formik => {
                return (
                  <Form>
                    <div className="row">
                      <div className="mb-3">
                        <label className="form-label">First name</label>
                        <Field type="text" className="form-control form-control-sm border-secondary rounded-0" id="firstName" name="firstName" />
                        <ErrorMessage name='firstName'>
                          {(errorMsg) => <small className='text-danger'>{errorMsg}</small>}
                        </ErrorMessage>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Last name</label>
                        <Field type="text" className="form-control form-control-sm border-secondary rounded-0" id="lastName" name="lastName" />
                        <ErrorMessage name='lastName'>
                          {(errorMsg) => <small className='text-danger'>{errorMsg}</small>}
                        </ErrorMessage>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <Field type="email" className="form-control form-control-sm border-secondary rounded-0" id="email" name="email" />
                        <ErrorMessage name='email'>
                          {(errorMsg) => <small className='text-danger'>{errorMsg}</small>}
                        </ErrorMessage>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <Field type="password" className="form-control form-control-sm border-secondary rounded-0" id="password" name="password" />
                        <ErrorMessage name='password'>
                          {(errorMsg) => <small className='text-danger'>{errorMsg}</small>}
                        </ErrorMessage>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Role</label>
                        <Field as="select" className="form-select form-select-sm" id="role" name="role">
                          <option defaultValue>Role</option>
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </Field>
                        <ErrorMessage name='role'>
                          {(errorMsg) => <small className='text-danger'>{errorMsg}</small>}
                        </ErrorMessage>
                      </div>
                      <div className="mb-3">
                        <div className="form-check">
                        <label className="form-check-label">Active</label>
                        <Field type="checkbox" className="form-check-input" id="active" name="active" />
                        <ErrorMessage name='active'>
                          {(errorMsg) => <small className='text-danger'>{errorMsg}</small>}
                        </ErrorMessage>
                        </div>
                      </div>
                      <div className="mb-3 d-grid gap-2">
                        <button type="submit" className="btn btn-primary rounded-0" disabled={!formik.isValid || formik.isSubmitting}>Register</button>
                      </div>
                      {registrationErrors.length > 0 ? <small className='text-danger'>{registrationErrors}</small> : ''}
                      <div className="form-text text-reset">
                        Already have an account? <NavLink to="/login"><span style={{color: "#16a3dc"}}>Login</span></NavLink>
                      </div>
                    </div>
                  </Form>
                )
              }
            }
          </Formik>
        </Box>
      </Center>
    </Box>
  )
}

export default Register