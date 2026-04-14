import {useState} from "react";

export default function Register(){
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
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.email){
            return setMessage("Missing email");
        }
        else if (!form.password){
            return setMessage("Missing password");
        }
        else {
            setMessage("");
        }
        try {
            setMessage("before fetch");
            // Sends form to server
            const res = await fetch("http://localhost:5050/api/user/register",{
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            setMessage("before data");
            // Awaits for a response from server
            const data = await res.json();
            setMessage("before handle");
            // Handles response 
            if (res.ok) {
                setMessage("User registered successfully!");
                setForm({ email: "", password: "" });
            }
            setMessage("complete"); 
        }
        catch {
            // Sets the response message to show up if failed to register user
            setMessage(data.message);

            //Testing Purposes
            setMessage("Something's wrong");
        }
    }
    // How the form looks
    return (
            <form onSubmit={handleSubmit}>
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
                <br/>
                <button type="submit">Register</button>
                <p>Info: {message}</p>
            </form>
    );
}