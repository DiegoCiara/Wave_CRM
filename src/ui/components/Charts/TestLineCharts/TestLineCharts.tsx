import { useMemo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface TestLineChartsProps {
  series: any[];
}

const TestLineCharts: React.FC<TestLineChartsProps> = ({ series }) => {
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        height: 380,
        width: 720,
        type: "area",
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      title: {
        text: "Negociações por período",
        align: "left",
      },
      colors: ["rgb(0, 227, 150)", "rgb(255, 69, 96)"],
      responsive: [
        {
          breakpoint: 700,
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
                columnWidth: "50%",
                barHeight: "75%",
              },
            },
            dataLabels: {
              enabled: true,
              offsetX: 12,
              offsetY: 1,
              style: {
                fontSize: "9px",
                colors: ["#000"],
              },
            },
            title: {
              align: "left",
              margin: 10,
              offsetX: 0,
              offsetY: 16,
              floating: false,
              style: {
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: 'Inter',
                color: "#263238",
              },
            },
          },
        },
      ],
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        type: "datetime",
      },
    }),
    []
  );

  return (
    <div style={{backgroundColor:"#fff", padding:"20px",  borderRadius: "8px", border:"1px solid #ededed", boxShadow: "4px 4px 5px rgba(24, 22, 20, 8%"}}>
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default TestLineCharts;
