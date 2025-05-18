import React from "react";
import { Box, Stepper, Step, StepLabel } from "@mui/material";

import "../styles/components/CustomStepper.css";

const CustomStepper = ({ steps, activeStep }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className="custom-stepper"
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CustomStepper;
