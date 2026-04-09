
"use client";
import {useState} from "react";

export default function register(){
    // Form Fields Email and Password for now
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    // Message for confirmation
    const [message, setMessage] = useState("");

    // Event handler for form value changes
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    // Event handler for subbmiting form
    const handleAdd = async (event) => {
        event.preventDefault();

        // Sends form to api
        const res = await fetch("api/routes/register",{
            method: "POST",
            body: JSON.stringify(form),
        });
        // Awaits for a response from api
        const data = await res.json();

        // Handles response 
        if (res.ok) {
            setMessage("User registered successfully!");
            setForm({ email: "", password: "" });
        } 
        else {
            // Sets the response message to show up if failed to register user
            setMessage(data.message);

            //Testing Purposes
            setMessage("Something's wrong");
        }
    }
    // How to form looks
    return (
            <form onSubmit={handleAdd}>
                <h1>Register as a new user</h1>
                <input 
                    type="email"
                    name="email"
                    value={form.email} 
                    onChange={handleChange} 
                    placeholder="Set Email" 
                />
                <br />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Set Password"
                />
                <button type="submit">Register</button>
                <p>{message}</p>
            </form>
    );
}