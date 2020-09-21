import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Auxiliary/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null);
        // console.log("with error", error);

        const reqInterceptor = axios.interceptors.request.use((req) => {
            setError(null);
            return req;
        });
        const resInterceptor = axios.interceptors.response.use(
            (res) => {
                return res;
            },
            (err) => {
                setError(err);
            }
        );

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        });

        const errorConfirmedhandler = () => {
            setError(null);
        };

        return (
            <Aux>
                <Modal show={error} modalClosed={errorConfirmedhandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    };
};

export default withErrorHandler;