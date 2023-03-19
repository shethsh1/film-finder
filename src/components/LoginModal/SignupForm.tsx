import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import schema from "../../form-schema/schema";
import { ErrorAlert, SuccessAlert } from "../Alerts";
import * as Users from "../../graphql/mutations/users";

interface SignupFormProps {
  closeModal: () => void;
  handleTab: (tab: "login" | "signup") => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  closeModal,
  handleTab,
}) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";
  const [createAccount, { loading, data, error }] = useMutation<{
    createUser: { jwt: string };
  }>(Users.CREATE_USER_MUTATION);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema.signup),
  });

  const onSubmit = async (data: any) => {
    const body = {
      email: data.email,
      password: data.password,
      username: data.username,
    };

    try {
      createAccount({ variables: { createUserInput: body } });
      reset();
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <div>
      <h2 className="font-bold text-2xl mb-6">Create an account</h2>
      <div className="mb-4">
        {error?.message && <ErrorAlert message={error.message} />}
      </div>
      <div className="mb-4">
        {data && <SuccessAlert message={"Account successfully created!"} />}
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
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <div className="min-h-[44px] w-full max-w-full ">
            <input
              type="text"
              {...register("username")}
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
          {errors.username && (
            <p
              className={classNames("text-xs ", {
                "text-red-500": !isDarkMode,
                "text-yellow-400": isDarkMode,
              })}
            >
              {errors?.username?.message?.toString()}
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
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-sm">
            Confirm password
          </label>
          <div className="min-h-[44px] w-full max-w-full border-1 border-solid border-gray-900">
            <input
              type="password"
              {...register("confirmPassword")}
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
          {errors.confirmPassword && (
            <p
              className={classNames("text-xs ", {
                "text-red-500": !isDarkMode,
                "text-yellow-400": isDarkMode,
              })}
            >
              {errors?.confirmPassword?.message?.toString()}
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
              <span>Sign up</span>
            )}
          </div>
        </button>
      </form>

      <p
        className="text-center mt-8 under cursor-pointer"
        onClick={() => handleTab("login")}
      >
        Already have an account? Sign in.
      </p>
    </div>
  );
};
