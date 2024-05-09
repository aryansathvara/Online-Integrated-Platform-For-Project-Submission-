"use client";
import { Suspense } from 'react';
import Loading from "./loading"
import styles from './page.module.css'
import CollegeList from '@/components/CollegeList'
import Link from 'next/link';


export default function Home() {
  return (
    <div className="d-flex flex-column">
      <header className="py-5">
        <div className="container px-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xxl-6">
              <div className="text-center my-5">
                <h1 className="fw-bolder mb-3"> Elevate your final year project experience and leave a lasting mark on the world of engineering.</h1>
                <p className="lead fw-normal text-muted mb-4">Let&apos;s start by getting your institution onboard.</p>
                <Link className="btn btn-primary btn-lg" href={`/addCollege`}>Get Started</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-fluid px-4 pb-5">
        <h1 className="mt-4 text-center py-5 fw-bolder">Select Institution</h1>
        <div className="row px-5">
          <Suspense fallback={<Loading />}>
            <CollegeList />
          </Suspense>
        </div>
      </div >
    </div>

  )
}
