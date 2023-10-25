import {
  Box,
  Center
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MakeApiCall } from "../../helpers/MakeApiCall";
import { useNavigate } from "react-router-dom";

function Login() {
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
    const enroll_resp = await MakeApiCall({
      url: 'api/login',
      method: 'POST',
      body: values
    });

    if (!enroll_resp.success) {
      alert("Error occured.");
      console.log(JSON.stringify(enroll_resp))
      return
    }

    // Formik props
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();

    // If successful, navigate to login
    return navigate(`/profile`);
  }
  return (
    <Box m={6} pt={6}>
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