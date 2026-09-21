import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentUser } from "@/services/auth";
import { selectCurrentUser } from "./selectors";

// fetch api thông tin user
export const useFetchCurrentUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);
};

// lấy thông tin user
export const useCurrentUser = () => {
    return useSelector(selectCurrentUser);
};
