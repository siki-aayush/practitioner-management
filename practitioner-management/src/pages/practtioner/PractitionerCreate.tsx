import { Typography } from "antd";
import { useState } from "react";
import PractitionerForm from "../../components/PractitionerForm/PractitionerForm";
import Loading from "../../hoc/Loading";

import "./PractitionerCreate.css";

const PractitionerCreate = () => {
  const { Title } = Typography;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <Loading isLoading={isLoading}>
      <div className="practitioner-create center">
        <Title className="practitioner-create__title">
          Add New Practitioner
        </Title>
        <PractitionerForm update={false} setIsLoading={setIsLoading} />
      </div>
    </Loading>
  );
};

export default PractitionerCreate;
