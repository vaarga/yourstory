import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { State } from '../../../store';
import { MAIN_APP_PAGE } from '../../../constants/url';

// In some cases you have to be NOT authenticated to be able to see a page (for example: '/auth/sign-in')
const RequireNotAuth = ({ children }: { children: ReactElement }): JSX.Element => {
    const { isSignedIn } = useSelector((state: State) => state.user);

    if (isSignedIn) {
        return <Navigate to={MAIN_APP_PAGE} />;
    }

    return children;
};

RequireNotAuth.propTypes = {
    children: PropTypes.element.isRequired,
};

export default RequireNotAuth;
