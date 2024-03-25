import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineOptions,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartAnnotation from 'chartjs-plugin-annotation';
import { drawAnnotationBox, gradientBackground } from './utils';

ChartJS.register(
  ChartAnnotation,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

ChartJS.defaults.font.family = '"Plus Jakarta Sans", sans-serif';

const makeOptions = (
  annotationColor: string,
  aanotationLineColor: string,
  annotationValue: string
): LineOptions => ({
  responsive: true,
  maintainAspectRatio: false,
  tension: 0.2,
  pointRadius: 0,
  borderWidth: 1,
  layout: {
    padding: {
      right: 20
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      border: {
        width: 0
      }
    },
    y: {
      position: 'right',
      border: {
        width: 0
      },
      grid: {
        display: false
      },
      ticks: {
        count: 5
      }
    }
  },

  plugins: {
    legend: false,
    title: false,
    annotation: {
      clip: false,
      annotations: {
        annotation1: {
          type: 'line',
          borderColor: aanotationLineColor,
          borderWidth: 1,
          borderDash: [5, 5],
          borderDashOffset: 0,
          beforeDraw: (ctx) =>
            drawAnnotationBox(ctx, annotationValue, annotationColor),

          scaleID: 'y',
          value: 122
        }
      }
    }
  }
});

type Props = {
  labels: Array<string | number>;
  data: Array<string | number>;
  lineColor: string;
  currentPriceLineColor: string;
  gradientFrom: string;
  gradientTo: string;
  currentPrice: string;
};

export const Chart: React.FC<Props> = ({
  labels,
  data,
  lineColor,
  currentPriceLineColor,
  gradientFrom,
  gradientTo,
  currentPrice
}) => {
  return (
    <Line
      options={makeOptions(lineColor, currentPriceLineColor, currentPrice)}
      data={{
        labels,
        datasets: [
          {
            data,
            borderColor: lineColor,
            fill: 'start',
            backgroundColor: gradientBackground(gradientFrom, gradientTo)
          }
        ]
      }}
    />
  );
};
