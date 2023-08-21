import { useMemo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface LineChartsProps {
  series: any[];
  xaxis: any[];
}

const LineCharts: React.FC<LineChartsProps> = ({ series, xaxis }) => {
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        height: 350,
        type: "line",
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },

      colors: ["#03f518", "#e60606"],
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
          },
        },
      ],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Negociações por período",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        type: "datetime",
        categories: xaxis,
      },
      yaxis: {
        title: {
          text: "Valor R$",
        },
      },
    }),
    [xaxis]
  );

  return (
    <div style={{backgroundColor:"#fff", padding:"20px",  borderRadius: "8px", border:"1px solid #ededed", boxShadow: "4px 4px 5px rgba(24, 22, 20, 8%"}}>
      <Chart options={options} series={series} type="line" height={500} />
    </div>
  );
};

export default LineCharts;
