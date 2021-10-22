import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    //DELETE an user
    const handleDeleteUser = (id) => {
        const proceed = window.confirm("Are you sure?");
        if (proceed) {
            fetch(`http://localhost:5000/users/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.deletedCount === 1) {
                        alert("Successfully deleted one document.");
                        const restUsers = users.filter(
                            (user) => user._id !== id
                        );
                        setUsers(restUsers);
                    } else {
                        alert(
                            "No documents matched the query. Deleted 0 documents."
                        );
                    }
                });
        }
    };

    return (
        <div>
            <h1>Here are all users</h1>
            <div>
                {users.map((user) => (
                    <p key={user._id}>
                        Name:{user.name} Email:{user.email}
                        <Link to={`/users/update/${user._id}`}>
                            <button>Update</button>
                        </Link>
                        <button onClick={() => handleDeleteUser(user._id)}>
                            X
                        </button>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Users;
