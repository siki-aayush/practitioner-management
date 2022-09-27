import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import VirtualList from "rc-virtual-list";
import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Typography } from "antd";

import Loading from "../../hoc/Loading";
import { RootState } from "../../redux/store";
import { Practitioner } from "../../interfaces/Practitioner";

import "./PractitionerList.css";

const PractitionerList: React.FC = () => {
  const [data, setData] = useState<Practitioner[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [endOfPage, setEndOfPage] = useState<Boolean>(false);

  // const id = getUserIdFromLocalStorage();
  const id = useSelector((state: RootState) => state.user.id) || 1;
  const containerHeight = 850;
  const itemHeight = 50;

  const { Title } = Typography;

  /**
   * Fetches the practitioner from the API
   * whenever the page number changes
   */
  useEffect(() => {
    getData(id, page);
  }, [page, id]);

  const getData = (id: number, page: number) => {
    setIsLoading(true);
    axios
      .get("/practitioner", { params: { page } })
      .then((res) => {
        const newData = res.data.data;
        if (newData.length !== 0) {
          setData((prev) => [...prev, ...newData]);
        } else {
          setEndOfPage(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  /**
   *  Loads more practitioner data
   * @param {React.UIEvent } e
   * */
  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
        containerHeight &&
      !endOfPage
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  /**
   * Deletes practitioner
   * @param {string} id
   * */
  const onDeleteHandler = async (id: string) => {
    try {
      const res = await axios.delete(`/practitioner/${id}`);
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Loading isLoading={isLoading}>
      <List className="practitioner" header={<Title>Practitioner</Title>}>
        <VirtualList
          data={data}
          height={containerHeight}
          itemHeight={itemHeight}
          itemKey="id"
          onScroll={onScroll}
          className="practitioner__list"
        >
          {(item: Practitioner) => (
            <List.Item
              key={item.id}
              actions={[
                <Link to={`/practitioner/update/${item.id}`}>
                  <Button>Edit</Button>
                </Link>,
                <Button onClick={() => onDeleteHandler(item.id)}>
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.photograph} />}
                title={`${item.name} (${item.phone})`}
                description={`${item.working_days} `}
              />
              <div className="practitioner__workTime">
                <div>
                  <span className="practitioner__workTime--label">
                    Start Time:{" "}
                  </span>

                  <span className="practitioner__workTime--time">
                    {moment(item.start_time, "HH:mm:ss").format("hh:mm a")}
                  </span>
                </div>

                <div>
                  <span className="practitioner__workTime--label">
                    End Time:{" "}
                  </span>
                  <span className="practitioner__workTime--time">
                    {moment(item.end_time, "HH:mm:ss").format("hh:mm a")}
                  </span>
                </div>
              </div>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </Loading>
  );
};

export default PractitionerList;
