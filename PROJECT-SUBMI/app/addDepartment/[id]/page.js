"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'

const AddDepartmentByCollege = ({ params }) => {
    const { id } = params;
    const apiUrl = process.env.API_URL;
    const [colleges, setColleges] = useState('');
    const [department_name, setDepartmentName] = useState('');
    const [selectedCollegeId, setSelectedCollegeId] = useState('');
    const [selectedCollegeName, setSelectedCollegeName] = useState('');

    useEffect(() => {
        const getColleges = async (id) => {
            try {
                const res = await fetch(`/api/colleges/${id}`, {

                    cache: 'no-store',
                })
                if (!res.ok) {
                    throw new Error("Failed to fetch College")
                }
                const data = await res.json();
                setColleges(data.colleges);
                setSelectedCollegeId(data.colleges._id);
                setSelectedCollegeName(data.colleges.college_name);
            } catch (error) {
                console.log("Error Loading Collegs", error);
            }
        }

        getColleges(id);
    }, []);


    const router = useRouter();

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("Data sending");



        if (!department_name || !setColleges) {
            Swal.fire({
                title: "Error",
                text: "Input required",
                icon: "error"
            });
            return;
        }

        try {
            const res = await fetch(`/api/department`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ department_name, college: selectedCollegeId }),
            });

            if (res.ok) {
                Swal.fire({
                    title: "Good Job",
                    text: "Department Registered",
                    icon: "success"
                });
                router.refresh();
                router.back();
            } else {
                throw new Error("Failed to create a Department");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="d-flex flex-column"><section className="py-5">
            <div className="container px-5">

                <div className="bg-light rounded-4 py-5 px-4 px-md-5">
                    <div className="text-center mb-5">
                        <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
                        <h1 className="fw-bolder">Add Your Department</h1>
                        <p className="lead fw-normal text-muted mb-0">Let&apos;s work together!</p>
                    </div>
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6">
                            <form onSubmit={handleSubmit} id="addCollege" >
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => setDepartmentName(e.target.value)}
                                        className="form-control"
                                        id="department_name"
                                        value={department_name}
                                        type="text"
                                        placeholder="Enter Department name..." />
                                    <label htmlFor="department_name">Department name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select className="form-select py-0" aria-label="Default select example" id="college"
                                        value={selectedCollegeName}
                                        onChange={(e) => setColleges(e.target.value)}>
                                        <option defaultValue={selectedCollegeId}>{selectedCollegeName}</option>
                                    </select>
                                </div>
                                <div className="d-grid"><button className="btn btn-primary btn-lg" id="submitButton" type="submit">Submit</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}

export default AddDepartmentByCollege