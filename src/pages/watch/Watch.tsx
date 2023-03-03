import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

export const Watch = ({ detailMethod }: any) => {
  const details = useAppSelector((state) => state.movie.movieDetails);
  const loading = useAppSelector((state) => state.movie.cardDetailLoading);
  const dispatch = useAppDispatch();
  const id = useParams().id;

  useEffect(() => {
    dispatch(detailMethod(id));
  }, [detailMethod, dispatch, id]);

  useEffect(() => {
    console.log(details);
  }, [details]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return <div className="text-white">hello world</div>;
};
