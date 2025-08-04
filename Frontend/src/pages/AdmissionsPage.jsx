import React from "react";
import { Helmet } from "react-helmet";

const AdmissionsPage = () => {
    return (
        <>
            <Helmet>
                <title>Admissions - OSV School | Join Our Academic Excellence</title>
                <meta name="description" content="Apply for admission to OSV School. Discover our admission process, requirements, and how to join our community of academic excellence. Start your educational journey with us." />
                <meta name="keywords" content="OSV School admissions, school admission process, admission requirements, apply to school, academic programs, school enrollment, admission criteria" />
                <meta name="author" content="OSV School" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://osvschool.com/admissions" />
                <meta property="og:title" content="Admissions - OSV School | Join Our Academic Excellence" />
                <meta property="og:description" content="Apply for admission to OSV School. Discover our admission process, requirements, and how to join our community of academic excellence. Start your educational journey with us." />
                <meta property="og:image" content="https://osvschool.netlify.app/assets/og-images/og-academics.png" />
                <meta property="og:site_name" content="OSV School" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://osvschool.com/admissions" />
                <meta property="twitter:title" content="Admissions - OSV School | Join Our Academic Excellence" />
                <meta property="twitter:description" content="Apply for admission to OSV School. Discover our admission process, requirements, and how to join our community of academic excellence. Start your educational journey with us." />
                <meta property="twitter:image" content="https://osvschool.netlify.app/assets/og-images/og-academics.png" />

                {/* Additional SEO */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#3B82F6" />
                <link rel="canonical" href="https://osvschool.com/admissions" />
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-brand-light">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-brand-dark mb-4">Admissions</h1>
                    <p className="text-brand-muted">Admissions page coming soon...</p>
                </div>
            </div>
        </>
    );
};

export default AdmissionsPage;
