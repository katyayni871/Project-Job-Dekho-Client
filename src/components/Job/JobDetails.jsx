import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import "./JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail-alljobs page-alljobs">
      <div className="container-alljobs">
        <h3>Job Details</h3>
        <div className="banner-alljobs">
          <p>
            <span className="label">Title:</span> <span>{job.title}</span>
          </p>
          <p>
            <span className="label">Category:</span> <span>{job.category}</span>
          </p>
          <p>
            <span className="label">Country:</span> <span>{job.country}</span>
          </p>
          <p>
            <span className="label">City:</span> <span>{job.city}</span>
          </p>
          <p>
            <span className="label">Location:</span> <span>{job.location}</span>
          </p>
          <p>
            <span className="label">Description:</span> <span>{job.description}</span>
          </p>
          <p>
            <span className="label">Job Posted On:</span> <span>{job.jobPostedOn}</span>
          </p>
          <p>
            <span className="label">Salary:</span>{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
