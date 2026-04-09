
import {useState} from "react";

export default function register(){
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleAdd = async (event) => {
        event.preventDefault();

        const res = await fetch("api/routes/register",{
            method: "POST",
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage("User registered successfully!");
            setForm({ email: "", password: "" });
        } 
        else {
            setMessage(data.message);
        }
    }

    return (
        <div>
            <form onSubmit={handleAdd}>
                <h1>Register as a new user</h1>
                <input value={form.email} onChange={handleChange} placeholder="Set Email" />
                <br />
                <input
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Set Password"
                />
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
}