// The 'segment' key's value should always be '/' + the parent key name written in kebab case

export const API_PATH_SEGMENT = {
    root: '/api',
    initialData: {
        segment: '/initial-data',
    },
    auth: {
        segment: '/auth',
        signIn: {
            segment: '/sign-in',
            google: {
                segment: '/google',
                callback: {
                    segment: '/callback',
                },
            },
        },
        // The way we sign out is generic, it's not specific to Google, Facebook or any other provider
        signOut: {
            segment: '/sign-out',
        },
    },
    app: {
        segment: '/app',
        users: {
            segment: '/users',
        },
        stories: {
            segment: '/stories',
            image: {
                segment: '/image',
            },
            heart: {
                segment: '/heart',
            },
        },
    },
};

export const PAGE_PATH_SEGMENT = {
    root: '/',
    auth: {
        segment: '/auth',
        // These URLs can ONLY be accessed WITHOUT sign in
        signIn: {
            segment: '/sign-in',
            google: {
                segment: '/google',
                failure: {
                    segment: '/failure',
                },
            },
        },
    },
    // These URLs can ONLY be accessed WITH sign in
    app: {
        segment: '/app',
        exploreStories: {
            segment: '/explore-stories',
        },
    },
};

// The main sign in page should be changed to '/auth/sign-in' when there will be more sign in options
export const MAIN_SIGN_IN_PAGE = PAGE_PATH_SEGMENT.auth.segment + PAGE_PATH_SEGMENT.auth.signIn.segment +
    PAGE_PATH_SEGMENT.auth.signIn.google.segment;
export const MAIN_APP_PAGE = PAGE_PATH_SEGMENT.app.segment + PAGE_PATH_SEGMENT.app.exploreStories.segment;
