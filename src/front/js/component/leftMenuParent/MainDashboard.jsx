import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Calendario from "./Calendario.jsx";
import BoxDisplay from "./BoxDisplay.jsx";
import ParentGaugeChart from "./GaugeChart.jsx";
import ParentDashboardTable from "./ParentDashboardTable.jsx";
import { Context } from "../../store/appContext.js";
import { Carousel } from "react-bootstrap";

const format_schedule_data = obj => {
  let auxArr = [];
  Object.keys(obj).forEach(key => {
    auxArr.push(...obj[key]);
  });

  return auxArr;
};
const MainDashboard = ({ dataEvents, estudiantes }) => {
  const { store } = useContext(Context);
  const [slide, setSlide] = useState(0);

  const handlePrevSlide = (value, changeFunction) => {
    if (value > 0) {
      changeFunction(value - 1);
    }
  };

  const handleNextSlide = (value, count, changeFunction) => {
    if (value < count - 1) {
      changeFunction(value + 1);
    }
  };
  return (
    <Wrapper className="container-fluid">
      <div className="row d-flex">
        <div className="col-md-8 col-sm-12 ">
          <Calendario eventos={format_schedule_data(dataEvents)} />
        </div>
        <div className="col-md-4 col-sm-12 ">
          <BoxDisplay>
            <h2 className="text-center mt-0">Promedio del estudiante</h2>
            <ParentGaugeChart max={20} />
            <h5 className="text-center mb-2">Nombre estudiante</h5>
          </BoxDisplay>
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center">
          {slide > 0 ? (
            <i
              className="bi bi-arrow-bar-left"
              onClick={() => handlePrevSlide(slide, setSlide)}></i>
          ) : (
            " "
          )}
          <BoxDisplay width={"100%"} aspect="16/9">
            <Carousel
              interval={null}
              indicators={false}
              controls={false}
              activeIndex={slide}>
              {estudiantes ? (
                estudiantes.map((estudiante, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <TableWrapper>
                        <h1>{estudiante.nombre}</h1>
                        <ParentDashboardTable materias={estudiante.materias} />
                      </TableWrapper>
                    </Carousel.Item>
                  );
                })
              ) : (
                <h1 className="text-center">Loading Info</h1>
              )}
            </Carousel>
          </BoxDisplay>
          {slide < estudiantes.length - 1 ? (
            <i
              className="bi bi-arrow-bar-right"
              onClick={() =>
                handleNextSlide(slide, estudiantes.length, setSlide)
              }></i>
          ) : (
            " "
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default MainDashboard;

const Wrapper = styled.div`
  margin: 0 auto;
  min-height: 100%;
  background: none;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  width: 100%;
`;
