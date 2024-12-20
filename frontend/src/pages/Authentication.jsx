import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Authentication = () => {
  const [page, setPage] = useState("login");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signupSchema = Yup.object().shape({
    username: Yup.string().required().label("Username"),
    email: Yup.string().required().label("Email"),
    password: Yup.string().required().label("Password"),
  });

  const loginSchema = Yup.object().shape({
    email: Yup.string().required().label("Email"),
    password: Yup.string().required().label("Password"),
  });

  

  const schema = page === "login" ? loginSchema : signupSchema;
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const clearInputValues=()=>{
       setValue("username","")
       setValue("email","")
       setValue("password","")
  }

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/users/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        navigate("/dashboard");
        localStorage.setItem("token", res?.data?.token);
        clearInputValues()
        
        toast.success(`Welcome ${res.data.data.user.username}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message ||"Something Went Wromg try again later Login");
    }
    finally{
      setLoading(false)
    }
  };

  const handleSignup = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/users/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setPage("login")
        clearInputValues()
      }
    } catch (error) {
      console.log(error);
      console.log(error.response)
      toast.error(error.response.data.message || "Something Went Wromg try again later");
    }
    finally{
      setLoading(false)
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="font-bold">Welcome to your Task Manager</h1>
      <div>
        {page === "signup" ? (
          <div
            className={`w-[300px] h-fit flex flex-col items-start justify-center py-4 px-2 border-[2px] border-black my-3 rounded-lg`}
          >
            <div className="w-full justify-start items-center">
              <span className="font-bold">SignUp</span>
            </div>
            {page === "signup" && (
              <div className="w-full py-2 ">
                <Controller
                  control={control}
                  name="username"
                  render={({ field }) => {
                    return (
                      <input
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="Username"
                        className="w-full focus:none px-2 border-[1px] border-black rounded-sm"
                      />
                    );
                  }}
                />
                {errors.username && (
                  <p className="text-sm text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>
            )}

            <div className="w-full py-2 ">
              <Controller
                control={control}
                name="email"
                render={({ field }) => {
                  return (
                    <input
                      type="text"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="email"
                      className="w-full focus:none px-2 border-[1px] border-black rounded-sm"
                    />
                  );
                }}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="w-full py-2 ">
              <Controller
                control={control}
                name="password"
                render={({ field }) => {
                  return (
                    <input
                      type="Password"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="password"
                      className="w-full focus:none px-2 border-[1px] border-black rounded-sm"
                    />
                  );
                }}
              />

              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
              <div className="font-semibold text-sm mt-2">
                <span>
                  Already Have An Account?{" "}
                  <span
                    className="text-blue-500 cursor-pointer "
                    onClick={() => setPage("login")}
                  >
                    Login
                  </span>
                </span>
              </div>
            </div>
            <div className="w-full flex justify-end items-center">
            <button disabled ={loading}
                onClick={handleSubmit(handleSignup)}
                className="px-2 py-1 bg-black text-white font-semibold rounded-sm"
              >
                {loading ? (<Loader2 className="mr-2 h-6 w-6 animate-spin"/>): "Signup"}
                
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`w-[300px] h-fit flex flex-col items-start justify-center py-4 px-2 border-[2px] border-black my-3 rounded-lg`}
          >
            <div className="w-full justify-start items-center">
              <span className="font-bold">Login</span>
            </div>
            <div className="w-full py-2 ">
              <Controller
                control={control}
                name="email"
                render={({ field }) => {
                  return (
                    <input
                      type="text"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="email"
                      className="w-full focus:none px-2 border-[1px] border-black rounded-sm"
                    />
                  );
                }}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="w-full py-2 ">
              <Controller
                control={control}
                name="password"
                render={({ field }) => {
                  return (
                    <input
                      type="Password"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="password"
                      className="w-full focus:none px-2 border-[1px] border-black rounded-sm"
                    />
                  );
                }}
              />

              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
              <div className="font-semibold text-sm mt-2">
                <span>
                  Create An Account?{" "}
                  <span
                    className="text-blue-500 cursor-pointer "
                    onClick={() => setPage("signup")}
                  >
                    SignUp
                  </span>
                </span>
              </div>
            </div>
            <div className="w-full flex justify-end items-center">
              <button disabled ={loading}
                onClick={handleSubmit(handleLogin)}
                className="px-2 py-1 bg-black text-white font-semibold rounded-sm"
              >
                {loading ? (<Loader2 className="mr-2 h-6 w-6 animate-spin"/>): "Login"}
                
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Authentication;
