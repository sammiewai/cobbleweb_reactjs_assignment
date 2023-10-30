import {
  Box,
  Center,
  Heading
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { MakeApiCall } from "../../helpers/MakeApiCall";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [registrationErrors, setRegistrationErrors] = useState('')
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Process images
    if (data.file && (data.file).length > 0) {
      [...data.file].forEach((file) => {
        formData.append("files", file);
      });
    }
    // other fields
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role.value);
    formData.append("active", data.active);

    // API post
    try {
      const enroll_resp = await MakeApiCall({
        url: 'api/register',
        method: 'POST',
        body: formData
      });

      // Check any registration errors

      if (!enroll_resp.success) {
        const errMsg = enroll_resp.message && typeof enroll_resp.message === 'string' ? enroll_resp.message : 'Server error occured. Try again later.'

        setRegistrationErrors(errMsg)
        console.log(JSON.stringify(enroll_resp))
        return
      }
      setRegistrationErrors('');

      // If successful, navigate to login
      reset();
      return navigate(`/login`);
    } catch (error) {
      console.error(error);
    }
  };

  const roles = [
    { value: "user", label: "User" },
    { value: "Admin", label: "Admin" },
  ];

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input type="text" className="form-control form-control-sm border-secondary rounded-0" id="firstName" name="firstName" {...register("firstName", {
                  required: "Firstname is required.",
                  minLength: {
                    value: 2,
                    message: "Firstname should be at least 2 characters long."
                  },
                  maxLength: {
                    value: 25,
                    message: "Firstname should not be more than 25 characters long."
                  }
                })} />
                {errors.firstName && (<p className="text-danger">{errors.firstName.message}</p>)}
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-control form-control-sm border-secondary rounded-0" id="lastName" name="lastName" {...register("lastName", {
                  required: "Lastname name is required.",
                  minLength: {
                    value: 2,
                    message: "Lastname should be at least 2 characters long."
                  },
                  maxLength: {
                    value: 25,
                    message: "Lastname should not be more than 25 characters long."
                  }
                })} />
                {errors.lastName && (<p className="text-danger">{errors.lastName.message}</p>)}
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="text" className="form-control form-control-sm border-secondary rounded-0" id="email" name="email" {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid."
                  }
                })} />
                {errors.email && (<p className="text-danger">{errors.email.message}</p>)}
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control form-control-sm border-secondary rounded-0" id="password" name="password" {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password should be at least 6 characters long."
                  },
                  maxLength: {
                    value: 50,
                    message: "Password should not be more than 50 characters long."
                  }
                })} />
                {errors.password && (<p className="text-danger">{errors.password.message}</p>)}
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Select {...field} options={roles} />}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Images</label>
                <input className="form-control" type="file" {...register("file")} multiple />
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <label className="form-check-label">Active</label>
                  <input
                    type='checkbox'
                    {...register('active', {})}
                    className='form-check-input'
                  />
                </div>
              </div>
              <div className="mb-3 d-grid gap-2">
                <button type="submit" className="btn btn-sm btn-primary rounded-0">Register</button>
              </div>
              {registrationErrors.length > 0 ? <small className='text-danger'>{registrationErrors}</small> : ''}
              <div className="form-text text-reset">
                Already have an account? <NavLink to="/login"><span style={{ color: "#16a3dc" }}>Sign In</span></NavLink>
              </div>
            </div>
          </form>
        </Box>
      </Center>
    </Box>
  );
}

export default Register;