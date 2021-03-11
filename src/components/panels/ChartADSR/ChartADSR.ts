import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useDebounce } from '@utils';

import 'chartjs-plugin-dragdata';
import styles from './ChartADSR.module.scss';
import { useEffect } from 'react';

function ChartADSR({ envelope, dispatch }) {
  const [values, setValues] = useState([]);
  const labels = ['A', 'D', 'S', 'R'];

  const onDragEnd = useDebounce(function (_, __, idx, value) {
    const val = clamp(labels[idx], value);
    const _values = [...values];

    _values[idx] = val;

    dispatch({ type: 'SET_ENVELOPE', values: _values });
  }, 100);

  useEffect(() => {
    setValues(envelope);
  }, [envelope]);

  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        fontFamily: 'Montserrat',
      },
    ],
  };

  const options = {
    legend: { display: false },
    layout: {
      margin: {
        right: 500,
      },
    },
    scales: {
      gridLines: {
        lineWidth: 2,
        color: 'rgb(170, 170, 170)',
      },
      xAxes: [
        {
          ticks: {
            fontSize: 11,
            fontColor: 'rgb(170, 170, 170)',
            fontWeight: 700,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            none: true,
            beginAtZero: true,
            stepSize: 0.5,
            maxTicksLimit: 5,
            suggestedMax: 5,
            fontFamily: 'Montserrat',
            fontSize: 8,
            fontColor: 'rgb(170, 170, 170)',
            fontWeight: 700,
          },
        },
      ],
    },
    dragData: true,
    onDragEnd,
  };

  return (
    <div className={styles.container}>
      <Line data={data} options={options} />
    </div>
  );
}

export default ChartADSR;

function clamp(key, val) {
  switch (key) {
    case 'A':
      return val <= 2 ? val : 2;

    case 'D':
      return val <= 2 ? val : 2;

    case 'S': {
      return val <= 1 ? val : 1;
    }

    case 'R':
      return val <= 5 ? val : 5;

    default:
      console.log('Please select a key using ADSR');
  }
}
