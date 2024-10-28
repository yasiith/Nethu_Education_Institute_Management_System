'use client';
import { Divide } from 'lucide-react';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
    const { classId } = context.params;

    // Fetch the class data from your backend API or database
    const response = await fetch(`$process.env.NEXT_PUBLIC_API_URL}/classes/${classId}`);
    const classData = await response.json();

    // Pass the fetched data to the component via props
    return {
        props: {
            classData,
        },
    };
}

const ClassDetail = ({classData}) => {
    return (
        <div>
            <h1>{classData.name}</h1>
            <p>{classData.description}</p>
        </div>
    )
}

export default ClassDetail;