import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts"; 

interface ChartProps{
  coinId:string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({coinId}:ChartProps){
  const {isLoading,data}=useQuery<IHistorical[]>(["ohlcv",coinId],()=>fetchCoinHistory(coinId),
    {
      refetchInterval:10000,
    }
  );
  return <div>
      {isLoading ? "차트 로딩중...":
      <ApexChart 
        type="line"
        series={[
          {
            name:"Price",
            data:data?.map(price=>parseFloat(price.close))??[],
          }
        ]} 
        options={{
          theme:{
            mode:"dark",
          },
          chart:{
            type:"candlestick",
            width:500,
            height:500,
            toolbar:{
              show:false,
            },
            background:"transparent",
          },
          stroke:{
            curve:"smooth",
            width:3,
          },
          yaxis:{
            show:false,
          },
          xaxis:{
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels:{show:false},
            categories:data?.map(price=>new Date(price.time_close*1000)),
          },
          fill:{
            type: "gradient",
            gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
          },
          tooltip:{
            y:{
              formatter:(value)=>`$${value.toFixed(2)}`,
            }
          }
        }}/>}
    </div>
}

export default Chart;