import { Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PractitionerForm from "../../components/PractitionerForm/PractitionerForm";
import { Practitioner } from "../../interfaces";
import moment from "moment";

import Loading from "../../hoc/Loading";
import "./PractitionerUpdate.css";

const PractitionerUpdate = () => {
  const { id } = useParams();
  const { Title } = Typography;
  const [practitioner, setPractitioner] = useState<Practitioner>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/practitioner/${id}`)
      .then((res) => {
        const data = res.data.data;
        const initialValues = {
          ...data,
          photograph: [],
          workingDays: data.working_days.split(","),
          dob: moment(data.dob),
          workingTime: [
            moment(data.start_time, "HH:mm"),
            moment(data.end_time, "HH:mm"),
          ],
          // favourite: [data.is_favourite],
          phone: {
            phone: data.phone,
            short: "NP",
          },
        };

        // Deletes unnecessary fields from the object
        delete initialValues.start_time;
        delete initialValues.start_time;

        setPractitioner(initialValues);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        navigate("/practitioner");
      });
  }, [id, navigate]);

  return (
    <Loading isLoading={isLoading}>
      <div className="practitioner-update center">
        <Title className="practitioner-update__title">
          Update Practitioner
        </Title>
        {practitioner && (
          <PractitionerForm
            initialValues={practitioner}
            update={true}
            id={id as string}
            setIsLoading={setIsLoading}
          />
        )}
      </div>
    </Loading>
  );
};

export default PractitionerUpdate;
