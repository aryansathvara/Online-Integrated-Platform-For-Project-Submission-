"use client";
import { useState, useEffect } from "react";
import Link from "next/link"
import Image from "next/image"
import Univ from "../public/university.png"

const CollegeList = () => {
    const apiUrl = process.env.API_URL;
    const [colleges, setColleges] = useState([]);

    useEffect(() => {
        const getColleges = async () => {
            try {
                const res = await fetch(`/api/colleges`, {
                    cache: 'no-store',
                })
                if (!res.ok) {
                    throw new Error("Failed to fetch Collegs")
                }
                const data = await res.json();
                setColleges(data.colleges);
            } catch (error) {
                console.log("Error Loading Collegs", error);
            }
        }

        getColleges();
    }, []);
    return (
        <div>
            {colleges.length > 0 ? (
                <div className="row gx-5 justify-content-center py-5">
                    {colleges.map((coll) => (
                        <div className="col-lg-6 col-xl-4" key={coll._id}>
                            <Link href={`/college/${coll._id}`} style={{ textDecoration: "none" }}>
                                <div className="card mb-5 mb-xl-0 shadow">
                                    <div className="card-body p-5 d-flex justify-content-between align-items-center">
                                        <div className="mb-3">
                                            <span className="display-4 fw-bold">{coll.college_name}</span>
                                        </div>
                                        <div className="img-fluid mb-3">
                                            <Image src={Univ} alt="..." className="img-fluid" width={90} quality={100} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <h4 className="text-center">No colleges available.</h4>
            )}
        </div>
    )
}

export default CollegeList