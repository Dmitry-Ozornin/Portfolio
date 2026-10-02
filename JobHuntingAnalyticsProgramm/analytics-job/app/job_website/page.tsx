"use client";
import AddJobWebsite from "@/components/AddJobWebsite";
import JobSiteList from "@/components/JobSiteList";
import { useState } from "react";

const Analytics = () => {
  return (
    <main className="center">
      <AddJobWebsite />
      <JobSiteList />
    </main>
  );
};
export default Analytics;
