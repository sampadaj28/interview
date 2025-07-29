import React, { useState } from 'react';
import Personaldetails from "./stepperform/personaldetails";
import Countrydetails from "./stepperform/countrydetails";
import Skillsdetails from "./stepperform/skillsdetails";
import Credentaildetails from "./stepperform/credentaildetails";
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import Layout from "../component/Layout";
import { Link } from 'react-router-dom';
import { useRegisterMutation } from "../services/adminApi";

const steps = ['Personal Information', 'Details', 'Skills Details', "Credentail Details"];

export default function Stepperform() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    personal: {},
    country: {},
    skills: {},
    credential: {}
  });

  const [register, { isLoading }] = useRegisterMutation();

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      const token = localStorage.getItem("token");
      const payload = {
        ...formData.personal,
        ...formData.country,
        ...formData.skills,
        ...formData.credential,
      };

      try {
        const res = await register({ payload, token }).unwrap();
        console.log("Form submitted successfully:", res);
        setActiveStep((prev) => prev + 1);
      } catch (error) {
        console.error("Error submitting form:", error);
        alert(error?.data?.message || "Submission failed");
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };


  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Personaldetails data={formData.personal} setData={(data) => setFormData(prev => ({ ...prev, personal: data }))} />;
      case 1:
        return <Countrydetails data={formData.country} setData={(data) => setFormData(prev => ({ ...prev, country: data }))} />;
      case 2:
        return <Skillsdetails data={formData.skills} setData={(data) => setFormData(prev => ({ ...prev, skills: data }))} />;
      case 3:
        return <Credentaildetails data={formData.credential} setData={(data) => setFormData(prev => ({ ...prev, credential: data }))} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
        <h3 className="text-[1.125rem] font-semibold">Stepper Form</h3>
      </div>

      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700 mb-2">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>

      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700">
          {activeStep === steps.length ? (
            <div className="flex justify-center w-full mt-5">
              <div className="p-8 m-4">
                <Typography variant="h5" className='mt-10 mb-10 pb-10'>
                  Thank you for submitting the form!
                </Typography>
                <Link to="/List" className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5">
                  View List
                </Link>
              </div>
            </div>
          ) : (
            <>
              <Typography variant="h5">{getStepContent(activeStep)}</Typography>
              <div className='flex justify-center'>
                <div className='flex justify-between w-full mt-4'>
              <Link to="/List" className="text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm px-5 py-2.5">Back</Link>
                  <Button variant="contained" color="primary" onClick={handleNext} disabled={isLoading}>
                    {activeStep === steps.length - 1 ? (isLoading ? 'Submitting...' : 'Submit') : 'Next'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
