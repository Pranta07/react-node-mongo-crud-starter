import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateUser = () => {
    const { id } = useParams();
    // console.log(id);
    const [user, setUser] = useState();
    useEffect(() => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setUser(data));
    }, []);

    return (
        <div>
            <h1>Update user: {user?.name}</h1>
        </div>
    );
};

export default UpdateUser;
