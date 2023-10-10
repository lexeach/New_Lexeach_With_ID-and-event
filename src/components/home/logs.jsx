import React, { useEffect, useState } from "react";

function Logs() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Define the URL of the API you want to fetch data from
    const apiUrl = "http://localhost:3032/get-registartion"; // Replace with your API URL
    
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        // Convert UTC timestamps to local time
        const localizedData = responseData.map((item) => ({
          ...item,
          time: new Date(item.time * 1000).toLocaleString(), // Assuming time is in seconds
        }));
        setData(localizedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="row private-section-bg">
      <div className="col-sm-12 grid-margin">
        <div className="card">
          <div className="card-body text-center">
            <h5>Level income</h5>
          </div>
        </div>
      </div>
      <div className="col-sm-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-12 my-8">
                {/* Render the data as a table */}
                <table>
                  <thead>
                    <tr>
                      <th>Sr .no</th>
                      <th style={{ marginRight: "8px" }}>User</th>
                      <th style={{ marginRight: "8px" }}>Referral</th>
                      <th>Level</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item._id}>
                        <td style={{ marginRight: "8px" }}>{item.index - 999}</td>
                        <td style={{ marginRight: "8px" }}>{item.user}</td>
                        <td>{item.referral}</td>
                        <td>{item.level}</td>
                        <td>{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logs;
