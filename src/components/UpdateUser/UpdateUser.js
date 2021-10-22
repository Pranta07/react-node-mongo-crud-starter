import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateUser = () => {
    const { id } = useParams();
    // console.log(id);
    const [user, setUser] = useState({});
    useEffect(() => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setUser(data));
    }, []);

    const handleName = (e) => {
        const updatedName = e.target.value;
        const updatedUser = { name: updatedName, email: user?.email };
        setUser(updatedUser);
    };

    const handleEmail = (e) => {
        const updatedEmail = e.target.value;
        const updatedUser = { ...user };
        updatedUser.email = updatedEmail;
        setUser(updatedUser);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (user.name && user.email) {
            fetch(`http://localhost:5000/users/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.acknowledged) {
                        alert("Users Updated successfully!");
                        setUser({});
                    }
                });
        } else {
            alert("Name and Email is required");
        }
    };

    return (
        <div>
            <h1>Update user: {user?.name}</h1>
            <h2>Email: {user?.email}</h2>
            <form onSubmit={handleUpdate}>
                <input
                    onChange={handleName}
                    type="text"
                    placeholder="Name"
                    value={user?.name || ""}
                />
                <br />
                <input
                    onChange={handleEmail}
                    type="email"
                    placeholder="Email"
                    value={user?.email || ""}
                />
                <br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;
