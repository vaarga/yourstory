import React from 'react';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ToggleOffRoundedIcon from '@mui/icons-material/ToggleOffRounded';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Feature from './Feature';
import CenteredContainer from '../../reusables/CenteredContainer';
import { MAIN_SIGN_IN_PAGE } from '../../../constants/url';

const Home = (): JSX.Element => {
    const pairedFeatures = [
        [
            { icon: <CreateRoundedIcon />, text: 'Create your own stories' },
            { icon: <AddPhotoAlternateRoundedIcon />, text: 'Upload and edit 3 images for every story' },
        ],
        [
            { icon: <ExploreRoundedIcon />, text: 'Explore other user\'s stories' },
            { icon: <FavoriteRoundedIcon />, text: 'Heart your favorite stories' },
        ],
        [
            { icon: <AccountCircleRoundedIcon />, text: 'Be an anonymous author' },
            { icon: <ToggleOffRoundedIcon />, text: 'Choose between light and dark theme' },
        ],
    ];

    const features = pairedFeatures.map((pairedFeature, index) => (
        <Stack
            // In this case it's okay to use the indexes as keys because we don't change or delete the elements of the
            // list
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            sx={{
                mb: 5,
                px: 2,
                justifyContent: 'center',
            }}
            flexDirection="row"
            flexWrap="wrap"
            gap={3}
        >
            <Feature icon={pairedFeature[0].icon} text={pairedFeature[0].text} />
            <Feature icon={pairedFeature[1].icon} text={pairedFeature[1].text} />
        </Stack>
    ));

    return (
        <CenteredContainer>
            <>
                <Typography
                    sx={{ my: 5, textAlign: 'center' }}
                    variant="h2"
                >
                    Welcome to{' '}
                    <Typography sx={{ color: 'primary.main', fontSize: 60, fontWeight: 600 }} component="span">
                        yourstory
                    </Typography>
                </Typography>
                { features }
                <Button
                    sx={{ my: 5 }}
                    href={MAIN_SIGN_IN_PAGE}
                    size="large"
                >
                    Create your own story
                </Button>
            </>
        </CenteredContainer>
    );
};

export default Home;
