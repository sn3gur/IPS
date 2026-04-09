


export default function register(){

    return (
        <form onSubmit={handleAdd}>
        <h1>Register as a new user</h1>
        <input value={email} onChange={handleEmailChange} placeholder="Set Email" />
        <br />
        <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Set Password"
        />
        <br />
        <select 
            type="dropdown"  
            onChange={handleRoleChange} >
            <option value="">--Please choose an option--</option>
            <option value="admin" >Admin</option>
            <option value="landlord">Landlord</option>
            <option value="tenant">Tenant</option> 
        </select>
        <br />
        <button type="submit">Login</button>
        </form>
    );
}