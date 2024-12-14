
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const Authentication = () => {
    const [page,setPage] = useState('login')
    const schema = Yup.object().shape({
      username: Yup.string().required().label("Username"),
      email: Yup.string().required().label("Email"),
      password: Yup.string().required().label("Password"),
    });
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      mode: "onBlur",
      resolver: yupResolver(schema),
    });
    return (
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <h1 className="font-bold">Welcome to your Task Manager</h1>
        <div>
          {
            page === 'signup' ? (
              <div className={`w-[300px] h-fit flex flex-col items-start justify-center py-4 px-2 border-[2px] border-black my-3 rounded-lg`}>
            <div className="w-full justify-start items-center">
              <span className="font-bold">SignUp</span>
            </div>
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
                  <p className="text-sm text-red-600">{errors.username.message}</p>
                )}
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
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
                <div className="font-semibold text-sm mt-2">
                <span>
                  Already Have An Account? <span className="text-blue-500 cursor-pointer " onClick={()=>setPage("login")}>Login</span>
                </span>
              </div>
            </div>
            <div className="w-full flex justify-end items-center">
              <button className="px-2 py-1 bg-black text-white font-semibold rounded-sm">SignUp</button>
            </div>
          </div>
            ):(
              <div className={`w-[300px] h-fit flex flex-col items-start justify-center py-4 px-2 border-[2px] border-black my-3 rounded-lg`}>
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
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
                <div className="font-semibold text-sm mt-2">
                <span>
                  Create An Account? <span className="text-blue-500 cursor-pointer " onClick={()=>setPage("signup")}>SignUp</span>
                </span>
              </div>
            </div>
            <div className="w-full flex justify-end items-center">
              <button className="px-2 py-1 bg-black text-white font-semibold rounded-sm">Login</button>
            </div>
          </div>
            )
          }
          
        </div>
      </div>
    );
}

export default Authentication