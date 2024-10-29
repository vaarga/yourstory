import helmet from 'helmet';

const contentSecurityPolicyImgSrc = {
    'img-src': ["'self'", 'blob:', 'data:', 'lh3.googleusercontent.com'],
};

const helmetOption = {
    crossOriginEmbedderPolicy: false,
};

const helmetOptionForProduction = {
    ...helmetOption,
    contentSecurityPolicy: {
        directives: {
            ...contentSecurityPolicyImgSrc,
        },
    },
};

const helmetOptionForDev = {
    ...helmetOption,
    contentSecurityPolicy: {
        directives: {
            ...contentSecurityPolicyImgSrc,
            // The client bundle file (generated by webpack) contains 'eval' functions because that's the fastest way to
            // build and rebuild the client when we are developing it, so we make exceptions for those policies (ONLY)
            // in development mode
            scriptSrc: ["'unsafe-eval'"],
            scriptSrcElem: ["'self'"],
        },
    },
};

export default process.env.NODE_ENV === 'production'
    ? () => helmet(helmetOptionForProduction)
    : () => helmet(helmetOptionForDev);
