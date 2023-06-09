import React from 'react'
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import stylesCom from '../styles/Component.module.scss'

interface StepWrapperProps {
    activeStep: number;
    children: React.ReactNode;
}

const steps = ['Информация о треке', 'Загрузите обложку', 'Загрузите сам трек']

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
  return (
    <Container>
        <Stepper activeStep={activeStep}>
            {steps.map((step, index) => 
                <Step
                    key={index}
                    completed={activeStep > index}
                >
                    <StepLabel>{step}</StepLabel>
                </Step>    
            )}
        </Stepper>
        <Grid container justifyContent='center' className={stylesCom.gridStep}>
                <Card className={stylesCom.cardStep}>
                    {children}
                </Card>
        </Grid>
    </Container>
  )
}

export default StepWrapper
