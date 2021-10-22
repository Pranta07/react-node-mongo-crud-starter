import React, { useRef } from "react";

const AddUser = () => {
    const nameRef = useRef();
    const emailRef = useRef();

    const handleAddUser = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;

        const newUser = { name, email };

        fetch("http://localhost:5000/users", {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data._id) {
                    e.target.reset();
                    alert("User Added Successfully!");
                }
            });
    };

    return (
        <div>
            <h1>Please add an user</h1>
            <form onSubmit={handleAddUser}>
                <input type="text" ref={nameRef} placeholder="name" />
                <br />
                <input type="email" ref={emailRef} placeholder="email" />
                <br />
                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddUser;
