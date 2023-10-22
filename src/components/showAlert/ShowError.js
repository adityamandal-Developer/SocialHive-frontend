import { useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { resetErrorAction } from "../../reactRedux/slices/globalSlice/globalSlice";

const ShowError = ({ message }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        Swal.fire({
            icon: "error",
            title: "Oops",
            text: message,
        });

        dispatch(resetErrorAction());
    }, [dispatch, message]);

    return null; // i have done this to Return null to avoid rendering anything in the DOM
};

export default ShowError;
