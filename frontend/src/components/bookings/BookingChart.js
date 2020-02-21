import React from "react";
import { Bar } from "react-chartjs";

const BOOKINGS_BUCKETS = {
  Cheap: {
    min: 0,
    max: 40
  },
  Normal: {
    min: 40,
    max: 200
  },
  Expensive: {
    min: 200,
    max: 100000000
  }
};

const BookingChart = ({ bookings }) => {
  const chartData = { labels: [], datasets: [] };
  let values = [];
  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = bookings.reduce((prev, current) => {
      if (
        current.event.price > BOOKINGS_BUCKETS[bucket].min &&
        current.event.price < BOOKINGS_BUCKETS[bucket].max
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);
    values.push(filteredBookingsCount);
    chartData.labels.push(bucket);
    chartData.datasets.push({
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: values
    });
    values = [...values];
    values[values.length - 1] = 0;
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        textAlign: "center",
        padding: 20,
        marginTop: "5rem"
      }}
    >
      <Bar data={chartData} />
    </div>
  );
};

export default BookingChart;
