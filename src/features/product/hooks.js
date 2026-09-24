import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getList as getProductList } from "@/services/product";
import { selectLoading, selectList as selectProductList } from "@/features/product";

export const useFetchProductList = ({limit, page} = {}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductList({limit, page}));
    }, [dispatch, limit, page]);
};

export const useProductList = () => {
    return useSelector(selectProductList);
};

export const useProductLoading = () => {
    return useSelector(selectLoading);
};
