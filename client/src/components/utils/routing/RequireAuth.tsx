import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { State } from '../../../store';
import { MAIN_SIGN_IN_PAGE } from '../../../constants/url';

const RequireAuth = ({ children }: { children: ReactElement }): JSX.Element => {
    const { isSignedIn } = useSelector((state: State) => state.user);

    if (!isSignedIn) {
        return <Navigate to={MAIN_SIGN_IN_PAGE} />;
    }

    return children;
};

RequireAuth.propTypes = {
    children: PropTypes.element.isRequired,
};

export default RequireAuth;
