import React, { useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import WriteTitleAndContent from './steps/WriteTitleAndContent';
import UploadImages from './steps/UploadImages/UploadImages';
import ChooseCategory from './steps/ChooseCategory';
import Paper from '../../../reusables/Paper';
import { useAppDispatch, State } from '../../../../store';
import { stepsReducer, stepsInitialState, STEP_INDEX } from '../../../../reducers/steps';
import { SWITCH_DEFAULT_ERROR_MESSAGE } from '../../../../constants/error';
import convertImageDataToFiles from '../../../../utils/image/convertImageDataToFiles';
import { CANVAS_USE_CASE } from '../../../../constants/image';
import { createStory } from '../../../../store/stories/stories-actions';
import showNotification from '../../../../utils/notification/showNotification';
import { NOTIFICATION_SEVERITY } from '../../../../constants/notification';
import { Steps } from '../../../../types/typescript/reducers/steps';

const CreateStory = (): JSX.Element => {
    const appDispatch = useAppDispatch();
    const { isCreatingStory } = useSelector((state: State) => state.ui);
    const navigate = useNavigate();
    const { breakpoints: { down } } = useTheme();
    const isBelowSmBreakpoint = useMediaQuery(down('sm'));
    const [steps, dispatch] = useReducer(stepsReducer, stepsInitialState);
    const [activeStep, setActiveStep] = useState<number>(0);
    const totalSteps = Object.keys(steps).length;
    const isFirstStep = activeStep === 0;
    const isLastStep = activeStep === totalSteps - 1;
    const allStepsAreCompleted = Object.values(steps).every(step => step.isCompleted);
    // This is not part of the reducer because these are constant values
    const STEPS_TEXTS = {
        [STEP_INDEX.WRITE_TITLE_AND_CONTENT]: 'Write title and content',
        [STEP_INDEX.UPLOAD_IMAGES]: 'Upload images',
        [STEP_INDEX.CHOOSE_CATEGORY]: 'Choose a category',
    };

    const getCurrentStepContent = () => {
        switch (activeStep) {
            case STEP_INDEX.WRITE_TITLE_AND_CONTENT:
                return (
                    <WriteTitleAndContent
                        title={steps[STEP_INDEX.WRITE_TITLE_AND_CONTENT].title}
                        content={steps[STEP_INDEX.WRITE_TITLE_AND_CONTENT].content}
                        isCompleted={steps[STEP_INDEX.WRITE_TITLE_AND_CONTENT].isCompleted}
                        dispatch={dispatch}
                    />
                );
            case STEP_INDEX.UPLOAD_IMAGES:
                return (
                    <UploadImages
                        selectedImageIndex={steps[STEP_INDEX.UPLOAD_IMAGES].selectedImageIndex}
                        images={steps[STEP_INDEX.UPLOAD_IMAGES].images}
                        isCompleted={steps[STEP_INDEX.UPLOAD_IMAGES].isCompleted}
                        dispatch={dispatch}
                    />
                );
            case STEP_INDEX.CHOOSE_CATEGORY:
                return (
                    <ChooseCategory
                        category={steps[STEP_INDEX.CHOOSE_CATEGORY].category}
                        isCompleted={steps[STEP_INDEX.CHOOSE_CATEGORY].isCompleted}
                        dispatch={dispatch}
                    />
                );
            default:
                throw new Error(SWITCH_DEFAULT_ERROR_MESSAGE);
        }
    };

    const handlePreviousStep = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleNextStep = () => {
        if (isLastStep) {
            // Not 'null' images
            const images = Object
                .values(steps[STEP_INDEX.UPLOAD_IMAGES].images)
                // If the 'thumbnail' is not 'null' the 'resized' is neither
                .filter(image => image.data.thumbnail);

            Promise.all([
                ...convertImageDataToFiles(images, CANVAS_USE_CASE.thumbnail),
                ...convertImageDataToFiles(images, CANVAS_USE_CASE.resized),
            ]).then((imagesFiles: Blob[]) => {
                const formData = new FormData();

                formData.append('title', steps[STEP_INDEX.WRITE_TITLE_AND_CONTENT].title);
                formData.append('content', steps[STEP_INDEX.WRITE_TITLE_AND_CONTENT].content);

                imagesFiles.forEach((imageFile) => {
                    formData.append('images', imageFile);
                });

                formData.append('category', steps[STEP_INDEX.CHOOSE_CATEGORY].category!);

                appDispatch(createStory(formData, navigate));
            }).catch(() => {
                showNotification(
                    appDispatch,
                    NOTIFICATION_SEVERITY.error,
                    'Something went wrong while trying to get the image files.'
                );
            });
        } else {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
    };

    return (
        <Paper
            header={(
                <Stepper nonLinear alternativeLabel={isBelowSmBreakpoint} activeStep={activeStep}>
                    {
                        Object.entries(STEPS_TEXTS).map(([key, value]) => (
                            <Step key={key} completed={steps[key as unknown as keyof Steps].isCompleted}>
                                <StepButton onClick={() => setActiveStep(parseInt(key, 10))}>
                                    {value}
                                </StepButton>
                            </Step>
                        ))
                    }
                </Stepper>
            )}
            footer={(
                <>
                    <Button disabled={isFirstStep} onClick={handlePreviousStep}>
                        Previous
                    </Button>
                    <LoadingButton
                        disabled={isLastStep && !allStepsAreCompleted}
                        loading={isCreatingStory}
                        onClick={handleNextStep}
                    >
                        { isLastStep ? 'Share it' : 'Next' }
                    </LoadingButton>
                </>
            )}
        >
            { getCurrentStepContent() }
        </Paper>
    );
};

export default CreateStory;
