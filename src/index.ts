import { connect, version, Schema, model } from "mongoose";
process.loadEnvFile();

const URI_DB = process.env.URI_DB || "";

const connectMongoDB = async () => {
    try {
    await connect(URI_DB)
    console.log("MongoDB connected");
    } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    }
}

connectMongoDB();

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
}, {
    versionKey: false,
})

const User = model("User", userSchema);

interface IUser {
    username: string;
    password: string;
    email: string;
}

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return {
            success: true,
            data: users,
            message: "Users retrieved successfully",
        };
    } catch (error) {
        const e = error as Error;
        return {
            success: false,
            error: e.message,
        }
    }
}

const updateUser = async (id: string, updatedUserData: Partial<IUser>) => {
    try {
        const user = await User.findByIdAndUpdate(id, updatedUserData, { new: true });
        if (!user || user === null) {
            return {
                success: false,
                message: "User not found",
            }
        }
        return {
            success: true,
            data: user,
            message: "User updated successfully",
        };
    } catch (error) {
        const e = error as Error;
        return {
            success: false,
            error: e.message,
        }
    }
}

const createUser = async (newUserData: IUser) => {
    try {

        const { username, password, email } = newUserData;
        const newUser = new User({username, password, email});
        await newUser.save();
        return {
            success: true,
            data: newUser,
            message: "User created successfully",
        };
    } catch (error) {
        const e = error as Error;
        return {
            success: false,
            error: e.message,
        }
    }
}

const deleteUser = async (id: string) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser || deletedUser === null) {
            return {
                success: false,
                message: "User not found",
            }
        }
        return {
            success: true,
            data: deletedUser.id,
            message: "User deleted successfully",
        };
    } catch (error) {
        const e = error as Error;
        return {
            success: false,
            error: e.message,
        }
    }
}

const getuserbyID = async (id: string) => {
    try {
        const user = await User.findById(id);
        if (!user || user === null) {
            return {
                success: false,
                message: "User not found",
            }
        }
        return {
            success: true,
            data: user,
            message: "User retrieved successfully",
        };
    } catch (error) {
        const e = error as Error;
        return {
            success: false,
            error: e.message,
        }
    }
}

const main = async () => {
    // const user = await createUser({
    //     username: "testuser",
    //     password: "testpassword",
    //     email: "test@gmail.com"
    // });
    const users = await getAllUsers();
    console.log(users);
}

main();