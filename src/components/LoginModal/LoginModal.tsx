import React, { useContext, useEffect } from "react";
import classNames from "classnames";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import schema from "../../form-schema/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/hooks";
import { useMutation } from "@apollo/client";
import { setToken } from "../../features/authSlice";
import * as users from "../../graphql/mutations/users";
import { Oval } from "react-loader-spinner";
import { ErrorAlert } from "../Alerts";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";
  const dispatch = useAppDispatch();
  const [login, { loading, error }] = useMutation<{ login: { jwt: string } }>(
    users.LOGIN_MUTATION
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema.login),
  });

  const onSubmit = async (data: any) => {
    const body = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await login({ variables: { loginInput: body } });
      dispatch(setToken(res.data!.login.jwt));
      localStorage.setItem("authToken", res.data!.login.jwt);
      closeModal();
      reset();
    } catch (e: any) {
      console.log(e);
    }
  };

  const closeModal = () => {
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {/* Background overlay */}
      <div
        className={classNames(
          `fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 transition-opacity duration-300`,
          {
            "pointer-events-auto opacity-100": isOpen,
            "pointer-events-none opacity-0": !isOpen,
          }
        )}
        onClick={closeModal}
      />

      {/* Modal content */}
      <div
        className={classNames(
          `w-full max-w-[400px] md:max-w-[540px] fixed top-1/2 md:top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-lg shadow-lg py-[56px] px-[48px] transition-opacity duration-300`,
          {
            "pointer-events-auto opacity-100": isOpen,
            "pointer-events-none opacity-0": !isOpen,
            "bg-dark-secondary": isDarkMode,
            "bg-white": !isDarkMode,
          }
        )}
      >
        <h2 className="font-bold text-2xl mb-6">Sign in to your account</h2>
        <div className="mb-4">
          {error?.message && <ErrorAlert message={error.message} />}
        </div>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <div className="min-h-[44px] w-full max-w-full ">
              <input
                type="text"
                {...register("email")}
                className={classNames(
                  "px-4 py-2 w-full border border-solid border-gray-300 outline-none",
                  {
                    "text-black placeholder:text-black bg-gray-200 dark:focus:border-blue-500 focus:ring dark:focus:ring-blue-200":
                      isDarkMode,
                    "focus:border-blue-500 focus:ring focus:ring-blue-200":
                      !isDarkMode,
                  }
                )}
              />
            </div>
            {errors.email && (
              <p
                className={classNames("text-xs ", {
                  "text-red-500": !isDarkMode,
                  "text-yellow-400": isDarkMode,
                })}
              >
                {errors?.email?.message?.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <div className="min-h-[44px] w-full max-w-full border-1 border-solid border-gray-900">
              <input
                type="password"
                {...register("password")}
                className={classNames(
                  "px-4 py-2 w-full border border-solid border-gray-300 outline-none",
                  {
                    "text-black placeholder:text-black bg-gray-200 dark:focus:border-blue-500 focus:ring dark:focus:ring-blue-200":
                      isDarkMode,
                    "focus:border-blue-500 focus:ring focus:ring-blue-200":
                      !isDarkMode,
                  }
                )}
              />
            </div>
            {errors.password && (
              <p
                className={classNames("text-xs ", {
                  "text-red-500": !isDarkMode,
                  "text-yellow-400": isDarkMode,
                })}
              >
                {errors?.password?.message?.toString()}
              </p>
            )}
          </div>
          <button
            disabled={loading}
            type="submit"
            className={classNames("", {
              "bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-indigo-900 hover:to-blue-900 text-white py-2 px-4 rounded relative":
                true,
            })}
          >
            <div className="flex justify-center items-center h-10">
              {loading ? (
                <Oval
                  height={40}
                  width={40}
                  color={isDarkMode ? "#1d2d44" : "#004f44"}
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#d5dfed"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              ) : (
                <span>Login</span>
              )}
            </div>
          </button>
        </form>

        <p className="text-center mt-8 under cursor-pointer">
          Don't have an account? Sign up.
        </p>
      </div>
    </>
  );
};

export default Modal;