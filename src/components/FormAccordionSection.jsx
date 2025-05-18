import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "../styles/components/FormAccordionSection.css";

export default function FormAccordionSection({
  title,
  description,
  children,
  defaultExpanded = false,
  numberSection,
}) {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${title}-content`}
        id={`${title}-header`}
      >
        <div className="accordion-number">
          <p>{numberSection}</p>
        </div>
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box mb={2}>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
        <Box>{children}</Box>
      </AccordionDetails>
    </Accordion>
  );
}
