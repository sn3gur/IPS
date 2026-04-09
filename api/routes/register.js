
import User from "server/models/User";


export async function POST(req) {
  try {
    // Gets the form data
    const body = await req.json();
    const { email, password } = body;

    // Sends "Missing Text" as a response to the form
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Missing Input" }),
        { status: 400 }
      );
    }
    // Gets MongoDB connection
    await connectDB();

    // Checks if there is a user with the same email
    const existingUser = await User.findOne({ email });

    // If there is sends a message
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 400 }
      );
    }

    // Creates a new user
    const newUser = await User.create({
      email,
      password,
    });
    
    return new Response(JSON.stringify(newUser), { status: 201 });
  } 
  // Catches any errors 
  catch (error) {
    return new Response(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
}