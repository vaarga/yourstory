import '@mui/material/Checkbox';

// Update the Button's color prop options
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        delete: true;
    }
}

// Update the Checkbox's color prop options
declare module '@mui/material/Checkbox' {
    interface CheckboxPropsColorOverrides {
        heart: true;
    }
}
