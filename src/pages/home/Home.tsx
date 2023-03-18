import { useContext, useRef } from 'react';
import { ThemeContext } from '../../context/Theme/ThemeContext';
import classNames from 'classnames';
import { MDContainer, MediaSearchQuery } from '../../components';
import { useForm } from 'react-hook-form';
import schema from '../../form-schema/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setToken } from '../../features/authSlice';

import * as users from '../../graphql/mutations/users';

export const Home = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark' ? true : false;
  const containerRef = useRef<HTMLDivElement>(null);
  const [login, { loading }] = useMutation<{ login: { jwt: string } }>(
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
  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    const body = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await login({ variables: { loginInput: body } });
      dispatch(setToken(res.data!.login.jwt));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mt-16 min-h-[800px]">
      <MDContainer>
        <div
          ref={containerRef}
          className={classNames({
            'text-dark-font-primary': isDarkMode,
            'text-light-font-primary': !isDarkMode,
          })}
        >
          <div className="lg:text-4xl md:text-3xl text-2xl  flex flex-col gap-4 items-center mb-12">
            <h1 className="text-center" style={{ fontFamily: 'Lobster Two' }}>
              Hello! Welcome to Film Finder
            </h1>
            <p
              className="lg:text-3xl md:text-2xl text-xl text-center"
              style={{ fontFamily: 'Poppins' }}
            >
              Find Your Favorite Movies, TV Shows, and Anime
            </p>
          </div>
          {/* <MediaSearchQuery /> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Email:</label>
              <input type="text" {...register('email')} />
              {errors.email && <p>{errors?.email?.message?.toString()}</p>}
            </div>
            <div>
              <label>Password:</label>
              <input type="password" {...register('password')} />
              {errors.password && (
                <p>{errors?.password?.message?.toString()}</p>
              )}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </MDContainer>
    </div>
  );
};
