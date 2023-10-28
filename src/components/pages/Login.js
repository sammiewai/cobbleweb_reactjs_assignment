import {
  Box,
  Center
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MakeApiCall } from "../../helpers/MakeApiCall";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  // Login errors
  const [loginErrors, setLoginErrors] = useState('')

  // Enroll form formik init
  const initialValues = {
    email: "",
    password: ""
  }

  //  Form validation with Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email!').required('Email is required!'),
    password: Yup.string().required('Password is required!')
  })

  // Enroll user submit
  const navigate = useNavigate();
  const onSubmit = async (values, onSubmitProps) => {
    // Api call
    const loginResp = await MakeApiCall({
      url: 'api/login',
      method: 'POST',
      body: values
    });

    if (!loginResp.success) {
      const errMsg = loginResp.message ? loginResp.message : 'Server error occured. Try again later.'

      setLoginErrors(errMsg);
      console.log(JSON.stringify(loginResp))
      return
    }
    setLoginErrors('');
    const accessToken = loginResp.data.accessToken;

    // Formik props
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();

    // If successful, fetch profile and navigate to login
    const profile = await MakeApiCall({
      url: 'api/users/me',
      method: 'GET',
      headers: { "x-access-token": accessToken}
    });
    
    if(!profile.success) {
      setLoginErrors('Server error occured. Try again later.');
    } else {
      return navigate(`/profile`, { state: { profile: profile} }); // Pass the fetched profile with the route
    }
  }
  return (
    <Box
      pt={20}
      h={700}
      justifyContent="center"
      alignItems="center"
      backgroundColor="#2A4365"
    >
      <Center>
        <Box bg='#1a1c24' p={6} borderRadius='md' w={450}>
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
                        <Field type="email" className="form-control form-control-sm border-secondary rounded-0" id="email" name="email" placeholder="Email" />
                        <ErrorMessage name='email'>
                          {(errorMsg) => <small className='text-danger'>{errorMsg}</small>}
                        </ErrorMessage>
                      </div>
                      <div className="mb-3">
                        <Field type="password" className="form-control form-control-sm border-secondary rounded-0" id="password" name="password" placeholder="Password" />
                        <ErrorMessage name='password'>
                          {(errorMsg) => <small className='text-danger'>{errorMsg}</small>}
                        </ErrorMessage>
                      </div>
                      <div className="mb-3">
                        <button type="submit" className="btn btn-primary btn-sm rounded-0" disabled={!formik.isValid || formik.isSubmitting}>Login</button>
                      </div>
                      {loginErrors.length > 0 ? <small className='text-danger'>{loginErrors}</small> : ''}
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

export default Login