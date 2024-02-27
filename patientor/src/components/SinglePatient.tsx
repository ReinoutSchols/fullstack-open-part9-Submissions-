import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { Patient } from "../types";
import patientService from "../services/patients";
import { useEffect, useState } from "react";

const SinglePatient = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const params = useParams<{ id: string }>();
  const id = params.id;

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };
    void fetchPatient(id!);
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  if (patient.entries.length === 0) {
    return (
      <div>
        <h2>
          {patient.name}{" "}
          {patient.gender === "male" ? (
            <MaleIcon />
          ) : patient.gender === "female" ? (
            <FemaleIcon />
          ) : (
            <AccessibilityIcon />
          )}
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <div>No entries found</div>
      </div>
    );
  }

  const diagnosisListItems = () => {
    return (
      <ul>
        {patient.entries[0].diagnosisCodes
          ? patient.entries[0].diagnosisCodes.map((c, index) => (
              <li key={index}> {c}</li>
            ))
          : null}
      </ul>
    );
  };

  const otherEntries = () => {
    return (
      <>
        {patient.entries[0].date ? patient.entries[0].date : null}{" "}
        {patient.entries[0].description ? patient.entries[0].description : null}
      </>
    );
  };
  const Icon =
    patient.gender === "male"
      ? MaleIcon
      : patient.gender === "female"
      ? FemaleIcon
      : AccessibilityIcon;

  console.log("logging patient in SinglePatient", patient);

  return (
    <div>
      <h2>
        {patient.name} <Icon />
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h2>entries</h2>
      {otherEntries()}
      {diagnosisListItems()}
    </div>
  );
};

export default SinglePatient;
