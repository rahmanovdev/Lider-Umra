"use client";
import HomePage from "@/components/pages/HomePage";
import React from "react";
import { useGetToursQuery } from "@/redux/api/tour";



const page = () => (
	<div>
		<HomePage />
	</div>
);
export default page;
