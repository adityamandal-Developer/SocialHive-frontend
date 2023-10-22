import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { resetSuccessAction } from '../../reactRedux/slices/globalSlice/globalSlice';

const ShowSucess = ({ message }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        Swal.fire({
            icon: "success",
            title: "YAYY!",
            text: message
        });

        dispatch(resetSuccessAction());
    }, [dispatch, message]);

    return null;
};

export default ShowSucess;
